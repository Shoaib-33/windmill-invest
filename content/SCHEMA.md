# Content format

Every file in `content/` (except this one) is an ES module whose default export is an array of page objects.
The build turns each object into one page. All copy is Dutch and is taken verbatim from the
"Windmill Invest — Website Content & SEO Master" document (sections 6–13). Do not rewrite or shorten it.

Use **backtick template literals** for every piece of text, so apostrophes (risico's, foto's) and quotes need no escaping.

## Page object

```js
export default [
  {
    slug: '/huis-verkopen/',            // exact URL from the sitemap, leading and trailing slash ('/' for home)
    group: 'verkopen',                  // core | verkopen | investeren | ontwikkelen | beheer | commercieel | advies | kennisbank | legal
    template: 'service',                // home | service | hub | article | legal
    nav: `Huis verkopen`,               // short page name ("Page" column of the sitemap)
    seoTitle: `Huis verkopen: makelaar, zelf of direct │ Windmill Invest`,
    meta: `...`,                        // meta description
    h1: `...`,
    keyword: `huis verkopen`,           // primary keyword
    secondary: [`woning verkopen`, `huis snel verkopen`],
    form: 'verkoop',                    // see "Forms" below, or null for "Geen formulier"
    related: ['/huis-verkopen-zonder-makelaar/', '/huis-verkopen-aan-opkoper/'],
    eyebrow: `Verkopen · Woning`,
    intro: `...`,                       // the "Intro:" paragraph
    heroPoints: [`...`, `...`, `...`],  // the "Hero points:" split on " · "
    sections: [
      { h: `Drie manieren om uw woning te verkopen`, blocks: [ /* blocks */ ] },
    ],
    faq: [{ q: `...`, a: `...` }],      // "Veelgestelde vragen" section; [] when absent
    cta: { title: `...`, text: `...`, button: `...` }, // "CTA band: Title — text. Button: Label"; null when absent

    // article template only
    updated: '2026-10-28',
    sources: [`Belastingdienst — tarieven overdrachtsbelasting`],
    // legal template only
    version: `28 oktober 2026`,
  },
];
```

Do not put the FAQ, the CTA band, "Bronnen" or the "Versie" line inside `sections`; they have their own fields.

## Blocks

| Block | Use for |
|---|---|
| `{ p: `text` }` | A normal paragraph |
| `{ note: `text` }` | A paragraph printed in italics in the document (often a caption under a table) |
| `{ ul: [`item`, ...] }` | A bullet list |
| `{ check: [`item`, ...] }` | A checklist (lists the document titles "Checklist ..." or that are criteria to tick off) |
| `{ ol: [`**Titel.** tekst`, ...] }` | A numbered list / steps |
| `{ cards: [{ t: `Titel`, d: `tekst`, href: '/slug/', label: `Linktekst` }, ...] }` | Lists written as "**Title** — description → Link" (href/label optional) |
| `{ table: { head: [`A`, `B`], rows: [[`a1`, `b1`], ...], note: `italic caption` } }` | Tables; `note` is the italic line directly under the table (optional) |
| `{ callout: { t: `Bold lead`, d: `rest of the paragraph` } }` | A paragraph that starts with a bold run-in title, e.g. "**Wat Windmill wel en niet doet** Wij kopen..." |
| `{ calculator: true }` | The interactive yield calculator placeholder on /vastgoed-rendement-berekenen/ |
| `{ auto: 'services' }` | "[Automatisch gegenereerd overzicht van alle dienstpagina's ...]" |
| `{ auto: 'faq' }` | "[Automatisch gegenereerd: de eerste drie FAQ's van elke dienstpagina ...]" |
| `{ auto: 'articles' }` | "[Automatisch gegenereerd overzicht van alle kennisbankartikelen.]" |

## Inline markup (inside any text)

- `**bold**` for bold words.
- `[link text](/slug/)` where the document shows a blue link. Link to the page the text names (e.g. "koop breekt geen huur" → `/kennisbank/koop-breekt-geen-huur/`). Only use slugs from the sitemap.
- The arrow lines "→ Page name" in card lists become `href`/`label` on the card.

## Placeholders

Replace company placeholders with tokens; the build fills them from `config.js`:

| Document | Token |
|---|---|
| `[Windmill Invest B.V.]` | `{{legalName}}` |
| `[KvK-nummer]` | `{{kvk}}` |
| `[Straat huisnummer, postcode plaats]` | `{{address}}` |
| `[telefoonnummer]` | `{{phone}}` |
| `info@windmillinvest.nl` | `{{email}}` |
| `windmillinvest.nl` (the domain on its own) | `{{domain}}` |

Keep the brand name "Windmill Invest" / "Windmill" as plain text.

## Forms

The "Form" field of each page maps to one of these keys:

| Document | `form` |
|---|---|
| Woning verkopen | `verkoop` |
| Verhuurd vastgoed | `verhuurd` |
| Commercieel (vertrouwelijk) / Commercieel / portefeuille (vertrouwelijk) | `commercieel` |
| Investeerderscriteria | `investeerder` |
| Beheervoorstel | `beheer` |
| Haalbaarheid project | `ontwikkeling` |
| Indicatieve waardebeoordeling | `waardebepaling` |
| Algemene vraag | `contact` |
| Geen formulier | `null` |

## English pages (`content/en/`)

Each file `content/en/<name>.js` is the English translation of `content/<name>.js`, page for page, in the same order.

- **Keep unchanged:** `slug` (the Dutch slug: it is the page's ID, the English URL comes from `EN_PATHS` in `lib/pages.js`), `group`, `template`, `form`, `related`, every link target `(/dutch-slug/)`, every card `href`, every `{{token}}`, `updated`, the `auto` and `calculator` blocks, and the number and order of sections, blocks, list items, table rows/cells, cards and FAQ items.
- **Translate:** every visible text (`nav`, `seoTitle`, `meta`, `h1`, `eyebrow`, `intro`, `heroPoints`, headings, block text, card `t`/`d`/`label`, table cells and notes, callouts, FAQ, CTA, `sources`, `version`), into clear British English for property owners and investors in the Netherlands, many of them expats or heirs living abroad.
- **Dutch terms:** on first use on a page, give the English term with the Dutch term in brackets, e.g. "transfer tax (overdrachtsbelasting)", "civil-law notary (notaris)", "Chamber of Commerce (KvK)". Keep Dutch proper names (Belastingdienst, Kadaster, Huurcommissie, NRVT) as they are.
- `keyword` and `secondary`: the English search terms someone would use for this page (e.g. "sell house Netherlands").
- `seoTitle` keeps the ` │ Windmill Invest` ending; `meta` stays under about 160 characters.
- Keep every figure, percentage, date, amount and legal reference exactly. Add no claims, promises, speeds or prices that the Dutch text does not make; leave nothing out.
- Legal pages: translate fully and faithfully. The site adds a notice that the Dutch version prevails, so do not add one yourself.

Check: `node lib/check-content.js content/en/<name>.js`. Besides the normal checks it compares the structure with the Dutch page and reports any difference.

## Check your file

```
node lib/check-content.js content/<your-file>.js
```
