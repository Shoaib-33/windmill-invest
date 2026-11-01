// Reviews from sellers: sent with the form on the home and landing pages, shown on the site only after
// someone approves them in the admin. The e-mail address (optional) is never shown; it lets us check that
// the writer really sold to us.
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const cleanText = (v, max) => String(v ?? '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim().slice(0, max);

export const REVIEW_STATUSES = ['pending', 'approved', 'rejected'];

export function validateReview(input) {
  const errors = {};
  const name = clean(input.name, 60);
  const place = clean(input.place, 60);
  const text = cleanText(input.text, 1000);
  const email = clean(input.email, 120).toLowerCase();
  const rating = Number(input.rating);
  if (name.length < 2) errors.name = 'required';
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = 'required';
  if (text.length < 20) errors.text = 'short';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'email';
  if (input.consent !== true && input.consent !== 'on') errors.consent = 'required';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, review: { name, place, rating, text, email: email || null, lang: input.lang === 'en' ? 'en' : 'nl', page: clean(input.page, 120) || null } };
}

// What the public sees: no e-mail, no ids beyond what is needed.
export const publicReview = (r) => ({ name: r.name, place: r.place || '', rating: r.rating, text: r.text, date: r.created_at.slice(0, 10) });
