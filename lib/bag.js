// Address lookup in the BAG (Basisregistratie Adressen en Gebouwen) through PDOK's free Locatieserver:
// postcode + house number → street, town and BAG ids. No key needed. A lookup failure never blocks a lead:
// callers get an empty list and carry on with the address as typed.
const ENDPOINT = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/free';
const FIELDS = 'weergavenaam,straatnaam,huisnummer,huisletter,huisnummertoevoeging,postcode,woonplaatsnaam,adresseerbaarobject_id,nummeraanduiding_id,centroide_ll';
const TTL = 24 * 3600 * 1000;
const MAX_CACHE = 5000;

// "POINT(4.89 52.37)" → { lat, lon }
const point = (wkt) => {
  const m = /POINT\(([-\d.]+) ([-\d.]+)\)/.exec(wkt || '');
  return m ? { lat: Number(m[2]), lon: Number(m[1]) } : { lat: null, lon: null };
};

const toMatch = (d) => ({
  id: d.adresseerbaarobject_id, // BAG verblijfsobject id: one per home or unit
  label: d.weergavenaam,
  street: d.straatnaam,
  house_number: String(d.huisnummer),
  house_letter: d.huisletter || '',
  house_addition: d.huisnummertoevoeging || '',
  postcode: d.postcode,
  city: d.woonplaatsnaam,
  bag_vbo_id: d.adresseerbaarobject_id,
  bag_nummeraanduiding_id: d.nummeraanduiding_id,
  ...point(d.centroide_ll),
});

// A small cache with an expiry, shared by the lookups below.
function memo(ttl = TTL, max = MAX_CACHE) {
  const cache = new Map();
  return {
    get: (k) => { const hit = cache.get(k); return hit && Date.now() - hit.at < ttl ? hit.v : undefined; },
    set: (k, v) => { if (cache.size >= max) cache.delete(cache.keys().next().value); cache.set(k, { at: Date.now(), v }); },
  };
}

