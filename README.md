# Windmill Invest website (demo)

55 pages from the "Website Content & SEO Master" (28 Oct 2026) in Dutch and English, generated from one content source, plus a small server for the lead forms.

## Languages

- Dutch is the main language, at the root: `/huis-verkopen/`. English is under `/en/`: `/en/sell-your-house/`.
- `content/*.js` holds the Dutch copy (verbatim from the document), `content/en/*.js` the English translation. English pages use the Dutch slug as their ID; their URLs come from `EN_PATHS` in `lib/pages.js`.
- The checker compares every English page with its Dutch original (same links, sections, lists, tables, FAQs), so a translation can never drift in structure. After changing a Dutch page, update its English twin.
- Fixed interface text (menu, cookie banner, forms, calculator) is in `lib/render.js` (`UI`), `lib/forms.js` (`FORMS_EN`) and `assets/site.js` (`M`).
- Every page links to its other-language twin (NL/EN button, `hreflang` tags and sitemap alternates). English legal pages say the Dutch version prevails.
- Inquiries record the language used (`lang` column in the admin and CSV), so you can reply in it.

```
npm start      # build into dist/ and serve on http://localhost:3002
npm test       # build and run the smoke tests
npm run check  # check the content only
```

Needs Node 22.9 or newer. Run `npm install` once (installs `pg` and `@electric-sql/pglite`).

## Database

Inquiries are always stored in **PostgreSQL**, with one schema and the same queries everywhere:

- **Locally / demo:** the built-in PostgreSQL ([PGlite](https://pglite.dev), PostgreSQL 18 running inside Node). Nothing to install; data lives in `data/pglite/` (`DATA_DIR`). The tests use an in-memory copy.
- **Production (GCP):** Cloud SQL for PostgreSQL, through `DATABASE_URL`. See "Deploy to Google Cloud" below.
- Optionally a local PostgreSQL server: `psql -U postgres -h localhost -v pw="choose-a-password" -f db/setup.sql`, then set `DATABASE_URL` in `.env` (see `.env.example`).

The table is created on first start. Form answers are stored as `jsonb` in the `data` column, so new form fields need no database change. The server prints which storage it uses when it starts. Set `TEST_DATABASE_URL` to run the tests against a PostgreSQL server.

## Deploy to Google Cloud (Cloud Run + Cloud SQL)

The site runs on **Cloud Run** (the container in `Dockerfile`), and inquiries go to **Cloud SQL for PostgreSQL**. The built-in database is not used on GCP: Cloud Run's disk is wiped on every deploy and restart, so the server refuses to start there without `DATABASE_URL`.

Run these in **Cloud Shell** (the terminal button in the GCP console; `gcloud` is already installed there). Upload this folder first, or clone it from your repository. Replace `my-project` and the two passwords.

```bash
PROJECT=my-project
REGION=europe-west4                 # Netherlands (Eemshaven)
DB_PASS='choose-a-strong-db-password'
gcloud config set project $PROJECT
gcloud services enable run.googleapis.com sqladmin.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com

# 1. The database (smallest tier; upgrade later without code changes). Takes a few minutes.
gcloud sql instances create windmill-db --database-version=POSTGRES_17 --edition=ENTERPRISE --tier=db-f1-micro --region=$REGION --backup-start-time=03:00
gcloud sql databases create windmill --instance=windmill-db
gcloud sql users create windmill --instance=windmill-db --password="$DB_PASS"

# 2. Secrets: the connection string (Cloud Run reaches Cloud SQL over a Unix socket) and the admin password.
#    If the DB password contains @ : / ? # or %, URL-encode it in this string.
printf '%s' "postgres://windmill:$DB_PASS@/windmill?host=/cloudsql/$PROJECT:$REGION:windmill-db" | gcloud secrets create database-url --data-file=-
printf '%s' 'choose-a-strong-admin-password' | gcloud secrets create admin-password --data-file=-

# 3. Let Cloud Run's service account read the secrets and connect to Cloud SQL.
SA="$(gcloud projects describe $PROJECT --format='value(projectNumber)')-compute@developer.gserviceaccount.com"
gcloud projects add-iam-policy-binding $PROJECT --member="serviceAccount:$SA" --role=roles/secretmanager.secretAccessor
gcloud projects add-iam-policy-binding $PROJECT --member="serviceAccount:$SA" --role=roles/cloudsql.client

# 4. Build and deploy (Cloud Build builds the Dockerfile; no Docker needed on your machine).
#    max-instances × DB_POOL_MAX (10 × 2 = 20) stays under the ~25 connections of the smallest Cloud SQL tier.
gcloud run deploy windmil-site --source . --region=$REGION --allow-unauthenticated \
  --add-cloudsql-instances=$PROJECT:$REGION:windmill-db \
  --max-instances=10 \
  --set-secrets=DATABASE_URL=database-url:latest,ADMIN_PASSWORD=admin-password:latest \
  --set-env-vars=TRUST_PROXY=true,DEMO=true,DB_POOL_MAX=2
```

**Scale.** Tested with 1,000,000 inquiries: saving one takes ~2 ms, an admin page ~25 ms, and the table is ~450 MB. The admin pages through inquiries 200 at a time, and the CSV export streams in batches, so memory stays flat at any size. For more traffic, move Cloud SQL to a larger tier (more connections and memory) and raise `--max-instances`/`DB_POOL_MAX` together.

The deploy prints the site's URL. Its log should say "Inquiries: stored in the PostgreSQL server". Later:

- **Your domain:** map it in Cloud Run ("Manage custom domains"), then redeploy with `--update-env-vars=SITE_URL=https://www.windmillinvest.nl`.
- **Company details:** add `LEGAL_NAME`, `KVK`, `BTW`, `ADDRESS`, `PHONE`, `EMAIL` with `--update-env-vars`. The pages are rebuilt when the container starts, so a redeploy is enough.
- **Going live:** `--update-env-vars=DEMO=false`, only after the legal sign-off.
- **Updates:** run the same `gcloud run deploy` command again.

## Where things are

- `content/*.js` – the page copy, one object per page (format in `content/SCHEMA.md`).
- `lib/pages.js` – the sitemap: every URL, its division and its form.
- `lib/forms.js` – the 8 lead forms; the pages and the server both use these definitions.
- `lib/render.js`, `build.js` – turn content into HTML in `dist/`.
- `server.js`, `lib/db.js` – serves `dist/` and stores inquiries in PostgreSQL (built-in locally, Cloud SQL on GCP).
- `Dockerfile` – the container for Cloud Run.
- `lib/funnels.js` – the 7 ad landing pages (Engine blueprint): /snel-verkopen/, /scheiding/, /erfenis/, /verkopen-zoals-het-is/, /energielabel/, /verhuurd-verkopen/, /portefeuille/. One link each in two languages: Dutch by default, English at the same link with `?lang=en` (the NL/EN button switches; built as `index.en.html`). Noindex, not in the menu or sitemap. Multi-step forms in `lib/forms.js` (`funnel_*`), in the blueprint's order: address → property → motivation → timeline → condition and mortgage → contact details. Optional photos (`lib/photos.js`, up to 5, made smaller in the browser, stored in `lead_photos`; the CRM downloads them with its token). Partial save: after each step, if the visitor accepted statistics or marketing cookies, the answers so far (never contact details) go to `lead_drafts`, shown on the admin page as "Onafgemaakte formulieren" and deleted after 30 days.
- `lib/bag.js` – address lookup in the BAG via PDOK (free, no key): the forms show the address found, and each lead gets its BAG id.
- `lib/lead-event.js`, `lib/forwarder.js`, `docs/lead-contract.md` – the hand-over of each lead to Windmill CRM (built separately): the message, its delivery with retries, and the contract for the CRM team. Each inquiry is stored together with its consent ledger rows and its CRM event in one transaction.
- `assets/` – stylesheet, browser script, logo.

Leads: `/admin` (login `admin` / `demo` by default) and `/admin/inquiries.csv`.

## Before going live

All company details are demo values marked "(demo)". Set them as environment variables:

| Variable | Meaning |
|---|---|
| `LEGAL_NAME`, `KVK`, `BTW`, `ADDRESS`, `PHONE`, `EMAIL` | Real company details |
| `SITE_URL` | e.g. `https://www.windmillinvest.nl` |
| `DATABASE_URL` | PostgreSQL server for the inquiries (required on GCP: Cloud SQL) |
| `PROMISE_OFFER_24H`, `PROMISE_AS_IS`, `PROMISE_CASH_ADVANCE`, `PROMISE_RENT_BACK`, `PROMISE_TRANSFER_DATE`, `PROMISE_NOTARY_COSTS` | `true` shows that offer promise (with its condition) on the ad landing pages and adds its questions to their forms. All off by default. `RENT_BACK_YEARS` sets the rent-back term (default 2). |
| `CRM_LEAD_API_URL`, `CRM_API_TOKEN`, `CRM_SIGNING_SECRET` | Windmill CRM's Lead API; every lead is forwarded there (see `docs/lead-contract.md`). Until set, leads wait in the website database. |
| `ADMIN_PASSWORD` | Admin login (required) |
| `GTM_ID` | Google Tag Manager container, loads only after consent |
| `OFFERS_RENT_BACK=false` | Hides the "verkopen en terughuren" page if that service is not offered |
| `TRUST_PROXY=true` | When behind Cloudflare or a proxy |
| `DEMO=false` | Removes the demo banner and allows indexing. **Only after a lawyer has approved the privacy statement, cookie policy, terms and disclaimer.** |

Also still needed: the final logo (`assets/logo.svg` and `assets/favicon.svg` are placeholders) and the real buying criteria on the pages that mention them.
