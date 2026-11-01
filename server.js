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
import { ATTRIBUTION, FORMS, formFor, validateDraft, validateInquiry } from './lib/forms.js';
import { SLUGS } from './lib/pages.js';
import { esc } from './lib/render.js';
import { createAddressLookup, createHouseDetails, createModel3d, createTileFetcher } from './lib/bag.js';
import { FUNNEL_SLUGS } from './lib/funnels.js';
import { REVIEW_STATUSES, publicReview, validateReview } from './lib/reviews.js';

// Adds the BAG address to an inquiry with a postcode and house number: the visitor's choice (address_id)
// when it is one of the matches, else the only match. Looked up again on the server, never trusted from the
// browser; when nothing matches, the address stays as typed. With the address come the build year, floor
// area and use from the BAG, so the valuation starts with facts.
async function withBagAddress(record, addressId, lookup, details) {
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
    const facts = details ? await details(pick.bag_vbo_id) : null;
    if (facts?.build_year) d.bag_build_year = facts.build_year;
    if (facts?.area_m2) d.bag_area_m2 = facts.area_m2;
    if (facts?.use) d.bag_use = facts.use;
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

// The admin page in Dutch or English (/admin?lang=en). Answers are shown with the form's own question and
// option texts in that language; the stored values themselves never change.
const ADMIN_TEXT = {
  nl: {
    title: 'Aanvragen', csv: 'Download alles als CSV', newest: 'Nieuwste', older: 'Oudere aanvragen →', none: 'Nog geen aanvragen.',
    cols: ['#', 'Datum', 'Formulier', 'Contact', 'Gegevens', 'Pagina / bron', 'Contact toegestaan', 'CRM'],
    lang: { nl: 'Nederlands', en: 'English' }, unknownType: 'type onbekend', direct: 'direct', photo: 'Foto',
    avatar: { distressed_urgent: 'Urgent / zorgvuldig', klushuis_low_label: 'Klushuis / laag label', fatigued_investor: 'Verhuurder / belegger' },
    crm: { sent: 'In CRM', pending: 'Wacht op CRM', failed: 'Mislukt' },
    consents: { phone: 'bellen', whatsapp: 'WhatsApp', marketing: 'nieuwsbrief', none: 'alleen over aanvraag' },
    backlog: (p, f) => `${p} wachten op verzending, ${f} mislukt.`,
    noCrm: ' De koppeling met Windmill CRM is nog niet ingesteld (CRM_LEAD_API_URL); aanvragen blijven hier bewaard tot die er is.',
    unfinished: (days) => `Onafgemaakte formulieren (laatste ${days} dagen)`,
    unfinishedIntro: 'Bezoekers die na een stap zijn gestopt, met toestemming bewaard. Er zijn geen contactgegevens: gebruik dit om te zien waar mensen afhaken.',
    stoppedAfter: (n) => `gestopt na stap ${n}`, step: 'stap', unfinishedCols: ['Laatst', 'Formulier', 'Antwoorden', 'Pagina / bron'],
    extra: { street: 'Straat', city: 'Plaats', house_letter: 'Huisletter', house_addition: 'Toevoeging', bag_vbo_id: 'BAG-verblijfsobject', bag_nummeraanduiding_id: 'BAG-nummeraanduiding', bag_build_year: 'Bouwjaar (BAG)', bag_area_m2: 'Oppervlakte in m² (BAG)', bag_use: 'Gebruiksdoel (BAG)' },
    yes: 'Ja',
    reviews: 'Reviews', reviewsIntro: 'Nieuwe reviews verschijnen pas op de site als u ze goedkeurt. Keur ook kritische reviews goed als ze echt zijn: alleen positieve reviews tonen is misleidend.',
    reviewCols: ['Datum', 'Sterren', 'Review', 'Naam / plaats', 'E-mail (niet zichtbaar)', 'Status', ''],
    reviewStatus: { pending: 'Wacht op controle', approved: 'Op de site', rejected: 'Afgewezen' },
    approve: 'Goedkeuren', reject: 'Afwijzen', remove: 'Verwijderen', noReviews: 'Nog geen reviews.',
  },
  en: {
    title: 'Inquiries', csv: 'Download all as CSV', newest: 'Newest', older: 'Older inquiries →', none: 'No inquiries yet.',
    cols: ['#', 'Date', 'Form', 'Contact', 'Answers', 'Page / source', 'Contact allowed', 'CRM'],
    lang: { nl: 'Dutch', en: 'English' }, unknownType: 'type unknown', direct: 'direct', photo: 'Photo',
    avatar: { distressed_urgent: 'Urgent / careful', klushuis_low_label: 'Fixer-upper / low label', fatigued_investor: 'Landlord / investor' },
    crm: { sent: 'In CRM', pending: 'Waiting for CRM', failed: 'Failed' },
    consents: { phone: 'call', whatsapp: 'WhatsApp', marketing: 'newsletter', none: 'only about the inquiry' },
    backlog: (p, f) => `${p} waiting to be sent, ${f} failed.`,
    noCrm: ' The link to Windmill CRM is not set up yet (CRM_LEAD_API_URL); inquiries are kept here until it is.',
    unfinished: (days) => `Unfinished forms (last ${days} days)`,
    unfinishedIntro: 'Visitors who stopped after a step, kept with their consent. There are no contact details: use this to see where people drop out.',
    stoppedAfter: (n) => `stopped after step ${n}`, step: 'step', unfinishedCols: ['Last', 'Form', 'Answers', 'Page / source'],
    extra: { street: 'Street', city: 'Town', house_letter: 'House letter', house_addition: 'Addition', bag_vbo_id: 'BAG residential object', bag_nummeraanduiding_id: 'BAG address id', bag_build_year: 'Build year (BAG)', bag_area_m2: 'Floor area in m² (BAG)', bag_use: 'Use (BAG)' },
    yes: 'Yes',
    reviews: 'Reviews', reviewsIntro: 'New reviews only appear on the site after you approve them. Approve critical reviews too when they are genuine: showing only positive ones is misleading.',
    reviewCols: ['Date', 'Stars', 'Review', 'Name / town', 'Email (not shown)', 'Status', ''],
    reviewStatus: { pending: 'Waiting for check', approved: 'On the site', rejected: 'Rejected' },
    approve: 'Approve', reject: 'Reject', remove: 'Delete', noReviews: 'No reviews yet.',
  },
};

// One inquiry's answers as "question: answer" lines, in the form's order, in the admin's language.
function answers(formType, data, lang) {
  const t = ADMIN_TEXT[lang];
  const fields = new Map((formFor(formType, lang)?.fields || []).map((fd) => [fd.name, fd]));
  const short = (label) => label.replace(/\s*\((optioneel|optional)[^)]*\)\s*$/i, '');
  const line = ([k, v]) => {
    const fd = fields.get(k);
    const label = fd ? short(fd.label) : t.extra[k] || k;
    const value = fd?.type === 'checkbox' && v === true ? t.yes : fd?.options?.find(([o]) => o === v)?.[1] ?? v;
    return `<b>${esc(label)}</b>: ${esc(value)}`;
  };
  const order = [...fields.keys()];
  const rank = (k) => (order.includes(k) ? order.indexOf(k) : order.length);
  return Object.entries(data).sort(([a], [b]) => rank(a) - rank(b)).map(line).join('<br>');
}

