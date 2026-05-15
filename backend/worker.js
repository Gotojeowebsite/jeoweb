/**
 * Jeoweb backend — Cloudflare Worker.
 *
 * A single-file, free-tier serverless backend for the otherwise 100%-static
 * Jeoweb site. The frontend (jeo-backend.js) talks to this with plain fetch;
 * if this Worker is unreachable the site degrades to fully static, so nothing
 * here is load-bearing for core gameplay.
 *
 * Routes:
 *   Phase 3 — global play counts, "trending now", live presence.
 *   Phase 4 — global per-game leaderboards + score submission.
 *
 * Storage: Cloudflare D1 (SQLite) — see schema.sql. We intentionally avoid KV
 * (its free tier caps at ~1k writes/day, far too low for presence heartbeats);
 * D1 allows ~100k/day. The trending response is Cache-API cached instead.
 *
 * Anti-abuse note: on a client-only-trust static site, scores CANNOT be made
 * unforgeable. The protections here (rate limit, bounds, timestamp window,
 * optional HMAC) only raise the cost of casual cheating — these are "for fun,
 * mostly honest" leaderboards, not competitive-integrity ones.
 *
 * Deploy: see backend/README.md.
 */

// Origins allowed to call this Worker. Add your real deploy origins here.
const ALLOWED_ORIGINS = [
  'https://jeoweb.app',
  'https://www.jeoweb.app',
  'https://gotojeowebsite.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const SLUG_RE = /^[a-z0-9._-]{1,100}$/i;
const PID_RE = /^[a-z0-9-]{1,64}$/i;
// A presence row counts as "live" for 3 minutes (heartbeat interval is 2 min).
const PRESENCE_TTL_MS = 3 * 60 * 1000;
// Score sanity bounds. 'score' kind: higher better. 'time' kind: ms survived.
const MAX_SCORE = 1e12;
const MAX_TIME_MS = 24 * 60 * 60 * 1000;
// Reject score submissions whose client timestamp is too far off "now".
const TS_PAST_MS = 5 * 60 * 1000;
const TS_FUTURE_MS = 60 * 1000;
// Per-player score-submit rate limit.
const SCORE_RATE_MAX = 30;
const SCORE_RATE_WINDOW_MS = 60 * 60 * 1000;

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function json(data, origin, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: Object.assign(
      { 'Content-Type': 'application/json' },
      corsHeaders(origin),
      extraHeaders
    ),
  });
}

function todayUTC(offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return d.toISOString().slice(0, 10);
}

async function readBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

// HMAC-SHA256 hex of `message` with `key`. Used as an anti-curl-spam speed
// bump on score submission — see verifyScoreSig().
async function hmacHex(key, message) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Constant-time-ish string compare.
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Sliding-ish window rate limiter backed by the rate_limits table.
// Returns true if the call is allowed, false if the limit is exceeded.
async function rateOk(env, key, max, windowMs) {
  const now = Date.now();
  try {
    const row = await env.DB.prepare(
      `SELECT count, reset_at FROM rate_limits WHERE rl_key = ?1`
    ).bind(key).first();
    if (!row || row.reset_at < now) {
      await env.DB.prepare(
        `INSERT INTO rate_limits (rl_key, count, reset_at) VALUES (?1, 1, ?2)
         ON CONFLICT(rl_key) DO UPDATE SET count = 1, reset_at = ?2`
      ).bind(key, now + windowMs).run();
      return true;
    }
    if (row.count >= max) return false;
    await env.DB.prepare(
      `UPDATE rate_limits SET count = count + 1 WHERE rl_key = ?1`
    ).bind(key).run();
    return true;
  } catch {
    // If the limiter itself errors, fail open — don't block legitimate users.
    return true;
  }
}

// ---- Phase 3 routes: play / trending / presence ----------------------------

