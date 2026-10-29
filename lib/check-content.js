// Checks content files against SCHEMA.md and the sitemap.
// Usage: node lib/check-content.js [content/file.js ...]   (no arguments = all content files)
import { readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { FORM_KEYS, GROUPS, SITEMAP, SLUGS, TEMPLATES } from './pages.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BLOCK_KEYS = ['p', 'note', 'ul', 'check', 'ol', 'cards', 'table', 'callout', 'calculator', 'auto'];
const TOKENS = ['legalName', 'kvk', 'address', 'phone', 'email', 'domain'];
const isStr = (v) => typeof v === 'string' && v.trim() !== '';

export function checkPages(pages, file = '') {
  const errs = [];
  const err = (slug, msg) => errs.push(`${file} ${slug || '?'}: ${msg}`);
  const expected = new Map(SITEMAP.map(([s, g, f]) => [s, { group: g, form: f }]));

  const checkText = (slug, where, text) => {
    if (typeof text !== 'string') return err(slug, `${where} is not text`);
    for (const [, target] of text.matchAll(/\]\(([^)]*)\)/g)) {
      if (!SLUGS.has(target.split('#')[0])) err(slug, `${where} links to unknown page ${target}`);
    }
    for (const [, tok] of text.matchAll(/\{\{(\w+)\}\}/g)) if (!TOKENS.includes(tok)) err(slug, `${where} uses unknown token {{${tok}}}`);
    if (/\[(Windmill Invest B\.V\.|KvK-nummer|telefoonnummer|Straat huisnummer)/.test(text)) err(slug, `${where} still has a [placeholder]; use a {{token}}`);
    if ((text.match(/\*\*/g) || []).length % 2) err(slug, `${where} has an unclosed **bold**`);
  };

  for (const p of pages) {
    const s = p.slug;
    const exp = expected.get(s);
    if (!exp) { err(s, 'slug is not in the sitemap'); continue; }
    if (p.group !== exp.group) err(s, `group should be ${exp.group}`);
    if ((p.form ?? null) !== exp.form) err(s, `form should be ${exp.form}`);
    if (!GROUPS[p.group]) err(s, 'unknown group');
    if (!TEMPLATES.includes(p.template)) err(s, `unknown template ${p.template}`);
    for (const k of ['nav', 'seoTitle', 'meta', 'h1', 'keyword', 'eyebrow', 'intro']) {
      if (!isStr(p[k])) err(s, `missing ${k}`); else checkText(s, k, p[k]);
    }
    if (p.form !== null && !FORM_KEYS.includes(p.form)) err(s, `unknown form ${p.form}`);
    if (!Array.isArray(p.secondary)) err(s, 'secondary must be an array');
    if (!Array.isArray(p.heroPoints)) err(s, 'heroPoints must be an array');
    if (!Array.isArray(p.related)) err(s, 'related must be an array');
    else for (const r of p.related) if (!SLUGS.has(r)) err(s, `related page ${r} is not in the sitemap`);
    if (!Array.isArray(p.sections) || !p.sections.length) err(s, 'sections must be a non-empty array');

    (p.sections || []).forEach((sec, i) => {
      if (!isStr(sec.h)) err(s, `section ${i + 1} has no heading`);
      if (!Array.isArray(sec.blocks) || !sec.blocks.length) return err(s, `section "${sec.h}" has no blocks`);
      sec.blocks.forEach((b, j) => {
        const where = `section "${sec.h}" block ${j + 1}`;
        const keys = Object.keys(b);
        if (keys.length !== 1 || !BLOCK_KEYS.includes(keys[0])) return err(s, `${where}: unknown block ${JSON.stringify(keys)}`);
        const [k] = keys, v = b[k];
        if (k === 'p' || k === 'note') checkText(s, where, v);
        if (['ul', 'check', 'ol'].includes(k)) {
          if (!Array.isArray(v) || !v.length) err(s, `${where}: ${k} needs items`);
          else v.forEach((t) => checkText(s, where, t));
        }
        if (k === 'cards') {
          if (!Array.isArray(v) || !v.length) err(s, `${where}: cards need items`);
          else v.forEach((c) => {
            if (!isStr(c.t)) err(s, `${where}: card without t`);
            checkText(s, where, c.d ?? '');
            if (c.href && !SLUGS.has(c.href)) err(s, `${where}: card links to unknown page ${c.href}`);
            if (c.href && !isStr(c.label)) err(s, `${where}: card with href needs a label`);
          });
        }
        if (k === 'table') {
          if (!Array.isArray(v.head) || !Array.isArray(v.rows)) return err(s, `${where}: table needs head and rows`);
          v.rows.forEach((r, ri) => {
            if (!Array.isArray(r) || r.length !== v.head.length) err(s, `${where}: row ${ri + 1} has ${r?.length} cells, head has ${v.head.length}`);
            else r.forEach((c) => checkText(s, where, c));
          });
          if (v.note) checkText(s, where, v.note);
        }
        if (k === 'callout' && (!isStr(v.t) || typeof v.d !== 'string')) err(s, `${where}: callout needs t and d`);
        if (k === 'callout') checkText(s, where, v.d || '');
        if (k === 'auto' && !['services', 'faq', 'articles'].includes(v)) err(s, `${where}: auto must be services, faq or articles`);
      });
    });

    if (!Array.isArray(p.faq)) err(s, 'faq must be an array');
    else p.faq.forEach((f) => { if (!isStr(f.q) || !isStr(f.a)) err(s, 'faq item needs q and a'); else checkText(s, 'faq', f.a); });
    if (p.cta !== null && (!p.cta || !isStr(p.cta.title) || !isStr(p.cta.text) || !isStr(p.cta.button))) err(s, 'cta needs title, text and button (or null)');
    if (p.template === 'article') {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(p.updated || '')) err(s, 'article needs updated: YYYY-MM-DD');
      if (!Array.isArray(p.sources) || !p.sources.length) err(s, 'article needs sources');
    }
    if (p.template === 'legal' && !isStr(p.version)) err(s, 'legal page needs version');
  }
  return errs;
}

