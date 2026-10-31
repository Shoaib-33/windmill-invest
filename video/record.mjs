// Renders video/explainer.html to MP4 with headless Edge or Chrome and ffmpeg, frame by frame (so the video is
// smooth whatever the computer's speed).
//   node video/record.mjs                       → all four: nl/en × wide/tall into video/out/
//   node video/record.mjs nl wide               → one version
//   node video/record.mjs nl wide --stills 3,8  → only PNG stills at those seconds (to check a scene)
// Needs ffmpeg on the PATH and Edge (or set BROWSER to a Chrome/Edge executable).
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'out');
const FPS = 30;
const args = process.argv.slice(2);
const stillsArg = args.indexOf('--stills') >= 0 ? args[args.indexOf('--stills') + 1].split(',').map(Number) : null;
const pick = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--stills');
const langs = pick[0] ? [pick[0]] : ['nl', 'en'];
const formats = pick[1] ? [pick[1]] : ['wide', 'tall'];
const SIZE = { wide: [1920, 1080], tall: [1080, 1920] };
const BROWSER = process.env.BROWSER || ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function browser() {
  const port = 9400 + Math.floor(Math.random() * 400);
  const prof = mkdtempSync(join(tmpdir(), 'rec-'));
  const proc = spawn(BROWSER, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
  let target;
  for (let i = 0; i < 80 && !target; i++) {
    await sleep(250);
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((x) => x.type === 'page'); } catch {}
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0; const pending = new Map();
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  return { send, close: () => { ws.close(); proc.kill(); try { rmSync(prof, { recursive: true, force: true }); } catch {} } };
}

mkdirSync(OUT, { recursive: true });
const b = await browser();
for (const lang of langs) for (const format of formats) {
  const [w, h] = SIZE[format];
  await b.send('Page.enable');
  await b.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
  const url = pathToFileURL(join(HERE, 'explainer.html')).href + `?lang=${lang}&format=${format}&record=1`;
  await b.send('Page.navigate', { url });
  for (let i = 0; i < 100; i++) { await sleep(150); const r = await b.send('Runtime.evaluate', { expression: 'window.READY === true' }); if (r.result?.result?.value) break; }
  await sleep(400);
  const name = `windmill-explainer-${lang}-${format}`;
  const shot = async (t) => {
    await b.send('Runtime.evaluate', { expression: `renderAt(${t})` });
    const r = await b.send('Page.captureScreenshot', { format: stillsArg ? 'png' : 'jpeg', quality: 92, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
    return Buffer.from(r.result.data, 'base64');
  };
  if (stillsArg) {
    for (const t of stillsArg) writeFileSync(join(OUT, `${name}-${t}s.png`), await shot(t));
    console.log('stills', name, stillsArg.join(', '));
    continue;
  }
  const dur = (await b.send('Runtime.evaluate', { expression: 'window.DURATION' })).result.result.value;
  const frames = mkdtempSync(join(tmpdir(), 'frames-'));
  const total = Math.round((dur + 1) * FPS); // one extra second on the last frame
  for (let f = 0; f < total; f++) {
    writeFileSync(join(frames, `f${String(f).padStart(5, '0')}.jpg`), await shot(Math.min(dur, f / FPS)));
    if (f % 150 === 0) console.log(`${name}: frame ${f}/${total}`);
  }
  writeFileSync(join(OUT, `${name}-poster.jpg`), await shot(4.2));
  const mp4 = join(OUT, `${name}.mp4`);
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(frames, 'f%05d.jpg'), '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4], { stdio: 'inherit' });
  rmSync(frames, { recursive: true, force: true });
  if (r.status !== 0) { console.error('ffmpeg failed for', name); process.exitCode = 1; } else console.log('wrote', mp4);
}
b.close();