async function handlePlay(request, env, origin) {
  const body = await readBody(request);
  const game = String(body.game || '');
  if (!SLUG_RE.test(game)) return json({ ok: false, error: 'bad game' }, origin, 400);
  const now = Date.now();
  const day = todayUTC();
  try {
    await env.DB.batch([
      env.DB.prepare(
        `INSERT INTO play_counts (game_slug, total_plays, updated_at)
         VALUES (?1, 1, ?2)
         ON CONFLICT(game_slug) DO UPDATE SET
           total_plays = total_plays + 1, updated_at = ?2`
      ).bind(game, now),
      env.DB.prepare(
        `INSERT INTO daily_counts (game_slug, day, plays)
         VALUES (?1, ?2, 1)
         ON CONFLICT(game_slug, day) DO UPDATE SET plays = plays + 1`
      ).bind(game, day),
    ]);
    return json({ ok: true }, origin);
  } catch (e) {
    return json({ ok: false, error: 'db' }, origin, 500);
  }
}

// Submit a 1..5 star rating for a game. One row per (game, pid) — re-rating
// overwrites. Lightly rate-limited; raters typically rate a few games at most.
async function handleRate(request, env, origin) {
  const body = await readBody(request);
  const game = String(body.game || '');
  const pid = String(body.pid || '');
  const stars = parseInt(body.stars, 10);
  if (!SLUG_RE.test(game) || !PID_RE.test(pid)) {
    return json({ ok: false, error: 'bad input' }, origin, 400);
  }
  // 0 clears the rating, 1..5 sets it.
  if (!Number.isFinite(stars) || stars < 0 || stars > 5) {
    return json({ ok: false, error: 'bad stars' }, origin, 400);
  }
  if (!(await rateOk(env, 'rate:' + pid, 60, 60 * 60 * 1000))) {
    return json({ ok: false, error: 'rate limited' }, origin, 429);
  }
  const now = Date.now();
  try {
    if (stars === 0) {
      await env.DB.prepare(`DELETE FROM ratings WHERE game_slug = ?1 AND pid = ?2`)
        .bind(game, pid).run();
    } else {
      await env.DB.prepare(
        `INSERT INTO ratings (game_slug, pid, stars, updated_at)
         VALUES (?1, ?2, ?3, ?4)
         ON CONFLICT(game_slug, pid) DO UPDATE SET stars = excluded.stars, updated_at = excluded.updated_at`
      ).bind(game, pid, stars, now).run();
    }
    return json({ ok: true }, origin);
  } catch (e) {
    return json({ ok: false, error: 'db' }, origin, 500);
  }
}

// Aggregate per-game ratings — { slug: { avg, count } } — for the whole
// catalog. Used to decorate cards with "★ 4.3 (1.2k)". Cache-API cached 60s.
async function handleRatings(url, env, origin, ctx) {
  const cacheKey = new Request(url.origin + '/api/ratings');
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return json(await cached.json(), origin);
  let rows;
  try {
    rows = await env.DB.prepare(
      `SELECT game_slug, AVG(stars) AS avg, COUNT(*) AS c FROM ratings GROUP BY game_slug`
    ).all();
  } catch (e) {
    return json({ ok: false, ratings: {} }, origin, 500);
  }
  const ratings = {};
  for (const r of (rows.results || [])) {
    ratings[r.game_slug] = { avg: Number(r.avg), count: r.c };
  }
  const payload = { ok: true, ratings };
  ctx.waitUntil(
    cache.put(cacheKey, new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=60' },
    }))
  );
  return json(payload, origin);
}

// All-time play counts for the whole catalog, as { slug: count }. Used to
// decorate grid/carousel cards with a "▶ N" badge. Cache-API cached 60s.
async function handleCounts(url, env, origin, ctx) {
  const cacheKey = new Request(url.origin + '/api/counts');
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return json(await cached.json(), origin);
  let rows;
  try {
    rows = await env.DB.prepare(`SELECT game_slug, total_plays FROM play_counts`).all();
  } catch (e) {
    return json({ ok: false, counts: {} }, origin, 500);
  }
  const counts = {};
  for (const r of (rows.results || [])) counts[r.game_slug] = r.total_plays;
  const payload = { ok: true, counts };
  ctx.waitUntil(
    cache.put(cacheKey, new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=60' },
    }))
  );
  return json(payload, origin);
}

