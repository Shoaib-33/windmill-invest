// Turns page objects (see content/SCHEMA.md) into HTML. Pure functions; build.js writes the files.
// One renderer per language. Content always names pages by their Dutch slug; pathFor() gives the URL.
import { GROUPS, pathFor } from './pages.js';
import { CONTACT_FIELDS, PRIVACY_WORD, activeFields, consentsFor, formFor } from './forms.js';

export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const DIVISIONS = ['verkopen'];

// Photos in assets/img as <name>-<width>.webp (Pexels licence: free to use, no credit needed).
// [width, height, large file width, small file width]
const IMGS = {
  bedrijfspand: [1200, 800, 1200, 700], begijnhof: [1200, 1500, 1200, 700], buitenland: [1200, 1500, 1200, 700],
  erfenis: [1200, 1500, 1200, 700], gevels: [1200, 1500, 1200, 700], grachten: [1200, 800, 1200, 700],
  hero: [1800, 1200, 1800, 1100], huis: [1200, 1500, 1200, 700], kennis: [1200, 1500, 1200, 700],
  leegstand: [1200, 800, 1200, 700], notaris: [1200, 1500, 1200, 700], opknapper: [1200, 900, 1200, 700],
  portefeuille: [1200, 1500, 1200, 700], scheiding: [1200, 800, 1200, 700], terughuren: [1200, 800, 1200, 700],
  verhuurd: [1200, 800, 1200, 700],
};
// The photo at the top of each page; pages not listed use their group's.
const PAGE_IMG = {
  '/vastgoed-verkopen/': 'grachten', '/huis-verkopen/': 'huis', '/huis-verkopen-zonder-makelaar/': 'begijnhof',
  '/huis-verkopen-aan-opkoper/': 'gevels', '/verhuurde-woning-verkopen/': 'verhuurd', '/beleggingspand-verkopen/': 'gevels',
  '/bedrijfspand-verkopen/': 'bedrijfspand', '/vastgoedportefeuille-verkopen/': 'portefeuille', '/geerfd-huis-verkopen/': 'erfenis',
  '/huis-verkopen-met-achterstallig-onderhoud/': 'opknapper', '/leegstaande-woning-verkopen/': 'leegstand',
  '/huis-verkopen-en-terughuren/': 'terughuren', '/huis-verkopen-vanuit-het-buitenland/': 'buitenland',
  '/over-ons/': 'grachten', '/werkwijze/': 'notaris', '/praktijkvoorbeelden/': 'huis', '/contact/': 'terughuren',
  '/veelgestelde-vragen/': 'begijnhof', '/kennisbank/': 'kennis', '/kennisbank/koop-breekt-geen-huur/': 'verhuurd',
};
const GROUP_IMG = { verkopen: 'huis', kennisbank: 'kennis', core: 'grachten' };
const FUNNEL_IMG = { '/snel-verkopen/': 'hero', '/scheiding/': 'scheiding', '/erfenis/': 'erfenis', '/verkopen-zoals-het-is/': 'opknapper', '/energielabel/': 'huis', '/verhuurd-verkopen/': 'verhuurd', '/portefeuille/': 'portefeuille' };

// Fixed interface text. Page copy lives in content/ and content/en/.
const UI = {
  nl: {
    htmlLang: 'nl', locale: 'nl_NL', inLanguage: 'nl-NL', dateLocale: 'nl-NL', country: 'Nederland',
    home: 'home', mainMenu: 'Hoofdmenu', menu: 'Menu', breadcrumb: 'Kruimelpad', headerCta: 'Vraag een bod aan',
    call: 'Bel', faq: 'Veelgestelde vragen', related: 'Ook interessant', view: 'Bekijk', readArticle: 'Lees het artikel',
    sources: 'Bronnen', updated: 'Bijgewerkt op', minRead: 'min. lezen', version: 'Versie',
    switchTo: 'English', switchLabel: 'Read this page in English', switchLang: 'en',
    tagline: 'Wij kopen woningen en panden rechtstreeks van eigenaren, in heel Nederland.',
    disclaimer: 'Windmill Invest geeft geen juridisch, fiscaal of financieel advies. Een bod is geen taxatierapport.',
    kvk: 'KvK', cookieSettings: 'Cookie-instellingen', sellCol: 'Verkopen', companyCol: 'Windmill Invest', contactCol: 'Contact',
    cookieTitle: (d) => `Cookies op ${d}`,
    cookieText: 'Wij gebruiken functionele cookies om de site te laten werken. Met uw toestemming gebruiken wij ook cookies voor statistieken en om onze advertenties te meten. Meer leest u in het',
    cookiePolicy: 'cookiebeleid', cookieFunctional: 'Functioneel (altijd aan)', cookieStats: 'Statistieken', cookieMarketing: 'Marketing',
    onlyFunctional: 'Alleen functioneel', acceptAll: 'Alles accepteren', settings: 'Instellingen', saveChoice: 'Keuze opslaan',
    demo: 'Dit is een voorbeeldsite. Bedrijfsgegevens zijn fictief, de juridische teksten zijn nog niet door een jurist gecontroleerd en aanvragen worden alleen lokaal opgeslagen.',
    choose: 'Maak een keuze', honeypot: 'Laat dit veld leeg', next: 'Volgende', back: 'Vorige',
    howItWorks: 'Zo werkt het', faqShort: 'Vragen', startRequest: 'Start uw aanvraag',
    quickTitle: 'Zie direct uw woning van bovenaf', quickSub: 'Vul uw adres in. Daarna vertelt u in twee minuten over uw woning.', quickPostcode: 'Postcode', quickNumber: 'Huisnr.', quickButton: 'Start gratis aanvraag',
    textSize: 'Grotere tekst',
    formBadge: 'Gratis · 2 min', formTrust: ['Vertrouwelijk', 'Geen verplichtingen', 'Geen kosten'],
    sideTitle: 'Klaar voor een bod?', sideText: 'Twee minuten, vrijblijvend. Wij nemen contact met u op.',
    quickNote: ['Gratis en vrijblijvend', 'Klaar in 2 minuten'],
    formEyebrow: 'Gratis en vrijblijvend', callUs: 'Liever even bellen?', callUsText: 'Bel ons, we denken graag met u mee.',
    badgeTitle: 'Rechtstreeks verkopen', badgeText: 'Geen makelaar, geen courtage',
    finalTitle: 'Klaar om te verkopen?', finalText: 'Vraag vandaag nog een vrijblijvend bod aan.',
    more: 'Lees meer', mapCaption: '', legalNotice: '',
    callbackOpen: 'Of laat u terugbellen', close: 'Sluiten', whatsapp: 'WhatsApp ons',
    speak: 'Inspreken in plaats van typen', watchVideo: 'Bekijk hoe het werkt', videoLength: '30 sec', videoHint: 'Zo verkoopt u aan Windmill Invest',
    letterCode: 'Code uit de brief', letterHint: 'Staat rechtsboven in de brief. Geen code? Ga gewoon verder.',
    waText: 'Hallo Windmill Invest, ik wil graag meer weten over het verkopen van mijn woning.',
    reviews: {
      eyebrow: 'Reviews', title: 'Wat verkopers over ons zeggen', write: 'Schrijf een review',
      empty: 'Nog geen reviews. Heeft u uw woning aan ons verkocht? Vertel anderen hoe het ging.',
      check: 'Elke review wordt gelezen voordat hij verschijnt.',
      of: 'van de 5', count: (n) => `${n} ${n === 1 ? 'review' : 'reviews'}`, more: 'Meer reviews',
      formTitle: 'Uw ervaring', formIntro: 'Hoe was het om uw woning aan Windmill Invest te verkopen? Uw review verschijnt na controle.',
      rating: 'Uw beoordeling', stars: (n) => `${n} van de 5 sterren`, name: 'Uw voornaam', place: 'Woonplaats (optioneel)',
      text: 'Uw review', textHint: 'Minimaal 20 tekens.',
      email: 'E-mailadres (optioneel, niet zichtbaar)', emailHint: 'Alleen om te controleren dat u bij ons verkocht heeft.',
      consent: 'Mijn review mag met voornaam en woonplaats op de website verschijnen. Meer in de',
      privacy: 'privacyverklaring', send: 'Review versturen',
    },
  },
  en: {
    htmlLang: 'en', locale: 'en_GB', inLanguage: 'en', dateLocale: 'en-GB', country: 'Netherlands',
    home: 'home', mainMenu: 'Main menu', menu: 'Menu', breadcrumb: 'Breadcrumb', headerCta: 'Request an offer',
    call: 'Call', faq: 'Frequently asked questions', related: 'Also of interest', view: 'View', readArticle: 'Read the article',
    sources: 'Sources', updated: 'Updated', minRead: 'min read', version: 'Version',
    switchTo: 'Nederlands', switchLabel: 'Lees deze pagina in het Nederlands', switchLang: 'nl',
    tagline: 'We buy homes and buildings directly from owners, across the Netherlands.',
    disclaimer: 'Windmill Invest does not give legal, tax or financial advice. An offer is not a valuation report.',
    kvk: 'Chamber of Commerce (KvK)', cookieSettings: 'Cookie settings', sellCol: 'Sell', companyCol: 'Windmill Invest', contactCol: 'Contact',
    cookieTitle: (d) => `Cookies on ${d}`,
    cookieText: 'We use functional cookies to make the site work. With your consent, we also use cookies for statistics and to measure our advertising. Read more in our',
    cookiePolicy: 'cookie policy', cookieFunctional: 'Functional (always on)', cookieStats: 'Statistics', cookieMarketing: 'Marketing',
    onlyFunctional: 'Functional only', acceptAll: 'Accept all', settings: 'Settings', saveChoice: 'Save choice',
    demo: 'This is a demo site. Company details are fictitious, the legal texts have not yet been reviewed by a lawyer and inquiries are only stored locally.',
    choose: 'Please choose', honeypot: 'Leave this field empty', next: 'Next', back: 'Back',
    howItWorks: 'How it works', faqShort: 'Questions', startRequest: 'Start your request',
    quickTitle: 'See your home from above', quickSub: 'Enter your address. Then tell us about your home in two minutes.', quickPostcode: 'Postcode', quickNumber: 'No.', quickButton: 'Start free request',
    textSize: 'Larger text',
    formBadge: 'Free · 2 min', formTrust: ['Confidential', 'No obligation', 'No costs'],
    sideTitle: 'Ready for an offer?', sideText: 'Two minutes, no obligation. We will contact you.',
    quickNote: ['Free, no obligation', 'Takes 2 minutes'],
    formEyebrow: 'Free, no obligation', callUs: 'Rather call?', callUsText: 'Call us, we are happy to help.',
    badgeTitle: 'Sell directly', badgeText: 'No agent, no commission',
    finalTitle: 'Ready to sell?', finalText: 'Request a free, no-obligation offer today.',
    more: 'Read more', mapCaption: '',
    callbackOpen: 'Or have us call you back', close: 'Close', whatsapp: 'WhatsApp us',
    speak: 'Speak instead of typing', watchVideo: 'See how it works', videoLength: '30 sec', videoHint: 'How selling to Windmill Invest works',
    letterCode: 'Code from the letter', letterHint: 'At the top right of the letter. No code? Just carry on.',
    waText: 'Hello Windmill Invest, I would like to know more about selling my home.',
    reviews: {
      eyebrow: 'Reviews', title: 'What sellers say about us', write: 'Write a review',
      empty: 'No reviews yet. Did you sell your home to us? Tell others how it went.',
      check: 'Every review is read before it appears.',
      of: 'out of 5', count: (n) => `${n} ${n === 1 ? 'review' : 'reviews'}`, more: 'More reviews',
      formTitle: 'Your experience', formIntro: 'How was selling your home to Windmill Invest? Your review appears after a check.',
      rating: 'Your rating', stars: (n) => `${n} out of 5 stars`, name: 'Your first name', place: 'Town (optional)',
      text: 'Your review', textHint: 'At least 20 characters.',
      email: 'Email address (optional, not shown)', emailHint: 'Only to check that you sold to us.',
      consent: 'My review may appear on the website with my first name and town. More in the',
      privacy: 'privacy statement', send: 'Send review',
    },
    legalNotice: 'This is an English translation provided for convenience. Only the Dutch version is legally binding; if the two differ, the Dutch version prevails.',
  },
};

