// Serves the built site from dist/ and receives the lead forms.
// Run `node build.js` first (npm start does both).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { timingSafeEqual } from 'node:crypto';
import { config } from './config.js';
import { DRAFT_DAYS, openDb } from './lib/db.js';
import { MEMORY_STORAGE, openMemoryDb } from './lib/memory-db.js';
import { startForwarder } from './lib/forwarder.js';
import { ATTRIBUTION, FORMS, validateDraft, validateInquiry } from './lib/forms.js';
import { SLUGS } from './lib/pages.js';
import { esc } from './lib/render.js';
import { createAddressLookup } from './lib/bag.js';
import { FUNNEL_SLUGS } from './lib/funnels.js';

// Adds the BAG address to an inquiry with a postcode and house number: the visitor's choice (address_id)
// when it is one of the matches, else the only match. Looked up again on the server, never trusted from the
// browser; when nothing matches, the address stays as typed.
async function withBagAddress(record, addressId, lookup) {
  const d = record.data;
  if (!d.postcode || !d.house_number) return record;
  const matches = await lookup(d.postcode, d.house_number);
  const pick = matches.find((m) => m.id === addressId) || (matches.length === 1 ? matches[0] : null);
  if (pick) {
    Object.assign(d, {
      street: pick.street, house_letter: pick.house_letter || undefined, house_addition: pick.house_addition || undefined,
      city: d.city || pick.city, bag_vbo_id: pick.bag_vbo_id, bag_nummeraanduiding_id: pick.bag_nummeraanduiding_id,
    });
    for (const k of ['house_letter', 'house_addition']) if (d[k] === undefined) delete d[k];
  }
  return record;
}

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const DIST = resolve(ROOT, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2',
};

const SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
};

function send(res, status, body, type = 'text/html; charset=utf-8', headers = {}) {
  res.writeHead(status, { 'content-type': type, ...SECURITY_HEADERS, ...headers });
  res.end(body);
}
const sendJson = (res, status, obj) => send(res, status, JSON.stringify(obj), 'application/json; charset=utf-8', { 'cache-control': 'no-store' });

const isFile = (f) => stat(f).then((s) => s.isFile(), () => false);

// Clean URLs: /werkwijze/ → dist/werkwijze/index.html; /werkwijze → 301 to /werkwijze/.
async function serveStatic(req, res, url) {
  let rel;
  try { rel = normalize(decodeURIComponent(url.pathname)); } catch { return send(res, 400, 'Bad request', 'text/plain'); }
  const target = resolve(DIST, '.' + sep + rel);
  if (target !== DIST && !target.startsWith(DIST + sep)) return send(res, 403, 'Forbidden', 'text/plain');

  let file = url.pathname.endsWith('/') ? join(target, 'index.html') : target;
  // Ad landing pages keep one URL in both languages: ?lang=en serves the English copy (lib/funnels.js).
  if (url.pathname.endsWith('/') && url.searchParams.get('lang') === 'en' && (await isFile(join(target, 'index.en.html')))) file = join(target, 'index.en.html');
  if (!(await isFile(file))) {
    if (!extname(url.pathname) && (await isFile(join(target, 'index.html')))) {
      return send(res, 301, '', 'text/plain', { location: url.pathname + '/' + url.search });
    }
    const page404 = url.pathname.startsWith('/en/') ? join(DIST, 'en', '404.html') : join(DIST, '404.html');
    const notFound = await readFile(page404).catch(() => readFile(join(DIST, '404.html'))).catch(() => 'Pagina niet gevonden');
    return send(res, 404, notFound);
  }
  const type = MIME[extname(file)] || 'application/octet-stream';
  // Asset URLs carry a content hash (?v=…), so they can be cached for a long time.
  const cache = url.pathname.startsWith('/assets/') && url.searchParams.has('v')
    ? 'public, max-age=31536000, immutable'
    : extname(file) === '.html' ? 'no-cache' : 'public, max-age=3600';
  const extra = { 'cache-control': cache };
  if (config.demo && extname(file) === '.html') extra['x-robots-tag'] = 'noindex, nofollow';
  send(res, 200, req.method === 'HEAD' ? '' : await readFile(file), type, extra);
}

