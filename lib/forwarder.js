// Delivers lead events from the outbox to Windmill CRM's Lead API (POST, JSON). Contract: docs/lead-contract.md.
// Without CRM_LEAD_API_URL nothing is sent and events wait in the outbox, so no lead is lost while the CRM
// is not ready. Delivery is at least once: the CRM must treat Idempotency-Key (= event_id) as a dedupe key.
import { createHmac } from 'node:crypto';

const MAX_ATTEMPTS = 12; // with the backoff below: retries over about 15 hours
const backoffSeconds = (attempt) => Math.min(30 * 2 ** (attempt - 1), 6 * 3600); // 30 s, 1 min, 2 min … 6 h

export function signature(secret, timestamp, body) {
  return createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
}

export function startForwarder(db, { url, token = '', secret = '', intervalMs = 15_000, timeoutMs = 10_000, log = console } = {}) {
  if (!url) return { nudge() {}, stop() {}, enabled: false };
  let running = false, again = false, stopped = false;

  async function deliver(row) {
    const body = JSON.stringify(row.payload);
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const headers = { 'content-type': 'application/json', 'idempotency-key': row.event_id, 'x-windmill-event': row.event_name };
    if (token) headers.authorization = `Bearer ${token}`;
    if (secret) { headers['x-windmill-timestamp'] = timestamp; headers['x-windmill-signature'] = `sha256=${signature(secret, timestamp, body)}`; }
    try {
      const res = await fetch(url, { method: 'POST', headers, body, signal: AbortSignal.timeout(timeoutMs) });
      if (res.ok) return db.outbox.sent(row.id);
      const detail = `HTTP ${res.status} ${(await res.text().catch(() => '')).slice(0, 200)}`;
      // 4xx means the CRM rejects this event as sent (bad payload, bad token): retrying the same bytes will not
      // help, except for timeouts, rate limits and conflicts, which are temporary.
      const permanent = res.status >= 400 && res.status < 500 && ![408, 409, 425, 429].includes(res.status);
      if (permanent || row.attempts >= MAX_ATTEMPTS) {
        log.error(`CRM rejected lead event ${row.event_id}: ${detail}`);
        return db.outbox.failed(row.id, detail);
      }
      return db.outbox.retryLater(row.id, detail, backoffSeconds(row.attempts));
    } catch (err) {
      if (row.attempts >= MAX_ATTEMPTS) {
        log.error(`CRM unreachable, giving up on lead event ${row.event_id}: ${err.message}`);
        return db.outbox.failed(row.id, err.message);
      }
      return db.outbox.retryLater(row.id, err.message, backoffSeconds(row.attempts));
    }
  }

  async function run() {
    if (stopped) return;
    if (running) { again = true; return; }
    running = true;
    try {
      for (;;) {
        const due = await db.outbox.claim();
        for (const row of due) await deliver(row);
        if (due.length < 20 && !again) break;
        again = false;
      }
    } catch (err) {
      log.error(`Lead forwarder error: ${err.message}`);
    } finally {
      running = false;
    }
  }

  const timer = setInterval(run, intervalMs);
  timer.unref();
  run();
  return {
    enabled: true,
    nudge: () => { run(); }, // called right after a new inquiry, so it reaches the CRM within seconds
    stop: () => { stopped = true; clearInterval(timer); },
    runOnce: run,
  };
}