// Small line icons (stroke = currentColor).
const ICON = {
  check: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>',
  cross: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>',
  arrow: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  phone: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>',
  mail: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/></svg>',
  pin: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  shield: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
};
ICON.whatsapp = '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.9 5-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9a8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>';
ICON.play = '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>';
ICON.mic = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></svg>';
// Line drawings for "what we buy" (content cards name one with `icon`).
const TYPE_ICONS = {
  tussenwoning: '<path d="M2 21h20M4 21V10l4-3 4 3 4-3 4 3v11"/><path d="M8 21v-5M16 21v-5M12 10v11"/>',
  hoekwoning: '<path d="M2 21h20M4 21V11l6-5 6 5v10M16 21V13h4v8"/><path d="M8 21v-4h4v4"/>',
  twee: '<path d="M2 21h20M3 21V11l5-5 4 4 4-4 5 5v10"/><path d="M12 10v11M6 21v-4h3v4M15 21v-4h3v4"/>',
  vrijstaand: '<path d="M2 21h20M5 21V11l7-6 7 6v10"/><path d="M10 21v-5h4v5M7 13h2M15 13h2"/>',
  appartement: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21v-3h2v3"/>',
  boerderij: '<path d="M2 21h20M3 21v-8l6-6 6 6v8"/><path d="M15 21V11h6v10M7 21v-4h4v4M18 11V8"/>',
  winkel: '<path d="M3 21h18M4 21V11M20 21V11M3 10l2-6h14l2 6zM9 21v-5h6v5"/>',
  bedrijfspand: '<path d="M2 21h20M3 21V9l6 3V9l6 3V5h6v16"/><path d="M7 17h2M12 17h2M17 9h2M17 13h2"/>',
};
const typeIcon = (k) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${TYPE_ICONS[k] || TYPE_ICONS.vrijstaand}</svg>`;

// Icons for the four trust points in the home hero and the four steps.
const STEP_ICONS = [
  '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg>',
  '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
  '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
  '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2M14 9l2 2"/></svg>',
];

// alternates: Dutch slugs of the pages that exist in the other language (for hreflang and the switcher).
// assets: content hashes of style.css and site.js, added to their URLs so browsers never keep an old copy.
export function createRenderer(pages, config, { lang = 'nl', alternates = new Set(), assets = {} } = {}) {
  const t = UI[lang];
  const other = t.switchLang;
  const bySlug = new Map(pages.map((p) => [p.slug, p]));
  const inGroup = (g) => pages.filter((p) => p.group === g);
  const L = (slug) => pathFor(slug, lang);
  const abs = (slug) => config.siteUrl + L(slug);
  const absIn = (slug, l) => config.siteUrl + pathFor(slug, l);
  const label = (g) => (lang === 'en' ? GROUPS[g].en : GROUPS[g].label);
  const tokens = { legalName: config.legalName, kvk: config.kvk, address: config.address, phone: config.phone, email: config.email, domain: config.domain };
  const fillTokens = (s) => String(s ?? '').replace(/\{\{(\w+)\}\}/g, (_, k) => tokens[k] ?? '');
  const phoneHref = 'tel:' + config.phone.replace(/[^\d+]/g, '').replace(/^0/, '+31');

  // Inline markup: tokens, **bold**, [text](/slug/). Links to pages that are not built become plain text.
  const inline = (text) => esc(fillTokens(text))
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, txt, href) => (bySlug.has(href.split('#')[0]) ? `<a href="${L(href)}">${txt}</a>` : txt));
  const plain = (text) => fillTokens(text).replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // "**Title.** Rest" → ['Title', 'Rest'] for steps and promises.
  const splitLead = (s) => { const m = /^\*\*(.+?)\*\*\s*(.*)$/.exec(s); return m ? [m[1].replace(/\.$/, ''), m[2]] : ['', s]; };

  // Responsive photo. Decorative by default (alt=""): the text next to it says what it shows.
  const img = (name, { sizes = '(min-width: 1000px) 50vw, 100vw', eager = false, cls = '', alt = '' } = {}) => {
    const [w, h, big, small] = IMGS[name] || IMGS.huis;
    const src = (x) => `/assets/img/${name}-${x}.webp`;
    return `<img${cls ? ` class="${cls}"` : ''} src="${src(small)}" srcset="${src(small)} ${small}w, ${src(big)} ${big}w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  };
  const pageImg = (p) => PAGE_IMG[p.slug] || GROUP_IMG[p.group] || 'huis';
  const reveal = (i = 0) => ` reveal" style="--i:${i}`;

  // ---------- blocks ----------
  const blocks = {
    p: (v) => `<p>${inline(v)}</p>`,
    note: (v) => `<p class="note">${inline(v)}</p>`,
    ul: (v) => `<ul>${v.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`,
    check: (v) => `<ul class="check">${v.map((i) => `<li>${ICON.check}<span>${inline(i)}</span></li>`).join('')}</ul>`,
    ol: (v) => `<ol class="steps">${v.map((i) => `<li>${inline(i)}</li>`).join('')}</ol>`,
    cards: (v) => `<div class="cards">${v.map((c) => {
      const link = c.href && bySlug.has(c.href);
      return `<div class="card${link ? ' card-link' : ''}"><h3>${link ? `<a href="${L(c.href)}">${inline(c.t)}</a>` : inline(c.t)}</h3>${c.d ? `<p>${inline(c.d)}</p>` : ''}${link ? `<span class="card-more" aria-hidden="true">${esc(c.label)} ${ICON.arrow}</span>` : ''}</div>`;
    }).join('')}</div>`,
    table: (v) => `<figure class="table"><div class="table-scroll" tabindex="0"><table><thead><tr>${v.head.map((h) => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead><tbody>${v.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>${v.note ? `<figcaption>${inline(v.note)}</figcaption>` : ''}</figure>`,
    callout: (v) => `<aside class="callout">${ICON.shield}<div><strong>${inline(v.t)}</strong> ${inline(v.d)}</div></aside>`,
    auto: (v) => auto[v](),
  };
  const renderBlock = (b) => { const [k] = Object.keys(b); return blocks[k] ? blocks[k](b[k]) : ''; };
  const slugId = (s) => plain(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const renderSections = (p) => p.sections.map((s) => `<section id="${slugId(s.h)}" class="reveal"><h2>${inline(s.h)}</h2>${s.blocks.map(renderBlock).join('')}</section>`).join('');

  const auto = {
    faq: () => DIVISIONS.map((g) => inGroup(g).filter((p) => p.faq.length).map((p) => `<div class="faq-source"><h3><a href="${L(p.slug)}">${esc(plain(p.nav))}</a></h3>${faqList(p.faq.slice(0, 3))}</div>`).join('')).join(''),
    articles: () => `<div class="article-grid">${inGroup('kennisbank').map((p, i) => `<a class="article-card${reveal(i)}" href="${L(p.slug)}"><span class="article-media">${img(pageImg(p), { sizes: '(min-width: 800px) 40vw, 100vw' })}</span><span class="article-body"><span class="eyebrow">${esc(plain(p.eyebrow))}</span><strong>${esc(plain(p.h1))}</strong><span>${esc(plain(p.meta))}</span><span class="card-more">${t.readArticle} ${ICON.arrow}</span></span></a>`).join('')}</div>`,
  };

  const faqList = (items) => `<div class="faq">${items.map((f) => `<details><summary>${inline(f.q)}<span class="faq-icon" aria-hidden="true"></span></summary><div><p>${inline(f.a)}</p></div></details>`).join('')}</div>`;

  // ---------- forms ----------
  // Choices with up to 8 options are shown as tappable tiles (radio buttons) instead of a dropdown: faster on a
  // phone and every option is visible. The call-back form keeps its compact dropdown.
  const OPTION_ICONS = {
    property_type: { woning: 'vrijstaand', appartement: 'appartement', meerdere: 'tussenwoning', gemengd: 'winkel', anders: 'hoekwoning', kantoor: 'bedrijfspand', bedrijfshal: 'bedrijfspand', winkel: 'winkel' },
  };
  function tiles(fd, id, req) {
    const icons = OPTION_ICONS[fd.name];
    const short = !icons && fd.options.every(([, l]) => l.length <= 12);
    return `<fieldset class="field tiles${short ? ' tiles-short' : ''}${icons ? ' tiles-icons' : ''}"><legend>${esc(fd.label)}</legend><div class="tile-grid">${fd.options.map(([k, l]) => `<label class="tile"><input type="radio" id="${id}-${esc(k)}" name="${fd.name}" value="${esc(k)}"${req}>${icons ? `<span class="tile-icon">${typeIcon(icons[k])}</span>` : ''}<span class="tile-label">${esc(l)}</span><span class="tile-check" aria-hidden="true">${ICON.check}</span></label>`).join('')}</div><p class="field-error" data-error-for="${fd.name}" hidden></p></fieldset>`;
  }

  // pre: prefix for element ids, so two forms can be on one page (the call-back form is on every page).
  function field(fd, pre = 'f') {
    const id = `${pre}-${fd.name}`;
    const req = fd.required ? ' required' : '';
    if (fd.type === 'select' && pre !== 'cb' && fd.options.length <= 8) return tiles(fd, id, req);
    const common = `id="${id}" name="${fd.name}"${req}${fd.autocomplete ? ` autocomplete="${fd.autocomplete}"` : ''}${fd.placeholder ? ` placeholder="${esc(fd.placeholder)}"` : ''}`;
    let input;
    if (fd.type === 'select') input = `<select ${common}><option value="">${t.choose}</option>${fd.options.map(([k, l]) => `<option value="${esc(k)}">${esc(l)}</option>`).join('')}</select>`;
    // Text areas get a microphone (site.js shows it only where the browser can turn speech into text).
    else if (fd.type === 'textarea') input = `<div class="textarea-wrap"><textarea ${common} rows="3" maxlength="${fd.max || 2000}"></textarea><button type="button" class="mic" data-mic hidden aria-pressed="false" aria-label="${t.speak}" title="${t.speak}">${ICON.mic}</button></div>`;
    else if (fd.type === 'postcode') input = `<input type="text" ${common} inputmode="text" autocomplete="postal-code" maxlength="7" pattern="[1-9][0-9]{3} ?[A-Za-z]{2}">`;
    else if (fd.type === 'number') input = `<input type="text" ${common} inputmode="numeric">`;
    // No name: site.js reads the files, makes them smaller and sends them as fd.name.
    else if (fd.type === 'photos') input = `<input type="file" id="${id}" accept="image/*" multiple data-photos>`;
    else if (fd.type === 'checkbox') {
      return `<div class="field field-check"><label class="consent"><input type="checkbox" id="${id}" name="${fd.name}"> <span>${esc(fd.label)}</span></label></div>`;
    } else input = `<input type="${fd.type}" ${common}${fd.max ? ` maxlength="${fd.max}"` : ''}>`;
    const html = `<div class="field${fd.half ? ' half' : ''}"><label for="${id}">${esc(fd.label)}</label>${input}<p class="field-error" data-error-for="${fd.name}" hidden></p></div>`;
    // After the house number: the address found in the BAG (filled in by site.js) and the chosen BAG id.
    return fd.name === 'house_number'
      ? `${html}<div class="address-result" data-address-result hidden aria-live="polite"></div><input type="hidden" name="address_id">`
      : html;
  }

  function consentBoxes(form) {
    const privacy = `<a href="${L('/privacyverklaring/')}">${PRIVACY_WORD[lang]}</a>`;
    return consentsFor(form).map((c) => {
      const text = esc(c[lang]).replace('{privacy}', privacy).replace('{brand}', esc(config.brand));
      const box = `<label class="consent"><input type="checkbox" name="${c.field}"${c.required ? ' required' : ''}> <span>${text}</span></label>`;
      return c.required ? `${box}\n<p class="field-error" data-error-for="${c.field}" hidden></p>` : box;
    }).join('\n');
  }

  // Forms with steps show one screen at a time once site.js runs; without JavaScript every step is visible
  // and the form still works.
  function stepScreens(form, pre) {
    const fields = activeFields(form);
    const total = form.steps.length;
    const nav = (n) => `<div class="step-nav">${n > 1 ? `<button type="button" class="btn btn-plain" data-step-back hidden>${t.back}</button>` : ''}${n < total ? `<button type="button" class="btn btn-action" data-step-next hidden>${t.next} ${ICON.arrow}</button>` : ''}</div>`;
    return `<div class="step-progress" data-step-progress hidden><span data-step-label></span><span class="step-bar"><i></i></span></div>
${form.steps.map((title, i) => {
    const n = i + 1;
    const last = n === total;
    const inner = fields.filter((fd) => fd.step === n).map((fd) => field(fd, pre)).join('') + (last ? CONTACT_FIELDS(form).map((fd) => field(fd, pre)).join('') : '');
    return `<fieldset class="form-step" data-step="${n}" data-step-title="${esc(title)}"><legend>${esc(title)}</legend><div class="fields">${inner}</div>${last ? `${consentBoxes(form)}\n<button type="submit" class="btn btn-action btn-lg">${esc(form.button)} ${ICON.arrow}</button>` : ''}${nav(n)}</fieldset>`;
  }).join('\n')}`;
  }

  function leadForm(p, { id = 'formulier', pre = 'f', attrs = '' } = {}) {
    const form = formFor(p.form, lang);
    const body = form.steps
      ? stepScreens(form, pre)
      : `<div class="fields">${(form.contactFirst ? [...CONTACT_FIELDS(form), ...activeFields(form)] : [...activeFields(form), ...CONTACT_FIELDS(form)]).map((fd) => field(fd, pre)).join('')}</div>
${consentBoxes(form)}
<button type="submit" class="btn btn-action btn-lg">${esc(form.button)} ${ICON.arrow}</button>`;
    const callback = p.form === 'terugbellen';
    const startsWithAddress = form.steps && form.fields[0]?.name === 'postcode';
    const teaser = startsWithAddress ? `<div class="form-teaser"><span class="quick-aerial" aria-hidden="true"><img src="/assets/img/aerial-sample.webp" alt="" width="256" height="256" loading="lazy"><i></i></span><span>${t.quickTitle}</span></div>` : '';
    const trust = callback ? '' : `<p class="form-trust">${t.formTrust.map((x) => `<span>${ICON.check}${x}</span>`).join('')}</p>`;
    return `<form class="lead-form${callback ? '' : ' lead-form-main'}" id="${id}" data-lead-form${form.steps ? ' data-steps' : ''}${attrs} novalidate>
${callback ? '' : `<span class="form-badge">${t.formBadge}</span>`}
<h2 class="form-title" id="${id}-title">${esc(form.title)}</h2>
<p class="form-intro">${esc(form.intro)}</p>${teaser}${startsWithAddress ? '<div class="house-summary" data-house-summary hidden></div>' : ''}
<input type="hidden" name="form_type" value="${p.form}">
<input type="hidden" name="page" value="${p.slug}">
<input type="hidden" name="lang" value="${lang}">
<div class="hp" aria-hidden="true"><label>${t.honeypot} <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
${body}
${trust}
<p class="form-status" role="status" aria-live="polite"></p>
</form>`;
  }

  // ---------- page parts ----------
  const logo = (cls = '') => `<svg class="logo-mark ${cls}" viewBox="0 0 40 40" aria-hidden="true"><g transform="rotate(18 20 20)" fill="currentColor"><path d="M18.6 18 L16 3.5 L22 3 L21.4 18Z"/><path d="M22 18.6 L36.5 16 L37 22 L22 21.4Z"/><path d="M21.4 22 L24 36.5 L18 37 L18.6 22Z"/><path d="M18 21.4 L3.5 24 L3 18 L18 18.6Z"/></g><circle cx="20" cy="20" r="4" fill="var(--action)"/></svg>`;

  // The same page in the other language, or that language's home page if it has no translation yet.
  const switchHref = (p) => pathFor(alternates.has(p.slug) ? p.slug : '/', other);
  const langSwitch = (p) => `<a class="lang-switch" href="${switchHref(p)}" hreflang="${other}" lang="${other}" title="${esc(t.switchLabel)}" data-lang-switch><span aria-hidden="true">${other.toUpperCase()}</span><span class="sr-only">${esc(t.switchTo)}</span></a>`;
  // Where "request an offer" goes: the form on this page, or the one on the home page.
  const ctaHref = (p) => (p.form ? '#formulier' : `${L('/')}#formulier`);

  function header(p) {
    const items = inGroup('verkopen');
    const sell = items.length ? `<li class="has-menu"><button type="button" class="nav-top" aria-expanded="false"${p.group === 'verkopen' ? ' aria-current="true"' : ''}>${esc(label('verkopen'))}</button><div class="submenu"><ul>${items.map((it) => `<li><a href="${L(it.slug)}"${it.slug === p.slug ? ' aria-current="page"' : ''}>${esc(plain(it.nav))}</a></li>`).join('')}</ul></div></li>` : '';
    const top = (slug) => (bySlug.has(slug) ? `<li><a class="nav-top" href="${L(slug)}"${p.slug === slug ? ' aria-current="page"' : ''}>${esc(plain(bySlug.get(slug).nav))}</a></li>` : '');
    return `<header class="site-header${p.template === 'home' ? ' is-overlay' : ''}" data-header><div class="wrap header-inner">
<a class="brand" href="${L('/')}" aria-label="${esc(config.brand)} – ${t.home}">${logo()}<span>${esc(config.brand)}</span></a>
<nav id="site-nav" class="site-nav" aria-label="${t.mainMenu}"><ul>${sell}${top('/werkwijze/')}${top('/praktijkvoorbeelden/')}${top('/kennisbank/')}${top('/over-ons/')}${top('/contact/')}</ul>
<a class="menu-phone" href="${phoneHref}" data-cta="phone">${ICON.phone} ${t.call} ${esc(config.phone)}</a></nav>
<div class="header-actions">${langSwitch(p)}<button type="button" class="text-size" data-text-size aria-pressed="false" title="${t.textSize}"><span aria-hidden="true">A<small>A</small></span><span class="sr-only">${t.textSize}</span></button>
<a class="header-phone" href="${phoneHref}" data-cta="phone" title="${t.call} ${esc(config.phone)}">${ICON.phone}<span class="sr-only">${t.call} ${esc(config.phone)}</span></a>
<a class="btn btn-action btn-small header-cta" href="${ctaHref(p)}" data-cta="header" data-offer-open>${t.headerCta}</a>
<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav"><span class="sr-only">${t.menu}</span><span class="bars" aria-hidden="true"></span></button></div>
</div></header>`;
  }

  function footer() {
    const list = (items) => `<ul>${items.map((it) => `<li><a href="${L(it.slug)}">${esc(plain(it.nav))}</a></li>`).join('')}</ul>`;
    const core = pages.filter((x) => x.group === 'core' && x.slug !== '/');
    return `<footer class="site-footer"><div class="wrap">
<div class="footer-top"><div class="footer-brand"><a class="brand" href="${L('/')}">${logo()}<span>${esc(config.brand)}</span></a><p>${t.tagline}</p>
<a class="btn btn-action" href="${L('/')}#formulier" data-cta="footer">${t.headerCta} ${ICON.arrow}</a></div>
<div class="footer-cols"><div><h2>${t.sellCol}</h2>${list(inGroup('verkopen'))}</div>
<div><h2>${t.companyCol}</h2>${list(core)}</div>
<div><h2>${t.contactCol}</h2><ul class="footer-contact"><li><a href="${phoneHref}">${ICON.phone}${esc(config.phone)}</a></li><li><a href="mailto:${esc(config.email)}">${ICON.mail}${esc(config.email)}</a></li><li>${ICON.pin}<span>${esc(config.address)}</span></li><li class="footer-kvk">${t.kvk} ${esc(config.kvk)}<br>${esc(config.legalName)}</li></ul></div></div></div>
<div class="footer-bottom"><ul>${inGroup('legal').map((it) => `<li><a href="${L(it.slug)}">${esc(plain(it.nav))}</a></li>`).join('')}<li><button type="button" class="linklike" data-cookie-settings>${t.cookieSettings}</button></li></ul>
<p>${t.disclaimer} © ${new Date().getFullYear()} ${esc(config.legalName)}</p></div>
</div></footer>`;
  }

  const cookieBanner = () => `<div class="cookie" data-cookie-banner hidden role="dialog" aria-labelledby="cookie-title" aria-modal="false">
<h2 id="cookie-title">${esc(t.cookieTitle(config.domain))}</h2>
<p>${t.cookieText} <a href="${L('/cookiebeleid/')}">${t.cookiePolicy}</a>.</p>
<div class="cookie-prefs" data-cookie-prefs hidden>
<label><input type="checkbox" checked disabled> ${t.cookieFunctional}</label>
<label><input type="checkbox" name="analytics"> ${t.cookieStats}</label>
<label><input type="checkbox" name="marketing"> ${t.cookieMarketing}</label>
</div>
<div class="cookie-actions">
<button type="button" class="btn btn-plain" data-consent="functional">${t.onlyFunctional}</button>
<button type="button" class="btn btn-plain" data-consent="all">${t.acceptAll}</button>
<button type="button" class="linklike" data-consent="settings">${t.settings}</button>
<button type="button" class="btn btn-plain" data-consent="save" hidden>${t.saveChoice}</button>
</div></div>`;

  // On phones: a bar with the main action, hidden while the form itself is on screen (site.js).
  const mobileBar = (p) => `<div class="mobile-bar" data-mobile-bar><a class="btn btn-action" href="${ctaHref(p)}" data-cta="mobile-bar">${t.headerCta}</a>${waHref ? `<a class="btn btn-plain mobile-call mobile-wa" href="${waHref}" target="_blank" rel="noopener" data-cta="whatsapp" aria-label="${t.whatsapp}">${ICON.whatsapp}</a>` : ''}<a class="btn btn-plain mobile-call" href="${phoneHref}" data-cta="phone" aria-label="${t.call} ${esc(config.phone)}">${ICON.phone}</a></div>`;

  // "Bel mij terug": a small dialog with the call-back form, opened by any [data-callback-open] button.
  const callbackLink = (cls = 'linklike callback-link') => `<button type="button" class="${cls}" data-callback-open data-cta="callback">${t.callbackOpen}</button>`;
  const callbackDialog = (p) => `<dialog class="callback" data-callback-dialog aria-labelledby="terugbellen-title"><button type="button" class="callback-close" data-callback-close aria-label="${t.close}">${ICON.cross}</button>${leadForm({ form: 'terugbellen', slug: p.slug }, { id: 'terugbellen', pre: 'cb', attrs: ' data-callback' })}</dialog>`;
  // The 30-second explainer (video/explainer.html, rendered by video/record.mjs): a button and a pop-up player.
  // The video file only downloads when someone presses play.
  const videoButton = (cls = '') => `<button type="button" class="video-open ${cls}" data-video-open data-cta="video"><span class="video-play">${ICON.play}</span><span>${t.watchVideo} <small>${t.videoLength}</small></span></button>`;
  // A picture of the video gets more clicks than a text button: small next to the hero text, big in "Zo werkt het".
  const videoThumb = (cls = '') => `<button type="button" class="video-thumb ${cls}" data-video-open data-cta="video-thumb"><span class="vt-img"><img src="/assets/video/thumb-${lang}.jpg" alt="" width="360" height="224" loading="lazy" decoding="async"><span class="video-play">${ICON.play}</span><span class="vt-len">${t.videoLength}</span></span><span class="vt-text"><strong>${t.watchVideo}</strong><small>${t.videoHint}</small></span></button>`;
  const videoFeature = () => `<button type="button" class="video-feature reveal" data-video-open data-cta="video-feature"><img src="/assets/video/explainer-${lang}-poster.jpg" alt="" width="1280" height="720" loading="lazy" decoding="async"><span class="vf-play"><span class="video-play">${ICON.play}</span></span><span class="vf-label">${t.watchVideo} · ${t.videoLength}</span></button>`;
  const videoDialog = () => `<dialog class="video-dialog" data-video-dialog aria-label="${esc(t.watchVideo)}"><button type="button" class="callback-close" data-video-close aria-label="${t.close}">${ICON.cross}</button><video controls playsinline preload="none" poster="/assets/video/explainer-${lang}-poster.jpg" data-src="/assets/video/explainer-${lang}.mp4"></video></dialog>`;

  // The offer form sliding in from the side, opened by the header button on every page (like a shop's cart).
  const offerDrawer = (p) => `<dialog class="drawer" data-offer-drawer aria-labelledby="aanvraag-snel-title"><button type="button" class="callback-close" data-drawer-close aria-label="${t.close}">${ICON.cross}</button>${leadForm({ form: 'verkoop', slug: p.slug }, { id: 'aanvraag-snel', pre: 'sl', attrs: ' data-drawer' })}<p class="drawer-call">${callbackLink()}</p></dialog>`;
  // Reviews: the section is the same on every page; site.js fills it from /api/reviews (approved ones only),
  // so a newly approved review shows without rebuilding the site. Never put made-up reviews here.
  const star = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>';
  const reviewsSection = () => {
    const r = t.reviews;
    const text = { of: r.of, one: r.count(1), many: r.count(0).replace(/^0 /, ''), more: r.more, stars: r.stars(5).replace('5', '{n}') };
    return `<section class="reviews" id="reviews" data-reviews data-text="${esc(JSON.stringify(text))}"><div class="wrap">
<div class="reviews-head reveal"><div><p class="pill">${r.eyebrow}</p><h2>${r.title}</h2>
<div class="reviews-score" data-reviews-score hidden><strong data-reviews-avg></strong><span class="stars" data-reviews-stars></span><small data-reviews-count></small></div></div>
<button type="button" class="btn btn-plain" data-review-open data-cta="review">${star} ${r.write}</button></div>
<div class="review-row" data-reviews-list><p class="reviews-empty">${r.empty}</p></div>
<p class="reviews-check">${ICON.shield} ${r.check}</p>
</div></section>`;
  };
  const reviewDialog = () => {
    const r = t.reviews;
    const stars = [5, 4, 3, 2, 1].map((n) => `<input type="radio" name="rating" id="rv-star-${n}" value="${n}" required><label for="rv-star-${n}" title="${r.stars(n)}">${star}<span class="sr-only">${r.stars(n)}</span></label>`).join('');
    return `<dialog class="callback review-dialog" data-review-dialog aria-labelledby="review-title"><button type="button" class="callback-close" data-review-close aria-label="${t.close}">${ICON.cross}</button>
<form class="lead-form review-form" data-review-form novalidate>
<h2 class="form-title" id="review-title">${r.formTitle}</h2><p class="form-intro">${r.formIntro}</p>
<input type="hidden" name="lang" value="${lang}">
<div class="hp" aria-hidden="true"><label>${t.honeypot} <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
<div class="fields">
<fieldset class="field star-field"><legend>${r.rating}</legend><div class="star-input">${stars}</div><p class="field-error" data-error-for="rating" hidden></p></fieldset>
<div class="field half"><label for="rv-name">${r.name}</label><input type="text" id="rv-name" name="name" maxlength="60" autocomplete="given-name" required><p class="field-error" data-error-for="name" hidden></p></div>
<div class="field half"><label for="rv-place">${r.place}</label><input type="text" id="rv-place" name="place" maxlength="60" autocomplete="address-level2"></div>
<div class="field"><label for="rv-text">${r.text}</label><textarea id="rv-text" name="text" rows="4" maxlength="1000" required></textarea><p class="field-hint">${r.textHint}</p><p class="field-error" data-error-for="text" hidden></p></div>
<div class="field"><label for="rv-email">${r.email}</label><input type="email" id="rv-email" name="email" maxlength="120" autocomplete="email"><p class="field-hint">${r.emailHint}</p><p class="field-error" data-error-for="email" hidden></p></div>
</div>
<label class="consent"><input type="checkbox" name="consent" required> <span>${r.consent} <a href="${L('/privacyverklaring/')}" target="_blank" rel="noopener">${r.privacy}</a>.</span></label>
<p class="field-error" data-error-for="consent" hidden></p>
<button type="submit" class="btn btn-action btn-lg">${r.send} ${ICON.arrow}</button>
<p class="form-status" role="status" aria-live="polite"></p>
</form></dialog>`;
  };
  const waHref = config.whatsapp ? `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(t.waText)}` : '';
  const waFloat = () => (waHref ? `<a class="wa-float" href="${waHref}" target="_blank" rel="noopener" data-cta="whatsapp" aria-label="${t.whatsapp}">${ICON.whatsapp}<span>${t.whatsapp}</span></a>` : '');

  function breadcrumbTrail(p) {
    if (p.slug === '/') return [];
    const trail = [{ name: 'Home', slug: '/' }];
    const hub = GROUPS[p.group]?.hub;
    if (hub && hub !== p.slug && bySlug.has(hub)) trail.push({ name: plain(bySlug.get(hub).nav), slug: hub });
    trail.push({ name: plain(p.nav), slug: p.slug });
    return trail;
  }
  const breadcrumb = (trail) => (trail.length ? `<nav class="breadcrumb" aria-label="${t.breadcrumb}"><ol>${trail.map((x, i) => (i === trail.length - 1 ? `<li aria-current="page">${esc(x.name)}</li>` : `<li><a href="${L(x.slug)}">${esc(x.name)}</a></li>`)).join('')}</ol></nav>` : '');

  const related = (p) => {
    const items = p.related.filter((s) => bySlug.has(s)).map((s) => bySlug.get(s));
    if (!items.length) return '';
    return `<section class="related"><div class="wrap"><h2>${t.related}</h2><div class="article-grid">${items.map((r, i) => `<a class="article-card${reveal(i)}" href="${L(r.slug)}"><span class="article-media">${img(pageImg(r), { sizes: '(min-width: 800px) 30vw, 100vw' })}</span><span class="article-body"><strong>${esc(plain(r.nav))}</strong><span>${esc(plain(r.meta))}</span><span class="card-more">${t.view} ${ICON.arrow}</span></span></a>`).join('')}</div></div></section>`;
  };

  const ctaBand = (p, title = p.cta?.title, text = p.cta?.text, button = p.cta?.button) => {
    if (!title) return '';
    const href = p.form ? '#formulier' : L('/contact/');
    return `<section class="cta-band"><div class="cta-media">${img('grachten', { sizes: '100vw' })}</div><div class="wrap cta-inner reveal"><div><h2>${inline(title)}</h2><p>${inline(text)}</p></div><div class="cta-actions"><a class="btn btn-action btn-lg" href="${href}" data-cta="band">${esc(button)} ${ICON.arrow}</a><a class="btn btn-ghost" href="${phoneHref}" data-cta="phone">${ICON.phone} ${esc(config.phone)}</a>${callbackLink('btn btn-ghost')}</div></div></section>`;
  };

  const ticks = (items, cls = 'ticks') => (items.length ? `<ul class="${cls}">${items.map((h) => `<li>${ICON.check}<span>${inline(h)}</span></li>`).join('')}</ul>` : '');
  const heroActions = (p) => (p.form ? `<div class="hero-actions"><a class="btn btn-action btn-lg" href="#formulier" data-cta="hero">${t.headerCta} ${ICON.arrow}</a><a class="btn btn-plain" href="${phoneHref}" data-cta="phone">${ICON.phone} ${t.call} ${esc(config.phone)}</a></div><p class="hero-callback">${callbackLink()}</p>` : '');

  const words = (p) => JSON.stringify(p.sections).split(/\s+/).length;
  const dateFmt = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString(t.dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  // ---------- templates ----------
  function body(p, trail) {
    if (p.template === 'home') return homeBody(p);
    const article = p.template === 'article';
    const legal = p.template === 'legal';
    const meta = article ? `<p class="article-meta">${t.updated} <time datetime="${p.updated}">${dateFmt(p.updated)}</time> · ${Math.max(2, Math.round(words(p) / 220))} ${t.minRead}</p>` : legal ? `<p class="article-meta">${t.version}: ${esc(p.version)}</p>` : '';
    const notice = legal && t.legalNotice ? `<aside class="callout" lang="en">${ICON.shield}<div>${esc(t.legalNotice)} <a href="${pathFor(p.slug, 'nl')}" hreflang="nl" lang="nl">Nederlandse versie</a>.</div></aside>` : '';
    const sources = article ? `<section class="sources"><h2>${t.sources}</h2><ul>${p.sources.map((s) => `<li>${inline(s)}</li>`).join('')}</ul></section>` : '';
    const faq = p.faq.length ? `<section class="faq-section reveal" id="veelgestelde-vragen"><h2>${t.faq}</h2>${faqList(p.faq)}</section>` : '';
    // Pages with a form (except articles): photo header with the form in it, so it is the first thing people see
    // (on phones straight after the headline). Beside the text, a small card brings them back to it.
    const formTop = p.form && !article && !legal;
    const sideCard = `<aside class="side"><div class="side-card"><p class="side-title">${t.sideTitle}</p><p>${t.sideText}</p><a class="btn btn-action" href="#formulier" data-cta="side">${t.headerCta} ${ICON.arrow}</a><a class="side-call" href="${phoneHref}" data-cta="phone">${ICON.phone} ${esc(config.phone)}</a>${callbackLink()}</div></aside>`;
    const aside = formTop ? sideCard : p.form ? `<aside class="side">${leadForm(p)}</aside>` : '';
    const head = formTop
      ? `<div class="page-hero page-hero-form"><div class="hero-media">${img(pageImg(p), { eager: true, sizes: '100vw', cls: 'hero-img' })}</div><div class="wrap funnel-grid"><div class="page-hero-copy">${breadcrumb(trail)}
<p class="pill pill-light">${inline(p.eyebrow)}</p><h1>${inline(p.h1)}</h1><p class="hero-lead">${inline(p.intro)}</p>${ticks(p.heroPoints, 'ticks ticks-light')}<p class="hero-callback">${callbackLink()}</p></div>
<div class="hero-form">${leadForm(p)}</div></div></div>`
      : legal
      ? `<div class="page-hero page-hero-plain"><div class="wrap">${breadcrumb(trail)}<h1>${inline(p.h1)}</h1>${meta}<p class="lead">${inline(p.intro)}</p></div></div>`
      : `<div class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy">${breadcrumb(trail)}
<p class="pill">${inline(p.eyebrow)}</p><h1>${inline(p.h1)}</h1>${meta}<p class="lead">${inline(p.intro)}</p>${ticks(p.heroPoints)}${heroActions(p)}</div>
<figure class="page-hero-media">${img(pageImg(p), { eager: true, sizes: '(min-width: 1000px) 40vw, 100vw' })}<figcaption class="float-badge">${ICON.shield}<span><strong>${t.badgeTitle}</strong>${t.badgeText}</span></figcaption></figure></div></div>`;
    return `${head}
<div class="wrap layout${aside ? '' : ' layout-single'}"><div class="prose">${notice}${renderSections(p)}${faq}${sources}</div>${aside}</div>
${legal ? '' : related(p) + ctaBand(p)}`;
  }

  // The home page: each content section has a `look` with its own design.
  function homeBody(p) {
    const looks = {
      situations: (s) => {
        const intro = s.blocks.find((b) => b.p)?.p;
        const cards = s.blocks.find((b) => b.cards)?.cards || [];
        return `<section class="home-situations" id="${slugId(s.h)}"><div class="wrap"><div class="section-head reveal"><h2>${inline(s.h)}</h2>${intro ? `<p>${inline(intro)}</p>` : ''}</div>
<div class="sit-grid">${cards.map((c, i) => `<a class="sit-card${reveal(i % 4)}" href="${bySlug.has(c.href) ? L(c.href) : '#formulier'}"><span class="sit-media">${img(c.img || 'huis', { sizes: '(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw' })}</span><span class="sit-body"><strong>${inline(c.t)}</strong><span>${inline(c.d || '')}</span></span><span class="sit-arrow" aria-hidden="true">${ICON.arrow}</span></a>`).join('')}</div></div></section>`;
      },
      // On wide screens the steps play like a story: the cards scroll by while the picture on the right stays
      // and changes with the step in view (site.js marks the active one). On phones: the plain list of cards.
      steps: (s) => {
        const items = s.blocks.find((b) => b.ol)?.ol || [];
        const n = items.length;
        return `<section class="home-steps story" id="${slugId(s.h)}" data-story><div class="wrap"><div class="steps-head"><div class="section-head reveal"><h2>${inline(s.h)}</h2><p>${t.videoHint}. ${t.videoLength}.</p></div>${videoFeature()}</div>
<div class="story-grid"><ol class="step-row">${items.map((it, i) => { const [h, d] = splitLead(it); return `<li class="step-card${reveal(i)}" data-story-step="${i}"><span class="step-icon">${STEP_ICONS[i % STEP_ICONS.length]}</span><span class="step-num">${String(i + 1).padStart(2, '0')}</span><h3>${inline(h)}</h3><p>${inline(d)}</p></li>`; }).join('')}</ol>
<div class="story-visual" aria-hidden="true"><div class="story-stage" data-story-stage style="--n:${n}"><svg class="story-ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54"/><circle class="story-ring-fill" cx="60" cy="60" r="54"/></svg>
${items.map((it, i) => `<span class="story-icon${i === 0 ? ' on' : ''}" data-story-icon="${i}">${STEP_ICONS[i % STEP_ICONS.length]}</span>`).join('')}
<span class="story-count"><b data-story-num>01</b> / ${String(n).padStart(2, '0')}</span></div>
<p class="story-caption" data-story-caption>${inline(splitLead(items[0] || '')[0])}</p>${items.map((it, i) => `<template data-story-text="${i}">${inline(splitLead(it)[0])}</template>`).join('')}</div></div>
<div class="steps-cta reveal"><a class="btn btn-action btn-lg" href="#formulier" data-cta="steps">${t.headerCta} ${ICON.arrow}</a></div></div></section>`;
      },
      compare: (s) => {
        const tb = s.blocks.find((b) => b.table)?.table;
        if (!tb) return '';
        return `<section class="home-compare" id="${slugId(s.h)}"><div class="wrap"><div class="section-head reveal"><h2>${inline(s.h)}</h2></div>
<div class="compare reveal" role="table" aria-label="${esc(plain(s.h))}"><div class="compare-row compare-head" role="row"><span role="columnheader"><span class="sr-only">${inline(tb.head[0])}</span></span><span role="columnheader" class="compare-us">${logo()} ${inline(tb.head[1])}</span><span role="columnheader">${inline(tb.head[2])}</span></div>
${tb.rows.map((r) => `<div class="compare-row" role="row"><span role="rowheader" class="compare-topic">${inline(r[0])}</span><span role="cell" class="compare-us">${ICON.check}${inline(r[1])}</span><span role="cell" class="compare-them">${ICON.cross}${inline(r[2])}</span></div>`).join('')}</div>
${tb.note ? `<p class="note compare-note reveal">${inline(tb.note)}</p>` : ''}</div></section>`;
      },
      types: (s) => {
        const intro = s.blocks.find((b) => b.p)?.p;
        const cards = s.blocks.find((b) => b.cards)?.cards || [];
        return `<section class="home-types" id="${slugId(s.h)}"><div class="wrap types-grid"><div class="section-head reveal"><h2>${inline(s.h)}</h2>${intro ? `<p>${inline(intro)}</p>` : ''}<a class="btn btn-action" href="#formulier" data-cta="types">${t.headerCta} ${ICON.arrow}</a></div>
<ul class="type-list">${cards.map((c, i) => `<li class="type-card${reveal(i % 4)}"><span class="type-icon">${typeIcon(c.icon)}</span><strong>${inline(c.t)}</strong>${c.d ? `<span>${inline(c.d)}</span>` : ''}</li>`).join('')}</ul></div></section>`;
      },
      promises: (s) => {
        const items = s.blocks.find((b) => b.check)?.check || [];
        return `<section class="home-promises" id="${slugId(s.h)}"><div class="wrap promises-grid"><figure class="promises-media reveal">${img('terughuren', { sizes: '(min-width: 1000px) 45vw, 100vw' })}<figcaption class="float-badge">${ICON.shield}<span><strong>${t.badgeTitle}</strong>${t.badgeText}</span></figcaption></figure>
<div class="promises-copy"><h2 class="reveal">${inline(s.h)}</h2><ul class="promise-list">${items.map((it, i) => { const [h, d] = splitLead(it); return `<li class="${reveal(i).slice(1)}"><span class="promise-icon">${ICON.check}</span><span><strong>${inline(h)}</strong>${inline(d)}</span></li>`; }).join('')}</ul></div></div></section>`;
      },
    };
    const sections = p.sections.map((s) => (looks[s.look] ? looks[s.look](s) : `<section class="wrap prose">${s.blocks.map(renderBlock).join('')}</section>`)).join('');
    const marquee = (p.sections.find((s) => s.look === 'situations')?.blocks.find((b) => b.cards)?.cards || []).map((c) => `<span>${esc(plain(c.t))}</span>`).join('');
    const h1Words = plain(p.h1).split(' ').map((w, i) => `<span class="w" style="--i:${i}"><span>${esc(w)}</span></span>`).join(' ');
    return `<section class="hero"><div class="hero-media">${img('hero', { eager: true, sizes: '100vw', cls: 'hero-img' })}</div>
<div class="wrap hero-inner"><div class="hero-copy"><p class="pill pill-light">${inline(p.eyebrow)}</p><h1 class="hero-title" aria-label="${esc(plain(p.h1))}"><span aria-hidden="true">${h1Words}</span></h1><p class="hero-lead">${inline(p.intro)}</p>${videoThumb('vt-light')}${ticks(p.heroPoints, 'ticks ticks-light')}</div>
<div class="hero-form">${leadForm(p)}</div></div>
</section>
${marquee ? `<div class="marquee" aria-hidden="true"><div class="marquee-track">${marquee}${marquee}</div></div>` : ''}
${sections}
${reviewsSection()}
${p.faq.length ? `<section class="home-faq"><div class="wrap faq-grid"><h2 class="reveal">${t.faq}</h2><div class="reveal">${faqList(p.faq)}</div></div></section>` : ''}
${ctaBand(p, t.finalTitle, t.finalText, t.headerCta)}`;
  }

  // ---------- structured data ----------
  function jsonLd(p, trail) {
    const home = config.siteUrl + '/';
    const org = { '@type': 'Organization', '@id': home + '#org', name: config.brand, legalName: config.legalName, url: home, logo: config.siteUrl + '/assets/logo.svg', email: config.email, areaServed: 'NL' };
    if (!config.demo) {
      org.telephone = config.phone;
      org.address = { '@type': 'PostalAddress', streetAddress: config.address, addressCountry: 'NL' };
      org.identifier = { '@type': 'PropertyValue', propertyID: 'KvK', value: config.kvk };
    }
    const site = { '@type': 'WebSite', '@id': home + '#website', url: home, name: config.brand, inLanguage: ['nl-NL', 'en'], publisher: { '@id': home + '#org' } };
    const graph = [org, site];
    graph.push({ '@type': p.template === 'article' ? 'WebPage' : p.slug === '/contact/' ? 'ContactPage' : p.slug === '/over-ons/' ? 'AboutPage' : p.slug === '/veelgestelde-vragen/' ? 'FAQPage' : 'WebPage', '@id': abs(p.slug) + '#webpage', url: abs(p.slug), name: plain(p.seoTitle), description: plain(p.meta), inLanguage: t.inLanguage, isPartOf: { '@id': home + '#website' } });
    if (trail.length) graph.push({ '@type': 'BreadcrumbList', itemListElement: trail.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: abs(x.slug) })) });
    if (p.template === 'service' && p.group !== 'core') graph.push({ '@type': 'Service', name: plain(p.nav), serviceType: plain(p.keyword), description: plain(p.meta), provider: { '@id': home + '#org' }, areaServed: { '@type': 'Country', name: t.country }, url: abs(p.slug) });
    if (p.template === 'article') graph.push({ '@type': 'Article', headline: plain(p.h1), description: plain(p.meta), dateModified: p.updated, datePublished: p.updated, inLanguage: t.inLanguage, author: { '@id': home + '#org' }, publisher: { '@id': home + '#org' }, mainEntityOfPage: { '@id': abs(p.slug) + '#webpage' } });
    if (p.faq.length && p.slug !== '/veelgestelde-vragen/') graph.push({ '@type': 'FAQPage', mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })) });
    return `<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
  }

  // hreflang: both languages when the page exists in both, x-default points to Dutch.
  const hreflang = (p) => {
    if (!p || !alternates.has(p.slug)) return '';
    const nl = absIn(p.slug, 'nl'), en = absIn(p.slug, 'en');
    return `<link rel="alternate" hreflang="nl" href="${esc(nl)}">\n<link rel="alternate" hreflang="en" href="${esc(en)}">\n<link rel="alternate" hreflang="x-default" href="${esc(nl)}">`;
  };

  // ---------- layout ----------
  function layout({ title, description, canonical, robots, ld = '', bodyHtml, pageInfo, page, preload = '' }) {
    const gtm = config.gtmId ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${json(config.gtmId)});</script>` : '';
    return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
