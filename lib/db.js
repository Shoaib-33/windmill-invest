// Storage for inquiries: always PostgreSQL, with the same schema and queries everywhere.
//  - DATABASE_URL set (production, e.g. Cloud SQL on GCP): a PostgreSQL server through the pg driver.
//  - Otherwise: PGlite, PostgreSQL built into the app, with its data in a local folder (or in memory for tests).
// The website keeps its own copy of every inquiry as a backup; Windmill CRM (built separately) is the system
// of record and receives each lead through the outbox (lib/forwarder.js).
import { mkdirSync } from 'node:fs';
import { ATTRIBUTION } from './forms.js';
import { leadCreated } from './lead-event.js';

const COLS = ['created_at', 'lead_id', 'form_type', 'avatar', 'lang', 'page', 'name', 'email', 'phone', 'data', 'consent_privacy_at', 'consent_version', 'consent_marketing', 'consent_phone', 'consent_whatsapp', ...ATTRIBUTION, 'landing_page', 'referrer'];

export const SCHEMA = `CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL,
  form_type TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'nl',
  page TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  data JSONB NOT NULL,
  consent_privacy_at TIMESTAMPTZ NOT NULL,
  consent_version TEXT NOT NULL,
  consent_marketing BOOLEAN NOT NULL DEFAULT FALSE,
  landing_page TEXT,
  referrer TEXT,
  status TEXT NOT NULL DEFAULT 'nieuw'
);
-- Columns added after the first version; IF NOT EXISTS keeps this safe to run on every start.
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS lead_id UUID;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS avatar TEXT;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS consent_phone BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS consent_whatsapp BOOLEAN NOT NULL DEFAULT FALSE;
${ATTRIBUTION.map((k) => `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS ${k} TEXT;`).join('\n')}
CREATE UNIQUE INDEX IF NOT EXISTS inquiries_lead_id ON inquiries (lead_id);
CREATE INDEX IF NOT EXISTS inquiries_created_at ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_email ON inquiries (lower(email));

-- Append-only consent ledger: one row per checkbox per inquiry, ticked or not, with the exact text shown.
CREATE TABLE IF NOT EXISTS consent (
  id BIGSERIAL PRIMARY KEY,
  lead_id UUID NOT NULL,
  channel TEXT NOT NULL,
  purpose TEXT NOT NULL,
  granted BOOLEAN NOT NULL,
  text TEXT NOT NULL,
  text_version TEXT NOT NULL,
  lang TEXT NOT NULL,
  source TEXT,
  ip TEXT,
  occurred_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS consent_lead_id ON consent (lead_id);

-- Transactional outbox: events waiting to be delivered to Windmill CRM, written in the same transaction
-- as the inquiry, so a lead is never stored without its event or sent without being stored.
CREATE TABLE IF NOT EXISTS lead_outbox (
  id BIGSERIAL PRIMARY KEY,
  event_id UUID NOT NULL UNIQUE,
  lead_id UUID NOT NULL,
  event_name TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  attempts INT NOT NULL DEFAULT 0,
  next_attempt_at TIMESTAMPTZ NOT NULL,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS lead_outbox_due ON lead_outbox (status, next_attempt_at);

-- Photos of the property sent with a lead (lib/photos.js: small JPEG/PNG/WebP files, at most 5 per lead).
CREATE TABLE IF NOT EXISTS lead_photos (
  id BIGSERIAL PRIMARY KEY,
  lead_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  size INT NOT NULL,
  sha256 TEXT NOT NULL,
  bytes BYTEA NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS lead_photos_lead_id ON lead_photos (lead_id);

-- Partly filled landing-page forms, saved after each step when the visitor consented (no contact details).
-- completed_at is set when the full inquiry arrives; old rows are removed (DRAFT_DAYS).
CREATE TABLE IF NOT EXISTS lead_drafts (
  lead_id UUID PRIMARY KEY,
  form_type TEXT NOT NULL,
  lang TEXT NOT NULL,
  page TEXT,
  step INT NOT NULL,
  data JSONB NOT NULL,
  attribution JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS lead_drafts_updated_at ON lead_drafts (updated_at);`;

// How long unfinished and finished drafts are kept.
export const DRAFT_DAYS = 30;

const INSERT = `INSERT INTO inquiries (${COLS.join(', ')}) VALUES (${COLS.map((_, i) => `$${i + 1}`).join(', ')})
  ON CONFLICT (lead_id) DO NOTHING RETURNING id`;
