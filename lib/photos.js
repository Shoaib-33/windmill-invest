// Photos of the property on the landing-page forms (Engine blueprint: "photo upload"). The browser makes each
// photo smaller (longest side 1600 px, JPEG) and sends it base64-encoded with the inquiry; the server accepts
// only real JPEG, PNG or WebP files within these limits and stores them with the lead.
import { createHash } from 'node:crypto';

export const PHOTO_LIMITS = { max: 5, maxBytes: 2_000_000, maxSide: 1600 };

// The file type from its first bytes; the name or type the browser claims is never trusted.
function sniff(b) {
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b.length > 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (b.length > 12 && b.toString('latin1', 0, 4) === 'RIFF' && b.toString('latin1', 8, 12) === 'WEBP') return 'image/webp';
  return null;
}

const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

// value: an array of base64 strings (a "data:image/...;base64," prefix is allowed). Returns { photos } or
// { error: true } when anything is wrong, so the visitor can choose other photos.
export function parsePhotos(value) {
  if (value == null || value === '') return { photos: [] };
  if (!Array.isArray(value) || value.length > PHOTO_LIMITS.max) return { error: true };
  const photos = [];
  for (const item of value) {
    const text = String(item ?? '').replace(/^data:image\/[a-z]+;base64,/, '');
    if (!text || text.length > Math.ceil(PHOTO_LIMITS.maxBytes / 3) * 4 || !BASE64.test(text)) return { error: true };
    const bytes = Buffer.from(text, 'base64');
    const type = sniff(bytes);
    if (!type || bytes.length > PHOTO_LIMITS.maxBytes) return { error: true };
    photos.push({ content_type: type, bytes, size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
  }
  return { photos };
}