// fetchImpl is injectable so tests run without the internet.
export function createAddressLookup({ fetchImpl = fetch, timeoutMs = 4000 } = {}) {
  const cache = memo();
  return async function lookup(postcode, houseNumber) {
    const pc = String(postcode || '').replace(/\s+/g, '').toUpperCase();
    const nr = (String(houseNumber || '').match(/^\d{1,5}/) || [''])[0];
    if (!/^[1-9]\d{3}[A-Z]{2}$/.test(pc) || !nr) return [];
    const key = `${pc}-${nr}`;
    const hit = cache.get(key);
    if (hit) return hit;
    const url = `${ENDPOINT}?q=postcode:${pc}&fq=type:adres&fq=huisnummer:${nr}&fl=${FIELDS}&rows=50`;
    try {
      const res = await fetchImpl(url, { signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok) return [];
      const docs = (await res.json())?.response?.docs || [];
      const matches = docs.map(toMatch).sort((a, b) => a.label.localeCompare(b.label, 'nl', { numeric: true }));
      cache.set(key, matches);
      return matches;
    } catch {
      return [];
    }
  };
}

// Details of one home from the BAG (PDOK OGC API, free, no key): floor area and use of the verblijfsobject,
// and the build year of its building (pand). Shown to the visitor next to the aerial photo and added to the
// lead, so the valuation starts with facts. null when the BAG has nothing or does not answer in time.
const BAG_API = 'https://api.pdok.nl/kadaster/bag/ogc/v2/collections';
export function createHouseDetails({ fetchImpl = fetch, timeoutMs = 4000 } = {}) {
  const cache = memo();
  const get = async (url) => {
    const res = await fetchImpl(url, { signal: AbortSignal.timeout(timeoutMs), headers: { accept: 'application/geo+json, application/json' } });
    return res.ok ? res.json() : null;
  };
  return async function details(vboId) {
    const id = String(vboId || '');
    if (!/^\d{16}$/.test(id)) return null;
    const hit = cache.get(id);
    if (hit !== undefined) return hit;
    try {
      const vbo = (await get(`${BAG_API}/verblijfsobject/items?f=json&identificatie=${id}`))?.features?.[0]?.properties;
      if (!vbo) return null;
      const pandUrl = [].concat(vbo['pand.href'] || [])[0];
      const pand = pandUrl?.startsWith(`${BAG_API}/pand/`) ? (await get(`${pandUrl}?f=json`))?.properties : null;
      const out = {
        area_m2: Number.isInteger(vbo.oppervlakte) && vbo.oppervlakte > 0 ? vbo.oppervlakte : null,
        use: typeof vbo.gebruiksdoel === 'string' ? vbo.gebruiksdoel.split(',')[0].trim() : null,
        build_year: Number.isInteger(pand?.bouwjaar) && pand.bouwjaar > 1000 && pand.bouwjaar < 2100 ? pand.bouwjaar : null,
        pand_id: /^\d{16}$/.test(pand?.identificatie || '') ? pand.identificatie : null, // the building, for its 3D model
      };
      cache.set(id, out);
      return out;
    } catch {
      return null;
    }
  };
}

// Aerial photo tiles (PDOK Luchtfoto, actual high resolution, free, public domain), fetched by the server
// so the visitor's browser does not contact a third party. z/x/y in Web Mercator.
const TILES = 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857';
export function createTileFetcher({ fetchImpl = fetch, timeoutMs = 6000 } = {}) {
  const cache = memo(7 * 24 * 3600 * 1000, 400);
  return async function tile(z, x, y) {
    if (!(z >= 15 && z <= 20) || !(x >= 0 && x < 2 ** z) || !(y >= 0 && y < 2 ** z)) return null;
    const key = `${z}/${x}/${y}`;
    const hit = cache.get(key);
    if (hit) return hit;
    try {
      const res = await fetchImpl(`${TILES}/${key}.jpeg`, { signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok || !String(res.headers.get('content-type')).startsWith('image/')) return null;
      const bytes = Buffer.from(await res.arrayBuffer());
      if (bytes.length > 400_000) return null;
      cache.set(key, bytes);
      return bytes;
    } catch {
      return null;
    }
  };
}

// The building in 3D (3D BAG by TU Delft, free, from the BAG and height scans). Returns a small mesh for the
// browser: v = vertices in metres around the building's centre (z up, ground at 0), f = polygons as
// [type, ...vertex indices] with type 0 ground, 1 wall, 2 roof. null when there is no model (new builds,
// houseboats) or the service does not answer: the page then shows only the aerial photo.
const BAG3D = 'https://api.3dbag.nl/collections/pand/items/NL.IMBAG.Pand.';
const SURFACE = { GroundSurface: 0, WallSurface: 1, RoofSurface: 2 };
export function createModel3d({ fetchImpl = fetch, timeoutMs = 12000 } = {}) {
  const cache = memo(7 * 24 * 3600 * 1000, 500);
  const misses = memo(10 * 60 * 1000, 2000); // no model or no answer: try again after 10 minutes
  return async function model(pandId) {
    const id = String(pandId || '');
    if (!/^\d{16}$/.test(id) || misses.get(id)) return null;
    const hit = cache.get(id);
    if (hit) return hit;
    let out = null;
    try {
      const res = await fetchImpl(BAG3D + id, { signal: AbortSignal.timeout(timeoutMs), headers: { accept: 'application/json' } });
      if (res.ok) out = toMesh(await res.json());
    } catch { out = null; }
    if (out) cache.set(id, out); else misses.set(id, true);
    return out;
  };
}

function toMesh(body) {
  const f = body?.feature;
  const tr = body?.metadata?.transform;
  if (!f?.vertices || !tr) return null;
  const parts = Object.values(f.CityObjects || {}).filter((o) => o.type === 'BuildingPart');
  const polys = [];
  for (const part of parts) {
    const g = (part.geometry || []).find((x) => x.lod === '2.2') || (part.geometry || []).find((x) => x.lod === '1.2');
    if (!g || g.type !== 'Solid') continue;
    const types = g.semantics?.surfaces || [];
    g.boundaries.forEach((shell, si) => shell.forEach((surface, fi) => {
      const sem = types[g.semantics?.values?.[si]?.[fi]]?.type;
      const ring = surface[0];
      if (ring?.length >= 3) polys.push([SURFACE[sem] ?? 1, ring]);
    }));
  }
  if (!polys.length) return null;
  const used = [...new Set(polys.flatMap(([, r]) => r))];
  if (used.length > 20000) return null;
  const pt = (i) => f.vertices[i].map((c, k) => c * tr.scale[k] + tr.translate[k]);
  const pts = new Map(used.map((i) => [i, pt(i)]));
  const xs = [...pts.values()];
  const cx = (Math.min(...xs.map((p) => p[0])) + Math.max(...xs.map((p) => p[0]))) / 2;
  const cy = (Math.min(...xs.map((p) => p[1])) + Math.max(...xs.map((p) => p[1]))) / 2;
  const z0 = Math.min(...xs.map((p) => p[2]));
  const index = new Map(used.map((i, n) => [i, n]));
  const r2 = (n) => Math.round(n * 100) / 100;
  return {
    v: used.map((i) => { const p = pts.get(i); return [r2(p[0] - cx), r2(p[1] - cy), r2(p[2] - z0)]; }),
    f: polys.map(([t, ring]) => [t, ...ring.map((i) => index.get(i))]),
  };
}
