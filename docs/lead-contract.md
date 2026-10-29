# Website → Windmill CRM: lead contract (v1)

How the Windmill Invest website sends each new inquiry to Windmill CRM's Lead API. The code that builds the message is `lib/lead-event.js`; the sender is `lib/forwarder.js`. Field names follow the Engine blueprint (`lead_id`, `avatar`, `gclid`, consent ledger) so they map straight onto the CRM's `person`, `lead`, `property`, `touchpoint` and `consent` tables.

## Delivery

- **Request:** `POST {CRM_LEAD_API_URL}` with a JSON body (below). The URL is whatever the CRM team gives us, e.g. `https://crm.example/api/leads`.
- **Headers:**

  | Header | Value |
  |---|---|
  | `Content-Type` | `application/json` |
  | `Authorization` | `Bearer {CRM_API_TOKEN}` (if a token is configured) |
  | `Idempotency-Key` | the event's `event_id` (UUID) |
  | `X-Windmill-Event` | `lead.created` |
  | `X-Windmill-Timestamp` | Unix time in seconds when sent (if signing is configured) |
  | `X-Windmill-Signature` | `sha256=<hex>`: HMAC-SHA256 of `"{timestamp}.{raw body}"` with `CRM_SIGNING_SECRET` |

- **When:** within a few seconds of the form submission (the website stores the lead and its event in one transaction, then sends immediately; a background loop also checks every 15 seconds).
- **At least once:** the same event can arrive more than once (timeouts, retries, several website instances). **Deduplicate on `Idempotency-Key` / `event_id`**, and answer a repeat with 2xx as if it were new.
- **Your answer decides what happens next:**

  | Response | Website does |
  |---|---|
  | 2xx | Marks the event delivered. |
  | 408, 409, 425, 429, 5xx, timeout (10 s), no connection | Retries after 30 s, 1 min, 2 min … up to 6 h between tries, 12 attempts in total (about 15 hours), then marks it failed. |
  | Other 4xx (400, 401, 403, 404, 422 …) | Marks it failed at once (retrying the same bytes will not help). |

  Failed events stay in the website database and show on the website's admin page; nothing is lost. If the URL is not configured yet, events simply wait and are sent once it is.

### Verifying the signature (Node.js example)

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

