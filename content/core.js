// Core pages. Based on "Windmill Invest — Website Content & SEO Master", rewritten for sellers only:
// Windmill Invest buys property, so the pages speak to owners who want to sell. Kept short on purpose.
// Home sections carry a `look` (situations, steps, compare, promises) that lib/render.js draws as its own design.
export default [
  {
    slug: '/',
    group: 'core',
    template: 'home',
    nav: `Home`,
    seoTitle: `Huis verkopen zonder makelaar │ Windmill Invest`,
    meta: `Verkoop uw huis of pand rechtstreeks aan Windmill Invest. Geen makelaarskosten, elke staat, heel Nederland. Vraag vrijblijvend een bod aan.`,
    h1: `Verkoop uw huis rechtstreeks. Zonder makelaar, zonder gedoe.`,
    keyword: `huis verkopen zonder makelaar`,
    secondary: [`huis direct verkopen`, `vastgoed opkoper`, `woning verkopen aan opkoper`],
    form: 'verkoop',
    related: [],
    eyebrow: `Wij kopen woningen en panden in heel Nederland`,
    intro: `Windmill Invest koopt uw woning of pand in eigen naam. Ook verhuurd, geërfd of toe aan een opknapbeurt. U krijgt een helder bod op papier en de notaris regelt de overdracht.`,
    heroPoints: [`Geen makelaarskosten`, `Elke staat, elk type`, `Overdracht via de notaris`],
    sections: [
      {
        look: 'situations',
        h: `Voor elke situatie`,
        blocks: [
          { p: `Iedere verkoop heeft een eigen reden. Kies wat bij u past.` },
          {
            cards: [
              { t: `Geërfd huis`, d: `Samen met de andere erfgenamen, zonder gedoe.`, href: '/geerfd-huis-verkopen/', label: `Lees meer`, img: 'erfenis' },
              { t: `Scheiding`, d: `Snel duidelijkheid en een eerlijke verdeling.`, href: '/huis-verkopen/', label: `Lees meer`, img: 'scheiding' },
              { t: `Verhuurde woning`, d: `De huurder blijft gewoon zitten.`, href: '/verhuurde-woning-verkopen/', label: `Lees meer`, img: 'verhuurd' },
              { t: `Achterstallig onderhoud`, d: `U hoeft niets op te knappen.`, href: '/huis-verkopen-met-achterstallig-onderhoud/', label: `Lees meer`, img: 'opknapper' },
              { t: `Leegstaande woning`, d: `Stop met dubbele lasten.`, href: '/leegstaande-woning-verkopen/', label: `Lees meer`, img: 'leegstand' },
              { t: `Vanuit het buitenland`, d: `Op afstand verkopen, met volmacht.`, href: '/huis-verkopen-vanuit-het-buitenland/', label: `Lees meer`, img: 'buitenland' },
              { t: `Bedrijfspand`, d: `Kantoor, hal, winkel of mixed-use.`, href: '/bedrijfspand-verkopen/', label: `Lees meer`, img: 'bedrijfspand' },
              { t: `Portefeuille`, d: `Meerdere panden in één vertrouwelijk traject.`, href: '/vastgoedportefeuille-verkopen/', label: `Lees meer`, img: 'portefeuille' },
            ],
          },
        ],
      },
      {
        look: 'steps',
        h: `Zo werkt het`,
        blocks: [
          {
            ol: [
              `**Vertel over uw woning.** Adres, type en uw planning. Dat kost twee minuten.`,
              `**Wij bekijken uw woning.** We plannen één bezichtiging, op een moment dat u past.`,
              `**U ontvangt een bod op papier.** Met de koopsom, de voorwaarden en wie welke kosten betaalt.`,
              `**De notaris regelt de rest.** U tekent bij de notaris en het geld staat op uw rekening.`,
            ],
          },
        ],
      },
      {
        look: 'types',
        h: `Wat wij kopen`,
        blocks: [
          { p: `Elk type woning of pand, in heel Nederland en in elke staat. Ook verhuurd of met achterstallig onderhoud.` },
          {
            cards: [
              { t: `Tussenwoning`, icon: 'tussenwoning' },
              { t: `Hoekwoning`, icon: 'hoekwoning' },
              { t: `Twee-onder-een-kap`, icon: 'twee' },
              { t: `Vrijstaande woning`, icon: 'vrijstaand' },
              { t: `Appartement`, icon: 'appartement' },
              { t: `Boerderij`, icon: 'boerderij' },
              { t: `Winkel of woon-werkpand`, icon: 'winkel' },
              { t: `Bedrijfspand`, icon: 'bedrijfspand' },
            ],
          },
        ],
      },
      {
        look: 'compare',
        h: `Rechtstreeks verkopen of via een makelaar?`,
        blocks: [
          {
            table: {
              head: [`Onderwerp`, `Windmill Invest`, `Via een makelaar`],
              rows: [
                [`Makelaarskosten`, `Geen`, `Courtage en marketingkosten`],
                [`Bezichtigingen`, `Eén`, `Vaak veel, met onbekenden`],
                [`Eerst opknappen of stylen`, `Niet nodig`, `Vaak verstandig`],
                [`Openbaar te koop`, `Nee, volledig discreet`, `Ja, op Funda en andere sites`],
                [`Planning`, `In overleg met u`, `Hangt af van de koper`],
              ],
              note: `Op de open markt kunt u soms meer opbrengen. Wij zeggen het eerlijk als dat voor u beter is.`,
            },
          },
        ],
      },
      {
        look: 'promises',
        h: `Wat u van ons kunt verwachten`,
        blocks: [
          {
            check: [
              `**Alles op papier.** Een bod met koopsom, voorwaarden en kostenverdeling.`,
              `**Geen druk.** U beslist in uw eigen tempo, ook met uw eigen adviseur.`,
              `**Eerlijk antwoord.** Past uw woning niet, dan zeggen we dat meteen.`,
              `**Veilig via de notaris.** Betaling en overdracht lopen altijd via de notaris.`,
            ],
          },
        ],
      },
    ],
    faq: [
      { q: `Wat kost het om een bod aan te vragen?`, a: `Niets. De aanvraag en de beoordeling zijn gratis en vrijblijvend. Verkoopt u aan Windmill Invest, dan betaalt u geen makelaarscourtage. Welke kosten voor wie zijn, staat vooraf in het bod.` },
      { q: `Koopt Windmill Invest elke woning?`, a: `We kopen woningen en panden in heel Nederland, van elk type en in elke staat. We beoordelen elke aanvraag apart en zeggen het eerlijk als een andere route beter voor u is.` },
      { q: `Moet ik mijn huis eerst opknappen of leeghalen?`, a: `Nee. U verkoopt de woning zoals ze nu is. Spullen die achterblijven, bespreken we samen.` },
      { q: `Kan ik een verhuurde woning verkopen?`, a: `Ja. De huurder blijft gewoon wonen: het huurcontract loopt door op grond van koop breekt geen huur.` },
      { q: `Is een bod van Windmill Invest een taxatie?`, a: `Nee. Een bod is geen taxatierapport. Heeft u een taxatie nodig, bijvoorbeeld voor een hypotheek, dan verwijzen we u naar een register-taxateur.` },
    ],
    cta: { title: `Benieuwd wat uw woning opbrengt?`, text: `Vraag vrijblijvend een bod aan. Het kost u twee minuten.`, button: `Vraag een bod aan` },
  },

  {
    slug: '/over-ons/',
    group: 'core',
    template: 'service',
    nav: `Over ons`,
    seoTitle: `Over Windmill Invest │ Rechtstreekse koper van vastgoed`,
    meta: `Windmill Invest koopt woningen en panden rechtstreeks van eigenaren in heel Nederland. Lees wie we zijn en hoe we werken.`,
    h1: `Over Windmill Invest`,
    keyword: `over Windmill Invest`,
    secondary: [`vastgoedopkoper Nederland`, `windmill invest ervaringen`],
    form: 'contact',
    related: ['/werkwijze/', '/contact/', '/klachten-en-disclosures/'],
    eyebrow: `Over ons`,
    intro: `Windmill Invest koopt woningen en panden rechtstreeks van eigenaren, in heel Nederland en in eigen naam. Zo verkoopt u zonder makelaar, zonder bezichtigingen met onbekenden en met alles helder op papier.`,
    heroPoints: [`Koper in eigen naam`, `Heel Nederland`, `Overdracht via de notaris`],
    sections: [
      {
        h: `Wie wij zijn`,
        blocks: [
          { p: `Verkopen is voor veel mensen een grote stap, vaak op een moment waarop er al veel gebeurt: een erfenis, een scheiding, een verhuizing of een pand dat meer zorgen dan rendement geeft. Wij maken die stap eenvoudig. U praat met één vast aanspreekpunt, krijgt een duidelijk bod en houdt zelf de regie.` },
        ],
      },
      {
        h: `Onze uitgangspunten`,
        blocks: [
          {
            check: [
              `**Eerlijk over de route.** Levert een makelaar u meer op, dan zeggen we dat.`,
              `**Alles op papier.** Bod, voorwaarden en kostenverdeling staan vooraf vast.`,
              `**Geen druk.** U neemt de tijd die u nodig heeft.`,
              `**Geen loze beloften.** We beloven alleen wat we zeker kunnen waarmaken.`,
            ],
          },
        ],
      },
      {
        h: `Samenwerken met specialisten`,
        blocks: [
          { p: `De notaris regelt de overdracht en de betaling. Heeft u een taxatie of fiscaal of juridisch advies nodig, dan verwijzen we u naar een onafhankelijke specialist. Lees meer over [onze werkwijze](/werkwijze/).` },
        ],
      },
      {
        h: `Bedrijfsgegevens`,
        blocks: [
          {
            table: {
              head: [`Gegeven`, `Waarde`],
              rows: [
                [`Handelsnaam`, `Windmill Invest`],
                [`Juridische naam`, `{{legalName}}`],
                [`KvK-nummer`, `{{kvk}}`],
                [`Adres`, `{{address}}`],
                [`E-mail`, `{{email}}`],
                [`Telefoon`, `{{phone}}`],
              ],
            },
          },
        ],
      },
    ],
    faq: [
      { q: `Is Windmill Invest een makelaar?`, a: `Nee. Windmill Invest koopt zelf. Er is geen makelaar betrokken, dus u betaalt geen makelaarscourtage.` },
      { q: `Werkt Windmill Invest in heel Nederland?`, a: `Ja. We kopen woningen en panden in het hele land.` },
      { q: `Hoe kan ik Windmill Invest controleren?`, a: `Onze bedrijfsgegevens, waaronder het KvK-nummer, staan op deze pagina en onderaan elke pagina. U kunt ze controleren in het Handelsregister.` },
    ],
    cta: { title: `Kennismaken?`, text: `Vertel ons over uw woning of pand. We geven u een eerlijk antwoord.`, button: `Neem contact op` },
  },

  {
    slug: '/werkwijze/',
    group: 'core',
    template: 'service',
    nav: `Werkwijze`,
    seoTitle: `Werkwijze: zo verkoopt u aan Windmill Invest`,
    meta: `Zo verkoopt u uw woning of pand rechtstreeks aan Windmill Invest: van aanvraag tot overdracht bij de notaris, in zes heldere stappen.`,
    h1: `Zo verkoopt u aan Windmill Invest`,
    keyword: `hoe werkt huis verkopen aan opkoper`,
    secondary: [`werkwijze vastgoedopkoper`, `huis verkopen stappenplan`],
    form: 'verkoop',
    related: ['/huis-verkopen/', '/veelgestelde-vragen/', '/kennisbank/kosten-huis-verkopen/'],
    eyebrow: `Werkwijze`,
    intro: `Van aanvraag tot notaris in zes stappen. U weet steeds waar u staat en u zit pas ergens aan vast als u de koopovereenkomst tekent.`,
    heroPoints: [`Zes heldere stappen`, `Alles op papier`, `U houdt de regie`],
    sections: [
      {
        h: `Het stappenplan`,
        blocks: [
          {
            ol: [
              `**Aanvraag.** U vult het formulier in of belt ons. Adres, type woning, bewoning en uw planning zijn genoeg.`,
              `**Eerste beoordeling.** We nemen contact met u op en bespreken uw situatie.`,
              `**Bezichtiging.** We bekijken de woning één keer, op een moment dat u past.`,
              `**Bod op papier.** U ontvangt de koopsom, de voorwaarden, de kostenverdeling en een voorstel voor de overdrachtsdatum.`,
              `**Koopovereenkomst.** Gaat u akkoord, dan wordt de koopovereenkomst opgesteld en naar de notaris gestuurd.`,
              `**Overdracht bij de notaris.** U tekent de akte. De notaris betaalt u uit en lost een eventuele hypotheek af.`,
            ],
          },
        ],
      },
      {
        h: `Wat helpt bij een snelle beoordeling?`,
        blocks: [
          {
            ul: [
              `Het adres en het type woning of pand`,
              `Of de woning leeg is, door u bewoond wordt of verhuurd is`,
              `Bekende gebreken of achterstallig onderhoud`,
              `Uw gewenste planning`,
            ],
          },
          { note: `Identiteitsbewijzen en huurdersdossiers vragen we niet via de website. Die stukken wisselen we later veilig uit.` },
        ],
      },
    ],
    faq: [
      { q: `Zit ik vast aan iets als ik een aanvraag doe?`, a: `Nee. Pas een ondertekende koopovereenkomst is bindend.` },
      { q: `Kan ik mijn eigen adviseur laten meekijken?`, a: `Ja, dat raden we aan. U kunt het bod laten beoordelen door bijvoorbeeld een notaris, advocaat of financieel adviseur.` },
      { q: `Wie kiest de notaris?`, a: `Dat stemmen we samen af. De notaris is onafhankelijk en behartigt de belangen van beide partijen.` },
      { q: `Hoe lang duurt het?`, a: `Dat hangt af van uw woning, de documenten en de planning van de notaris. We spreken een realistische planning met u af, op het tempo dat bij u past.` },
    ],
    cta: { title: `Klaar voor de eerste stap?`, text: `Een aanvraag kost twee minuten en is vrijblijvend.`, button: `Vraag een bod aan` },
  },

  {
    slug: '/contact/',
    group: 'core',
    template: 'service',
    nav: `Contact`,
    seoTitle: `Contact │ Windmill Invest`,
    meta: `Neem contact op met Windmill Invest over de verkoop van uw woning, verhuurd vastgoed, bedrijfspand of portefeuille.`,
    h1: `Contact`,
    keyword: `Windmill Invest contact`,
    secondary: [`contact vastgoedopkoper`],
    form: 'contact',
    related: ['/werkwijze/', '/over-ons/', '/veelgestelde-vragen/'],
    eyebrow: `Contact`,
    intro: `Een vraag over het verkopen van uw woning of pand? Bel, mail of stuur uw vraag via het formulier. We antwoorden persoonlijk.`,
    heroPoints: [`Persoonlijk antwoord`, `Vrijblijvend`, `Vertrouwelijk`],
    sections: [
      {
        h: `Contactgegevens`,
        blocks: [
          {
            table: {
              head: [`Kanaal`, `Gegevens`],
              rows: [
                [`E-mail`, `{{email}}`],
                [`Telefoon`, `{{phone}}`],
                [`Adres`, `{{address}}`],
                [`KvK`, `{{kvk}}`],
              ],
            },
          },
          { note: `Bezoek alleen op afspraak.` },
        ],
      },
      {
        h: `Direct een bod aanvragen?`,
        blocks: [
          {
            cards: [
              { t: `Woning verkopen`, d: `Voor eigenaar-bewoners, erfgenamen en eigenaren van een lege woning.`, href: '/huis-verkopen/', label: `Huis verkopen` },
              { t: `Verhuurd vastgoed`, d: `Voor verhuurders, met de huurder erin.`, href: '/verhuurde-woning-verkopen/', label: `Verhuurde woning verkopen` },
              { t: `Bedrijfspand of portefeuille`, d: `Een vertrouwelijk traject voor grotere objecten.`, href: '/bedrijfspand-verkopen/', label: `Bedrijfspand verkopen` },
            ],
          },
        ],
      },
    ],
    faq: [
      { q: `Hoe snel krijg ik antwoord?`, a: `We beantwoorden elke aanvraag zo snel mogelijk, in volgorde van binnenkomst.` },
      { q: `Kan ik ook in het Engels contact opnemen?`, a: `Ja. De koopovereenkomst en de akte zijn wel in het Nederlands; de notaris kan een vertaling of tolk regelen.` },
    ],
    cta: { title: `Liever direct een bod?`, text: `Vertel ons over uw woning. Het kost twee minuten.`, button: `Vraag een bod aan` },
  },

  {
    slug: '/veelgestelde-vragen/',
    group: 'core',
    template: 'hub',
    nav: `Veelgestelde vragen`,
    seoTitle: `Veelgestelde vragen over huis verkopen │ Windmill Invest`,
    meta: `Antwoorden op veelgestelde vragen over uw woning of pand rechtstreeks verkopen aan Windmill Invest, per situatie gebundeld.`,
    h1: `Veelgestelde vragen`,
    keyword: `huis verkopen aan opkoper vragen`,
    secondary: [`vragen huis verkopen`],
    form: 'contact',
    related: ['/werkwijze/', '/kennisbank/', '/contact/'],
    eyebrow: `Vragen`,
    intro: `De vragen die verkopers ons het vaakst stellen, per situatie gebundeld.`,
    heroPoints: [`Per situatie`, `Korte antwoorden`, `Met link naar meer uitleg`],
    sections: [{ h: `Vragen per situatie`, blocks: [{ auto: 'faq' }] }],
    faq: [],
    cta: { title: `Staat uw vraag er niet tussen?`, text: `Stel hem gerust. We antwoorden persoonlijk.`, button: `Stel uw vraag` },
  },

  {
    slug: '/kennisbank/',
    group: 'core',
    template: 'hub',
    nav: `Kennisbank`,
    seoTitle: `Kennisbank huis verkopen │ Windmill Invest`,
    meta: `Heldere uitleg voor verkopers: de kosten van een huis verkopen en wat er met de huurder gebeurt als u verhuurd verkoopt.`,
    h1: `Kennisbank`,
    keyword: `huis verkopen informatie`,
    secondary: [`kennisbank vastgoed verkopen`],
    form: null,
    related: ['/veelgestelde-vragen/', '/werkwijze/'],
    eyebrow: `Kennisbank`,
    intro: `Heldere uitleg voor verkopers. Algemene informatie, geen persoonlijk juridisch of fiscaal advies.`,
    heroPoints: [`Actueel voor 2026`, `Met bronnen`, `Voor verkopers`],
    sections: [{ h: `Artikelen`, blocks: [{ auto: 'articles' }] }],
    faq: [],
    cta: { title: `Een vraag over uw eigen situatie?`, text: `Uw woning is uniek. Leg uw vraag aan ons voor.`, button: `Stel uw vraag` },
  },

  {
    slug: '/praktijkvoorbeelden/',
    group: 'core',
    template: 'service',
    nav: `Praktijkvoorbeelden`,
    seoTitle: `Praktijkvoorbeelden: zo verloopt een verkoop │ Windmill Invest`,
    meta: `Zo kan een verkoop aan Windmill Invest verlopen: illustratieve voorbeelden voor erfgenamen, verhuurders en eigenaren van een bedrijfspand.`,
    h1: `Zo kan uw verkoop verlopen`,
    keyword: `huis verkopen aan opkoper voorbeeld`,
    secondary: [`praktijkvoorbeeld huis verkopen`],
    form: 'verkoop',
    related: ['/werkwijze/', '/geerfd-huis-verkopen/', '/vastgoedportefeuille-verkopen/', '/bedrijfspand-verkopen/'],
    eyebrow: `Praktijkvoorbeelden`,
    intro: `Drie typische situaties en hoe een verkoop dan verloopt. De voorbeelden zijn illustratief: het zijn geen verslagen van bestaande klanten en ze bevatten geen echte bedragen.`,
    heroPoints: [`Typische situaties`, `Stap voor stap`, `Illustratief`],
    sections: [
      {
        h: `Geërfde woning met achterstallig onderhoud`,
        blocks: [
          { p: `Drie erfgenamen erven een jarendertigwoning. Twee van hen wonen in het buitenland. Het huis staat leeg en heeft een oude keuken, enkel glas en een dak dat aandacht vraagt.` },
          {
            cards: [
              { t: `Uitgangssituatie`, d: `De erfgenamen willen niet investeren in opknappen en hebben geen tijd voor bezichtigingen.` },
              { t: `Aanpak`, d: `Eén bezichtiging met één erfgenaam. Eén bod aan alle erfgenamen tegelijk. De notaris regelt de volmachten.` },
              { t: `Let op`, d: `Alle erfgenamen moeten instemmen. De inboedel kan in overleg achterblijven.`, href: '/geerfd-huis-verkopen/', label: `Geërfd huis verkopen` },
            ],
          },
        ],
      },
      {
        h: `Verhuurder met drie woningen`,
        blocks: [
          { p: `Een verhuurder heeft drie verhuurde woningen. Het rendement weegt niet meer op tegen de zorgen en de kosten.` },
          {
            cards: [
              { t: `Uitgangssituatie`, d: `De huurders wonen er al jaren. De verhuurder wil in één keer verkopen, zonder dat zij hoeven te verhuizen.` },
              { t: `Aanpak`, d: `Eén bod voor alle drie de woningen. De huurcontracten lopen gewoon door.` },
              { t: `Let op`, d: `De verhuurder laat de fiscale gevolgen toetsen door een eigen adviseur.`, href: '/vastgoedportefeuille-verkopen/', label: `Portefeuille verkopen` },
            ],
          },
        ],
      },
      {
        h: `Leegstaand kantoorpand`,
        blocks: [
          { p: `Een ondernemer heeft een kantoorpand dat leegstaat sinds de huurder vertrok. Het pand heeft energielabel E.` },
          {
            cards: [
              { t: `Uitgangssituatie`, d: `Opnieuw verhuren vraagt eerst een flinke investering in verduurzaming.` },
              { t: `Aanpak`, d: `Bezichtiging en een vertrouwelijk bod op het pand in de huidige staat.` },
              { t: `Let op`, d: `Bij een bedrijfspand spelen btw en overdrachtsbelasting een rol. Laat u adviseren.`, href: '/bedrijfspand-verkopen/', label: `Bedrijfspand verkopen` },
            ],
          },
        ],
      },
    ],
    faq: [],
    cta: { title: `Herkent u uw situatie?`, text: `Vertel ons over uw woning of pand. We laten zien wat er mogelijk is.`, button: `Vraag een bod aan` },
  },
];
