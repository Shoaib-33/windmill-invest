// The site map from the document (section 3): every URL, its group and its form.
// The build and the content checker both use this list, so a page can never be missing or misplaced.

export const GROUPS = {
  core: { label: 'Algemeen', en: 'General', hub: null },
  verkopen: { label: 'Verkopen', en: 'Sell', hub: '/vastgoed-verkopen/' },
  investeren: { label: 'Investeren', en: 'Invest', hub: '/investeren-in-vastgoed/' },
  ontwikkelen: { label: 'Ontwikkelen', en: 'Develop', hub: '/vastgoedontwikkeling/' },
  beheer: { label: 'Beheer', en: 'Manage', hub: '/vastgoedbeheer/' },
  commercieel: { label: 'Commercieel', en: 'Commercial', hub: '/commercieel-vastgoed/' },
  advies: { label: 'Advies', en: 'Advisory', hub: '/vastgoedadvies/' },
  kennisbank: { label: 'Kennisbank', en: 'Knowledge base', hub: '/kennisbank/' },
  legal: { label: 'Juridisch', en: 'Legal', hub: null },
};

export const LANGS = ['nl', 'en'];

// English URL of every page. Content always refers to pages by their Dutch slug; the renderer maps it.
export const EN_PATHS = {
  '/': '/en/',
  '/over-ons/': '/en/about-us/',
  '/diensten/': '/en/services/',
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
  '/investeren-in-vastgoed/': '/en/invest-in-property/',
  '/beleggingspand-kopen/': '/en/buy-investment-property/',
  '/verhuurpand-kopen/': '/en/buy-rental-property/',
  '/off-market-vastgoed/': '/en/off-market-property/',
  '/vastgoed-aankoopbegeleiding/': '/en/property-acquisition-support/',
  '/vastgoed-rendement-berekenen/': '/en/property-yield-calculator/',
  '/vastgoedontwikkeling/': '/en/property-development/',
  '/vastgoedrenovatie/': '/en/property-renovation/',
  '/vastgoedtransformatie/': '/en/property-transformation/',
  '/vastgoed-verduurzamen/': '/en/property-sustainability/',
  '/bedrijfspand-naar-woningen/': '/en/commercial-to-residential-conversion/',
  '/vastgoedbeheer/': '/en/property-management/',
  '/verhuurbeheer/': '/en/rental-management/',
  '/onderhoudscoordinatie/': '/en/maintenance-coordination/',
  '/vastgoedportefeuillebeheer/': '/en/portfolio-management/',
  '/commercieel-vastgoed/': '/en/commercial-property/',
  '/kantoorpand-kopen-verkopen/': '/en/office-buildings/',
  '/bedrijfshal-en-warehouse/': '/en/industrial-and-warehouse/',
  '/winkelruimte-en-horecapand/': '/en/retail-and-hospitality-property/',
  '/mixed-use-vastgoed/': '/en/mixed-use-property/',
  '/ontwikkellocaties-en-grond/': '/en/development-sites-and-land/',
  '/vastgoedadvies/': '/en/property-advisory/',
  '/vastgoed-waardebepaling/': '/en/property-valuation/',
  '/vastgoed-due-diligence/': '/en/property-due-diligence/',
  '/vastgoedinvesteringsanalyse/': '/en/property-investment-analysis/',
  '/kennisbank/overdrachtsbelasting-2026/': '/en/knowledge-base/dutch-transfer-tax-2026/',
  '/kennisbank/kosten-huis-verkopen/': '/en/knowledge-base/costs-of-selling-a-house/',
  '/kennisbank/box-3-vastgoed-2026/': '/en/knowledge-base/box-3-property-2026/',
  '/kennisbank/bar-nar-rendement/': '/en/knowledge-base/gross-and-net-yield/',
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
  ['/diensten/', 'core', 'contact'],
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

  ['/investeren-in-vastgoed/', 'investeren', 'investeerder'],
  ['/beleggingspand-kopen/', 'investeren', 'investeerder'],
  ['/verhuurpand-kopen/', 'investeren', 'investeerder'],
  ['/off-market-vastgoed/', 'investeren', 'investeerder'],
  ['/vastgoed-aankoopbegeleiding/', 'investeren', 'investeerder'],
  ['/vastgoed-rendement-berekenen/', 'investeren', 'investeerder'],

  ['/vastgoedontwikkeling/', 'ontwikkelen', 'ontwikkeling'],
  ['/vastgoedrenovatie/', 'ontwikkelen', 'ontwikkeling'],
  ['/vastgoedtransformatie/', 'ontwikkelen', 'ontwikkeling'],
  ['/vastgoed-verduurzamen/', 'ontwikkelen', 'ontwikkeling'],
  ['/bedrijfspand-naar-woningen/', 'ontwikkelen', 'ontwikkeling'],

  ['/vastgoedbeheer/', 'beheer', 'beheer'],
  ['/verhuurbeheer/', 'beheer', 'beheer'],
  ['/onderhoudscoordinatie/', 'beheer', 'beheer'],
  ['/vastgoedportefeuillebeheer/', 'beheer', 'beheer'],

  ['/commercieel-vastgoed/', 'commercieel', 'commercieel'],
  ['/kantoorpand-kopen-verkopen/', 'commercieel', 'commercieel'],
  ['/bedrijfshal-en-warehouse/', 'commercieel', 'commercieel'],
  ['/winkelruimte-en-horecapand/', 'commercieel', 'commercieel'],
  ['/mixed-use-vastgoed/', 'commercieel', 'commercieel'],
  ['/ontwikkellocaties-en-grond/', 'commercieel', 'commercieel'],

  ['/vastgoedadvies/', 'advies', 'contact'],
  ['/vastgoed-waardebepaling/', 'advies', 'waardebepaling'],
  ['/vastgoed-due-diligence/', 'advies', 'investeerder'],
  ['/vastgoedinvesteringsanalyse/', 'advies', 'investeerder'],

  ['/kennisbank/overdrachtsbelasting-2026/', 'kennisbank', 'investeerder'],
  ['/kennisbank/kosten-huis-verkopen/', 'kennisbank', 'verkoop'],
  ['/kennisbank/box-3-vastgoed-2026/', 'kennisbank', 'verhuurd'],
  ['/kennisbank/bar-nar-rendement/', 'kennisbank', 'investeerder'],
  ['/kennisbank/koop-breekt-geen-huur/', 'kennisbank', 'verhuurd'],

  ['/privacyverklaring/', 'legal', null],
  ['/cookiebeleid/', 'legal', null],
  ['/algemene-voorwaarden/', 'legal', null],
  ['/klachten-en-disclosures/', 'legal', null],
];

export const SLUGS = new Set(SITEMAP.map(([s]) => s));
export const FORM_KEYS = ['verkoop', 'verhuurd', 'commercieel', 'investeerder', 'beheer', 'ontwikkeling', 'waardebepaling', 'contact'];
export const TEMPLATES = ['home', 'service', 'hub', 'article', 'legal'];