// Unfinished landing-page forms: where visitors stopped, and the newest ones (no contact details exist).
function unfinishedSection({ perStep, recent }, lang) {
  if (!recent.length) return '';
  const t = ADMIN_TEXT[lang];
  const title = (type) => formFor(type, lang)?.title || type;
  const stepName = (s) => formFor(s.form_type, lang)?.steps?.[s.step - 1];
  const counts = perStep.map((s) => `${esc(title(s.form_type))}, ${t.stoppedAfter(s.step)}${stepName(s) ? ` (${esc(stepName(s))})` : ''}: ${s.n}`).join('<br>');
  const tr = recent.map((d) => `<tr><td>${esc(d.updated_at.slice(0, 16).replace('T', ' '))}</td><td>${esc(title(d.form_type))}<br><small>${t.step} ${d.step} · ${t.lang[d.lang === 'en' ? 'en' : 'nl']}</small></td>
<td>${answers(d.form_type, d.data, lang)}</td><td>${esc(d.page || '')}<br><small>${esc([d.attribution.utm_source, d.attribution.utm_campaign].filter(Boolean).join(' / ') || t.direct)}</small></td></tr>`).join('');
  return `<details><summary><b>${t.unfinished(DRAFT_DAYS)}</b></summary><p>${t.unfinishedIntro}</p><p>${counts}</p>
<div class="wrap"><table><thead><tr>${t.unfinishedCols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${tr}</tbody></table></div></details>`;
}