async function handleTrending(url, env, origin, ctx) {
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit'), 10) || 20, 1), 50);
  const window = url.searchParams.get('window') === 'all' ? 'all' : '24h';

  const cacheKey = new Request(url.origin + '/api/trending?window=' + window + '&limit=' + limit);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) {
    const body = await cached.json();
    return json(body, origin);
  }

  let rows;
  try {
    if (window === 'all') {
      rows = await env.DB.prepare(
        `SELECT game_slug, total_plays AS p FROM play_counts ORDER BY p DESC LIMIT ?1`
      ).bind(limit).all();
    } else {
      const since = todayUTC(-1); // today + yesterday
      rows = await env.DB.prepare(
        `SELECT game_slug, SUM(plays) AS p FROM daily_counts
         WHERE day >= ?1 GROUP BY game_slug ORDER BY p DESC LIMIT ?2`
      ).bind(since, limit).all();
    }
  } catch (e) {
    return json({ ok: false, games: [] }, origin, 500);
  }

  const games = (rows.results || []).map((r) => ({ slug: r.game_slug, plays: r.p }));
  const payload = { ok: true, window, games };
  ctx.waitUntil(
    cache.put(
      cacheKey,
      new Response(JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=60' },
      })
    )
  );
  return json(payload, origin);
}

async function handlePresencePost(request, env, origin) {
  const body = await readBody(request);
  const game = String(body.game || '');
  const pid = String(body.pid || '');
  if (!SLUG_RE.test(game) || !PID_RE.test(pid)) {
    return json({ ok: false, error: 'bad input' }, origin, 400);
  }
  try {
    await env.DB.prepare(
      `INSERT INTO presence (game_slug, pid, last_seen)
       VALUES (?1, ?2, ?3)
       ON CONFLICT(game_slug, pid) DO UPDATE SET last_seen = ?3`
    ).bind(game, pid, Date.now()).run();
    return json({ ok: true }, origin);
  } catch (e) {
    return json({ ok: false, error: 'db' }, origin, 500);
  }
}

async function handlePresenceGet(url, env, origin) {
  const game = String(url.searchParams.get('game') || '');
  if (!SLUG_RE.test(game)) return json({ ok: false, count: 0 }, origin, 400);
  const cutoff = Date.now() - PRESENCE_TTL_MS;
  try {
    const row = await env.DB.prepare(
      `SELECT COUNT(*) AS c FROM presence WHERE game_slug = ?1 AND last_seen > ?2`
    ).bind(game, cutoff).first();
    return json({ ok: true, count: row ? row.c : 0 }, origin);
  } catch (e) {
    return json({ ok: false, count: 0 }, origin, 500);
  }
}

// ---- Phase 4 routes: leaderboards + score submission -----------------------

async function handleLeaderboard(url, env, origin) {
  const game = String(url.searchParams.get('game') || '');
  if (!SLUG_RE.test(game)) return json({ ok: false, entries: [] }, origin, 400);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit'), 10) || 20, 1), 100);
  const kind = url.searchParams.get('kind') === 'time' ? 'time' : 'score';
  // Both kinds rank higher = better. `kind` only drives client-side display
  // ('time' = ms survived shown as a duration, 'score' = raw points).
  try {
    const rows = await env.DB.prepare(
      `SELECT pid, score, display_name, kind, updated_at
       FROM scores WHERE game_slug = ?1
       ORDER BY score DESC LIMIT ?2`
    ).bind(game, limit).all();
    const entries = (rows.results || []).map((r, i) => ({
      rank: i + 1,
      pid: r.pid,
      score: r.score,
      name: r.display_name || 'Player',
      kind: r.kind || 'score',
      updated_at: r.updated_at,
    }));
    return json({ ok: true, game, kind, entries }, origin);
  } catch (e) {
    return json({ ok: false, entries: [] }, origin, 500);
  }
}

