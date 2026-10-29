// Landing pages for paid ads, one funnel per seller avatar (Engine blueprint, "Seller avatars": landing
// funnels /snel-verkopen, /scheiding, /erfenis · /verkopen-zoals-het-is, /energielabel · /verhuurd-verkopen,
// /portefeuille). One link per page in two languages: Dutch by default, English at the same URL with ?lang=en
// (the NL/EN button switches). Noindex, not in the menu or sitemap: they exist
// for ads and must not compete with the SEO pages. The copy is new (not from ddd.pdf) and needs a human read
// before ads point at it. Offer promises appear only when switched on in config.promises, each with its condition.

const TEXT = {
  nl: {
    promisePoints: {
      offer24h: () => 'Binnen 24 uur een bindend bod',
      asIs: () => 'Wij kopen zoals het is: geen keuring, verborgen gebreken nemen wij over',
      cashAdvance: () => 'Direct een voorschot mogelijk, via de notaris',
      rentBack: (years) => `Na de verkoop nog tot ${years} jaar blijven huren`,
      transferDate: () => 'U kiest zelf de overdrachtsdatum',
      notaryCosts: () => 'De notariskosten betalen wij',
    },
    // The conditions printed with each promise (Engine blueprint, "Legal checks for the offer").
    promiseNotes: {
      offer24h: 'Het bod is bindend zodra wij het eigendom hebben gecontroleerd en alle eigenaren akkoord zijn.',
      asIs: 'Gebreken die u kent, meldt u ons: dat blijft uw plicht als verkoper.',
      cashAdvance: 'Een voorschot wordt pas na ondertekening van de koopovereenkomst betaald, via de derdengeldrekening van de notaris.',
      rentBack: 'De huurvoorwaarden leggen we vooraf schriftelijk vast.',
      transferDate: 'De datum leggen we vast in de koopovereenkomst.',
      notaryCosts: 'Welke kosten dat precies zijn, staat in ons voorstel.',
    },
    sellerPoints: ['Geen makelaarscourtage', 'Geen bord in de tuin en niet op Funda', 'Overdracht altijd via de notaris', 'Vrijblijvend: u beslist zelf'],
    portfolioPoints: ['Huurders blijven gewoon wonen', 'Eén transactie voor alles', 'Vertrouwelijk, op verzoek met geheimhoudingsverklaring', 'Een gesprek met een senior specialist'],
    sellerSteps: (p) => [
      '**Vul het formulier in.** Een paar korte vragen over de woning en uw situatie.',
      '**Wij nemen contact op.** We bespreken uw situatie en wat voor u belangrijk is.',
      p.offer24h ? '**U ontvangt een bindend bod.** Binnen 24 uur, op papier, met alle voorwaarden.' : '**U ontvangt een schriftelijk voorstel.** Met de koopsom en alle voorwaarden. U beslist zelf.',
      p.transferDate ? '**Overdracht bij de notaris.** Op de datum die u kiest.' : '**Overdracht bij de notaris.** Op een datum die we samen afspreken.',
    ],
    portfolioSteps: () => [
      '**Meld uw portefeuille vertrouwelijk aan.** Aantal objecten, plaatsen en huurgegevens zijn genoeg om te beginnen.',
      '**Een senior specialist belt u.** We bespreken de objecten, de huurders en uw wensen. Prijzen noemen we niet aan de telefoon.',
      '**U ontvangt een schriftelijk voorstel.** Voor de hele portefeuille of een deel, met alle voorwaarden.',
      '**Overdracht bij de notaris.** De huurovereenkomsten lopen gewoon door.',
    ],
    faq: {
      urgent: [
        { q: 'Moeten alle eigenaren akkoord zijn?', a: 'Ja. Voor de verkoop is de handtekening van alle eigenaren of erfgenamen nodig. Is iemand het nog niet eens, dan bespreken we eerst wat er nodig is.' },
        { q: 'Ben ik verplicht uw voorstel te accepteren?', a: 'Nee. Ons voorstel is vrijblijvend. Vergelijk het gerust met een verkoop via een makelaar.' },
        { q: 'Komt mijn huis op Funda?', a: 'Nee. Een rechtstreekse verkoop gebeurt zonder advertentie, zonder bord in de tuin en zonder open bezichtigingen.' },
      ],
      asis: [
        { q: 'Moet ik de woning eerst opknappen?', a: 'Nee. U verkoopt de woning zoals ze nu is. Wat er moet gebeuren, nemen wij mee in ons voorstel.' },
        { q: 'Wat als ik gebreken ken?', a: 'Meld ze ons. Wat u weet over de staat van de woning, moet u als verkoper melden. Zo voorkomt u later discussie.' },
        { q: 'Waarom vraagt u naar het energielabel?', a: 'Het label zegt iets over de verduurzaming die nodig is. Die kosten nemen wij mee in ons voorstel, zodat u niet eerst hoeft te investeren.' },
      ],
      portfolio: [
        { q: 'Wat merken mijn huurders ervan?', a: 'Weinig. Koop breekt geen huur: de huurovereenkomsten lopen gewoon door, met Windmill Invest als nieuwe verhuurder.' },
        { q: 'Kan ik ook een deel van mijn woningen verkopen?', a: 'Ja. U kunt één woning, een deel of de hele portefeuille aanbieden.' },
        { q: 'Hoe vertrouwelijk is dit?', a: 'Uw gegevens en uw portefeuille delen we met niemand. Op verzoek tekenen wij vooraf een geheimhoudingsverklaring.' },
      ],
      offer24h: { q: 'Wanneer krijg ik een bod?', a: 'Binnen 24 uur na uw aanvraag ontvangt u een bindend bod, zodra wij het eigendom en de gegevens van de woning hebben kunnen controleren.' },
    },
  },
  en: {
    promisePoints: {
      offer24h: () => 'A binding offer within 24 hours',
      asIs: () => 'We buy as is: no survey, and we take over hidden defects',
      cashAdvance: () => 'An advance is possible straight away, through the notary',
      rentBack: (years) => `Keep renting the home for up to ${years} years after the sale`,
      transferDate: () => 'You choose the transfer date',
      notaryCosts: () => 'We pay the notary costs',
    },
    promiseNotes: {
      offer24h: 'The offer is binding once we have checked the ownership and all owners agree.',
      asIs: 'Please tell us about any defects you know of: as the seller, that remains your duty.',
      cashAdvance: 'An advance is only paid after the purchase agreement has been signed, through the notary\'s client account.',
      rentBack: 'We put the rental terms in writing beforehand.',
      transferDate: 'The date is set in the purchase agreement.',
      notaryCosts: 'Our proposal states exactly which costs these are.',
    },
    sellerPoints: ['No estate agent\'s fee', 'No sign in the garden and no Funda listing', 'Transfer always through a notary', 'No obligation: you decide'],
    portfolioPoints: ['Tenants simply stay in their homes', 'One transaction for everything', 'Confidential, with a non-disclosure agreement on request', 'A conversation with a senior specialist'],
    sellerSteps: (p) => [
      '**Fill in the form.** A few short questions about the home and your situation.',
      '**We contact you.** We discuss your situation and what matters to you.',
      p.offer24h ? '**You receive a binding offer.** Within 24 hours, in writing, with all the terms.' : '**You receive a written proposal.** With the purchase price and all the terms. You decide.',
      p.transferDate ? '**Transfer at the notary.** On the date you choose.' : '**Transfer at the notary.** On a date we agree together.',
    ],
    portfolioSteps: () => [
      '**Register your portfolio confidentially.** The number of properties, the towns and the rental details are enough to start.',
      '**A senior specialist calls you.** We discuss the properties, the tenants and your wishes. We do not quote prices over the phone.',
      '**You receive a written proposal.** For the whole portfolio or part of it, with all the terms.',
      '**Transfer at the notary.** The tenancy agreements simply continue.',
    ],
    faq: {
      urgent: [
        { q: 'Do all owners have to agree?', a: 'Yes. The sale needs the signature of every owner or heir. If someone does not agree yet, we first discuss what is needed.' },
        { q: 'Do I have to accept your proposal?', a: 'No. Our proposal comes with no obligation. Feel free to compare it with a sale through an estate agent.' },
        { q: 'Will my house appear on Funda?', a: 'No. A direct sale happens without an advertisement, without a sign in the garden and without open viewings.' },
      ],
      asis: [
        { q: 'Do I have to renovate the home first?', a: 'No. You sell the home as it is now. Whatever needs doing, we include in our proposal.' },
        { q: 'What if I know about defects?', a: 'Tell us. As the seller, you must report what you know about the condition of the home. That prevents disputes later.' },
        { q: 'Why do you ask about the energy label?', a: 'The label shows how much sustainability work is needed. We include those costs in our proposal, so you do not have to invest first.' },
      ],
      portfolio: [
        { q: 'What will my tenants notice?', a: 'Very little. In the Netherlands a sale does not end a tenancy: the agreements simply continue, with Windmill Invest as the new landlord.' },
        { q: 'Can I sell only some of my homes?', a: 'Yes. You can offer one home, several or the whole portfolio.' },
        { q: 'How confidential is this?', a: 'We share your details and your portfolio with no one. On request, we sign a non-disclosure agreement in advance.' },
      ],
      offer24h: { q: 'When will I receive an offer?', a: 'Within 24 hours of your request you receive a binding offer, once we have been able to check the ownership and the details of the home.' },
    },
  },
};