// Reviews waiting for a decision first, then the rest. Each row has buttons that post back to /admin/reviews/:id.
function reviewsSection(reviews, lang) {
  const t = ADMIN_TEXT[lang];
  const order = { pending: 0, approved: 1, rejected: 2 };
  const sorted = [...reviews].sort((a, b) => order[a.status] - order[b.status] || b.id - a.id);
  const pending = reviews.filter((r) => r.status === 'pending').length;
  const button = (action, label) => `<button name="action" value="${action}">${label}</button>`;
  const tr = sorted.map((r) => `<tr${r.status === 'pending' ? ' style="background:#fff8e6"' : ''}><td>${esc(r.created_at.slice(0, 16).replace('T', ' '))}</td><td>${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</td>
<td style="white-space:pre-line;max-width:420px">${esc(r.text)}</td><td>${esc(r.name)}${r.place ? `<br><small>${esc(r.place)}</small>` : ''}</td><td>${r.email ? `<a href="mailto:${esc(r.email)}">${esc(r.email)}</a>` : '–'}</td>
<td>${esc(t.reviewStatus[r.status])}</td><td><form method="post" action="/admin/reviews/${r.id}${lang === 'en' ? '?lang=en' : ''}" style="display:flex;gap:4px;flex-wrap:wrap">${r.status !== 'approved' ? button('approve', t.approve) : ''}${r.status !== 'rejected' ? button('reject', t.reject) : ''}${button('delete', t.remove)}</form></td></tr>`).join('');
  return `<details id="reviews"${pending ? ' open' : ''}><summary><b>${t.reviews} (${reviews.length}${pending ? `, ${pending} ${t.reviewStatus.pending.toLowerCase()}` : ''})</b></summary><p>${t.reviewsIntro}</p>
<div class="wrap"><table><thead><tr>${t.reviewCols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${tr || `<tr><td colspan="7">${t.noReviews}</td></tr>`}</tbody></table></div></details>`;
}