// Verifies the optional HMAC signature. If env.SCORE_SIGNING_KEY is unset the
// check is skipped (convenient for an initial deploy); set it (and the matching
// <meta name="jeo-score-key"> on the site) to require signed submissions.
async function verifyScoreSig(env, body) {
  const key = env.SCORE_SIGNING_KEY;
  if (!key) return true; // signing not enabled
  if (!body.sig || typeof body.sig !== 'string') return false;
  const message = [body.game, body.score, body.pid, body.ts].join('\n');
  const expected = await hmacHex(key, message);
  return safeEqual(expected, body.sig);
}

async function handleScore(request, env, origin) {
  const body = await readBody(request);
  const game = String(body.game || '');
  const pid = String(body.pid || '');
  const kind = body.kind === 'time' ? 'time' : 'score';
  const score = Number(body.score);
  const ts = Number(body.ts);
  let name = body.name == null ? '' : String(body.name).slice(0, 32).trim();

  // --- input validation ---
  if (!SLUG_RE.test(game) || !PID_RE.test(pid)) {
    return json({ ok: false, error: 'bad input' }, origin, 400);
  }
  if (!Number.isFinite(score) || score < 0) {
    return json({ ok: false, error: 'bad score' }, origin, 400);
  }
  const cap = kind === 'time' ? MAX_TIME_MS : MAX_SCORE;
  if (score > cap) {
    return json({ ok: false, error: 'score out of bounds' }, origin, 400);
  }
  // --- timestamp window (replay / clock-skew guard) ---
  const now = Date.now();
  if (!Number.isFinite(ts) || ts < now - TS_PAST_MS || ts > now + TS_FUTURE_MS) {
    return json({ ok: false, error: 'stale timestamp' }, origin, 400);
  }
  // --- optional signature ---
  if (!(await verifyScoreSig(env, body))) {
    return json({ ok: false, error: 'bad signature' }, origin, 401);
  }
  // --- rate limit (per player) ---
  if (!(await rateOk(env, 'score:' + pid, SCORE_RATE_MAX, SCORE_RATE_WINDOW_MS))) {
    return json({ ok: false, error: 'rate limited' }, origin, 429);
  }

  const intScore = Math.round(score);
  try {
    // One row per (game, player) = their personal best (always the MAX, so a
    // worse submission can't regress their standing, and they can't flood the
    // board with rows). `kind` is stored only as a display hint.
    await env.DB.prepare(
      `INSERT INTO scores (game_slug, pid, score, display_name, kind, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)
       ON CONFLICT(game_slug, pid) DO UPDATE SET
         score = MAX(scores.score, excluded.score),
         display_name = excluded.display_name,
         kind = excluded.kind,
         updated_at = excluded.updated_at`
    ).bind(game, pid, intScore, name || null, kind, now).run();
    return json({ ok: true }, origin);
  } catch (e) {
    return json({ ok: false, error: 'db' }, origin, 500);
  }
}

// ---- Phase 5 routes: shared profiles + web-push reminders ------------------

async function handleProfileGet(url, env, origin) {
  const pid = String(url.searchParams.get('pid') || '');
  if (!PID_RE.test(pid)) return json({ ok: false }, origin, 400);
  try {
    const row = await env.DB.prepare(
      `SELECT pid, display_name, created_at FROM players WHERE pid = ?1`
    ).bind(pid).first();
    return json({ ok: true, profile: row
      ? { pid: row.pid, name: row.display_name, created_at: row.created_at }
      : null }, origin);
  } catch {
    return json({ ok: false }, origin, 500);
  }
}

