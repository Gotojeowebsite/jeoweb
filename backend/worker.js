/**
 * Jeoweb backend — Cloudflare Worker.
 *
 * A single-file, free-tier serverless backend for the otherwise 100%-static
 * Jeoweb site. The frontend (jeo-backend.js) talks to this with plain fetch;
 * if this Worker is unreachable the site degrades to fully static, so nothing
 * here is load-bearing for core gameplay.
 *
 * Phase 3 routes (this file): global play counts, "trending now", live
 * presence ("X playing now"). Phases 4/5 add leaderboards + score submission
 * and shared profiles + web-push; their routes slot into the same dispatch.
 *
 * Storage: Cloudflare D1 (SQLite) — see schema.sql. We intentionally avoid KV
 * here: KV's free tier caps at ~1k writes/day, far too low for presence
 * heartbeats, whereas D1 allows ~100k/day. The trending response is cached
 * with the Cache API instead.
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

// ---- route handlers --------------------------------------------------------

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

async function handleTrending(url, env, origin, ctx) {
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit'), 10) || 20, 1), 50);
  const window = url.searchParams.get('window') === 'all' ? 'all' : '24h';

  // Cache the computed list for 60s — trending changes slowly and this route
  // is read on every homepage load.
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
        `SELECT game_slug, total_plays AS p FROM play_counts
         ORDER BY p DESC LIMIT ?1`
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
  // Store in cache (60s TTL) without blocking the response.
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

// Opportunistic cleanup of stale presence rows — runs occasionally so the
// table doesn't grow unbounded without needing a Cron trigger in Phase 3.
async function maybeCleanup(env, ctx) {
  if (Math.random() > 0.02) return; // ~2% of requests
  ctx.waitUntil(
    env.DB.prepare(`DELETE FROM presence WHERE last_seen < ?1`)
      .bind(Date.now() - PRESENCE_TTL_MS * 4)
      .run()
      .catch(() => {})
  );
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
        return json({ ok: true, phase: 3 }, origin);
      }
      if (path === '/api/play' && request.method === 'POST') {
        return await handlePlay(request, env, origin);
      }
      if (path === '/api/trending' && request.method === 'GET') {
        return await handleTrending(url, env, origin, ctx);
      }
      if (path === '/api/presence' && request.method === 'POST') {
        return await handlePresencePost(request, env, origin);
      }
      if (path === '/api/presence' && request.method === 'GET') {
        return await handlePresenceGet(url, env, origin);
      }
      return json({ ok: false, error: 'not found' }, origin, 404);
    } catch (e) {
      return json({ ok: false, error: 'server' }, origin, 500);
    }
  },
};