${hreflang(page)}
<meta property="og:type" content="website">
<meta property="og:locale" content="${t.locale}">
<meta property="og:locale:alternate" content="${UI[other].locale}">
<meta property="og:site_name" content="${esc(config.brand)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(config.siteUrl)}/assets/img/hero-1100.webp">
${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ''}
<meta name="theme-color" content="#0B3D35">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
${preload}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/style.css${assets.css ? `?v=${assets.css}` : ''}">
<script>document.documentElement.classList.add('js');window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{var c=JSON.parse(localStorage.getItem('consent_v1')||'null');if(c){gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.marketing?'granted':'denied',ad_user_data:c.marketing?'granted':'denied',ad_personalization:c.marketing?'granted':'denied'});}}catch(e){}
window.SITE=${json(pageInfo)};</script>
${gtm}
${ld}
</head>
<body>
<a class="skip" href="#main">${lang === 'en' ? 'Skip to content' : 'Naar de inhoud'}</a>
${config.demo ? `<div class="demo-banner" role="note"><strong>Demo</strong> ${t.demo}</div>` : ''}
${bodyHtml}
${cookieBanner()}
<script src="/assets/site.js${assets.js ? `?v=${assets.js}` : ''}" defer></script>
</body>
</html>
`;
  }

  const robots = config.demo ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const preloadHero = `<link rel="preload" as="image" href="/assets/img/hero-1100.webp" imagesrcset="/assets/img/hero-1100.webp 1100w, /assets/img/hero-1800.webp 1800w" imagesizes="100vw">`;

  function renderPage(p) {
    const trail = breadcrumbTrail(p);
    const bodyHtml = `${header(p)}<main id="main">${body(p, trail)}</main>${footer()}${p.template === 'legal' ? '' : mobileBar(p) + waFloat() + callbackDialog(p) + offerDrawer(p)}${p.template === 'home' ? videoDialog() + reviewDialog() : ''}`;
    return layout({ title: plain(p.seoTitle), description: plain(p.meta), canonical: abs(p.slug), robots, ld: jsonLd(p, trail), bodyHtml, page: p, preload: p.template === 'home' ? preloadHero : '', pageInfo: { slug: p.slug, path: L(p.slug), lang, template: p.template, group: p.group, form: p.form } });
  }

  // Landing page for paid ads (lib/funnels.js): a slim header so visitors stay on the page, the form next to the
  // offer on a photo, then how it works and questions. noindex: these pages must not compete with the SEO pages.
  // f.paths holds its URL in each language; the language switch goes to the same landing page.
  function renderFunnel(f) {
    const head = `<header class="site-header funnel-header is-overlay" data-header><div class="wrap header-inner">