async function handleProfilePost(request, env, origin) {
  const body = await readBody(request);
  const pid = String(body.pid || '');
  if (!PID_RE.test(pid)) return json({ ok: false, error: 'bad pid' }, origin, 400);
  const name = body.name == null ? '' : String(body.name).slice(0, 32).trim();
  if (!(await rateOk(env, 'profile:' + pid, 20, 60 * 60 * 1000))) {
    return json({ ok: false, error: 'rate limited' }, origin, 429);
  }
  const now = Date.now();
  try {
    await env.DB.prepare(
      `INSERT INTO players (pid, display_name, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?3)
       ON CONFLICT(pid) DO UPDATE SET display_name = excluded.display_name, updated_at = ?3`
    ).bind(pid, name || null, now).run();
    return json({ ok: true }, origin);
  } catch {
    return json({ ok: false, error: 'db' }, origin, 500);
  }
}

// --- base64url + VAPID helpers (for sending payload-less web push) ---
function b64urlToBytes(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function bytesToB64url(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function strToB64url(str) {
  return bytesToB64url(new TextEncoder().encode(str));
}

// Build a P-256 JWK from web-push-style base64url keys (public = 65-byte
// uncompressed point, private = 32-byte scalar).
function vapidJwk(publicB64url, privateB64url) {
  const pub = b64urlToBytes(publicB64url);
  return {
    kty: 'EC', crv: 'P-256',
    x: bytesToB64url(pub.slice(1, 33)),
    y: bytesToB64url(pub.slice(33, 65)),
    d: privateB64url,
    ext: true,
  };
}

// Sign a VAPID JWT (ES256) for a push endpoint's origin.
async function vapidJwt(env, audience) {
  const key = await crypto.subtle.importKey(
    'jwk', vapidJwk(env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY),
    { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']
  );
  const header = strToB64url(JSON.stringify({ typ: 'JWT', alg: 'ES256' }));
  const claims = strToB64url(JSON.stringify({
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 12 * 3600,
    sub: env.VAPID_SUBJECT || 'mailto:admin@jeoweb.app',
  }));
  const input = header + '.' + claims;
  // Web Crypto ECDSA returns the raw r||s signature JWT/ES256 expects.
  const sig = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' }, key, new TextEncoder().encode(input)
  );
  return input + '.' + bytesToB64url(new Uint8Array(sig));
}

// Send one payload-less web push (the SW supplies the notification text).
// Returns the HTTP status, or 0 on a network error.
async function sendPush(env, endpoint) {
  try {
    const jwt = await vapidJwt(env, new URL(endpoint).origin);
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': 'vapid t=' + jwt + ', k=' + env.VAPID_PUBLIC_KEY,
        'TTL': '86400',
      },
    });
    return res.status;
  } catch {
    return 0;
  }
}

async function handlePushSubscribe(request, env, origin) {
  if (!env.VAPID_PRIVATE_KEY) {
    return json({ ok: false, error: 'push not configured' }, origin, 503);
  }
  const body = await readBody(request);
  const pid = String(body.pid || '');
  const sub = body.subscription || {};
  const endpoint = String(sub.endpoint || '');
  if (!PID_RE.test(pid) || !/^https:\/\//.test(endpoint) || endpoint.length > 1000) {
    return json({ ok: false, error: 'bad input' }, origin, 400);
  }
  const keys = sub.keys || {};
  try {
    await env.DB.prepare(
      `INSERT INTO push_subscriptions (endpoint, pid, p256dh, auth, created_at, fail_count)
       VALUES (?1, ?2, ?3, ?4, ?5, 0)
       ON CONFLICT(endpoint) DO UPDATE SET
         pid = excluded.pid, p256dh = excluded.p256dh,
         auth = excluded.auth, fail_count = 0`
    ).bind(endpoint, pid, keys.p256dh || null, keys.auth || null, Date.now()).run();
    return json({ ok: true }, origin);
  } catch {
    return json({ ok: false, error: 'db' }, origin, 500);
  }
}

