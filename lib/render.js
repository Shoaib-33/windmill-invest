// Turns page objects (see content/SCHEMA.md) into HTML. Pure functions; build.js writes the files.
// One renderer per language. Content always names pages by their Dutch slug; pathFor() gives the URL.
import { GROUPS, pathFor } from './pages.js';
import { CONSENTS, CONTACT_FIELDS, PRIVACY_WORD, activeFields, formFor } from './forms.js';

export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const DIVISIONS = ['verkopen', 'investeren', 'ontwikkelen', 'beheer', 'commercieel', 'advies'];

// Fixed interface text. Page copy lives in content/ and content/en/.
const UI = {
  nl: {
    htmlLang: 'nl', locale: 'nl_NL', inLanguage: 'nl-NL', dateLocale: 'nl-NL', country: 'Nederland',
    home: 'home', mainMenu: 'Hoofdmenu', menu: 'Menu', breadcrumb: 'Kruimelpad', headerCta: 'Pand aanmelden',
    call: 'Bel', faq: 'Veelgestelde vragen', related: 'Verder lezen', view: 'Bekijk', readArticle: 'Lees het artikel',
    sources: 'Bronnen', updated: 'Bijgewerkt op', minRead: 'min. lezen', version: 'Versie',
    switchTo: 'English', switchLabel: 'Read this page in English', switchLang: 'en',
    tagline: 'Vastgoed verkopen, investeren, ontwikkelen en beheren in heel Nederland.',
    disclaimer: 'Windmill Invest geeft geen juridisch, fiscaal of financieel advies. Een indicatieve waardebeoordeling is geen taxatierapport.',
    kvk: 'KvK', cookieSettings: 'Cookie-instellingen',
    cookieTitle: (d) => `Cookies op ${d}`,
    cookieText: 'Wij gebruiken functionele cookies om de site te laten werken. Met uw toestemming gebruiken wij ook cookies voor statistieken en om onze advertenties te meten. Meer leest u in het',
    cookiePolicy: 'cookiebeleid', cookieFunctional: 'Functioneel (altijd aan)', cookieStats: 'Statistieken', cookieMarketing: 'Marketing',
    onlyFunctional: 'Alleen functioneel', acceptAll: 'Alles accepteren', settings: 'Instellingen', saveChoice: 'Keuze opslaan',
    demo: 'Dit is een voorbeeldsite. Bedrijfsgegevens zijn fictief, de juridische teksten zijn nog niet door een jurist gecontroleerd en aanvragen worden alleen lokaal opgeslagen.',
    choose: 'Maak een keuze', honeypot: 'Laat dit veld leeg', next: 'Volgende', back: 'Vorige',
    howItWorks: 'Zo werkt het', faqShort: 'Vragen', startRequest: 'Start uw aanvraag',
    calc: {
      price: 'Koopprijs (€, k.k.)', tax: 'Overdrachtsbelasting', other: 'Overige aankoopkosten (€)', rent: 'Kale huur per maand (€)', costs: 'Exploitatiekosten per jaar (€)', vacancy: 'Huurderving (%)',
      taxes: ['8% – woning, niet zelf bewonen', '10,4% – bedrijfspand of ander vastgoed', '2% – zelf bewonen', '0% – nieuwbouw of startersvrijstelling'],
      gross: 'Bruto jaarhuur', net: 'Netto jaarhuur', kk: 'Kosten koper', total: 'Totale investering',
      note: 'Een rekenhulp op basis van uw eigen aannames. De uitkomst is een indicatie, geen garantie en geen beleggingsadvies.',
    },
    mapCaption: 'Kadastrale kaart · illustratie', parcel: 'Perceel 1847', legalNotice: '',
  },
  en: {
    htmlLang: 'en', locale: 'en_GB', inLanguage: 'en', dateLocale: 'en-GB', country: 'Netherlands',
    home: 'home', mainMenu: 'Main menu', menu: 'Menu', breadcrumb: 'Breadcrumb', headerCta: 'Register your property',
    call: 'Call', faq: 'Frequently asked questions', related: 'Further reading', view: 'View', readArticle: 'Read the article',
    sources: 'Sources', updated: 'Updated', minRead: 'min read', version: 'Version',
    switchTo: 'Nederlands', switchLabel: 'Lees deze pagina in het Nederlands', switchLang: 'nl',
    tagline: 'Selling, investing in, developing and managing property across the Netherlands.',
    disclaimer: 'Windmill Invest does not give legal, tax or financial advice. An indicative valuation is not a valuation report.',
    kvk: 'Chamber of Commerce (KvK)', cookieSettings: 'Cookie settings',
    cookieTitle: (d) => `Cookies on ${d}`,
    cookieText: 'We use functional cookies to make the site work. With your consent, we also use cookies for statistics and to measure our advertising. Read more in our',
    cookiePolicy: 'cookie policy', cookieFunctional: 'Functional (always on)', cookieStats: 'Statistics', cookieMarketing: 'Marketing',
    onlyFunctional: 'Functional only', acceptAll: 'Accept all', settings: 'Settings', saveChoice: 'Save choice',
    demo: 'This is a demo site. Company details are fictitious, the legal texts have not yet been reviewed by a lawyer and inquiries are only stored locally.',
    choose: 'Please choose', honeypot: 'Leave this field empty', next: 'Next', back: 'Back',
    howItWorks: 'How it works', faqShort: 'Questions', startRequest: 'Start your request',
    calc: {
      price: 'Purchase price (€, excl. buyer\'s costs)', tax: 'Transfer tax', other: 'Other acquisition costs (€)', rent: 'Basic rent per month (€)', costs: 'Operating costs per year (€)', vacancy: 'Rent loss and vacancy (%)',
      taxes: ['8% – home you will not live in', '10.4% – commercial or other property', '2% – home you will live in', '0% – new build or first-time buyer exemption'],
      gross: 'Gross annual rent', net: 'Net annual rent', kk: 'Buyer\'s costs', total: 'Total investment',
      note: 'A calculation aid based on your own assumptions. The result is an indication, not a guarantee and not investment advice.',
    },
    mapCaption: 'Cadastral map · illustration', parcel: 'Parcel 1847',
    legalNotice: 'This is an English translation provided for convenience. Only the Dutch version is legally binding; if the two differ, the Dutch version prevails.',
  },
};

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

  // ---------- blocks ----------
  const blocks = {
    p: (v) => `<p>${inline(v)}</p>`,
    note: (v) => `<p class="note">${inline(v)}</p>`,
    ul: (v) => `<ul>${v.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`,
    check: (v) => `<ul class="check">${v.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`,
    ol: (v) => `<ol class="steps">${v.map((i) => `<li>${inline(i)}</li>`).join('')}</ol>`,
    cards: (v) => `<div class="cards">${v.map((c) => {
      const link = c.href && bySlug.has(c.href);
      return `<div class="card${link ? ' card-link' : ''}"><h3>${link ? `<a href="${L(c.href)}">${inline(c.t)}</a>` : inline(c.t)}</h3>${c.d ? `<p>${inline(c.d)}</p>` : ''}${link ? `<span class="card-more" aria-hidden="true">${esc(c.label)} →</span>` : ''}</div>`;
    }).join('')}</div>`,
    table: (v) => `<figure class="table"><div class="table-scroll" tabindex="0"><table><thead><tr>${v.head.map((h) => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead><tbody>${v.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div>${v.note ? `<figcaption>${inline(v.note)}</figcaption>` : ''}</figure>`,
    callout: (v) => `<aside class="callout"><strong>${inline(v.t)}</strong> ${inline(v.d)}</aside>`,
    calculator: () => calculator(),
    auto: (v) => auto[v](),
  };
  const renderBlock = (b) => { const [k] = Object.keys(b); return blocks[k](b[k]); };
  const slugId = (s) => plain(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const renderSections = (p) => p.sections.map((s) => `<section id="${slugId(s.h)}"><h2>${inline(s.h)}</h2>${s.blocks.map(renderBlock).join('')}</section>`).join('');

  const auto = {
    services: () => DIVISIONS.filter((g) => inGroup(g).length).map((g) => `<div class="hub-group"><h3>${bySlug.has(GROUPS[g].hub) ? `<a href="${L(GROUPS[g].hub)}">${esc(label(g))}</a>` : esc(label(g))}</h3><ul class="link-list">${inGroup(g).map((p) => `<li><a href="${L(p.slug)}">${esc(plain(p.nav))}</a><span>${esc(plain(p.meta))}</span></li>`).join('')}</ul></div>`).join(''),
    faq: () => DIVISIONS.map((g) => {
      const items = inGroup(g).filter((p) => p.faq.length).map((p) => `<div class="faq-source"><h4><a href="${L(p.slug)}">${esc(plain(p.nav))}</a></h4>${faqList(p.faq.slice(0, 3))}</div>`).join('');
      return items ? `<div class="hub-group"><h3>${esc(label(g))}</h3>${items}</div>` : '';
    }).join(''),
    articles: () => `<div class="cards">${inGroup('kennisbank').map((p) => `<div class="card card-link"><p class="eyebrow">${esc(plain(p.eyebrow))}</p><h3><a href="${L(p.slug)}">${esc(plain(p.h1))}</a></h3><p>${esc(plain(p.meta))}</p><span class="card-more" aria-hidden="true">${t.readArticle} →</span></div>`).join('')}</div>`,
  };

  const faqList = (items) => `<div class="faq">${items.map((f) => `<details><summary>${inline(f.q)}</summary><div><p>${inline(f.a)}</p></div></details>`).join('')}</div>`;

  function calculator() {
    const c = t.calc;
    const num = (name, text, value, attrs = '') => `<label class="field"><span>${esc(text)}</span><input type="number" inputmode="decimal" name="${name}" value="${value}" min="0" step="any" ${attrs}></label>`;
    return `<div class="calc" data-calculator>
<div class="calc-inputs">
${num('price', c.price, 300000)}
<label class="field"><span>${esc(c.tax)}</span><select name="tax">${['8', '10.4', '2', '0'].map((v, i) => `<option value="${v}"${i === 0 ? ' selected' : ''}>${esc(c.taxes[i])}</option>`).join('')}</select></label>
${num('other', c.other, 4000)}
${num('rent', c.rent, 1250)}
${num('costs', c.costs, 2700)}
${num('vacancy', c.vacancy, 6, 'max="100"')}
</div>
<dl class="calc-out" aria-live="polite">
<div><dt>${esc(c.gross)}</dt><dd data-out="gross">–</dd></div>
<div><dt>${esc(c.net)}</dt><dd data-out="net">–</dd></div>
<div><dt>${esc(c.kk)}</dt><dd data-out="kk">–</dd></div>
<div><dt>${esc(c.total)}</dt><dd data-out="total">–</dd></div>
<div class="big"><dt>BAR</dt><dd data-out="bar">–</dd></div>
<div class="big"><dt>NAR</dt><dd data-out="nar">–</dd></div>
</dl>
<p class="note">${esc(c.note)}</p>
</div>`;
  }

  // ---------- forms ----------
  function field(fd) {
    const id = `f-${fd.name}`;
    const req = fd.required ? ' required' : '';
    const common = `id="${id}" name="${fd.name}"${req}${fd.autocomplete ? ` autocomplete="${fd.autocomplete}"` : ''}${fd.placeholder ? ` placeholder="${esc(fd.placeholder)}"` : ''}`;
    let input;
    if (fd.type === 'select') input = `<select ${common}><option value="">${t.choose}</option>${fd.options.map(([k, l]) => `<option value="${esc(k)}">${esc(l)}</option>`).join('')}</select>`;
    else if (fd.type === 'textarea') input = `<textarea ${common} rows="3" maxlength="${fd.max || 2000}"></textarea>`;
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

  function consentBoxes() {
    const privacy = `<a href="${L('/privacyverklaring/')}">${PRIVACY_WORD[lang]}</a>`;
    return CONSENTS.map((c) => {
      const text = esc(c[lang]).replace('{privacy}', privacy).replace('{brand}', esc(config.brand));
      const box = `<label class="consent"><input type="checkbox" name="${c.field}"${c.required ? ' required' : ''}> <span>${text}</span></label>`;
      return c.required ? `${box}\n<p class="field-error" data-error-for="${c.field}" hidden></p>` : box;
    }).join('\n');
  }

  // Forms with steps (the landing-page funnels) show one screen at a time once site.js runs; without
  // JavaScript every step is visible and the form still works.
  function stepScreens(form) {
    const fields = activeFields(form);
    const total = form.steps.length;
    const nav = (n) => `<div class="step-nav">${n > 1 ? `<button type="button" class="btn btn-plain" data-step-back hidden>${t.back}</button>` : ''}${n < total ? `<button type="button" class="btn btn-action" data-step-next hidden>${t.next}</button>` : ''}</div>`;
    return `<div class="step-progress" data-step-progress hidden><span data-step-label></span><span class="step-bar"><i></i></span></div>
${form.steps.map((title, i) => {
    const n = i + 1;
    const last = n === total;
    const inner = fields.filter((fd) => fd.step === n).map(field).join('') + (last ? CONTACT_FIELDS(form).map(field).join('') : '');
    return `<fieldset class="form-step" data-step="${n}" data-step-title="${esc(title)}"><legend>${esc(title)}</legend><div class="fields">${inner}</div>${last ? `${consentBoxes()}\n<button type="submit" class="btn btn-action">${esc(form.button)}</button>` : ''}${nav(n)}</fieldset>`;
  }).join('\n')}`;
  }

  function leadForm(p) {
    const form = formFor(p.form, lang);
    const body = form.steps
      ? stepScreens(form)
      : `<div class="fields">${activeFields(form).map(field).join('')}${CONTACT_FIELDS(form).map(field).join('')}</div>
${consentBoxes()}
<button type="submit" class="btn btn-action">${esc(form.button)}</button>`;
    return `<form class="lead-form" id="formulier" data-lead-form${form.steps ? ' data-steps' : ''} novalidate>
<h2 class="form-title">${esc(form.title)}</h2>
<p class="form-intro">${esc(form.intro)}</p>
<input type="hidden" name="form_type" value="${p.form}">
<input type="hidden" name="page" value="${p.slug}">
<input type="hidden" name="lang" value="${lang}">
<div class="hp" aria-hidden="true"><label>${t.honeypot} <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
${body}
<p class="form-status" role="status" aria-live="polite"></p>
</form>`;
  }

  // ---------- page parts ----------
  const logo = (cls = '') => `<svg class="logo-mark ${cls}" viewBox="0 0 40 40" aria-hidden="true"><g transform="rotate(18 20 20)" fill="currentColor"><path d="M18.6 18 L16 3.5 L22 3 L21.4 18Z"/><path d="M22 18.6 L36.5 16 L37 22 L22 21.4Z"/><path d="M21.4 22 L24 36.5 L18 37 L18.6 22Z"/><path d="M18 21.4 L3.5 24 L3 18 L18 18.6Z"/></g><circle cx="20" cy="20" r="4" fill="var(--action)"/></svg>`;

  // The same page in the other language, or that language's home page if it has no translation yet.
  const switchHref = (p) => pathFor(alternates.has(p.slug) ? p.slug : '/', other);
  const langSwitch = (p) => `<a class="lang-switch" href="${switchHref(p)}" hreflang="${other}" lang="${other}" title="${esc(t.switchLabel)}" data-lang-switch><span aria-hidden="true">${other.toUpperCase()}</span><span class="sr-only">${esc(t.switchTo)}</span></a>`;

  function header(p) {
    const menu = (g) => {
      const items = inGroup(g);
      if (!items.length) return '';
      const current = p.group === g ? ' aria-current="true"' : '';
      return `<li class="has-menu"><button type="button" class="nav-top" aria-expanded="false"${current}>${esc(label(g))}</button><ul class="submenu">${items.map((it) => `<li><a href="${L(it.slug)}"${it.slug === p.slug ? ' aria-current="page"' : ''}>${esc(plain(it.nav))}</a></li>`).join('')}</ul></li>`;
    };
    const top = (slug) => (bySlug.has(slug) ? `<li><a class="nav-top" href="${L(slug)}"${p.slug === slug ? ' aria-current="page"' : ''}>${esc(plain(bySlug.get(slug).nav))}</a></li>` : '');
    return `<header class="site-header"><div class="wrap header-inner">
<a class="brand" href="${L('/')}" aria-label="${esc(config.brand)} – ${t.home}">${logo()}<span>${esc(config.brand)}</span></a>
${langSwitch(p)}
<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav"><span class="sr-only">${t.menu}</span><span class="bars" aria-hidden="true"></span></button>
<nav id="site-nav" class="site-nav" aria-label="${t.mainMenu}"><ul>${DIVISIONS.map(menu).join('')}${top('/kennisbank/')}${top('/over-ons/')}${top('/contact/')}</ul>
<a class="btn btn-action btn-small header-cta" href="${L('/')}#formulier" data-cta="header">${t.headerCta}</a>
<a class="menu-phone" href="${phoneHref}" data-cta="phone">${t.call} ${esc(config.phone)}</a></nav>
<a class="header-phone" href="${phoneHref}" data-cta="phone" title="${t.call} ${esc(config.phone)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg><span class="sr-only">${t.call} ${esc(config.phone)}</span></a>
</div></header>`;
  }

  function footer() {
    const col = (g) => (inGroup(g).length ? `<div><h2>${esc(label(g))}</h2><ul>${inGroup(g).map((it) => `<li><a href="${L(it.slug)}">${esc(plain(it.nav))}</a></li>`).join('')}</ul></div>` : '');
    const core = pages.filter((x) => x.group === 'core' && x.slug !== '/');
    return `<footer class="site-footer"><div class="wrap">
<div class="footer-top"><div class="footer-brand"><a class="brand" href="${L('/')}">${logo()}<span>${esc(config.brand)}</span></a><p>${t.tagline}</p>
<address>${esc(config.legalName)}<br>${esc(config.address)}<br>${t.kvk} ${esc(config.kvk)}<br><a href="${phoneHref}">${esc(config.phone)}</a><br><a href="mailto:${esc(config.email)}">${esc(config.email)}</a></address></div>
<div class="footer-cols">${DIVISIONS.map(col).join('')}<div><h2>${esc(config.brand)}</h2><ul>${core.map((it) => `<li><a href="${L(it.slug)}">${esc(plain(it.nav))}</a></li>`).join('')}</ul></div></div></div>
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
    return `<section class="related"><div class="wrap"><h2>${t.related}</h2><div class="cards">${items.map((r) => `<div class="card card-link"><h3><a href="${L(r.slug)}">${esc(plain(r.nav))}</a></h3><p>${esc(plain(r.meta))}</p><span class="card-more" aria-hidden="true">${t.view} →</span></div>`).join('')}</div></div></section>`;
  };

  const ctaBand = (p) => {
    if (!p.cta) return '';
    const href = p.form ? '#formulier' : L('/contact/');
    return `<section class="cta-band"><div class="wrap"><div><h2>${inline(p.cta.title)}</h2><p>${inline(p.cta.text)}</p></div><a class="btn btn-action" href="${href}" data-cta="band">${esc(p.cta.button)}</a></div></section>`;
  };

  const heroPoints = (p) => (p.heroPoints.length ? `<ul class="hero-points">${p.heroPoints.map((h) => `<li>${inline(h)}</li>`).join('')}</ul>` : '');
  const heroActions = (p) => (p.form ? `<div class="hero-actions"><a class="btn btn-action" href="#formulier" data-cta="hero">${esc(p.cta?.button || formFor(p.form, lang).button)}</a><a class="btn btn-plain" href="${phoneHref}" data-cta="phone">${t.call} ${esc(config.phone)}</a></div>` : '');

  const words = (p) => JSON.stringify(p.sections).split(/\s+/).length;
  const dateFmt = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString(t.dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  // ---------- templates ----------
  function body(p, trail) {
    if (p.template === 'home') return homeBody(p);
    const article = p.template === 'article';
    const legal = p.template === 'legal';
    const meta = article ? `<p class="article-meta">${t.updated} <time datetime="${p.updated}">${dateFmt(p.updated)}</time> · ${Math.max(2, Math.round(words(p) / 220))} ${t.minRead}</p>` : legal ? `<p class="article-meta">${t.version}: ${esc(p.version)}</p>` : '';
    const notice = legal && t.legalNotice ? `<aside class="callout" lang="en">${esc(t.legalNotice)} <a href="${pathFor(p.slug, 'nl')}" hreflang="nl" lang="nl">Nederlandse versie</a>.</aside>` : '';
    const sources = article ? `<section class="sources"><h2>${t.sources}</h2><ul>${p.sources.map((s) => `<li>${inline(s)}</li>`).join('')}</ul></section>` : '';
    const faq = p.faq.length ? `<section class="faq-section" id="veelgestelde-vragen"><h2>${t.faq}</h2>${faqList(p.faq)}</section>` : '';
    const aside = p.form ? `<aside class="side">${leadForm(p)}</aside>` : '';
    return `<div class="page-head${legal ? ' page-head-plain' : ''}"><div class="wrap">${breadcrumb(trail)}
<p class="eyebrow">${inline(p.eyebrow)}</p><h1>${inline(p.h1)}</h1>${meta}<p class="lead">${inline(p.intro)}</p>${legal ? '' : heroPoints(p) + heroActions(p)}</div></div>
<div class="wrap layout${aside ? '' : ' layout-single'}"><div class="prose">${notice}${renderSections(p)}${faq}${sources}</div>${aside}</div>
${legal ? '' : related(p) + ctaBand(p)}`;
  }

  function homeBody(p) {
    const faq = p.faq.length ? `<section class="faq-section"><h2>${t.faq}</h2>${faqList(p.faq)}</section>` : '';
    return `<div class="home-hero"><div class="wrap hero-grid"><div><p class="eyebrow">${inline(p.eyebrow)}</p><h1>${inline(p.h1)}</h1><p class="lead">${inline(p.intro)}</p>${heroPoints(p)}${heroActions(p)}</div>${parcelMap()}</div></div>
<div class="wrap home-sections">${p.sections.map((s) => `<section id="${slugId(s.h)}"><h2>${inline(s.h)}</h2>${s.blocks.map(renderBlock).join('')}</section>`).join('')}</div>
<section class="home-form"><div class="wrap layout"><div class="prose">${faq}</div><aside class="side">${leadForm(p)}</aside></div></section>
${ctaBand(p)}`;
  }

  // Kadaster-style parcel map: thin parcel lines, a canal, and one highlighted plot.
  function parcelMap() {
    const parcels = [
      'M20 30 L120 22 L128 96 L26 104Z', 'M120 22 L210 16 L216 88 L128 96Z', 'M210 16 L300 12 L304 82 L216 88Z', 'M300 12 L380 10 L382 78 L304 82Z',
      'M26 104 L128 96 L134 170 L32 178Z', 'M128 96 L216 88 L222 160 L134 170Z', 'M216 88 L304 82 L310 152 L222 160Z', 'M304 82 L382 78 L386 148 L310 152Z',
      'M32 200 L134 192 L140 266 L38 274Z', 'M134 192 L180 188 L186 262 L140 266Z', 'M180 188 L228 184 L234 258 L186 262Z', 'M228 184 L316 176 L322 250 L234 258Z', 'M316 176 L388 170 L392 244 L322 250Z',
      'M38 274 L140 266 L146 340 L44 348Z', 'M140 266 L234 258 L240 332 L146 340Z', 'M234 258 L322 250 L328 324 L240 332Z', 'M322 250 L392 244 L396 318 L328 324Z',
    ];
    return `<figure class="parcel-map" aria-hidden="true"><svg viewBox="0 0 420 370" role="presentation">
<path class="canal" d="M0 186 C120 180 260 170 420 160"/>
${parcels.map((d, i) => `<path class="parcel${i === 10 ? ' parcel-hit' : ''}" d="${d}"/>`).join('')}
<g class="parcel-label" transform="translate(207 223)"><circle r="3.5"/><text x="8" y="-8">${t.parcel}</text></g>
<g class="compass" transform="translate(395 345)"><path d="M0 -12 L4 0 L0 -3 L-4 0Z"/><text y="12" text-anchor="middle">N</text></g>
</svg><figcaption>${t.mapCaption}</figcaption></figure>`;
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
  function layout({ title, description, canonical, robots, ld = '', bodyHtml, pageInfo, page }) {
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
${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ''}
<meta name="theme-color" content="#0F4C45">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap">
<link rel="stylesheet" href="/assets/style.css${assets.css ? `?v=${assets.css}` : ''}">
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
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

  function renderPage(p) {
    const trail = breadcrumbTrail(p);
    const bodyHtml = `${header(p)}<main id="main">${body(p, trail)}</main>${footer()}`;
    return layout({ title: plain(p.seoTitle), description: plain(p.meta), canonical: abs(p.slug), robots, ld: jsonLd(p, trail), bodyHtml, page: p, pageInfo: { slug: p.slug, path: L(p.slug), lang, template: p.template, group: p.group, form: p.form } });
  }

  // Landing page for paid ads (lib/funnels.js): a slim header so visitors stay on the page, the form next to the
  // offer, then how it works and questions. noindex: these pages must not compete with the SEO pages.
  // f.paths holds its URL in each language; the language switch goes to the same landing page.
  function renderFunnel(f) {
    const head = `<header class="site-header funnel-header"><div class="wrap header-inner">
<a class="brand" href="${L('/')}" aria-label="${esc(config.brand)} – ${t.home}">${logo()}<span>${esc(config.brand)}</span></a>
<div class="funnel-actions"><a class="lang-switch" href="${f.paths[other]}" data-same-url hreflang="${other}" lang="${other}" title="${esc(t.switchLabel)}" data-lang-switch><span aria-hidden="true">${other.toUpperCase()}</span><span class="sr-only">${esc(t.switchTo)}</span></a>
<a class="btn btn-plain btn-small funnel-phone" href="${phoneHref}" data-cta="phone" title="${t.call} ${esc(config.phone)}">${t.call}<span class="funnel-phone-number"> ${esc(config.phone)}</span></a></div>
</div></header>`;
    const alt = `<link rel="alternate" hreflang="nl" href="${esc(config.siteUrl + f.paths.nl)}">\n<link rel="alternate" hreflang="en" href="${esc(config.siteUrl + f.paths.en)}">\n<link rel="alternate" hreflang="x-default" href="${esc(config.siteUrl + f.paths.nl)}">`;
    const notes = f.notes.length ? `<p class="note funnel-notes">${f.notes.map(esc).join(' ')}</p>` : '';
    const main = `<div class="page-head funnel-head"><div class="wrap funnel-grid">
<div class="funnel-copy"><p class="eyebrow">${esc(f.eyebrow)}</p><h1>${esc(f.h1)}</h1><p class="lead">${esc(f.intro)}</p>
<ul class="hero-points">${f.heroPoints.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>${notes}
<p class="hero-actions funnel-jump"><a class="btn btn-action" href="#formulier" data-cta="hero">${t.startRequest}</a></p></div>
<aside class="side">${leadForm(f)}</aside>
</div></div>
<div class="wrap layout layout-single"><div class="prose">
<section id="zo-werkt-het"><h2>${t.howItWorks}</h2><ol class="steps">${f.steps.map((s) => `<li>${inline(s)}</li>`).join('')}</ol></section>
<section class="faq-section" id="vragen"><h2>${t.faqShort}</h2>${faqList(f.faq)}</section>
</div></div>`;
    return layout({ title: f.seoTitle, description: f.meta, canonical: config.siteUrl + f.path, robots: config.demo ? robots : 'noindex, follow', ld: alt, bodyHtml: `${head}<main id="main">${main}</main>${footer()}`, pageInfo: { slug: f.slug, path: f.path, lang, template: 'funnel', form: f.form } });
  }

  function renderSimple(slug, title, h1, html) {
    const p = { slug, group: 'core' };
    const bodyHtml = `${header(p)}<main id="main"><div class="page-head page-head-plain"><div class="wrap"><h1>${esc(h1)}</h1>${html}</div></div></main>${footer()}`;
    return layout({ title, description: title, canonical: '', robots: 'noindex, nofollow', bodyHtml, pageInfo: { slug, lang, template: 'simple' } });
  }

  return { renderPage, renderSimple, renderFunnel, path: L };
}