<a class="brand" href="${L('/')}" aria-label="${esc(config.brand)} – ${t.home}">${logo()}<span>${esc(config.brand)}</span></a>
<div class="header-actions funnel-actions"><a class="lang-switch" href="${f.paths[other]}" data-same-url hreflang="${other}" lang="${other}" title="${esc(t.switchLabel)}" data-lang-switch><span aria-hidden="true">${other.toUpperCase()}</span><span class="sr-only">${esc(t.switchTo)}</span></a>
<a class="btn btn-ghost btn-small funnel-phone" href="${phoneHref}" data-cta="phone" title="${t.call} ${esc(config.phone)}">${ICON.phone}<span class="funnel-phone-number">${esc(config.phone)}</span></a></div>
</div></header>`;
    const alt = `<link rel="alternate" hreflang="nl" href="${esc(config.siteUrl + f.paths.nl)}">\n<link rel="alternate" hreflang="en" href="${esc(config.siteUrl + f.paths.en)}">\n<link rel="alternate" hreflang="x-default" href="${esc(config.siteUrl + f.paths.nl)}">`;
    const notes = f.notes.length ? `<p class="note funnel-notes">${f.notes.map(esc).join(' ')}</p>` : '';
    const main = `<section class="funnel-hero"><div class="hero-media">${img(f.img || FUNNEL_IMG[f.slug] || 'hero', { eager: true, sizes: '100vw', cls: 'hero-img' })}</div><div class="wrap funnel-grid">