async function handlePushUnsubscribe(request, env, origin) {
  const body = await readBody(request);
  const endpoint = String(body.endpoint || '');
  if (!/^https:\/\//.test(endpoint)) return json({ ok: false }, origin, 400);
  try {
    await env.DB.prepare(`DELETE FROM push_subscriptions WHERE endpoint = ?1`)
      .bind(endpoint).run();
    return json({ ok: true }, origin);
  } catch {
    return json({ ok: false }, origin, 500);
  }
}

// Cron entrypoint — sends the daily reminder push to every subscriber and
// prunes endpoints the push service reports as gone.
async function runDailyPush(env) {
  if (!env.VAPID_PRIVATE_KEY || !env.VAPID_PUBLIC_KEY) return;
  let rows;
  try {
    rows = await env.DB.prepare(`SELECT endpoint FROM push_subscriptions LIMIT 5000`).all();
  } catch {
    return;
  }
  for (const r of (rows.results || [])) {
    const status = await sendPush(env, r.endpoint);
    if (status === 404 || status === 410) {
      await env.DB.prepare(`DELETE FROM push_subscriptions WHERE endpoint = ?1`)
        .bind(r.endpoint).run().catch(() => {});
    } else if (status === 0 || status >= 500) {
      await env.DB.prepare(
        `UPDATE push_subscriptions SET fail_count = fail_count + 1 WHERE endpoint = ?1`
      ).bind(r.endpoint).run().catch(() => {});
    }
  }
}

// Opportunistic cleanup of stale presence + rate-limit rows so the tables
// don't grow unbounded without needing a Cron trigger.
async function maybeCleanup(env, ctx) {
  if (Math.random() > 0.02) return; // ~2% of requests
  const now = Date.now();
  ctx.waitUntil(Promise.all([
    env.DB.prepare(`DELETE FROM presence WHERE last_seen < ?1`)
      .bind(now - PRESENCE_TTL_MS * 4).run().catch(() => {}),
    env.DB.prepare(`DELETE FROM rate_limits WHERE reset_at < ?1`)
      .bind(now).run().catch(() => {}),
  ]));
}

// ---- entrypoint ------------------------------------------------------------

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    maybeCleanup(env, ctx);

    try {
      if (path === '/api/health') {
        return json({ ok: true, phase: 6, push: !!env.VAPID_PRIVATE_KEY }, origin);
      }
      if (path === '/api/play' && request.method === 'POST') {
        return await handlePlay(request, env, origin);
      }
      if (path === '/api/trending' && request.method === 'GET') {
        return await handleTrending(url, env, origin, ctx);
      }
      if (path === '/api/counts' && request.method === 'GET') {
        return await handleCounts(url, env, origin, ctx);
      }
      if (path === '/api/rate' && request.method === 'POST') {
        return await handleRate(request, env, origin);
      }
      if (path === '/api/ratings' && request.method === 'GET') {
        return await handleRatings(url, env, origin, ctx);
      }
      if (path === '/api/presence' && request.method === 'POST') {
        return await handlePresencePost(request, env, origin);
      }
      if (path === '/api/presence' && request.method === 'GET') {
        return await handlePresenceGet(url, env, origin);
      }
      if (path === '/api/leaderboard' && request.method === 'GET') {
        return await handleLeaderboard(url, env, origin);
      }
      if (path === '/api/score' && request.method === 'POST') {
        return await handleScore(request, env, origin);
      }
      if (path === '/api/profile' && request.method === 'GET') {
        return await handleProfileGet(url, env, origin);
      }
      if (path === '/api/profile' && request.method === 'POST') {
        return await handleProfilePost(request, env, origin);
      }
      if (path === '/api/push/subscribe' && request.method === 'POST') {
        return await handlePushSubscribe(request, env, origin);
      }
      if (path === '/api/push/unsubscribe' && request.method === 'POST') {
        return await handlePushUnsubscribe(request, env, origin);
      }
      return json({ ok: false, error: 'not found' }, origin, 404);
    } catch (e) {
      return json({ ok: false, error: 'server' }, origin, 500);
    }
  },

  // Cron trigger (see wrangler.toml [triggers]) — daily reminder push.
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runDailyPush(env));
  },
};
