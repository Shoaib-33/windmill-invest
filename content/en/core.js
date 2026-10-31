// Core pages. English translation of content/core.js (seller pages only).
export default [
  {
    slug: '/',
    group: 'core',
    template: 'home',
    nav: `Home`,
    seoTitle: `Sell your house without an agent │ Windmill Invest`,
    meta: `Sell your house or building directly to Windmill Invest. No agent's fees, any condition, anywhere in the Netherlands. Request a free offer.`,
    h1: `Sell your house directly. No estate agent, no hassle.`,
    keyword: `sell house without estate agent Netherlands`,
    secondary: [`sell house directly`, `property buyer Netherlands`],
    form: 'verkoop',
    related: [],
    eyebrow: `We buy homes and buildings across the Netherlands`,
    intro: `Windmill Invest buys your home or building in its own name. Even if it is let, inherited or in need of work. You get a clear written offer and the notary handles the transfer.`,
    heroPoints: [`No agent's fees`, `Any condition, any type`, `Transfer through the notary`],
    sections: [
      {
        look: 'situations',
        h: `For every situation`,
        blocks: [
          { p: `Every sale has its own reason. Choose yours.` },
          {
            cards: [
              { t: `Inherited house`, d: `Together with the other heirs, without the hassle.`, href: '/geerfd-huis-verkopen/', label: `Read more`, img: 'erfenis' },
              { t: `Divorce`, d: `Clarity quickly and a fair split.`, href: '/huis-verkopen/', label: `Read more`, img: 'scheiding' },
              { t: `Tenanted home`, d: `The tenant simply stays.`, href: '/verhuurde-woning-verkopen/', label: `Read more`, img: 'verhuurd' },
              { t: `Needs repairs`, d: `You don't have to fix anything.`, href: '/huis-verkopen-met-achterstallig-onderhoud/', label: `Read more`, img: 'opknapper' },
              { t: `Vacant home`, d: `Stop paying for two homes.`, href: '/leegstaande-woning-verkopen/', label: `Read more`, img: 'leegstand' },
              { t: `From abroad`, d: `Sell remotely, with a power of attorney.`, href: '/huis-verkopen-vanuit-het-buitenland/', label: `Read more`, img: 'buitenland' },
              { t: `Commercial building`, d: `Office, warehouse, shop or mixed-use.`, href: '/bedrijfspand-verkopen/', label: `Read more`, img: 'bedrijfspand' },
              { t: `Portfolio`, d: `Several properties in one confidential sale.`, href: '/vastgoedportefeuille-verkopen/', label: `Read more`, img: 'portefeuille' },
            ],
          },
        ],
      },
      {
        look: 'steps',
        h: `How it works`,
        blocks: [
          {
            ol: [
              `**Tell us about your home.** Address, type and your timing. It takes two minutes.`,
              `**We view your home.** One viewing, at a time that suits you.`,
              `**You receive a written offer.** With the price, the terms and who pays which costs.`,
              `**The notary does the rest.** You sign at the notary and the money is in your account.`,
            ],
          },
        ],
      },
      {
        look: 'types',
        h: `What we buy`,
        blocks: [
          { p: `Every type of home or building, anywhere in the Netherlands and in any condition. Also when it is let or needs work.` },
          {
            cards: [
              { t: `Terraced house`, icon: 'tussenwoning' },
              { t: `End-of-terrace house`, icon: 'hoekwoning' },
              { t: `Semi-detached house`, icon: 'twee' },
              { t: `Detached house`, icon: 'vrijstaand' },
              { t: `Apartment`, icon: 'appartement' },
              { t: `Farmhouse`, icon: 'boerderij' },
              { t: `Shop or live-work property`, icon: 'winkel' },
              { t: `Commercial building`, icon: 'bedrijfspand' },
            ],
          },
        ],
      },
      {
        look: 'compare',
        h: `Sell directly or through an estate agent?`,
        blocks: [
          {
            table: {
              head: [`Topic`, `Windmill Invest`, `Through an agent`],
              rows: [
                [`Agent's fees`, `None`, `Commission and marketing costs`],
                [`Viewings`, `One`, `Often many, with strangers`],
                [`Repairs or staging first`, `Not needed`, `Often advisable`],
                [`Publicly for sale`, `No, fully discreet`, `Yes, on Funda and other sites`],
                [`Timing`, `Agreed with you`, `Depends on the buyer`],
              ],
              note: `On the open market you can sometimes get more. We will tell you honestly if that is better for you.`,
            },
          },
        ],
      },
      {
        look: 'promises',
        h: `What you can expect from us`,
        blocks: [
          {
            check: [
              `**Everything in writing.** An offer with the price, the terms and the split of costs.`,
              `**No pressure.** You decide at your own pace, with your own adviser if you like.`,
              `**An honest answer.** If your home is not a fit, we say so straight away.`,
              `**Safe through the notary.** Payment and transfer always go through the notary.`,
            ],
          },
        ],
      },
    ],
    faq: [
      { q: `What does it cost to request an offer?`, a: `Nothing. The request and the assessment are free and without obligation. If you sell to Windmill Invest, you pay no agent's commission. Who pays which costs is set out in the offer beforehand.` },
      { q: `Does Windmill Invest buy every home?`, a: `We buy homes and buildings across the Netherlands, of every type and in any condition. We assess each request on its own and tell you honestly if another route suits you better.` },
      { q: `Do I have to repair or empty my house first?`, a: `No. You sell the home as it is. We agree together on anything that is left behind.` },
      { q: `Can I sell a tenanted home?`, a: `Yes. The tenant simply stays: the tenancy continues under the rule that a sale does not break a lease.` },
      { q: `Is an offer from Windmill Invest a valuation?`, a: `No. An offer is not a valuation report. If you need a valuation, for example for a mortgage, we refer you to a registered valuer.` },
    ],
    cta: { title: `Curious what your home is worth to us?`, text: `Request a free, no-obligation offer. It takes two minutes.`, button: `Request an offer` },
  },

  {
    slug: '/over-ons/',
    group: 'core',
    template: 'service',
    nav: `About us`,
    seoTitle: `About Windmill Invest │ Direct property buyer`,
    meta: `Windmill Invest buys homes and buildings directly from owners across the Netherlands. Read who we are and how we work.`,
    h1: `About Windmill Invest`,
    keyword: `about Windmill Invest`,
    secondary: [`property buyer Netherlands`],
    form: 'contact',
    related: ['/werkwijze/', '/contact/', '/klachten-en-disclosures/'],
    eyebrow: `About us`,
    intro: `Windmill Invest buys homes and buildings directly from owners, across the Netherlands and in its own name. So you sell without an estate agent, without viewings by strangers and with everything clearly in writing.`,
    heroPoints: [`Buyer in its own name`, `Across the Netherlands`, `Transfer through the notary`],
    sections: [
      {
        h: `Who we are`,
        blocks: [
          { p: `Selling is a big step for most people, often at a time when a lot is already happening: an inheritance, a divorce, a move, or a building that brings more worry than return. We make that step simple. You deal with one contact person, get a clear offer and stay in control.` },
        ],
      },
      {
        h: `Our principles`,
        blocks: [
          {
            check: [
              `**Honest about the route.** If an estate agent would get you more, we tell you.`,
              `**Everything in writing.** Offer, terms and split of costs are fixed beforehand.`,
              `**No pressure.** You take the time you need.`,
              `**No empty promises.** We only promise what we can deliver.`,
            ],
          },
        ],
      },
      {
        h: `Working with specialists`,
        blocks: [
          { p: `The notary handles the transfer and the payment. If you need a valuation or tax or legal advice, we refer you to an independent specialist. Read more about [how we work](/werkwijze/).` },
        ],
      },
      {
        h: `Company details`,
        blocks: [
          {
            table: {
              head: [`Detail`, `Value`],
              rows: [
                [`Trade name`, `Windmill Invest`],
                [`Legal name`, `{{legalName}}`],
                [`Chamber of Commerce (KvK) number`, `{{kvk}}`],
                [`Address`, `{{address}}`],
                [`Email`, `{{email}}`],
                [`Phone`, `{{phone}}`],
              ],
            },
          },
        ],
      },
    ],
    faq: [
      { q: `Is Windmill Invest an estate agent?`, a: `No. Windmill Invest buys itself. No estate agent is involved, so you pay no agent's commission.` },
      { q: `Does Windmill Invest work across the Netherlands?`, a: `Yes. We buy homes and buildings all over the country.` },
      { q: `How can I check Windmill Invest?`, a: `Our company details, including the KvK number, are on this page and at the bottom of every page. You can check them in the Dutch Business Register.` },
    ],
    cta: { title: `Get to know us?`, text: `Tell us about your home or building. We will give you an honest answer.`, button: `Contact us` },
  },

  {
    slug: '/werkwijze/',
    group: 'core',
    template: 'service',
    nav: `How we work`,
    seoTitle: `How to sell to Windmill Invest`,
    meta: `How to sell your home or building directly to Windmill Invest: from request to transfer at the notary, in six clear steps.`,
    h1: `How to sell to Windmill Invest`,
    keyword: `how selling to a property buyer works`,
    secondary: [`sell house step by step Netherlands`],
    form: 'verkoop',
    related: ['/huis-verkopen/', '/veelgestelde-vragen/', '/kennisbank/kosten-huis-verkopen/'],
    eyebrow: `How we work`,
    intro: `From request to notary in six steps. You always know where you stand, and nothing is binding until you sign the purchase agreement.`,
    heroPoints: [`Six clear steps`, `Everything in writing`, `You stay in control`],
    sections: [
      {
        h: `Step by step`,
        blocks: [
          {
            ol: [
              `**Request.** Fill in the form or call us. Address, type of home, occupancy and your timing are enough.`,
              `**First assessment.** We contact you and discuss your situation.`,
              `**Viewing.** We view the home once, at a time that suits you.`,
              `**Written offer.** You receive the price, the terms, the split of costs and a proposed transfer date.`,
              `**Purchase agreement.** If you agree, the purchase agreement is drawn up and sent to the notary.`,
              `**Transfer at the notary.** You sign the deed. The notary pays you and repays any mortgage.`,
            ],
          },
        ],
      },
      {
        h: `What helps us assess quickly?`,
        blocks: [
          {
            ul: [
              `The address and the type of home or building`,
              `Whether it is empty, lived in by you or let`,
              `Known defects or overdue maintenance`,
              `Your preferred timing`,
            ],
          },
          { note: `We never ask for ID documents or tenant files through the website. Those are exchanged securely later.` },
        ],
      },
    ],
    faq: [
      { q: `Am I committed to anything when I make a request?`, a: `No. Only a signed purchase agreement is binding.` },
      { q: `Can my own adviser take a look?`, a: `Yes, we recommend it. You can have the offer checked by, for example, a notary, lawyer or financial adviser.` },
      { q: `Who chooses the notary?`, a: `We agree on that together. The notary is independent and looks after the interests of both parties.` },
      { q: `How long does it take?`, a: `That depends on your home, the documents and the notary's schedule. We agree a realistic timetable with you, at a pace that suits you.` },
    ],
    cta: { title: `Ready for the first step?`, text: `A request takes two minutes and is without obligation.`, button: `Request an offer` },
  },

  {
    slug: '/contact/',
    group: 'core',
    template: 'service',
    nav: `Contact`,
    seoTitle: `Contact │ Windmill Invest`,
    meta: `Contact Windmill Invest about selling your home, tenanted property, commercial building or portfolio.`,
    h1: `Contact`,
    keyword: `Windmill Invest contact`,
    secondary: [`contact property buyer`],
    form: 'contact',
    related: ['/werkwijze/', '/over-ons/', '/veelgestelde-vragen/'],
    eyebrow: `Contact`,
    intro: `A question about selling your home or building? Call, email or send your question through the form. We reply personally.`,
    heroPoints: [`Personal reply`, `No obligation`, `Confidential`],
    sections: [
      {
        h: `Contact details`,
        blocks: [
          {
            table: {
              head: [`Channel`, `Details`],
              rows: [
                [`Email`, `{{email}}`],
                [`Phone`, `{{phone}}`],
                [`Address`, `{{address}}`],
                [`KvK`, `{{kvk}}`],
              ],
            },
          },
          { note: `Visits by appointment only.` },
        ],
      },
      {
        h: `Request an offer straight away?`,
        blocks: [
          {
            cards: [
              { t: `Sell your home`, d: `For owner-occupiers, heirs and owners of an empty home.`, href: '/huis-verkopen/', label: `Sell your house` },
              { t: `Tenanted property`, d: `For landlords, with the tenant in place.`, href: '/verhuurde-woning-verkopen/', label: `Sell tenanted property` },
              { t: `Commercial building or portfolio`, d: `A confidential route for larger properties.`, href: '/bedrijfspand-verkopen/', label: `Sell a commercial building` },
            ],
          },
        ],
      },
    ],
    faq: [
      { q: `How quickly will I get a reply?`, a: `We answer every request as soon as possible, in the order received.` },
      { q: `Can I contact you in English?`, a: `Yes. The purchase agreement and the deed are in Dutch; the notary can arrange a translation or an interpreter.` },
    ],
    cta: { title: `Rather get an offer straight away?`, text: `Tell us about your home. It takes two minutes.`, button: `Request an offer` },
  },

  {
    slug: '/veelgestelde-vragen/',
    group: 'core',
    template: 'hub',
    nav: `FAQ`,
    seoTitle: `Frequently asked questions │ Windmill Invest`,
    meta: `Answers to frequently asked questions about selling your home or building directly to Windmill Invest, grouped by situation.`,
    h1: `Frequently asked questions`,
    keyword: `selling to a property buyer questions`,
    secondary: [`questions selling a house Netherlands`],
    form: 'contact',
    related: ['/werkwijze/', '/kennisbank/', '/contact/'],
    eyebrow: `Questions`,
    intro: `The questions sellers ask us most, grouped by situation.`,
    heroPoints: [`By situation`, `Short answers`, `With a link to more`],
    sections: [{ h: `Questions by situation`, blocks: [{ auto: 'faq' }] }],
    faq: [],
    cta: { title: `Is your question not here?`, text: `Just ask. We reply personally.`, button: `Ask your question` },
  },

  {
    slug: '/kennisbank/',
    group: 'core',
    template: 'hub',
    nav: `Knowledge base`,
    seoTitle: `Knowledge base for sellers │ Windmill Invest`,
    meta: `Clear explanations for sellers: the costs of selling a house and what happens to the tenant when you sell a let home.`,
    h1: `Knowledge base`,
    keyword: `selling a house information Netherlands`,
    secondary: [`property selling guide`],
    form: null,
    related: ['/veelgestelde-vragen/', '/werkwijze/'],
    eyebrow: `Knowledge base`,
    intro: `Clear explanations for sellers. General information, not personal legal or tax advice.`,
    heroPoints: [`Up to date for 2026`, `With sources`, `For sellers`],
    sections: [{ h: `Articles`, blocks: [{ auto: 'articles' }] }],
    faq: [],
    cta: { title: `A question about your own situation?`, text: `Your home is unique. Ask us.`, button: `Ask your question` },
  },

  {
    slug: '/praktijkvoorbeelden/',
    group: 'core',
    template: 'service',
    nav: `Examples`,
    seoTitle: `Examples: how a sale works │ Windmill Invest`,
    meta: `How a sale to Windmill Invest can go: illustrative examples for heirs, landlords and owners of a commercial building.`,
    h1: `How your sale can go`,
    keyword: `selling to a property buyer example`,
    secondary: [`example house sale`],
    form: 'verkoop',
    related: ['/werkwijze/', '/geerfd-huis-verkopen/', '/vastgoedportefeuille-verkopen/', '/bedrijfspand-verkopen/'],
    eyebrow: `Examples`,
    intro: `Three typical situations and how a sale then goes. The examples are illustrative: they are not reports of real clients and contain no real amounts.`,
    heroPoints: [`Typical situations`, `Step by step`, `Illustrative`],
    sections: [
      {
        h: `Inherited home with overdue maintenance`,
        blocks: [
          { p: `Three heirs inherit a 1930s house. Two of them live abroad. The house is empty and has an old kitchen, single glazing and a roof that needs attention.` },
          {
            cards: [
              { t: `Starting point`, d: `The heirs do not want to invest in repairs and have no time for viewings.` },
              { t: `Approach`, d: `One viewing with one heir. One offer to all heirs at once. The notary arranges the powers of attorney.` },
              { t: `Note`, d: `All heirs must agree. Contents can stay behind by agreement.`, href: '/geerfd-huis-verkopen/', label: `Sell an inherited house` },
            ],
          },
        ],
      },
      {
        h: `Landlord with three homes`,
        blocks: [
          { p: `A landlord owns three let homes. The return no longer outweighs the worries and the costs.` },
          {
            cards: [
              { t: `Starting point`, d: `The tenants have lived there for years. The landlord wants to sell in one go, without them having to move.` },
              { t: `Approach`, d: `One offer for all three homes. The tenancies simply continue.` },
              { t: `Note`, d: `The landlord has the tax consequences checked by their own adviser.`, href: '/vastgoedportefeuille-verkopen/', label: `Sell a portfolio` },
            ],
          },
        ],
      },
      {
        h: `Vacant office building`,
        blocks: [
          { p: `A business owner has an office building that has stood empty since the tenant left. It has energy label E.` },
          {
            cards: [
              { t: `Starting point`, d: `Letting it again first needs a large investment in sustainability.` },
              { t: `Approach`, d: `A viewing and a confidential offer on the building as it is.` },
              { t: `Note`, d: `With a commercial building, VAT and transfer tax play a role. Get advice.`, href: '/bedrijfspand-verkopen/', label: `Sell a commercial building` },
            ],
          },
        ],
      },
    ],
    faq: [],
    cta: { title: `Recognise your situation?`, text: `Tell us about your home or building. We will show you what is possible.`, button: `Request an offer` },
  },
];