function verify(rawBody, headers, secret) {
  const ts = headers['x-windmill-timestamp'];
  if (!ts || Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false; // reject replays older than 5 min
  const expected = 'sha256=' + createHmac('sha256', secret).update(`${ts}.${rawBody}`).digest('hex');
  const got = String(headers['x-windmill-signature'] || '');
  return got.length === expected.length && timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}
```

Verify against the **raw** request body, before JSON parsing.

## Message

Real example, produced by the website's own code:

```json
{
  "schema_version": 1,
  "event_id": "9b2e4f10-6c3a-4d8e-b1f7-2a5c8e0d4b63",
  "event_name": "lead.created",
  "occurred_at": "2026-10-29T10:15:30.000Z",
  "lead_id": "3f6c2a9e-8b1d-4c7a-9e2f-5a1b7c3d9e01",
  "source": "website",
  "form_type": "verkoop",
  "avatar": "distressed_urgent",
  "language": "nl",
  "page": "/geerfd-huis-verkopen/",
  "person": { "name": "Jan Jansen", "email": "jan@example.nl", "phone": "+31612345678" },
  "property": { "postcode": "1234AB", "house_number": "12", "property_type": "woning" },
  "answers": { "situation": "geerfd", "timeline": "3m", "message": "Huis van mijn moeder, staat leeg." },
  "consents": [
    { "channel": "any", "purpose": "request", "granted": true,
      "text": "Ik ga akkoord met de verwerking van mijn gegevens volgens de privacyverklaring, zodat Windmill Invest contact met mij kan opnemen over deze aanvraag.",
      "text_version": "69627febdc09", "occurred_at": "2026-10-29T10:15:30.000Z" },
    { "channel": "phone", "purpose": "request", "granted": true,
      "text": "U mag mij bellen over deze aanvraag. Dat kan ook onze AI-assistent zijn; die zegt dat altijd aan het begin van het gesprek.",
      "text_version": "4d9b839e7376", "occurred_at": "2026-10-29T10:15:30.000Z" },
    { "channel": "whatsapp", "purpose": "request", "granted": true,
      "text": "Stuur mij berichten over deze aanvraag via WhatsApp.",
      "text_version": "82f1aab9eb75", "occurred_at": "2026-10-29T10:15:30.000Z" },
    { "channel": "email", "purpose": "marketing", "granted": false,
      "text": "Ja, stuur mij af en toe relevante kansen en nieuws per e-mail (optioneel, altijd af te melden).",
      "text_version": "551b6b7d0fbd", "occurred_at": "2026-10-29T10:15:30.000Z" }
  ],
  "attribution": {
    "utm_source": "google", "utm_medium": "cpc", "utm_campaign": "WI_G_distressed_urgent_erfenis",
    "utm_content": null, "utm_term": null,
    "gclid": "Cj0KCQjw-example", "gbraid": null, "wbraid": null,
    "fbclid": null, "fbp": null, "fbc": null, "ttclid": null,
    "landing_page": "/geerfd-huis-verkopen/", "referrer": "https://www.google.com/"
  }
}
```

## Fields

| Field | Type | Meaning |
|---|---|---|
| `schema_version` | int | `1`. Raised only when a field changes meaning; new optional fields do not raise it. Ignore fields you do not know. |
| `event_id` | UUID | Unique per event; the dedupe key. |
| `event_name` | string | Always `lead.created` in v1. |
| `occurred_at` | ISO 8601, UTC | When the visitor submitted the form. Start the 24-hour offer clock from here. |
| `lead_id` | UUID | Made in the visitor's browser when they start the form; also on the website's analytics events (`form_start`, `generate_lead`). Use it as the CRM lead's id or store it as a reference. One `lead_id` = one inquiry; a double submit never creates a second one. |
| `source` | string | `website`. |
| `form_type` | enum | Website pages: `verkoop`, `verhuurd`, `commercieel`, `investeerder`, `beheer`, `ontwikkeling`, `waardebepaling`, `contact`. Ad landing pages (one per avatar): `funnel_urgent`, `funnel_asis`, `funnel_portfolio`. **`investeerder` is a buyer** (investor criteria), not a seller. |
| `avatar` | enum or null | `distressed_urgent`, `klushuis_low_label`, `fatigued_investor`, or `null` when unclear. Fixed for the landing-page funnels (`funnel_urgent` → `distressed_urgent`, `funnel_asis` → `klushuis_low_label`, `funnel_portfolio` → `fatigued_investor`); otherwise a first guess from campaign, form and page (`lib/avatar.js`) that the AI call or a specialist should confirm. Always `null` for `investeerder`. |
| `language` | `nl` / `en` | The language the visitor used; reply in it. |
| `page` | string or null | Dutch path of the page with the form (also for English pages; e.g. `/geerfd-huis-verkopen/`). |
| `person.name` | string | 2–100 characters. |
| `person.email` | string | Lower case, format-checked. |
| `person.phone` | string or null | E.164 (`+31612345678`); any country accepted. `null` only on the `contact` form, where phone is optional. |
| `property` | object | Answers about the property, when the form asks them. Address: `postcode` (`1234AB`, no space), `house_number` (as typed), and, when the address was found in the BAG (PDOK Locatieserver, looked up by the website's server), `street`, `house_letter`, `house_addition`, `city`, `bag_vbo_id` (verblijfsobject id: use it to dedupe properties) and `bag_nummeraanduiding_id`. No BAG fields means the address was not found; the lead is sent anyway. Other: `property_type`, `asset_type`, `units` (number), `size_m2` (number), `occupancy` (`bewoond`, `leeg`, `verhuurd`), `energy_label` (`A`–`G`, `weet_niet`), condition `condition` (overall) / `roof` / `kitchen` / `bathroom` / `installations` (`goed`, `matig`, `slecht`, `weet_niet`), `known_defects`, `rent` (number, € per month), `rent_type`, `contract`, `let_status`, `legal_owner`, `addresses` (portfolio, one per line). |
| `photos` | array | Photos of the property the visitor added (landing-page forms; often empty): `id`, `content_type` (`image/jpeg`, `image/png`, `image/webp`), `size` (bytes, at most 2 MB), `sha256`, `url`. **Download each from its `url` with `Authorization: Bearer {CRM_API_TOKEN}`** (the same token the website sends you); store your own copy. |
| `answers` | object | The other form answers, e.g. `situation`, `owners_agree`, `mortgage` (`nee`, `ja`, `onderwater` = possibly more than the value, `weet_niet`), `timeline`, `transfer_date` (YYYY-MM-DD), `cash_advance`, `rent_back`, `leave_furniture`, `financing`, `call_moment`, `nda` (true when ticked), `message`, `subject`, `investor_type`, `budget`, `asset_pref`, `region`, `service`, `project_type`, `phase`, `purpose`, `company`. Option values per form are defined in `lib/forms.js` (`FORMS`). Optional answers left empty are absent. `transfer_date`, `cash_advance` and `rent_back` are only asked while that offer promise is switched on for the site. |
| `consents[]` | array | One entry per checkbox, **ticked or not**: `channel` (`any`, `phone`, `whatsapp`, `email`), `purpose` (`request`, `marketing`), `granted`, the exact `text` the visitor saw, `text_version` (fingerprint that changes when the wording changes), `occurred_at`. Write these to the consent ledger as they are. |
| `attribution` | object | First touch of the visit: UTM tags, Google click ids (`gclid`, `gbraid`, `wbraid`), Meta (`fbclid`, `fbp`, `fbc`), TikTok (`ttclid`), `landing_page`, `referrer`. Values are `null` when absent. `fbp`/`fbc` exist only if the visitor accepted marketing cookies. |

### Rules the CRM must respect

- **Calling:** start the AI call only when the `phone` / `request` consent is `granted: true` (Engine: "AI call only to leads who requested contact or consented").
- **WhatsApp:** only with `whatsapp` / `request` granted.
- **Marketing email:** only with `email` / `marketing` granted.
- The privacy consent (`any` / `request`) is always `true`: the form cannot be sent without it.

## Questions for the CRM team

1. The Lead API URL for test and for production, and how we authenticate: bearer token, signature, or both?
2. Do you accept this message as it is, or do you need a different shape? (Changing the website side is one function: `lib/lead-event.js`.)
3. Which response do you return for a duplicate `event_id`? (We expect 2xx.)
4. When can you receive test leads? The Engine blueprint's first milestone is a test lead flowing from the website into the CRM.