const BASE = {
  urgent: { form: 'funnel_urgent', points: 'sellerPoints', promiseKeys: ['offer24h', 'cashAdvance', 'transferDate', 'rentBack', 'notaryCosts'], steps: 'sellerSteps' },
  asis: { form: 'funnel_asis', points: 'sellerPoints', promiseKeys: ['offer24h', 'asIs', 'transferDate', 'notaryCosts'], steps: 'sellerSteps' },
  portfolio: { form: 'funnel_portfolio', points: 'portfolioPoints', promiseKeys: [], steps: 'portfolioSteps' },
};

// slug: the page's URL, also its ID (stored with each lead, in both languages).
const VARIANTS = [
  {
    slug: '/snel-verkopen/', base: 'urgent',
    nl: {
      eyebrow: 'Rechtstreeks verkopen',
      seoTitle: 'Huis verkopen zonder makelaar of gedoe │ Windmill Invest',
      meta: 'Verkoop uw huis rechtstreeks aan Windmill Invest: geen makelaar, geen bord in de tuin, een voorstel op papier. Vrijblijvend.',
      h1: 'Uw huis verkopen zonder makelaar en zonder gedoe',
      intro: 'Moet uw huis verkocht worden, bijvoorbeeld door een scheiding, een erfenis of dubbele lasten? Verkoop het rechtstreeks aan Windmill Invest. Geen bezichtigingen met vreemden, geen bord in de tuin en een voorstel op papier.',
    },
    en: {
      eyebrow: 'Sell directly',
      seoTitle: 'Sell your house without an estate agent │ Windmill Invest',
      meta: 'Sell your house directly to Windmill Invest: no estate agent, no sign in the garden, a proposal in writing. No obligation.',
      h1: 'Sell your house without an estate agent or the hassle',
      intro: 'Does your house need to be sold, for example because of a divorce, an inheritance or paying for two homes? Sell it directly to Windmill Invest. No viewings with strangers, no sign in the garden and a proposal in writing.',
    },
  },
  {
    slug: '/scheiding/', base: 'urgent',
    nl: {
      eyebrow: 'Huis verkopen bij scheiding',
      seoTitle: 'Huis verkopen bij een scheiding │ Windmill Invest',
      meta: 'Uit elkaar en het huis moet verkocht worden? Verkoop rechtstreeks en discreet, met één helder voorstel voor u beiden.',
      h1: 'Huis verkopen bij een scheiding',
      intro: 'Uit elkaar en het huis moet verkocht worden? Een rechtstreekse verkoop geeft rust: geen bezichtigingen, geen onderhandelingen met kopers en één helder voorstel voor u beiden. Voor de verkoop is de instemming van alle eigenaren nodig.',
    },
    en: {
      eyebrow: 'Selling during a divorce',
      seoTitle: 'Selling your house during a divorce │ Windmill Invest',
      meta: 'Separating and the house has to be sold? Sell directly and discreetly, with one clear proposal for you both.',
      h1: 'Selling your house during a divorce',
      intro: 'Separating and the house has to be sold? A direct sale gives you peace of mind: no viewings, no negotiating with buyers and one clear proposal for you both. The sale needs the consent of all owners.',
    },
  },
  {
    slug: '/erfenis/', base: 'urgent',
    nl: {
      eyebrow: 'Geërfd huis verkopen',
      seoTitle: 'Een geërfd huis verkopen │ Windmill Invest',
      meta: 'Een huis geërfd? Windmill Invest koopt het rechtstreeks en discreet, met één voorstel voor alle erfgenamen.',
      h1: 'Een geërfd huis verkopen',
      intro: 'Een huis geërfd en wilt u het met de andere erfgenamen goed regelen? Wij kopen het huis rechtstreeks en discreet, met één voorstel voor alle erfgenamen. Voor de overdracht is een verklaring van erfrecht of van executele nodig.',
    },
    en: {
      eyebrow: 'Selling an inherited house',
      seoTitle: 'Selling an inherited house │ Windmill Invest',
      meta: 'Inherited a house? Windmill Invest buys it directly and discreetly, with one proposal for all heirs.',
      h1: 'Selling an inherited house',
      intro: 'Inherited a house and want to settle it properly with the other heirs? We buy the house directly and discreetly, with one proposal for all heirs. The transfer needs a certificate of inheritance or of executorship (verklaring van erfrecht or van executele).',
    },
  },
  {
    slug: '/verkopen-zoals-het-is/', base: 'asis',
    nl: {
      eyebrow: 'Verkopen zonder op te knappen',
      seoTitle: 'Huis verkopen zoals het is │ Windmill Invest',
      meta: 'Achterstallig onderhoud of een oude keuken? Verkoop uw huis in de staat waarin het is, zonder eerst op te knappen.',
      h1: 'Uw huis verkopen zoals het is',
      intro: 'Achterstallig onderhoud, een oude keuken of een dak dat aandacht nodig heeft? Wij kopen woningen in de staat waarin ze zijn. U hoeft niets op te knappen voordat u verkoopt.',
    },
    en: {
      eyebrow: 'Sell without renovating',
      seoTitle: 'Sell your house as it is │ Windmill Invest',
      meta: 'Overdue maintenance or an old kitchen? Sell your house in the condition it is in, without renovating first.',
      h1: 'Sell your house as it is',
      intro: 'Overdue maintenance, an old kitchen or a roof that needs attention? We buy homes in the condition they are in. You do not need to fix anything before you sell.',
    },
  },
  {
    slug: '/energielabel/', base: 'asis',
    nl: {
      eyebrow: 'Laag energielabel',
      seoTitle: 'Huis met energielabel E, F of G verkopen │ Windmill Invest',
      meta: 'Een woning met energielabel E, F of G verkopen zonder eerst te verduurzamen. Rechtstreeks aan Windmill Invest.',
      h1: 'Huis met energielabel E, F of G verkopen',
      intro: 'Een laag energielabel maakt verkopen lastiger: kopers kunnen er vaak minder op lenen en moeten eerst verduurzamen. Wij kopen woningen met label E, F of G rechtstreeks, zonder dat u eerst hoeft te investeren.',
    },
    en: {
      eyebrow: 'Low energy label',
      seoTitle: 'Sell a house with energy label E, F or G │ Windmill Invest',
      meta: 'Sell a home with energy label E, F or G without making it more sustainable first. Directly to Windmill Invest.',
      h1: 'Sell a house with energy label E, F or G',
      intro: 'A low energy label makes selling harder: buyers can often borrow less and must first make the home more sustainable. We buy homes with label E, F or G directly, without you having to invest first.',
    },
  },
  {
    slug: '/verhuurd-verkopen/', base: 'portfolio',
    nl: {
      eyebrow: 'Voor verhuurders',
      seoTitle: 'Verhuurde woningen discreet verkopen │ Windmill Invest',
      meta: 'Stoppen als verhuurder? Verkoop verhuurde woningen rechtstreeks aan Windmill Invest. Uw huurders blijven gewoon wonen.',
      h1: 'Verhuurde woningen discreet verkopen',
      intro: 'Verhuurder en wilt u stoppen, bijvoorbeeld door box 3 of nieuwe huurregels? Wij kopen verhuurde woningen rechtstreeks. Uw huurders blijven gewoon wonen: koop breekt geen huur.',
    },
    en: {
      eyebrow: 'For landlords',
      seoTitle: 'Sell tenanted homes discreetly │ Windmill Invest',
      meta: 'Stopping as a landlord? Sell tenanted homes directly to Windmill Invest. Your tenants simply stay in their homes.',
      h1: 'Sell tenanted homes discreetly',
      intro: 'A landlord who wants to stop, for example because of box 3 tax or new rent rules? We buy tenanted homes directly. Your tenants simply stay: in the Netherlands a sale does not end a tenancy.',
    },
  },
  {
    slug: '/portefeuille/', base: 'portfolio',
    nl: {
      eyebrow: 'Voor vastgoedbeleggers',
      seoTitle: 'Vastgoedportefeuille in één keer verkopen │ Windmill Invest',
      meta: 'Meerdere verhuurde woningen of panden? Verkoop ze vertrouwelijk in één transactie aan Windmill Invest.',
      h1: 'Uw vastgoedportefeuille in één transactie verkopen',
      intro: 'Meerdere verhuurde woningen of panden? Verkoop ze in één transactie aan Windmill Invest, vertrouwelijk en zonder dat er iets op Funda komt. Op verzoek tekenen wij vooraf een geheimhoudingsverklaring.',
    },
    en: {
      eyebrow: 'For property investors',
      seoTitle: 'Sell your property portfolio in one go │ Windmill Invest',
      meta: 'Several tenanted homes or buildings? Sell them confidentially in one transaction to Windmill Invest.',
      h1: 'Sell your property portfolio in one transaction',
      intro: 'Several tenanted homes or buildings? Sell them in one transaction to Windmill Invest, confidentially and without anything appearing on Funda. On request, we sign a non-disclosure agreement in advance.',
    },
  },
];

export const FUNNEL_SLUGS = VARIANTS.map((v) => v.slug);
// The query that selects English on a landing page (the server serves its index.en.html).
export const FUNNEL_EN_QUERY = '?lang=en';

// The funnel pages in one language, with the promises that are switched on right now.
// paths: the page's URL in each language (for the language switch and hreflang).
export function funnelPages(config, lang = 'nl') {
  const p = config.promises;
  const tx = TEXT[lang];
  return VARIANTS.map((v) => {
    const base = BASE[v.base];
    const on = base.promiseKeys.filter((k) => p[k]);
    const faq = tx.faq[v.base];
    const paths = { nl: v.slug, en: v.slug + FUNNEL_EN_QUERY };
    return {
      ...v[lang],
      slug: v.slug,
      base: v.base,
      path: paths[lang],
      paths,
      form: base.form,
      template: 'funnel',
      heroPoints: [...on.map((k) => tx.promisePoints[k](config.rentBackYears)), ...tx[base.points]],
      steps: tx[base.steps](p),
      notes: on.map((k) => tx.promiseNotes[k]),
      faq: p.offer24h && v.base !== 'portfolio' ? [tx.faq.offer24h, ...faq] : faq,
    };
  });
}