<div class="funnel-copy"><p class="pill pill-light">${esc(f.eyebrow)}</p><h1>${esc(f.h1)}</h1><p class="hero-lead">${esc(f.intro)}</p>
${f.letter ? `<label class="letter-code"><span>${t.letterCode}</span><input type="text" data-letter-code maxlength="20" autocomplete="off" placeholder="WI-12345"><small>${t.letterHint}</small></label>` : ''}
${ticks(f.heroPoints, 'ticks ticks-light')}${notes}
<p class="hero-actions funnel-jump"><a class="btn btn-action btn-lg" href="#formulier" data-cta="hero">${t.startRequest} ${ICON.arrow}</a></p><p class="hero-callback">${callbackLink()}</p>${videoThumb('vt-light')}</div>
<aside class="side funnel-form">${leadForm(f)}</aside>
</div></section>
<div class="wrap layout layout-single"><div class="prose">
<section id="zo-werkt-het" class="reveal"><h2>${t.howItWorks}</h2><ol class="steps">${f.steps.map((s) => `<li>${inline(s)}</li>`).join('')}</ol></section>
</div></div>
${reviewsSection()}
<div class="wrap layout layout-single"><div class="prose">
<section class="faq-section reveal" id="vragen"><h2>${t.faqShort}</h2>${faqList(f.faq)}</section>
</div></div>`;
    return layout({ title: f.seoTitle, description: f.meta, canonical: config.siteUrl + f.path, robots: config.demo ? robots : 'noindex, follow', ld: alt, bodyHtml: `${head}<main id="main">${main}</main>${footer()}${waFloat()}${callbackDialog(f)}${videoDialog()}${reviewDialog()}`, pageInfo: { slug: f.slug, path: f.path, lang, template: 'funnel', form: f.form } });
  }

  function renderSimple(slug, title, h1, html) {
    const p = { slug, group: 'core' };
    const bodyHtml = `${header(p)}<main id="main"><div class="page-hero page-hero-plain"><div class="wrap"><h1>${esc(h1)}</h1>${html}</div></div></main>${footer()}`;
    return layout({ title, description: title, canonical: '', robots: 'noindex, nofollow', bodyHtml, pageInfo: { slug, lang, template: 'simple' } });
  }

  return { renderPage, renderSimple, renderFunnel, path: L };
}