// An English page must have exactly the shape of its Dutch original: same links, tokens, sections,
// blocks, list lengths, cards, table sizes and FAQ count. Only the words differ.
export function compareWithDutch(nl, en, file = '') {
  const errs = [];
  const err = (msg) => errs.push(`${file} ${en.slug}: ${msg} (differs from the Dutch page)`);
  const links = (o) => JSON.stringify(o).match(/\]\((\/[^)]*)\)|"href":"[^"]*"/g)?.sort().join(' ') ?? '';
  const tokens = (o) => JSON.stringify(o).match(/\{\{\w+\}\}/g)?.sort().join(' ') ?? '';
  for (const k of ['group', 'template', 'form', 'updated']) if ((nl[k] ?? null) !== (en[k] ?? null)) err(`${k} must be ${nl[k]}`);
  // The document caps titles at 60 characters. Dutch titles are verbatim; English ones must keep to it.
  if (en.seoTitle?.length > 60) errs.push(`${file} ${en.slug}: seoTitle is ${en.seoTitle.length} characters, the limit is 60`);
  if (JSON.stringify(nl.related) !== JSON.stringify(en.related)) err('related must be the same list');
  if ((nl.cta === null) !== (en.cta === null)) err('cta must be null exactly when the Dutch one is');
  if ((nl.heroPoints?.length ?? 0) !== (en.heroPoints?.length ?? 0)) err('heroPoints count');
  if ((nl.faq?.length ?? 0) !== (en.faq?.length ?? 0)) err(`faq has ${en.faq?.length} items, Dutch has ${nl.faq?.length}`);
  if ((nl.sources?.length ?? 0) !== (en.sources?.length ?? 0)) err('sources count');
  if (links(nl) !== links(en)) err('links or card hrefs');
  if (tokens(nl) !== tokens(en)) err('{{tokens}}');
  const shape = (b) => {
    const [k] = Object.keys(b), v = b[k];
    if (Array.isArray(v)) return `${k}${v.length}`;
    if (k === 'table') return `table${v.head.length}x${v.rows.length}${v.note ? 'n' : ''}`;
    if (k === 'auto') return `auto:${v}`;
    return k;
  };
  const nlS = nl.sections || [], enS = en.sections || [];
  if (nlS.length !== enS.length) err(`has ${enS.length} sections, Dutch has ${nlS.length}`);
  else nlS.forEach((s, i) => {
    const a = (s.blocks || []).map(shape).join(','), b = (enS[i].blocks || []).map(shape).join(',');
    if (a !== b) err(`section ${i + 1} ("${enS[i].h}") blocks are [${b}], Dutch has [${a}]`);
  });
  return errs;
}

const langOf = (f) => (basename(resolve(f, '..')) === 'en' ? 'en' : 'nl');

export async function loadContent(files) {
  const dir = resolve(ROOT, 'content');
  const listDir = (d) => readdirSync(d, { withFileTypes: true }).filter((f) => f.isFile() && f.name.endsWith('.js')).map((f) => resolve(d, f.name));
  let list = files?.length ? files.map((f) => resolve(f)) : listDir(dir);
  if (!files?.length) try { list = list.concat(listDir(resolve(dir, 'en'))); } catch { /* no English content yet */ }
  const all = [];
  for (const f of list) {
    const mod = await import(pathToFileURL(f).href + `?t=${Date.now()}`);
    if (!Array.isArray(mod.default)) throw new Error(`${basename(f)}: default export must be an array`);
    const lang = langOf(f);
    for (const p of mod.default) all.push({ ...p, lang, _file: (lang === 'en' ? 'en/' : '') + basename(f) });
  }
  return all;
}

// Checks a set of pages of both languages: per-file rules, English-vs-Dutch shape and duplicates.
export function checkAll(pages, dutch = pages.filter((p) => p.lang === 'nl')) {
  const errs = [];
  for (const [file, ps] of Map.groupBy(pages, (p) => p._file)) errs.push(...checkPages(ps, file));
  const nlBySlug = new Map(dutch.map((p) => [p.slug, p]));
  for (const p of pages.filter((x) => x.lang === 'en')) {
    const nl = nlBySlug.get(p.slug);
    if (nl) errs.push(...compareWithDutch(nl, p, p._file));
  }
  const seen = new Set();
  for (const p of pages) {
    const key = `${p.lang}${p.slug}`;
    if (seen.has(key)) errs.push(`${p._file} ${p.slug}: defined twice`);
    seen.add(key);
  }
  return errs;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const files = process.argv.slice(2);
  const pages = await loadContent(files);
  // English files are compared with their Dutch originals, so load those too.
  const dutch = files.length ? (await loadContent()).filter((p) => p.lang === 'nl') : undefined;
  const errs = checkAll(pages, dutch);
  if (!files.length) {
    for (const lang of ['nl', 'en']) {
      const have = new Set(pages.filter((p) => p.lang === lang).map((p) => p.slug));
      for (const [s] of SITEMAP) if (!have.has(s)) errs.push(`missing ${lang} page ${s}`);
    }
  }
  if (errs.length) { console.log(errs.join('\n')); console.log(`\n${errs.length} problem(s) in ${pages.length} page(s).`); process.exit(1); }
  console.log(`OK: ${pages.length} page(s) checked.`);
}
