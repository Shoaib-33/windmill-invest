// Builds the static site into dist/: one index.html per page and language, plus sitemap.xml, robots.txt and 404 pages.
// Dutch lives at the root (/huis-verkopen/), English under /en/ (/en/sell-your-house/).
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { LANGS, SITEMAP, pathFor } from './lib/pages.js';
import { checkAll, loadContent } from './lib/check-content.js';
import { createRenderer } from './lib/render.js';
import { FUNNEL_SLUGS, funnelPages } from './lib/funnels.js';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(ROOT, 'dist');

const all = await loadContent();
const problems = checkAll(all);
if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\nBuild stopped: ${problems.length} content problem(s). Run "npm run check" for details.`);
  process.exit(1);
}

// Pages switched off in config are not built; links to them render as plain text.
const disabled = new Set(config.offersRentBack ? [] : ['/huis-verkopen-en-terughuren/']);
const order = new Map(SITEMAP.map(([s], i) => [s, i]));
const byLang = Object.fromEntries(LANGS.map((lang) => [lang, all
  .filter((p) => p.lang === lang && !disabled.has(p.slug))
  .sort((a, b) => order.get(a.slug) - order.get(b.slug))]));
const slugsIn = (lang) => new Set(byLang[lang].map((p) => p.slug));

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
const write = (rel, data) => { const f = join(DIST, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, data); };

const NOT_FOUND = {
  nl: ['Pagina niet gevonden', 'Deze pagina bestaat niet (meer). Kies een onderwerp in het menu of ga naar de', 'homepage'],
  en: ['Page not found', 'This page does not exist (any more). Choose a topic in the menu or go to the', 'home page'],
};

// Asset URLs carry a content hash (?v=…): a changed file gets a new URL, so no visitor keeps a stale copy.
const hash = (f) => createHash('sha256').update(readFileSync(join(ROOT, 'assets', f))).digest('hex').slice(0, 10);
const assets = { css: hash('style.css'), js: hash('site.js') };

const published = [];
for (const lang of LANGS) {
  const pages = byLang[lang];
  if (!pages.length) continue;
  const otherLang = lang === 'nl' ? 'en' : 'nl';
  const { renderPage, renderSimple, renderFunnel } = createRenderer(pages, config, { lang, alternates: slugsIn(otherLang), assets });
  for (const p of pages) write(join(pathFor(p.slug, lang), 'index.html'), renderPage(p));
  // Ad landing pages: one URL each, English in index.en.html (served for ?lang=en). Kept out of the sitemap,
  // the menu and pages.json.
  for (const f of funnelPages(config, lang)) write(join(f.slug, lang === 'en' ? 'index.en.html' : 'index.html'), renderFunnel(f));
  const [title, text, link] = NOT_FOUND[lang];
  const home = pathFor('/', lang);
  write(join(home, '404.html'), renderSimple('/404', `${title} │ ${config.brand}`, title, `<p class="lead">${text} <a href="${home}">${link}</a>.</p>`));
  published.push(...pages.map((p) => ({ slug: p.slug, lang, path: pathFor(p.slug, lang), updated: p.updated })));
}

// Sitemap with hreflang alternates, so search engines pair the two language versions.
const today = new Date().toISOString().slice(0, 10);
const nlSlugs = slugsIn('nl'), enSlugs = slugsIn('en');
const urlEntry = (e) => {
  const both = nlSlugs.has(e.slug) && enSlugs.has(e.slug);
  const alts = both ? LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${config.siteUrl}${pathFor(e.slug, l)}"/>`).join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${config.siteUrl}${e.slug}"/>` : '';
  return `<url><loc>${config.siteUrl}${e.path}</loc><lastmod>${e.updated || today}</lastmod>${alts}</url>`;
};
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${published.map(urlEntry).join('\n')}\n</urlset>\n`);
write('robots.txt', config.demo
  ? `# Demo build: keep all crawlers out.\nUser-agent: *\nDisallow: /\n`
  : `User-agent: *\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
write('pages.json', JSON.stringify(published.map(({ slug, lang, path }) => ({ slug, lang, path }))));
write('funnels.json', JSON.stringify(FUNNEL_SLUGS));

cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });

for (const lang of LANGS) {
  const missing = SITEMAP.map(([s]) => s).filter((s) => !disabled.has(s) && !slugsIn(lang).has(s));
  console.log(`${lang}: built ${byLang[lang].length} page(s)${missing.length ? `, not yet written (${missing.length}): ${missing.join(', ')}` : ''}`);
}
if (config.demo) console.log('Demo mode: noindex.');