const LIST = `SELECT i.*, (SELECT o.status FROM lead_outbox o WHERE o.lead_id = i.lead_id ORDER BY o.id DESC LIMIT 1) AS crm_status,
  (SELECT array_agg(p.id ORDER BY p.id) FROM lead_photos p WHERE p.lead_id = i.lead_id) AS photo_ids
  FROM inquiries i`;

const iso = (v) => (v == null ? null : new Date(v).toISOString());
const plainRow = (r) => ({
  ...r,
  id: Number(r.id),
  created_at: iso(r.created_at),
  consent_privacy_at: iso(r.consent_privacy_at),
  consent_marketing: r.consent_marketing ? 1 : 0,
  photo_ids: (r.photo_ids || []).map(Number),
});

// target: a postgres:// URL, 'memory://' for a throwaway database, or a folder for PGlite's data.
export async function openDb(target) {
  let sql, kind;
  if (/^postgres(ql)?:\/\//.test(target)) {
    const { default: pg } = await import('pg');
    // Connections per app instance. Cloud SQL caps connections (about 25 on the smallest tier), and Cloud Run
    // may run several instances, so keep instances × DB_POOL_MAX below that cap.
    const pool = new pg.Pool({ connectionString: target, max: Number(process.env.DB_POOL_MAX) || 5 });
    sql = {
      query: (q, p) => pool.query(q, p),
      exec: (q) => pool.query(q),
      async tx(fn) {
        const c = await pool.connect();
        try {
          await c.query('BEGIN');
          const result = await fn((q, p) => c.query(q, p));
          await c.query('COMMIT');
          return result;
        } catch (err) {
          await c.query('ROLLBACK');
          throw err;
        } finally {
          c.release();
        }
      },
      close: () => pool.end(),
    };
    kind = 'postgres';
  } else {
    const { PGlite } = await import('@electric-sql/pglite');
    if (target !== 'memory://') mkdirSync(target, { recursive: true });
    const db = await PGlite.create(target === 'memory://' ? undefined : target);
    sql = {
      query: (q, p) => db.query(q, p),
      exec: (q) => db.exec(q),
      tx: (fn) => db.transaction((t) => fn((q, p) => t.query(q, p))),
      close: () => db.close(),
    };
    kind = 'pglite';
  }
  await sql.exec(SCHEMA);

  return {
    kind,
    // Stores an inquiry, its consents and its lead.created event in one transaction. Submitting the same
    // lead_id twice (double click, retry) stores nothing new and returns the first inquiry.
    async add(record, consentVersion, { ip = null } = {}) {
      const now = new Date().toISOString();
      const row = {
        ...record, created_at: now, consent_privacy_at: now, consent_version: consentVersion,
        data: JSON.stringify(record.data), consent_marketing: Boolean(record.consent_marketing),
      };
      return sql.tx(async (q) => {
        const { rows } = await q(INSERT, COLS.map((c) => row[c] ?? null));
        if (!rows.length) {
          const { rows: [first] } = await q('SELECT id FROM inquiries WHERE lead_id = $1', [record.lead_id]);
          return { id: Number(first.id), duplicate: true, eventId: null };
        }
        for (const c of record.consents) {
          await q(`INSERT INTO consent (lead_id, channel, purpose, granted, text, text_version, lang, source, ip, occurred_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [record.lead_id, c.channel, c.purpose, c.granted, c.text, c.text_version, record.lang, record.page || 'website', ip, now]);
        }
        const photos = [];
        for (const p of record.photos || []) {
          const { rows: [r] } = await q(`INSERT INTO lead_photos (lead_id, content_type, size, sha256, bytes, created_at)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [record.lead_id, p.content_type, p.size, p.sha256, p.bytes, now]);
          photos.push({ id: Number(r.id), content_type: p.content_type, size: p.size, sha256: p.sha256 });
        }
        await q('UPDATE lead_drafts SET completed_at = $2 WHERE lead_id = $1', [record.lead_id, now]);
        const event = leadCreated(record, { occurredAt: now, photos });
        await q(`INSERT INTO lead_outbox (event_id, lead_id, event_name, payload, next_attempt_at, created_at)
          VALUES ($1, $2, $3, $4, $5, $5)`, [event.event_id, record.lead_id, event.event_name, JSON.stringify(event), now]);
        return { id: Number(rows[0].id), duplicate: false, eventId: event.event_id };
      });
    },
    // Newest first, one page at a time: beforeId is the last id of the previous page.
    async list({ limit = 500, beforeId = null } = {}) {
      const { rows } = beforeId
        ? await sql.query(`${LIST} WHERE i.id < $1 ORDER BY i.id DESC LIMIT $2`, [beforeId, limit])
        : await sql.query(`${LIST} ORDER BY i.id DESC LIMIT $1`, [limit]);
      return rows.map(plainRow);
    },
    // Every inquiry, oldest first, in batches: memory stays flat however many rows there are.
    async *all(batch = 2000) {
      let after = 0;
      for (;;) {
        const { rows } = await sql.query(`${LIST} WHERE i.id > $1 ORDER BY i.id LIMIT $2`, [after, batch]);
        if (!rows.length) return;
        for (const r of rows) yield plainRow(r);
        after = Number(rows.at(-1).id);
      }
    },
    async count() {
      const { rows } = await sql.query('SELECT count(*)::int AS n FROM inquiries');
      return rows[0].n;
    },
    async consents(leadId) {
      const { rows } = await sql.query('SELECT * FROM consent WHERE lead_id = $1 ORDER BY id', [leadId]);
      return rows;
    },
    async photo(id) {
      const { rows: [r] } = await sql.query('SELECT id, lead_id, content_type, bytes FROM lead_photos WHERE id = $1', [id]);
      return r ? { ...r, id: Number(r.id), bytes: Buffer.from(r.bytes) } : null;
    },
    drafts: {
      // Saves the answers so far; a step the visitor went back from is not lost, and a finished form is never reopened.
      save: (d) => sql.query(`INSERT INTO lead_drafts (lead_id, form_type, lang, page, step, data, attribution, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now())
          ON CONFLICT (lead_id) DO UPDATE SET step = GREATEST(lead_drafts.step, EXCLUDED.step), data = EXCLUDED.data,
            lang = EXCLUDED.lang, updated_at = now()
          WHERE lead_drafts.completed_at IS NULL`,
      [d.lead_id, d.form_type, d.lang, d.page, d.step, JSON.stringify(d.data), JSON.stringify(d.attribution)]),
      // Unfinished forms of the last DRAFT_DAYS days: how many stopped after each step, and the newest ones.
      async unfinished(limit = 20) {
        const where = 'completed_at IS NULL';
        const [{ rows: perStep }, { rows: recent }] = await Promise.all([
          sql.query(`SELECT form_type, step, count(*)::int AS n FROM lead_drafts WHERE ${where} GROUP BY form_type, step ORDER BY form_type, step`),
          sql.query(`SELECT * FROM lead_drafts WHERE ${where} ORDER BY updated_at DESC LIMIT $1`, [limit]),
        ]);
        return { perStep, recent: recent.map((r) => ({ ...r, updated_at: iso(r.updated_at) })) };
      },
      prune: (days = DRAFT_DAYS) => sql.query(`DELETE FROM lead_drafts WHERE updated_at < now() - make_interval(days => $1)`, [days]),
    },
    outbox: {
      // Leases up to `limit` due events for `leaseSeconds`, so parallel instances never send the same one at once.
      async claim(limit = 20, leaseSeconds = 120) {
        const { rows } = await sql.query(`UPDATE lead_outbox SET attempts = attempts + 1,
            next_attempt_at = now() + make_interval(secs => $2)
          WHERE id IN (SELECT id FROM lead_outbox WHERE status = 'pending' AND next_attempt_at <= now()
            ORDER BY id LIMIT $1 FOR UPDATE SKIP LOCKED)
          RETURNING *`, [limit, leaseSeconds]);
        return rows;
      },
      sent: (id) => sql.query(`UPDATE lead_outbox SET status = 'sent', sent_at = now(), last_error = NULL WHERE id = $1`, [id]),
      retryLater: (id, error, seconds) => sql.query(`UPDATE lead_outbox SET last_error = $2, next_attempt_at = now() + make_interval(secs => $3) WHERE id = $1`, [id, String(error).slice(0, 500), seconds]),
      failed: (id, error) => sql.query(`UPDATE lead_outbox SET status = 'failed', last_error = $2 WHERE id = $1`, [id, String(error).slice(0, 500)]),
      async stats() {
        const { rows } = await sql.query(`SELECT status, count(*)::int AS n FROM lead_outbox GROUP BY status`);
        return Object.fromEntries(rows.map((r) => [r.status, r.n]));
      },
    },
    close: () => sql.close(),
  };
}
