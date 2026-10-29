// A stand-in for the database for demos on small hosts (e.g. Render's free plan, 512 MB, where the built-in
// PostgreSQL does not fit): the same interface as lib/db.js, kept in plain memory. Everything is gone when
// the server restarts, so never use it for real leads. Selected with STORAGE=memory.
import { DRAFT_DAYS } from './db.js';
import { leadCreated } from './lead-event.js';

export function openMemoryDb() {
  const inquiries = [], consents = [], photos = [], outbox = [];
  const drafts = new Map();
  let nextId = 1, nextPhotoId = 1, nextEventId = 1;
  const crmStatus = (leadId) => outbox.findLast((o) => o.lead_id === leadId)?.status ?? null;
  const view = (r) => ({ ...r, crm_status: crmStatus(r.lead_id), photo_ids: photos.filter((p) => p.lead_id === r.lead_id).map((p) => p.id) });

  return {
    kind: 'memory',
    async add(record, consentVersion, { ip = null } = {}) {
      const first = inquiries.find((r) => r.lead_id === record.lead_id);
      if (first) return { id: first.id, duplicate: true, eventId: null };
      const now = new Date().toISOString();
      const { consents: given, photos: pics = [], ...fields } = record;
      const row = {
        ...fields, id: nextId++, created_at: now, consent_privacy_at: now, consent_version: consentVersion,
        consent_marketing: record.consent_marketing ? 1 : 0, status: 'nieuw', data: structuredClone(record.data),
      };
      inquiries.push(row);
      for (const c of given) consents.push({ lead_id: record.lead_id, ...c, lang: record.lang, source: record.page || 'website', ip, occurred_at: now });
      const stored = pics.map((p) => {
        const photo = { id: nextPhotoId++, lead_id: record.lead_id, content_type: p.content_type, size: p.size, sha256: p.sha256, bytes: p.bytes };
        photos.push(photo);
        return { id: photo.id, content_type: p.content_type, size: p.size, sha256: p.sha256 };
      });
      const draft = drafts.get(record.lead_id);
      if (draft) draft.completed_at = now;
      const event = leadCreated(record, { occurredAt: now, photos: stored });
      outbox.push({ id: nextEventId++, event_id: event.event_id, lead_id: record.lead_id, event_name: event.event_name, payload: event, status: 'pending', attempts: 0, next_attempt_at: 0, last_error: null });
      return { id: row.id, duplicate: false, eventId: event.event_id };
    },
    async list({ limit = 500, beforeId = null } = {}) {
      return inquiries.filter((r) => !beforeId || r.id < beforeId).slice(-limit).reverse().map(view);
    },
    async *all() {
      for (const r of inquiries) yield view(r);
    },
    async count() { return inquiries.length; },
    async consents(leadId) { return consents.filter((c) => c.lead_id === leadId); },
    async photo(id) { return photos.find((p) => p.id === id) || null; },
    drafts: {
      async save(d) {
        const old = drafts.get(d.lead_id);
        if (old?.completed_at) return;
        const now = new Date().toISOString();
        drafts.set(d.lead_id, { ...d, step: Math.max(old?.step || 0, d.step), created_at: old?.created_at || now, updated_at: now, completed_at: null });
      },
      async unfinished(limit = 20) {
        const open = [...drafts.values()].filter((d) => !d.completed_at);
        const counts = new Map();
        for (const d of open) { const k = `${d.form_type}|${d.step}`; counts.set(k, (counts.get(k) || 0) + 1); }
        const perStep = [...counts].map(([k, n]) => { const [form_type, step] = k.split('|'); return { form_type, step: Number(step), n }; })
          .sort((a, b) => a.form_type.localeCompare(b.form_type) || a.step - b.step);
        return { perStep, recent: open.sort((a, b) => b.updated_at.localeCompare(a.updated_at)).slice(0, limit) };
      },
      async prune(days = DRAFT_DAYS) {
        const cutoff = new Date(Date.now() - days * 864e5).toISOString();
        for (const [k, d] of drafts) if (d.updated_at < cutoff) drafts.delete(k);
      },
    },
    outbox: {
      async claim(limit = 20, leaseSeconds = 120) {
        const due = outbox.filter((o) => o.status === 'pending' && o.next_attempt_at <= Date.now()).slice(0, limit);
        for (const o of due) { o.attempts += 1; o.next_attempt_at = Date.now() + leaseSeconds * 1000; }
        return due.map((o) => ({ ...o }));
      },
      async sent(id) { Object.assign(outbox.find((o) => o.id === id), { status: 'sent', last_error: null }); },
      async retryLater(id, error, seconds) { Object.assign(outbox.find((o) => o.id === id), { last_error: String(error).slice(0, 500), next_attempt_at: Date.now() + seconds * 1000 }); },
      async failed(id, error) { Object.assign(outbox.find((o) => o.id === id), { status: 'failed', last_error: String(error).slice(0, 500) }); },
      async stats() {
        const s = {};
        for (const o of outbox) s[o.status] = (s[o.status] || 0) + 1;
        return s;
      },
    },
    async close() {},
  };
}

// The storage name that selects this store (config.storage / createApp's dbPath).
export const MEMORY_STORAGE = 'js-memory';
