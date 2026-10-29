// The seller avatar of a lead (Engine blueprint, "Seller avatars"): set from the campaign first, then from
// the form and page. It is a first guess for routing and scoring; the AI call or a specialist corrects it in
// the CRM. null means "not clear yet" — the CRM decides — and buyers (the investor form) never get one.
export const AVATARS = ['distressed_urgent', 'klushuis_low_label', 'fatigued_investor'];

// The landing-page funnels are built per avatar, so their form decides it.
const FUNNEL_AVATAR = { funnel_urgent: 'distressed_urgent', funnel_asis: 'klushuis_low_label', funnel_portfolio: 'fatigued_investor' };

// Campaign names follow WI_{channel}_{avatar}_..., so the avatar can be read straight from utm_campaign.
const CAMPAIGN_HINTS = [
  [/distress|urgent|snel|scheiding|erfenis|erfgenam|schuld|dubbele/i, 'distressed_urgent'],
  [/klushuis|low_label|energielabel|zoals.?het.?is|slechte.?staat|keuring|opknap/i, 'klushuis_low_label'],
  [/fatigued|investor|verhuurd|portefeuille|beleggingspand|box.?3|verhuurder/i, 'fatigued_investor'],
];

const PAGE_HINTS = {
  '/geerfd-huis-verkopen/': 'distressed_urgent',
  '/huis-verkopen-vanuit-het-buitenland/': 'distressed_urgent',
  '/leegstaande-woning-verkopen/': 'distressed_urgent',
  '/huis-verkopen-met-achterstallig-onderhoud/': 'klushuis_low_label',
  '/verhuurde-woning-verkopen/': 'fatigued_investor',
  '/beleggingspand-verkopen/': 'fatigued_investor',
  '/vastgoedportefeuille-verkopen/': 'fatigued_investor',
};

const SITUATION = {
  geerfd: 'distressed_urgent', scheiding: 'distressed_urgent', financieel: 'distressed_urgent',
  leegstand: 'distressed_urgent', buitenland: 'distressed_urgent', onderhoud: 'klushuis_low_label',
};

export function avatarFor({ form_type, page, data = {}, utm_campaign = '' }) {
  if (form_type === 'investeerder') return null; // a buyer, not a seller
  if (FUNNEL_AVATAR[form_type]) return FUNNEL_AVATAR[form_type];
  for (const [re, avatar] of CAMPAIGN_HINTS) if (re.test(utm_campaign)) return avatar;
  if (form_type === 'verhuurd' || form_type === 'commercieel') return 'fatigued_investor';
  if (form_type === 'verkoop') return SITUATION[data.situation] || PAGE_HINTS[page] || null;
  return PAGE_HINTS[page] || null;
}