// Simple in-memory limiter: by default 8 form submissions per IP per 10 minutes.
function rateLimiter(max) {
  const hits = new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [ip, times] of hits) if (times.every((t) => now - t >= 600_000)) hits.delete(ip);
  }, 600_000).unref();
  return (ip) => {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < 600_000);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > max;
  };
}

function readBody(req, limit = 20_000) {
  return new Promise((resolveBody, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) {
        reject(Object.assign(new Error('too large'), { status: 413 }));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// Compares secrets in constant time.
const sameSecret = (a, b) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

function authorised(req) {
  const h = req.headers.authorization || '';
  if (!h.startsWith('Basic ')) return false;
  const [user, ...rest] = Buffer.from(h.slice(6), 'base64').toString().split(':');
  const pass = rest.join(':');
  return sameSecret(user, config.adminUser) && sameSecret(pass, config.adminPassword);
}

// Only accept posts from this site's own pages.
const sameOrigin = (req) => {
  const origin = req.headers.origin;
  try { return !origin || new URL(origin).host === req.headers.host; } catch { return false; }
};

function sendPhoto(res, photo) {
  if (!photo) return send(res, 404, 'Not found', 'text/plain');
  send(res, 200, photo.bytes, photo.content_type, { 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex', 'content-security-policy': "default-src 'none'" });
}

const csvCell = (v) => {
  let s = String(v ?? '');
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // stop spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
};

const ADMIN_PAGE_SIZE = 200;

const AVATAR_LABELS = { distressed_urgent: 'Urgent / zorgvuldig', klushuis_low_label: 'Klushuis / laag label', fatigued_investor: 'Verhuurder / belegger' };
const CRM_LABELS = { sent: 'In CRM', pending: 'Wacht op CRM', failed: 'Mislukt' };

// Unfinished landing-page forms: where visitors stopped, and the newest ones (no contact details exist).
function unfinishedSection({ perStep, recent }) {
  if (!recent.length) return '';
  const stepName = (s) => FORMS[s.form_type]?.steps?.[s.step - 1];
  const counts = perStep.map((s) => `${esc(s.form_type)}, gestopt na stap ${s.step}${stepName(s) ? ` (${esc(stepName(s))})` : ''}: ${s.n}`).join('<br>');
  const tr = recent.map((d) => `<tr><td>${esc(d.updated_at.slice(0, 16).replace('T', ' '))}</td><td>${esc(d.form_type)} · stap ${d.step} · ${d.lang === 'en' ? 'English' : 'Nederlands'}</td>
<td>${Object.entries(d.data).map(([k, v]) => `<b>${esc(k)}</b>: ${esc(v)}`).join('<br>')}</td><td>${esc(d.page || '')}<br><small>${esc([d.attribution.utm_source, d.attribution.utm_campaign].filter(Boolean).join(' / ') || 'direct')}</small></td></tr>`).join('');
  return `<details><summary><b>Onafgemaakte formulieren (laatste ${DRAFT_DAYS} dagen)</b></summary><p>Bezoekers die na een stap zijn gestopt, met toestemming bewaard. Er zijn geen contactgegevens: gebruik dit om te zien waar mensen afhaken.</p><p>${counts}</p>
<div class="wrap"><table><thead><tr><th>Laatst</th><th>Formulier</th><th>Antwoorden</th><th>Pagina / bron</th></tr></thead><tbody>${tr}</tbody></table></div></details>`;
}

function adminPage(rows, total, beforeId, outbox, unfinished) {
  const tr = rows.map((r) => {
    const photos = r.photo_ids.length ? `<br>${r.photo_ids.map((id) => `<a href="/admin/photos/${id}" target="_blank" rel="noopener"><img src="/admin/photos/${id}" alt="Foto" width="72" height="54" loading="lazy" style="object-fit:cover;margin:4px 4px 0 0"></a>`).join('')}` : '';
    const data = Object.entries(r.data).map(([k, v]) => `<b>${esc(k)}</b>: ${esc(v)}`).join('<br>') + photos;
    const source = [r.utm_source, r.utm_medium, r.utm_campaign].filter(Boolean).join(' / ') || (r.referrer ? esc(r.referrer) : 'direct');
    const allowed = [r.consent_phone && 'bellen', r.consent_whatsapp && 'WhatsApp', r.consent_marketing && 'nieuwsbrief'].filter(Boolean).join(', ') || 'alleen over aanvraag';
    return `<tr><td>${r.id}</td><td>${esc(r.created_at.slice(0, 16).replace('T', ' '))}</td><td>${esc(FORMS[r.form_type]?.title || r.form_type)}<br><small>${r.lang === 'en' ? 'English' : 'Nederlands'} · ${esc(AVATAR_LABELS[r.avatar] || 'type onbekend')}</small></td>
<td>${esc(r.name)}<br><a href="mailto:${esc(r.email)}">${esc(r.email)}</a><br>${r.phone ? `<a href="tel:${esc(r.phone)}">${esc(r.phone)}</a>` : ''}</td>
<td>${data}</td><td>${esc(r.page || '')}<br><small>${esc(source)}</small></td><td>${esc(allowed)}</td><td>${esc(CRM_LABELS[r.crm_status] || '–')}</td></tr>`;
  }).join('');
  const backlog = (outbox.pending || 0) + (outbox.failed || 0);
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Aanvragen – ${esc(config.brand)}</title>
<style>body{font:15px/1.5 system-ui,sans-serif;margin:0;padding:24px 16px;background:#f5f6f2;color:#16231f}h1{margin:0 0 12px}table{border-collapse:collapse;width:100%;background:#fff}
th,td{border:1px solid #d4dcd6;padding:8px;text-align:left;vertical-align:top}th{background:#edf1ec}.wrap{overflow-x:auto}a{color:#0f5c53}</style></head>
<body><h1>Aanvragen (${total.toLocaleString('nl-NL')})</h1><p><a href="/admin/inquiries.csv">Download alles als CSV</a>${beforeId ? ' · <a href="/admin">Nieuwste</a>' : ''}</p>
${unfinishedSection(unfinished)}
${backlog ? `<p><b>CRM:</b> ${outbox.pending || 0} wachten op verzending, ${outbox.failed || 0} mislukt.${config.crmLeadUrl ? '' : ' De koppeling met Windmill CRM is nog niet ingesteld (CRM_LEAD_API_URL); aanvragen blijven hier bewaard tot die er is.'}</p>` : ''}
<div class="wrap"><table><thead><tr><th>#</th><th>Datum</th><th>Formulier</th><th>Contact</th><th>Gegevens</th><th>Pagina / bron</th><th>Contact toegestaan</th><th>CRM</th></tr></thead>
<tbody>${tr || '<tr><td colspan="8">Nog geen aanvragen.</td></tr>'}</tbody></table></div>
${rows.length === ADMIN_PAGE_SIZE ? `<p><a href="/admin?before=${rows.at(-1).id}">Oudere aanvragen →</a></p>` : ''}</body></html>`;
}

// Streams every inquiry as CSV in batches, waiting when the connection is slow, so memory stays flat
// whether there are a hundred inquiries or millions.
async function streamCsv(res, db) {
  const fields = [...new Set(Object.values(FORMS).flatMap((f) => f.fields.filter((fd) => fd.type !== 'photos').map((fd) => fd.name)))];
  const cols = ['id', 'lead_id', 'created_at', 'form_type', 'avatar', 'lang', 'page', 'name', 'email', 'phone', ...fields, 'photo_ids', 'consent_privacy_at', 'consent_version', 'consent_phone', 'consent_whatsapp', 'consent_marketing', ...ATTRIBUTION, 'landing_page', 'referrer', 'status', 'crm_status'];
  res.writeHead(200, { 'content-type': 'text/csv; charset=utf-8', ...SECURITY_HEADERS, 'cache-control': 'no-store', 'x-robots-tag': 'noindex', 'content-disposition': 'attachment; filename="aanvragen.csv"' });
  const write = (s) => (res.write(s) ? null : new Promise((ok) => res.once('drain', ok)));
  await write('﻿' + cols.join(','));
  let chunk = '';
  for await (const r of db.all()) {
    if (res.destroyed) return; // the download was cancelled
    const row = { ...r.data, ...r };
    chunk += '\r\n' + cols.map((c) => csvCell(row[c])).join(',');
    if (chunk.length > 64_000) { await write(chunk); chunk = ''; }
  }
  if (chunk) await write(chunk);
  res.end('\r\n');
}

export async function createApp({ dbPath = config.databaseUrl || (config.storage === 'memory' ? MEMORY_STORAGE : config.dataDir), maxSubmissions = 8, crm = {}, addressLookup = createAddressLookup() } = {}) {
  const db = dbPath === MEMORY_STORAGE ? openMemoryDb() : await openDb(dbPath);
  const rateLimited = rateLimiter(maxSubmissions);
  const lookupLimited = rateLimiter(60);
  const draftLimited = rateLimiter(60);
  // Unfinished forms are kept for DRAFT_DAYS days only.
  const pruneDrafts = () => db.drafts.prune().catch((err) => console.error(`Could not remove old drafts: ${err.message}`));
  pruneDrafts();
  const pruneTimer = setInterval(pruneDrafts, 6 * 3600_000);
  pruneTimer.unref();
  const forwarder = startForwarder(db, { url: config.crmLeadUrl, token: config.crmApiToken, secret: config.crmSigningSecret, ...crm });
  const crmToken = crm.token ?? config.crmApiToken; // the CRM also uses it to download lead photos
  const slugs = new Set([...SLUGS, ...FUNNEL_SLUGS]);
  const clientIp = (req) => {
    const forwarded = req.headers['cf-connecting-ip'] || String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    return (config.trustProxy && forwarded) || req.socket.remoteAddress || 'unknown';
  };

  async function handle(req, res) {
    const url = new URL(req.url, 'http://x');
    const path = url.pathname;

    if (req.method === 'GET' && path === '/healthz') return sendJson(res, 200, { ok: true });

    if (path === '/admin' || path.startsWith('/admin/')) {
      if (!authorised(req)) return send(res, 401, 'Login required', 'text/plain', { 'www-authenticate': 'Basic realm="Admin", charset="UTF-8"' });
      const noStore = { 'cache-control': 'no-store', 'x-robots-tag': 'noindex' };
      if (req.method === 'GET' && (path === '/admin' || path === '/admin/')) {
        const beforeId = Number(url.searchParams.get('before')) || null;
        const [rows, total, outbox, unfinished] = await Promise.all([db.list({ limit: ADMIN_PAGE_SIZE, beforeId }), db.count(), db.outbox.stats(), db.drafts.unfinished()]);
        return send(res, 200, adminPage(rows, total, beforeId, outbox, unfinished), 'text/html; charset=utf-8', noStore);
      }
      if (req.method === 'GET' && path === '/admin/inquiries.csv') return streamCsv(res, db);
      const adminPhoto = path.match(/^\/admin\/photos\/(\d{1,15})$/);
      if (req.method === 'GET' && adminPhoto) return sendPhoto(res, await db.photo(Number(adminPhoto[1])));
      return send(res, 404, 'Not found', 'text/plain');
    }

    // Address lookup for the forms: postcode + house number → BAG address(es).
    if (path === '/api/address') {
      if (req.method !== 'GET') return sendJson(res, 405, { ok: false });
      if (lookupLimited(clientIp(req))) return sendJson(res, 429, { ok: false });
      const matches = await addressLookup(url.searchParams.get('postcode'), url.searchParams.get('number'));
      return sendJson(res, 200, { ok: true, matches: matches.map(({ id, label, street, house_number, house_letter, house_addition, city }) => ({ id, label, street, house_number, house_letter, house_addition, city })) });
    }

    // Photos for Windmill CRM: the lead.created event links here; the CRM fetches with its API token.
    const photoMatch = path.match(/^\/api\/photos\/(\d{1,15})$/);
    if (photoMatch) {
      if (req.method !== 'GET') return sendJson(res, 405, { ok: false });
      if (!crmToken || !sameSecret(req.headers.authorization || '', `Bearer ${crmToken}`)) return sendJson(res, 401, { ok: false });
      return sendPhoto(res, await db.photo(Number(photoMatch[1])));
    }

    // Partial save of a multi-step form after each step (only with the visitor's consent; no contact details).
    if (path === '/api/draft') {
      if (req.method !== 'POST') return sendJson(res, 405, { ok: false });
      if (!sameOrigin(req)) return sendJson(res, 403, { ok: false });
      if (draftLimited(clientIp(req))) return sendJson(res, 429, { ok: false });
      let input;
      try { input = JSON.parse(await readBody(req)); } catch (err) { return sendJson(res, err.status || 400, { ok: false }); }
      const draft = input && typeof input === 'object' && !input.website ? validateDraft(input, slugs) : null;
      if (!draft) return sendJson(res, 400, { ok: false });
      await db.drafts.save(draft);
      return send(res, 204, '', 'text/plain', { 'cache-control': 'no-store' });
    }

    if (path === '/api/inquiry') {
      if (req.method !== 'POST') return sendJson(res, 405, { ok: false });
      // Only accept submissions from this site's own pages.
      if (!sameOrigin(req)) return sendJson(res, 403, { ok: false });

      const ip = clientIp(req);
      if (rateLimited(ip))return sendJson(res, 429, { ok: false, error: 'Te veel aanvragen. Probeer het later opnieuw.' });

      let input;
      try {
        // Large enough for up to 5 photos (lib/photos.js), base64-encoded.
        input = JSON.parse(await readBody(req, 12_000_000));
      } catch (err) {
        return sendJson(res, err.status || 400, { ok: false, error: 'Ongeldige aanvraag.' });
      }
      if (!input || typeof input !== 'object') return sendJson(res, 400, { ok: false, error: 'Ongeldige aanvraag.' });

      // Honeypot: real visitors never fill this hidden field. Pretend success so bots learn nothing.
      if (input.website) return sendJson(res, 200, { ok: true, id: 0 });

      const { ok, errors, record } = validateInquiry(input, slugs);
      if (!ok) return sendJson(res, 422, { ok: false, errors });
      await withBagAddress(record, String(input.address_id || '').replace(/\D/g, '').slice(0, 16), addressLookup);
      const saved = await db.add(record, config.consentVersion, { ip });
      if (!saved.duplicate) forwarder.nudge();
      // event_id lets the browser's generate_lead event and server-side conversions deduplicate.
      return sendJson(res, saved.duplicate ? 200 : 201, { ok: true, id: saved.id, lead_id: record.lead_id, event_id: saved.eventId, duplicate: saved.duplicate });
    }

    if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res, url);
    return send(res, 405, 'Method not allowed', 'text/plain');
  }

  const server = createServer((req, res) => {
    handle(req, res).catch((err) => {
      console.error(err);
      if (!res.headersSent) send(res, 500, 'Er ging iets mis.', 'text/plain');
    });
  });
  server.on('close', () => { clearInterval(pruneTimer); forwarder.stop(); db.close(); });
  server.storage = db.kind;
  server.db = db;
  server.forwarder = forwarder;
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  // Cloud Run (K_SERVICE is set there) has a temporary disk that is wiped on every deploy and restart,
  // and each instance gets its own. The built-in database would lose leads there, so require Cloud SQL.
  if (process.env.K_SERVICE && !config.databaseUrl) {
    console.error('DATABASE_URL is not set. On Cloud Run, inquiries must go to Cloud SQL; the built-in database would lose them.');
    process.exit(1);
  }
  const server = await createApp().catch((err) => {
    console.error(`Could not open the database: ${err.message}`);
    process.exit(1);
  });
  // Cloud Run sends SIGTERM before stopping an instance: finish open requests and close the database cleanly.
  for (const signal of ['SIGTERM', 'SIGINT']) {
    process.on(signal, () => server.close(() => process.exit(0)));
  }
  server.listen(config.port, () => {
    console.log(`${config.brand} running at http://localhost:${config.port}`);
    console.log(server.storage === 'postgres'
      ? 'Inquiries: stored in the PostgreSQL server (DATABASE_URL).'
      : server.storage === 'memory'
        ? 'Inquiries: kept in memory only (STORAGE=memory) and lost on restart. Demo use only.'
        : `Inquiries: stored in the built-in PostgreSQL (PGlite) in ${config.dataDir}. On GCP, set DATABASE_URL to Cloud SQL.`);
    console.log(server.forwarder.enabled
      ? `Windmill CRM: leads are forwarded to ${config.crmLeadUrl}.`
      : 'Windmill CRM: CRM_LEAD_API_URL not set; leads wait in the outbox and are sent once it is.');
    if (config.demo) console.log('Demo mode: demo company details, noindex and robots "Disallow: /". Set DEMO=false only after legal sign-off.');
    if (config.adminPassword === 'demo') console.log('Warning: admin password is the demo default. Set ADMIN_PASSWORD before real use.');
    if (!config.gtmId) console.log('Tracking: no GTM_ID set, tags are not loaded (events still go to the dataLayer).');
  });
}
