// Address lookup in the BAG (Basisregistratie Adressen en Gebouwen) through PDOK's free Locatieserver:
// postcode + house number → street, town and BAG ids. No key needed. A lookup failure never blocks a lead:
// callers get an empty list and carry on with the address as typed.
const ENDPOINT = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/free';
const FIELDS = 'weergavenaam,straatnaam,huisnummer,huisletter,huisnummertoevoeging,postcode,woonplaatsnaam,adresseerbaarobject_id,nummeraanduiding_id';
const TTL = 24 * 3600 * 1000;
const MAX_CACHE = 5000;

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
});

// fetchImpl is injectable so tests run without the internet.
export function createAddressLookup({ fetchImpl = fetch, timeoutMs = 4000 } = {}) {
  const cache = new Map();
  return async function lookup(postcode, houseNumber) {
    const pc = String(postcode || '').replace(/\s+/g, '').toUpperCase();
    const nr = (String(houseNumber || '').match(/^\d{1,5}/) || [''])[0];
    if (!/^[1-9]\d{3}[A-Z]{2}$/.test(pc) || !nr) return [];
    const key = `${pc}-${nr}`;
    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < TTL) return hit.matches;
    const url = `${ENDPOINT}?q=postcode:${pc}&fq=type:adres&fq=huisnummer:${nr}&fl=${FIELDS}&rows=50`;
    try {
      const res = await fetchImpl(url, { signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok) return [];
      const docs = (await res.json())?.response?.docs || [];
      const matches = docs.map(toMatch).sort((a, b) => a.label.localeCompare(b.label, 'nl', { numeric: true }));
      if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value);
      cache.set(key, { at: Date.now(), matches });
      return matches;
    } catch {
      return [];
    }
  };
}
