// Site settings. Every company detail is a DEMO value until the real data is known.
// Set them with environment variables (or edit the defaults) before going live.
const env = process.env;

export const config = {
  // While demo is true the site shows a banner, every page is noindex and robots.txt blocks all crawlers.
  demo: env.DEMO !== 'false',

  brand: 'Windmill Invest',
  legalName: env.LEGAL_NAME || 'Windmill Invest B.V. (demo)',
  kvk: env.KVK || '00000000 (demo)',
  address: env.ADDRESS || 'Voorbeeldstraat 1, 1000 AA Amsterdam (demo)',
  phone: env.PHONE || '085 000 00 00 (demo)',
  btw: env.BTW || 'NL000000000B01 (demo)',
  email: env.EMAIL || 'info@windmillinvest.nl',
  domain: env.DOMAIN || 'windmillinvest.nl',
  // On Render, RENDER_EXTERNAL_URL is the service's own address (https://….onrender.com).
  siteUrl: (env.SITE_URL || env.RENDER_EXTERNAL_URL || 'https://www.windmillinvest.nl').replace(/\/+$/, ''),

  // Only offer "verkopen en terughuren" if the company really does it.
  offersRentBack: env.OFFERS_RENT_BACK !== 'false',

  // The offer promises from the Engine blueprint, shown on the landing pages (/snel-verkopen/ etc.) only when
  // switched on. Management said yes to all of them; each is a legal commitment, so they stay off until
  // someone deliberately turns them on (PROMISE_...=true). Rent-back has its own switch: see the blueprint's
  // note on the Wet vaste huurcontracten.
  promises: {
    offer24h: env.PROMISE_OFFER_24H === 'true',
    asIs: env.PROMISE_AS_IS === 'true',
    cashAdvance: env.PROMISE_CASH_ADVANCE === 'true',
    rentBack: env.PROMISE_RENT_BACK === 'true',
    transferDate: env.PROMISE_TRANSFER_DATE === 'true',
    notaryCosts: env.PROMISE_NOTARY_COSTS === 'true',
  },
  rentBackYears: Number(env.RENT_BACK_YEARS || 2),

  port: Number(env.PORT || 3002),
  trustProxy: env.TRUST_PROXY === 'true',
  gtmId: env.GTM_ID || '',
  adminUser: env.ADMIN_USER || 'admin',
  adminPassword: env.ADMIN_PASSWORD || 'demo',
  consentVersion: env.CONSENT_VERSION || '2026-10-28',
  // PostgreSQL server, e.g. Cloud SQL on GCP. Without it, the built-in PostgreSQL (PGlite) keeps its data in dataDir.
  databaseUrl: env.DATABASE_URL || '',
  dataDir: env.DATA_DIR || 'data/pglite',
  // STORAGE=memory: no database at all, inquiries kept in memory until a restart (demos on small hosts only).
  storage: env.STORAGE || '',

  // Windmill CRM's Lead API (docs/lead-contract.md). Leads wait in the outbox until the URL is set.
  crmLeadUrl: env.CRM_LEAD_API_URL || '',
  crmApiToken: env.CRM_API_TOKEN || '',
  crmSigningSecret: env.CRM_SIGNING_SECRET || '',
  buildDate: new Date().toISOString().slice(0, 10),
};

// Placeholder values are marked "(demo)"; they are never put in structured data.
export const isDemoValue = (v) => !v || /\(demo\)/.test(v);
