// The lead.created event the website sends to Windmill CRM's Lead API. This is the contract described in
// docs/lead-contract.md: change both together, and raise schema_version when a field changes meaning.
import { randomUUID } from 'node:crypto';
import { config } from '../config.js';
import { ATTRIBUTION } from './forms.js';

export const SCHEMA_VERSION = 1;

// Answers that describe the property rather than the request, lifted out so the CRM can match on them.
const PROPERTY_FIELDS = [
  'postcode', 'house_number', 'house_letter', 'house_addition', 'street', 'city', 'bag_vbo_id', 'bag_nummeraanduiding_id', 'addresses',
  'property_type', 'asset_type', 'units', 'size_m2', 'occupancy', 'energy_label',
  'condition', 'roof', 'kitchen', 'bathroom', 'installations', 'known_defects',
  'rent', 'rent_type', 'contract', 'let_status', 'legal_owner',
];

// photos: the stored photos ({ id, content_type, size, sha256 }); the CRM downloads each from its url.
export function leadCreated(record, { occurredAt = new Date().toISOString(), eventId = randomUUID(), photos = [] } = {}) {
  const answers = { ...record.data };
  const property = {};
  for (const k of PROPERTY_FIELDS) if (k in answers) { property[k] = answers[k]; delete answers[k]; }
  return {
    schema_version: SCHEMA_VERSION,
    event_id: eventId,
    event_name: 'lead.created',
    occurred_at: occurredAt,
    lead_id: record.lead_id,
    source: 'website',
    form_type: record.form_type,
    avatar: record.avatar,
    language: record.lang,
    page: record.page || null,
    person: { name: record.name, email: record.email, phone: record.phone },
    property,
    answers,
    photos: photos.map((p) => ({ ...p, url: `${config.siteUrl}/api/photos/${p.id}` })),
    consents: record.consents.map(({ channel, purpose, granted, text, text_version }) => ({ channel, purpose, granted, text, text_version, occurred_at: occurredAt })),
    attribution: Object.fromEntries([...ATTRIBUTION, 'landing_page', 'referrer'].map((k) => [k, record[k] ?? null])),
  };
}
