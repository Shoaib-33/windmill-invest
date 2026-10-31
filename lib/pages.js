// The site map: every URL, its group and its form. Based on the document (section 3), narrowed to sellers:
// Windmill Invest only buys, so the invest, develop, manage, commercial and advisory sections were removed.
// The build and the content checker both use this list, so a page can never be missing or misplaced.

export const GROUPS = {
  core: { label: 'Algemeen', en: 'General', hub: null },
  verkopen: { label: 'Verkopen', en: 'Sell', hub: '/vastgoed-verkopen/' },
  kennisbank: { label: 'Kennisbank', en: 'Knowledge base', hub: '/kennisbank/' },
  legal: { label: 'Juridisch', en: 'Legal', hub: null },
};

export const LANGS = ['nl', 'en'];

// English URL of every page. Content always refers to pages by their Dutch slug; the renderer maps it.
export const EN_PATHS = {
  '/': '/en/',
  '/over-ons/': '/en/about-us/',
  '/werkwijze/': '/en/how-we-work/',
  '/praktijkvoorbeelden/': '/en/case-studies/',
  '/kennisbank/': '/en/knowledge-base/',
  '/veelgestelde-vragen/': '/en/faq/',
  '/contact/': '/en/contact/',
  '/vastgoed-verkopen/': '/en/sell-property/',
  '/huis-verkopen/': '/en/sell-your-house/',
  '/huis-verkopen-zonder-makelaar/': '/en/sell-house-without-estate-agent/',
  '/huis-verkopen-aan-opkoper/': '/en/sell-house-to-property-buyer/',
  '/verhuurde-woning-verkopen/': '/en/sell-tenanted-property/',
  '/beleggingspand-verkopen/': '/en/sell-investment-property/',
  '/bedrijfspand-verkopen/': '/en/sell-commercial-building/',
  '/vastgoedportefeuille-verkopen/': '/en/sell-property-portfolio/',
  '/geerfd-huis-verkopen/': '/en/sell-inherited-house/',
  '/huis-verkopen-met-achterstallig-onderhoud/': '/en/sell-house-needing-repairs/',
  '/leegstaande-woning-verkopen/': '/en/sell-vacant-property/',
  '/huis-verkopen-en-terughuren/': '/en/sale-and-rent-back/',
  '/huis-verkopen-vanuit-het-buitenland/': '/en/sell-dutch-house-from-abroad/',
  '/kennisbank/kosten-huis-verkopen/': '/en/knowledge-base/costs-of-selling-a-house/',
  '/kennisbank/koop-breekt-geen-huur/': '/en/knowledge-base/sale-does-not-break-lease/',
  '/privacyverklaring/': '/en/privacy-statement/',
  '/cookiebeleid/': '/en/cookie-policy/',
  '/algemene-voorwaarden/': '/en/terms-and-conditions/',
  '/klachten-en-disclosures/': '/en/complaints-and-disclosures/',
};

// The public path of a page in a language.
export const pathFor = (slug, lang) => (lang === 'en' ? EN_PATHS[slug.split('#')[0]] + (slug.includes('#') ? '#' + slug.split('#')[1] : '') : slug);

// [slug, group, form]
export const SITEMAP = [
  ['/', 'core', 'verkoop'],
  ['/over-ons/', 'core', 'contact'],
  ['/werkwijze/', 'core', 'verkoop'],
  ['/praktijkvoorbeelden/', 'core', 'verkoop'],
  ['/kennisbank/', 'core', null],
  ['/veelgestelde-vragen/', 'core', 'contact'],
  ['/contact/', 'core', 'contact'],

  ['/vastgoed-verkopen/', 'verkopen', 'verkoop'],
  ['/huis-verkopen/', 'verkopen', 'verkoop'],
  ['/huis-verkopen-zonder-makelaar/', 'verkopen', 'verkoop'],
  ['/huis-verkopen-aan-opkoper/', 'verkopen', 'verkoop'],
  ['/verhuurde-woning-verkopen/', 'verkopen', 'verhuurd'],
  ['/beleggingspand-verkopen/', 'verkopen', 'verhuurd'],
  ['/bedrijfspand-verkopen/', 'verkopen', 'commercieel'],
  ['/vastgoedportefeuille-verkopen/', 'verkopen', 'commercieel'],
  ['/geerfd-huis-verkopen/', 'verkopen', 'verkoop'],
  ['/huis-verkopen-met-achterstallig-onderhoud/', 'verkopen', 'verkoop'],
  ['/leegstaande-woning-verkopen/', 'verkopen', 'verkoop'],
  ['/huis-verkopen-en-terughuren/', 'verkopen', 'verkoop'],
  ['/huis-verkopen-vanuit-het-buitenland/', 'verkopen', 'verkoop'],

  ['/kennisbank/kosten-huis-verkopen/', 'kennisbank', 'verkoop'],
  ['/kennisbank/koop-breekt-geen-huur/', 'kennisbank', 'verhuurd'],

  ['/privacyverklaring/', 'legal', null],
  ['/cookiebeleid/', 'legal', null],
  ['/algemene-voorwaarden/', 'legal', null],
  ['/klachten-en-disclosures/', 'legal', null],
];

export const SLUGS = new Set(SITEMAP.map(([s]) => s));
export const FORM_KEYS = ['verkoop', 'verhuurd', 'commercieel', 'contact'];
export const TEMPLATES = ['home', 'service', 'hub', 'article', 'legal'];
