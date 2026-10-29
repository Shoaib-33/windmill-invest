// Smoke test: every built page loads, the lead endpoint accepts and rejects the right things,
// and the admin is protected. Run after `node build.js` (npm test does both).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { config } from '../config.js';
import { CONSENTS, FORMS, textVersion } from '../lib/forms.js';
import { signature } from '../lib/forwarder.js';
import { funnelPages } from '../lib/funnels.js';
import { createApp } from '../server.js';

// A stand-in for Windmill CRM's Lead API: records what it receives; `crmMode` decides its answer.
const crmReceived = [];
let crmMode = 'ok';
const fakeCrm = createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    crmReceived.push({ headers: req.headers, body, json: JSON.parse(body) });
    res.writeHead(crmMode === 'reject' ? 400 : 202, { 'content-type': 'application/json' });
    res.end(crmMode === 'reject' ? '{"error":"bad payload"}' : '{"ok":true}');
  });
});
await new Promise((r) => fakeCrm.listen(0, '127.0.0.1', r));
const crm = { url: `http://127.0.0.1:${fakeCrm.address().port}/leads`, token: 'test-token', secret: 'test-secret', intervalMs: 100 };

const published = JSON.parse(readFileSync(new URL('../dist/pages.json', import.meta.url), 'utf8'));
const slugs = published.map((p) => p.path);
// TEST_DATABASE_URL runs the same tests against PostgreSQL (use a scratch database: the tests add rows).
// A stand-in for the PDOK address service: Dam 1 has one address, Dam 5 has several (5B, 5C).
const BAG = {
  '1012JS-1': [{ id: '0363010003761571', label: 'Dam 1, 1012JS Amsterdam', street: 'Dam', house_number: '1', house_letter: '', house_addition: '', postcode: '1012JS', city: 'Amsterdam', bag_vbo_id: '0363010003761571', bag_nummeraanduiding_id: '0363200003761447' }],
  '1012JS-5': ['B', 'C'].map((l, i) => ({ id: `036301001211009${3 + i}`, label: `Dam 5${l}, 1012JS Amsterdam`, street: 'Dam', house_number: '5', house_letter: l, house_addition: '', postcode: '1012JS', city: 'Amsterdam', bag_vbo_id: `036301001211009${3 + i}`, bag_nummeraanduiding_id: `036320001211180${7 + i}` })),
};
const addressLookup = async (pc, nr) => BAG[`${String(pc).replace(/\s/g, '').toUpperCase()}-${String(nr).match(/^\d+/)?.[0]}`] || [];
const server = await createApp({ dbPath: process.env.TEST_DATABASE_URL || 'memory://', maxSubmissions: 80, crm, addressLookup });
const waitFor = async (check, ms = 4000) => {
  const end = Date.now() + ms;
  for (;;) {
    const v = await check();
    if (v) return v;
    if (Date.now() > end) throw new Error('timed out waiting');
    await new Promise((r) => setTimeout(r, 50));
  }
};
console.log(`storage: ${server.storage}`);
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
const results = [];
const test = async (name, fn) => {
  try { await fn(); results.push(`ok   ${name}`); } catch (e) { results.push(`FAIL ${name}: ${e.message}`); }
};
const post = (body, headers = {}) => fetch(base + '/api/inquiry', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
const auth = { authorization: 'Basic ' + Buffer.from(`${config.adminUser}:${config.adminPassword}`).toString('base64') };

await test(`all ${slugs.length} pages return 200 with one h1, a title and a canonical`, async () => {
  for (const s of slugs) {
    const res = await fetch(base + s);
    assert.equal(res.status, 200, s);
    const html = await res.text();
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${s}: h1 count`);
    assert.match(html, /<title>[^<]+<\/title>/, `${s}: title`);
    assert.ok(html.includes(`<link rel="canonical" href="${config.siteUrl}${s}">`), `${s}: canonical`);
    assert.ok(!/\{\{\w+\}\}|undefined|\[object Object\]/.test(html), `${s}: leftover token`);
    JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  }
});

await test('internal links point to built pages, and stay in the page language', async () => {
  const known = new Set(slugs);
  const broken = new Set();
  for (const { path, lang } of published) {
    const html = await (await fetch(base + path)).text();
    for (const [tag, href] of html.matchAll(/<a [^>]*href="(\/[^"#?]*)[^>]*>/g)) {
      if (href.startsWith('/assets/')) continue;
      if (!known.has(href)) broken.add(`${path} → ${href}`);
      // Only the language switch and the "Dutch version" link on English legal pages may cross languages.
      const crosses = (href.startsWith('/en/') ? 'en' : 'nl') !== lang;
      if (crosses && !/hreflang=/.test(tag)) broken.add(`${path} → ${href} (other language)`);
    }
  }
  assert.equal(broken.size, 0, [...broken].slice(0, 10).join(', '));
});

await test('pages in both languages point to each other with hreflang', async () => {
  const bySlug = Map.groupBy(published, (p) => p.slug);
  for (const [slug, versions] of bySlug) {
    if (versions.length < 2) continue;
    for (const v of versions) {
      const html = await (await fetch(base + v.path)).text();
      assert.match(html, new RegExp(`<html lang="${v.lang}">`), `${v.path}: html lang`);
      for (const w of versions) assert.ok(html.includes(`hreflang="${w.lang}" href="${config.siteUrl}${w.path}"`), `${v.path}: hreflang ${w.lang}`);
      assert.ok(html.includes(`hreflang="x-default" href="${config.siteUrl}${slug}"`), `${v.path}: x-default`);
    }
  }
});

await test('English pages exist for every Dutch page', async () => {
  const nl = published.filter((p) => p.lang === 'nl').map((p) => p.slug);
  const en = new Set(published.filter((p) => p.lang === 'en').map((p) => p.slug));
  assert.deepEqual(nl.filter((s) => !en.has(s)), []);
});

await test('demo mode keeps crawlers out', async () => {
  if (!config.demo) return;
  assert.match(await (await fetch(base + '/robots.txt')).text(), /Disallow: \/\n/);
  assert.match(await (await fetch(base + '/')).text(), /<meta name="robots" content="noindex, nofollow">/);
});

await test('unknown page returns 404, no trailing slash redirects', async () => {
  assert.equal((await fetch(base + '/bestaat-niet/')).status, 404);
  const en404 = await fetch(base + '/en/does-not-exist/');
  assert.equal(en404.status, 404);
  assert.match(await en404.text(), /Page not found/);
  const r = await fetch(base + '/contact', { redirect: 'manual' });
  assert.equal(r.status, 301);
  assert.equal(r.headers.get('location'), '/contact/');
  assert.equal((await fetch(base + '/../config.js')).status, 404);
});

const valid = {
  form_type: 'verkoop', page: '/vastgoed-verkopen/', postcode: '1234 ab', house_number: '12', property_type: 'woning',
  situation: 'geerfd', timeline: '3m', name: 'Test Persoon', email: 'Test@Example.nl', phone: '06 12345678',
  consent_privacy: true, consent_marketing: false, utm_source: 'google', landing_page: '/vastgoed-verkopen/',
};

await test('valid inquiry is stored with normalised phone and postcode', async () => {
  const r = await post(valid);
  assert.equal(r.status, 201);
  const body = await r.json();
  assert.ok(body.ok && body.id > 0);
  const csv = await (await fetch(base + '/admin/inquiries.csv', { headers: auth })).text();
  assert.match(csv, /\+31612345678/);
  assert.match(csv, /1234AB/);
  assert.match(csv, /test@example\.nl/);
});

await test('every form type accepts a minimal valid submission', async () => {
  for (const [key, form] of Object.entries(FORMS)) {
    const input = { form_type: key, page: '/contact/', name: 'Test Persoon', email: 't@example.nl', phone: '0612345678', consent_privacy: true };
    for (const fd of form.fields) {
      if (!fd.required) continue;
      input[fd.name] = fd.type === 'select' ? fd.options[0][0] : fd.type === 'postcode' ? '1234AB' : fd.type === 'number' ? '3' : 'Test tekst';
    }
    const r = await post(input);
    assert.equal(r.status, 201, `${key}: ${JSON.stringify((await r.json()).errors)}`);
  }
});

await test('missing consent, bad email and bad postcode are rejected', async () => {
  const r = await post({ ...valid, consent_privacy: false, email: 'nope', postcode: '0123 AB' });
  assert.equal(r.status, 422);
  const { errors } = await r.json();
  assert.ok(errors.consent_privacy && errors.email && errors.postcode);
});

await test('English submissions get English messages, and accept a UK phone number', async () => {
  const r = await post({ ...valid, lang: 'en', email: 'nope', phone: '+44 7700 900123' });
  assert.equal(r.status, 422);
  const { errors } = await r.json();
  assert.equal(errors.email, 'Please enter a valid email address.');
  assert.equal(errors.phone, undefined);
  const ok = await post({ ...valid, lang: 'en', phone: '+44 7700 900123', email: 'uk@example.co.uk' });
  assert.equal(ok.status, 201);
  const csv = await (await fetch(base + '/admin/inquiries.csv', { headers: auth })).text();
  assert.match(csv, /"uk@example\.co\.uk"/);
  assert.match(csv, /"en"/);
});

await test('every consent box is logged with the exact text shown, ticked or not', async () => {
  const lead_id = randomUUID();
  const r = await post({ ...valid, lead_id, consent_phone: true, consent_whatsapp: false, consent_marketing: true });
  assert.equal(r.status, 201);
  const rows = await server.db.consents(lead_id);
  assert.equal(rows.length, CONSENTS.length);
  const by = Object.fromEntries(rows.map((c) => [c.channel + ':' + c.purpose, c]));
  assert.equal(by['any:request'].granted, true);
  assert.equal(by['phone:request'].granted, true);
  assert.equal(by['whatsapp:request'].granted, false);
  assert.equal(by['email:marketing'].granted, true);
  assert.equal(by['phone:request'].text, CONSENTS[1].nl);
  assert.equal(by['phone:request'].text_version, textVersion(CONSENTS[1].nl));
  assert.equal(by['any:request'].text, `Ik ga akkoord met de verwerking van mijn gegevens volgens de privacyverklaring, zodat ${config.brand} contact met mij kan opnemen over deze aanvraag.`);
});

await test('the same lead_id twice (double click) stores one inquiry and one CRM event', async () => {
  const lead_id = randomUUID();
  const first = await (await post({ ...valid, lead_id })).json();
  const again = await post({ ...valid, lead_id });
  assert.equal(again.status, 200);
  const second = await again.json();
  assert.equal(second.duplicate, true);
  assert.equal(second.id, first.id);
  await waitFor(() => crmReceived.some((x) => x.json.lead_id === lead_id));
  await new Promise((r) => setTimeout(r, 300));
  assert.equal(crmReceived.filter((x) => x.json.lead_id === lead_id).length, 1);
});

await test('asking to be called or WhatsApped requires a phone number', async () => {
  const r = await post({ form_type: 'contact', page: '/contact/', subject: 'anders', message: 'Vraag', name: 'Test Persoon', email: 't@example.nl', consent_privacy: true, consent_whatsapp: true });
  assert.equal(r.status, 422);
  assert.ok((await r.json()).errors.phone);
});

await test('leads are tagged with a seller avatar (buyers get none)', async () => {
  const geerfd = await (await post({ ...valid, lead_id: randomUUID(), situation: 'geerfd' })).json();
  const klus = await (await post({ ...valid, lead_id: randomUUID(), situation: 'onderhoud' })).json();
  const campaign = await (await post({ ...valid, lead_id: randomUUID(), situation: 'verhuizen', utm_campaign: 'WI_G_fatigued_investor_verhuurd' })).json();
  const buyer = await (await post({ form_type: 'investeerder', page: '/beleggingspand-kopen/', investor_type: 'bv', budget: 'lt500k', asset_pref: 'woningen', name: 'Koper', email: 'k@example.nl', phone: '0612345678', consent_privacy: true, lead_id: randomUUID() })).json();
  const rows = await server.db.list({ limit: 50 });
  const avatar = (id) => rows.find((r) => r.id === id).avatar;
  assert.equal(avatar(geerfd.id), 'distressed_urgent');
  assert.equal(avatar(klus.id), 'klushuis_low_label');
  assert.equal(avatar(campaign.id), 'fatigued_investor');
  assert.equal(avatar(buyer.id), null);
});

await test('each lead reaches the CRM as a signed lead.created event matching the contract', async () => {
  const lead_id = randomUUID();
  const r = await (await post({ ...valid, lead_id, gclid: 'test-gclid', fbp: 'fb.1.1.2', consent_phone: true })).json();
  const got = await waitFor(() => crmReceived.find((x) => x.json.lead_id === lead_id));
  const h = got.headers;
  assert.equal(h.authorization, 'Bearer test-token');
  assert.equal(h['idempotency-key'], r.event_id);
  assert.equal(h['x-windmill-signature'], `sha256=${signature('test-secret', h['x-windmill-timestamp'], got.body)}`);
  const e = got.json;
  assert.equal(e.event_name, 'lead.created');
  assert.equal(e.schema_version, 1);
  assert.equal(e.event_id, r.event_id);
  assert.equal(e.form_type, 'verkoop');
  assert.equal(e.person.phone, '+31612345678');
  assert.equal(e.property.postcode, '1234AB');
  assert.equal(e.answers.situation, 'geerfd');
  assert.equal(e.attribution.gclid, 'test-gclid');
  assert.equal(e.attribution.fbp, 'fb.1.1.2');
  assert.equal(e.consents.find((c) => c.channel === 'phone').granted, true);
  const rows = await server.db.list({ limit: 50 });
  await waitFor(async () => (await server.db.list({ limit: 50 })).find((x) => x.lead_id === lead_id)?.crm_status === 'sent');
  assert.ok(rows.length);
});

await test('a lead the CRM rejects is kept and marked failed, not lost', async () => {
  crmMode = 'reject';
  const lead_id = randomUUID();
  await post({ ...valid, lead_id });
  const row = await waitFor(async () => {
    const found = (await server.db.list({ limit: 80 })).find((x) => x.lead_id === lead_id);
    return found?.crm_status === 'failed' && found;
  });
  crmMode = 'ok';
  assert.equal(row.email, 'test@example.nl');
  const html = await (await fetch(base + '/admin', { headers: auth })).text();
  assert.match(html, /mislukt/);
});

await test('the 7 ad landing pages load in Dutch and English, are noindex, and stay out of the sitemap', async () => {
  const funnels = JSON.parse(readFileSync(new URL('../dist/funnels.json', import.meta.url), 'utf8'));
  assert.equal(funnels.length, 7);
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  // One link per page: Dutch by default, English on the same URL with ?lang=en.
  for (const path of funnels.flatMap((s) => [s, s + '?lang=en'])) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, path);
    const html = await res.text();
    const en = path.endsWith('?lang=en');
    const slug = path.replace('?lang=en', '');
    assert.match(html, new RegExp(`<html lang="${en ? 'en' : 'nl'}"`), `${path}: language`);
    assert.match(html, /<meta name="robots" content="noindex/, `${path}: noindex`);
    assert.match(html, /data-steps/, `${path}: multi-step form`);
    assert.match(html, /hreflang="nl"[^>]*>[\s\S]*hreflang="en"/, `${path}: hreflang`);
    const other = html.match(/class="lang-switch" href="([^"]+)"/)[1];
    assert.equal(other, en ? slug : slug + '?lang=en', `${path}: language switch stays on the same link`);
    assert.ok(!sitemap.includes(slug), `${slug} in sitemap`);
    // English pages have no Dutch form text, and keep the Dutch slug as the page ID.
    if (en) {
      assert.ok(!/Volgende|Voorstel aanvragen|Uw gegevens|Wie woont er nu/.test(html), `${path}: Dutch form text`);
      assert.match(html, /name="page" value="\/[a-z-]+\/"/, `${path}: page id`);
      assert.match(html, /name="lang" value="en"/, `${path}: lang field`);
    }
    // With all promise switches off (the default), no promise may appear.
    const promises = en ? /24 hours|an advance|keep renting|pay the notary|take over hidden defects/i : /24 uur|voorschot|blijven huren|notariskosten betalen wij|verborgen gebreken nemen wij over/i;
    assert.ok(!promises.test(html), `${path}: promise shown while switched off`);
  }
});

await test('an English landing-page lead is stored with the Dutch page id and lang en', async () => {
  const lead_id = randomUUID();
  const r = await post({
    form_type: 'funnel_asis', page: '/energielabel/', lang: 'en', lead_id, postcode: '1012JS', house_number: '1', property_type: 'woning', occupancy: 'leeg',
    energy_label: 'F', situation: 'opknappen', roof: 'matig', kitchen: 'slecht', bathroom: 'goed', installations: 'weet_niet', mortgage: 'nee', timeline: '3m',
    name: 'Test Person', email: 'funnel-en@example.com', phone: '+44 7700 900123', consent_privacy: true,
  });
  assert.equal(r.status, 201, JSON.stringify(await r.clone().json()));
  const row = (await server.db.list({ limit: 80 })).find((x) => x.lead_id === lead_id);
  assert.equal(row.lang, 'en');
  assert.equal(row.page, '/energielabel/');
  assert.equal(row.avatar, 'klushuis_low_label');
});

await test('switched-on promises appear with their conditions', async () => {
  const on = { ...config, promises: { offer24h: true, asIs: true, cashAdvance: true, rentBack: true, transferDate: true, notaryCosts: true } };
  const urgent = funnelPages(on).find((f) => f.slug === '/snel-verkopen/');
  assert.ok(urgent.heroPoints.includes('Binnen 24 uur een bindend bod'));
  assert.ok(urgent.heroPoints.some((p) => p.includes(`${config.rentBackYears} jaar blijven huren`)));
  assert.ok(urgent.notes.some((n) => /eigendom .*gecontroleerd .*alle eigenaren/.test(n)), 'condition of the 24-hour offer');
  assert.ok(urgent.notes.some((n) => /derdengeldrekening/.test(n)), 'condition of the cash advance');
  const portfolio = funnelPages(on).find((f) => f.slug === '/portefeuille/');
  assert.ok(!portfolio.heroPoints.includes('Binnen 24 uur een bindend bod'), 'portfolio sellers get a specialist, not a 24-hour promise');
  const urgentEn = funnelPages(on, 'en').find((f) => f.slug === '/snel-verkopen/');
  assert.equal(urgentEn.path, '/snel-verkopen/?lang=en');
  assert.ok(urgentEn.heroPoints.includes('A binding offer within 24 hours'));
  assert.equal(urgentEn.notes.length, urgent.notes.length, 'every English promise has its condition');
});

await test('a funnel lead is stored with its avatar; promise questions are ignored while switched off', async () => {
  const lead_id = randomUUID();
  const r = await post({
    form_type: 'funnel_urgent', page: '/scheiding/', lead_id, postcode: '1012JS', house_number: '1', property_type: 'woning', occupancy: 'bewoond',
    situation: 'scheiding', owners_agree: 'ja', timeline: 'direct', cash_advance: 'ja', rent_back: 'ja', condition: 'matig', mortgage: 'onderwater',
    name: 'Test Persoon', email: 'funnel@example.nl', phone: '0612345678', consent_privacy: true, consent_phone: true,
  });
  assert.equal(r.status, 201, JSON.stringify(await r.clone().json()));
  const row = (await server.db.list({ limit: 80 })).find((x) => x.lead_id === lead_id);
  assert.equal(row.avatar, 'distressed_urgent');
  assert.equal(row.page, '/scheiding/');
  assert.equal(row.data.owners_agree, 'ja');
  assert.equal(row.data.mortgage, 'onderwater');
  assert.equal(row.data.cash_advance, undefined);
  assert.equal(row.data.rent_back, undefined);
});

await test('the seller funnels ask the questions in the Engine blueprint order', async () => {
  const order = ['postcode', 'property_type', 'situation', 'timeline', 'mortgage'];
  for (const key of ['funnel_urgent', 'funnel_asis']) {
    const stepOf = (name) => FORMS[key].fields.find((fd) => fd.name === name).step;
    assert.deepEqual(order.map(stepOf), [1, 2, 3, 4, 5], key);
    assert.equal(FORMS[key].steps.at(-1), 'Uw gegevens', `${key}: contact details last`);
  }
});

// A tiny real JPEG (1×1 pixel), as the browser sends it after making the photo smaller.
const JPEG = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';

await test('photos are stored with the lead, sent to the CRM as links, and only real images are accepted', async () => {
  const base_ = {
    form_type: 'funnel_asis', page: '/verkopen-zoals-het-is/', postcode: '1012JS', house_number: '1', property_type: 'woning', occupancy: 'leeg', energy_label: 'G',
    situation: 'opknappen', timeline: 'direct', roof: 'slecht', kitchen: 'slecht', bathroom: 'matig', installations: 'slecht', mortgage: 'nee',
    name: 'Foto Test', email: 'foto@example.nl', phone: '0612345678', consent_privacy: true,
  };
  const fake = await post({ ...base_, lead_id: randomUUID(), photos: [Buffer.from('<script>alert(1)</script>').toString('base64')] });
  assert.equal(fake.status, 422, 'a non-image is refused');
  assert.ok((await fake.json()).errors.photos);
  assert.equal((await post({ ...base_, lead_id: randomUUID(), photos: Array(6).fill(JPEG) })).status, 422, 'more than 5 photos');

  const lead_id = randomUUID();
  crmReceived.length = 0;
  const r = await post({ ...base_, lead_id, photos: [JPEG, 'data:image/jpeg;base64,' + JPEG] });
  assert.equal(r.status, 201, JSON.stringify(await r.clone().json()));
  const row = (await server.db.list({ limit: 80 })).find((x) => x.lead_id === lead_id);
  assert.equal(row.photo_ids.length, 2);
  assert.equal(row.data.photos, undefined, 'photos are not mixed into the answers');

  const event = (await waitFor(() => crmReceived.find((x) => x.json.lead_id === lead_id))).json;
  assert.equal(event.photos.length, 2);
  assert.equal(event.photos[0].content_type, 'image/jpeg');
  const photoPath = new URL(event.photos[0].url).pathname;
  assert.equal((await fetch(base + photoPath)).status, 401, 'photos need the CRM token');
  const img = await fetch(base + photoPath, { headers: { authorization: 'Bearer test-token' } });
  assert.equal(img.headers.get('content-type'), 'image/jpeg');
  const adminImg = await fetch(base + `/admin/photos/${row.photo_ids[0]}`, { headers: auth });
  assert.equal(adminImg.status, 200);
  assert.deepEqual(Buffer.from(await adminImg.arrayBuffer()), Buffer.from(JPEG, 'base64'));
  assert.equal((await fetch(base + `/admin/photos/${row.photo_ids[0]}`)).status, 401);
});

await test('partial save: steps are saved with consent, without contact details, and closed when the form is sent', async () => {
  const lead_id = randomUUID();
  const draft = (body) => fetch(base + '/api/draft', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const step1 = { form_type: 'funnel_urgent', page: '/erfenis/', lang: 'nl', lead_id, step: 1, consent: true, postcode: '1012 js', house_number: '1', name: 'Geheim', email: 'x@example.nl', utm_campaign: 'WI_G_distressed_urgent_erfenis' };
  assert.equal((await draft({ ...step1, consent: false })).status, 400, 'no consent, no save');
  assert.equal((await draft({ ...step1, step: 6 })).status, 400, 'the contact step is never saved');
  assert.equal((await draft(step1)).status, 204);
  assert.equal((await draft({ ...step1, step: 2, property_type: 'woning', occupancy: 'leeg', situation: 'geerfd' })).status, 204);

  let { recent } = await server.db.drafts.unfinished(50);
  let d = recent.find((x) => x.lead_id === lead_id);
  assert.equal(d.step, 2);
  assert.equal(d.data.postcode, '1012JS');
  assert.equal(d.data.property_type, 'woning');
  assert.equal(d.data.situation, undefined, 'answers of later steps are not taken');
  assert.equal(d.data.name, undefined);
  assert.equal(d.data.email, undefined);
  assert.equal(d.attribution.utm_campaign, 'WI_G_distressed_urgent_erfenis');
  assert.match(await (await fetch(base + '/admin', { headers: auth })).text(), /Onafgemaakte formulieren/);

  const r = await post({
    form_type: 'funnel_urgent', page: '/erfenis/', lead_id, postcode: '1012JS', house_number: '1', property_type: 'woning', occupancy: 'leeg',
    situation: 'geerfd', owners_agree: 'ja', timeline: '3m', condition: 'goed', mortgage: 'nee',
    name: 'Erf Genaam', email: 'erf@example.nl', phone: '0612345678', consent_privacy: true,
  });
  assert.equal(r.status, 201);
  ({ recent } = await server.db.drafts.unfinished(50));
  assert.ok(!recent.some((x) => x.lead_id === lead_id), 'a finished form is no longer unfinished');
});

await test('address lookup: the API lists BAG matches and leads get the chosen BAG address', async () => {
  const many = await (await fetch(base + '/api/address?postcode=1012%20js&number=5')).json();
  assert.deepEqual(many.matches.map((m) => m.label), ['Dam 5B, 1012JS Amsterdam', 'Dam 5C, 1012JS Amsterdam']);
  assert.equal((await (await fetch(base + '/api/address?postcode=9999ZZ&number=1')).json()).matches.length, 0);

  const chosen = randomUUID();
  await post({ ...valid, lead_id: chosen, postcode: '1012JS', house_number: '5', address_id: many.matches[1].id });
  const single = randomUUID();
  await post({ ...valid, lead_id: single, postcode: '1012JS', house_number: '1' });
  const unknown = randomUUID();
  const ok = await post({ ...valid, lead_id: unknown, postcode: '9999ZZ', house_number: '1' });
  assert.equal(ok.status, 201, 'an address not in the BAG must not block the lead');
  const rows = await server.db.list({ limit: 100 });
  const data = (id) => rows.find((x) => x.lead_id === id).data;
  assert.equal(data(chosen).house_letter, 'C');
  assert.equal(data(chosen).bag_vbo_id, '0363010012110094');
  assert.equal(data(single).street, 'Dam');
  assert.equal(data(single).city, 'Amsterdam');
  assert.equal(data(unknown).bag_vbo_id, undefined);
  const sent = await waitFor(() => crmReceived.find((x) => x.json.lead_id === chosen));
  assert.equal(sent.json.property.bag_vbo_id, '0363010012110094');
  assert.equal(sent.json.property.street, 'Dam');
});

await test('honeypot pretends success without storing', async () => {
  const before = (await (await fetch(base + '/admin/inquiries.csv', { headers: auth })).text()).split('\r\n').length;
  const r = await post({ ...valid, website: 'http://spam' });
  assert.equal(r.status, 200);
  const after = (await (await fetch(base + '/admin/inquiries.csv', { headers: auth })).text()).split('\r\n').length;
  assert.equal(after, before);
});

await test('cross-site posts are refused', async () => {
  assert.equal((await post(valid, { origin: 'https://evil.example' })).status, 403);
});

await test('admin requires login', async () => {
  assert.equal((await fetch(base + '/admin')).status, 401);
  assert.equal((await fetch(base + '/admin', { headers: auth })).status, 200);
});

await test('rate limit kicks in', async () => {
  let last;
  for (let i = 0; i < 85; i++) last = await post(valid);
  assert.equal(last.status, 429);
});

server.close();
fakeCrm.close();
console.log(results.join('\n'));
const failed = results.filter((r) => r.startsWith('FAIL')).length;
console.log(failed ? `\n${failed} test(s) failed.` : `\nAll ${results.length} tests passed.`);
process.exit(failed ? 1 : 0);