function adminPage(rows, total, beforeId, outbox, unfinished, lang = 'nl', reviews = []) {
  const t = ADMIN_TEXT[lang];
  const href = (l, params = '') => {
    const p = [params, l === 'en' && 'lang=en'].filter(Boolean);
    return `/admin${p.length ? '?' + p.join('&') : ''}`;
  };
  const tr = rows.map((r) => {
    const photos = r.photo_ids.length ? `<br>${r.photo_ids.map((id) => `<a href="/admin/photos/${id}" target="_blank" rel="noopener"><img src="/admin/photos/${id}" alt="${t.photo}" width="72" height="54" loading="lazy" style="object-fit:cover;margin:4px 4px 0 0"></a>`).join('')}` : '';
    const data = answers(r.form_type, r.data, lang) + photos;
    const source = [r.utm_source, r.utm_medium, r.utm_campaign].filter(Boolean).join(' / ') || r.referrer || t.direct;
    const allowed = [r.consent_phone && t.consents.phone, r.consent_whatsapp && t.consents.whatsapp, r.consent_marketing && t.consents.marketing].filter(Boolean).join(', ') || t.consents.none;
    return `<tr><td>${r.id}</td><td>${esc(r.created_at.slice(0, 16).replace('T', ' '))}</td><td>${esc(formFor(r.form_type, lang)?.title || r.form_type)}<br><small>${t.lang[r.lang === 'en' ? 'en' : 'nl']} · ${esc(t.avatar[r.avatar] || t.unknownType)}</small></td>
<td>${esc(r.name)}<br><a href="mailto:${esc(r.email)}">${esc(r.email)}</a><br>${r.phone ? `<a href="tel:${esc(r.phone)}">${esc(r.phone)}</a>` : ''}</td>
<td>${data}</td><td>${esc(r.page || '')}<br><small>${esc(source)}</small></td><td>${esc(allowed)}</td><td>${esc(t.crm[r.crm_status] || '–')}</td></tr>`;
  }).join('');
  const backlog = (outbox.pending || 0) + (outbox.failed || 0);
  const before = beforeId ? `before=${beforeId}` : '';
  const switcher = `<span class="lang">${['nl', 'en'].map((l) => l === lang ? `<b>${l.toUpperCase()}</b>` : `<a href="${href(l, before)}">${l.toUpperCase()}</a>`).join(' | ')}</span>`;
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>${t.title} – ${esc(config.brand)}</title>
<style>body{font:15px/1.5 system-ui,sans-serif;margin:0;padding:24px 16px;background:#f5f6f2;color:#16231f}h1{margin:0 0 12px}table{border-collapse:collapse;width:100%;background:#fff}
th,td{border:1px solid #d4dcd6;padding:8px;text-align:left;vertical-align:top}th{background:#edf1ec}.wrap{overflow-x:auto}a{color:#0f5c53}
.top{display:flex;justify-content:space-between;align-items:baseline;gap:16px}.lang{font-size:14px}</style></head>
<body><div class="top"><h1>${t.title} (${total.toLocaleString(lang === 'en' ? 'en-GB' : 'nl-NL')})</h1>${switcher}</div><p><a href="/admin/inquiries.csv">${t.csv}</a>${beforeId ? ` · <a href="${href(lang)}">${t.newest}</a>` : ''}</p>
${reviewsSection(reviews, lang)}
${unfinishedSection(unfinished, lang)}
${backlog ? `<p><b>CRM:</b> ${t.backlog(outbox.pending || 0, outbox.failed || 0)}${config.crmLeadUrl ? '' : t.noCrm}</p>` : ''}
<div class="wrap"><table><thead><tr>${t.cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead>
<tbody>${tr || `<tr><td colspan="8">${t.none}</td></tr>`}</tbody></table></div>
${rows.length === ADMIN_PAGE_SIZE ? `<p><a href="${href(lang, `before=${rows.at(-1).id}`)}">${t.older}</a></p>` : ''}</body></html>`;
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

export async function createApp({ dbPath = config.databaseUrl || (config.storage === 'memory' ? MEMORY_STORAGE : config.dataDir), maxSubmissions = 8, crm = {}, addressLookup = createAddressLookup(), houseDetails = createHouseDetails(), tileFetch = createTileFetcher(), model3d = createModel3d() } = {}) {
  const db = dbPath === MEMORY_STORAGE ? openMemoryDb() : await openDb(dbPath);
  const rateLimited = rateLimiter(maxSubmissions);
  const lookupLimited = rateLimiter(60);
  const draftLimited = rateLimiter(60);
  const tileLimited = rateLimiter(600);
  const reviewLimited = rateLimiter(5);
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
        const [rows, total, outbox, unfinished, reviews] = await Promise.all([db.list({ limit: ADMIN_PAGE_SIZE, beforeId }), db.count(), db.outbox.stats(), db.drafts.unfinished(), db.reviews.list({ limit: 300 })]);
        const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'nl';
        return send(res, 200, adminPage(rows, total, beforeId, outbox, unfinished, lang, reviews), 'text/html; charset=utf-8', noStore);
      }
      // Approve, reject or delete a review (buttons on the admin page).
      const reviewAction = path.match(/^\/admin\/reviews\/(\d{1,15})$/);
      if (req.method === 'POST' && reviewAction) {
        // Basic auth is sent by the browser on any request, so only accept posts that come from the admin page itself.
        if (!sameOrigin(req) || (!req.headers.origin && !String(req.headers.referer || '').includes(`//${req.headers.host}/`))) return send(res, 403, 'Forbidden', 'text/plain');
        const action = new URLSearchParams(await readBody(req, 2000)).get('action');
        const id = Number(reviewAction[1]);
        const status = { approve: 'approved', reject: 'rejected' }[action];
        if (status && REVIEW_STATUSES.includes(status)) await db.reviews.setStatus(id, status);
        else if (action === 'delete') await db.reviews.remove(id);
        else return send(res, 400, 'Bad request', 'text/plain');
        return send(res, 303, '', 'text/plain', { location: `/admin${url.searchParams.get('lang') === 'en' ? '?lang=en' : ''}#reviews`, ...noStore });
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
      return sendJson(res, 200, { ok: true, matches: matches.map(({ id, label, street, house_number, house_letter, house_addition, city, lat, lon }) => ({ id, label, street, house_number, house_letter, house_addition, city, lat, lon })) });
    }

    // Facts about one home (build year, floor area, use) for the "we found your home" card.
    if (path === '/api/house') {
      if (req.method !== 'GET') return sendJson(res, 405, { ok: false });
      if (lookupLimited(clientIp(req))) return sendJson(res, 429, { ok: false });
      const details = await houseDetails(url.searchParams.get('id'));
      return sendJson(res, 200, { ok: true, details: details && { build_year: details.build_year, area_m2: details.area_m2, use: details.use } });
    }

    // The building in 3D for the same card (null when there is no model; the card then keeps the aerial photo).
    if (path === '/api/model') {
      if (req.method !== 'GET') return sendJson(res, 405, { ok: false });
      if (lookupLimited(clientIp(req))) return sendJson(res, 429, { ok: false });
      const details = await houseDetails(url.searchParams.get('id'));
      const model = details?.pand_id ? await model3d(details.pand_id) : null;
      return sendJson(res, 200, { ok: true, model });
    }

    // Aerial photo tiles for that card, fetched here so the browser only talks to this site.
    const tileMatch = path.match(/^\/api\/tile\/(\d{2})\/(\d{1,7})\/(\d{1,7})\.jpg$/);
    if (tileMatch) {
      if (req.method !== 'GET') return sendJson(res, 405, { ok: false });
      if (tileLimited(clientIp(req))) return send(res, 429, '', 'text/plain');
      const bytes = await tileFetch(Number(tileMatch[1]), Number(tileMatch[2]), Number(tileMatch[3]));
      if (!bytes) return send(res, 404, '', 'text/plain');
      res.writeHead(200, { 'content-type': 'image/jpeg', 'content-length': bytes.length, 'cache-control': 'public, max-age=604800', ...SECURITY_HEADERS });
      return res.end(bytes);
    }

    // Photos for Windmill CRM: the lead.created event links here; the CRM fetches with its API token.
    const photoMatch = path.match(/^\/api\/photos\/(\d{1,15})$/);
    if (photoMatch) {
      if (req.method !== 'GET') return sendJson(res, 405, { ok: false });
      if (!crmToken || !sameSecret(req.headers.authorization || '', `Bearer ${crmToken}`)) return sendJson(res, 401, { ok: false });
      return sendPhoto(res, await db.photo(Number(photoMatch[1])));
    }

    // Reviews: GET lists the approved ones for the site; POST sends a new one, which waits for approval.
    if (path === '/api/reviews') {
      if (req.method === 'GET') {
        const [list, summary] = await Promise.all([db.reviews.list({ status: 'approved', limit: 60 }), db.reviews.summary()]);
        return sendJson(res, 200, { ok: true, count: summary.count, avg: Math.round(summary.avg * 10) / 10, reviews: list.map(publicReview) });
      }
      if (req.method !== 'POST') return sendJson(res, 405, { ok: false });
      if (!sameOrigin(req)) return sendJson(res, 403, { ok: false });
      const ip = clientIp(req);
      if (reviewLimited(ip)) return sendJson(res, 429, { ok: false });
      let input;
      try { input = JSON.parse(await readBody(req, 10_000)); } catch (err) { return sendJson(res, err.status || 400, { ok: false }); }
      if (!input || typeof input !== 'object') return sendJson(res, 400, { ok: false });
      if (input.website) return sendJson(res, 201, { ok: true }); // honeypot
      const { ok, errors, review } = validateReview(input);
      if (!ok) return sendJson(res, 422, { ok: false, errors });
      await db.reviews.add(review, { ip });
      return sendJson(res, 201, { ok: true });
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
      await withBagAddress(record, String(input.address_id || '').replace(/\D/g, '').slice(0, 16), addressLookup, houseDetails);
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
