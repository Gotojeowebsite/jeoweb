/* Jeoweb backend client — window.JeoBackend.
   A hand-written fetch wrapper around the optional Cloudflare Worker
   (see backend/). No SDK, no build step — consistent with the rest of the
   site's plain <script> modules.

   GRACEFUL DEGRADATION IS THE WHOLE POINT: if the backend isn't configured
   or is unreachable, every method resolves to a safe empty value and never
   throws into app.js. The site stays 100% functional and static. The
   backend only *adds* a global layer on top of the existing local data. */
(function () {
  if (window.JeoBackend) return;

  const TIMEOUT_MS = 3500;
  const PRESENCE_INTERVAL_MS = 120000; // 2 min — matches the Worker's TTL math

  // Resolve the Worker base URL: localStorage override (handy for dev) wins,
  // then the <meta name="jeo-backend"> tag. A missing/placeholder value means
  // "not configured" — we then never make a single network call.
  function readBaseUrl() {
    try {
      const ls = localStorage.getItem('jeo:backendUrl');
      if (ls && /^https?:\/\//.test(ls)) return ls.replace(/\/+$/, '');
    } catch {}
    const meta = document.querySelector('meta[name="jeo-backend"]');
    const v = meta && meta.content && meta.content.trim();
    if (v && /^https?:\/\//.test(v) && !/REPLACE|YOUR-/i.test(v)) {
      return v.replace(/\/+$/, '');
    }
    return null;
  }

  let BASE_URL = readBaseUrl();
  let available = null;       // null = unprobed, true/false after the probe
  let probePromise = null;

  // Stable anonymous identity. Independent of JeoAccount (which is null for
  // most visitors) — same lifetime/expectations as favorites: device-local,
  // lost if localStorage is cleared. Accounts are the cross-device upgrade.
  function getPlayerId() {
    let id = null;
    try { id = localStorage.getItem('jeo:playerId'); } catch {}
    if (!id) {
      id = (window.crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : 'p-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
      try { localStorage.setItem('jeo:playerId', id); } catch {}
    }
    return id;
  }

  async function fetchJson(path, opts) {
    if (!BASE_URL) throw new Error('backend not configured');
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(BASE_URL + path, Object.assign({ signal: ctrl.signal }, opts || {}));
      if (!res.ok) throw new Error('http ' + res.status);
      return await res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  // One-time health probe; the result is cached for the session.
  function isAvailable() {
    if (!BASE_URL) return Promise.resolve(false);
    if (available !== null) return Promise.resolve(available);
    if (!probePromise) {
      probePromise = fetchJson('/api/health')
        .then((d) => { available = !!(d && d.ok); return available; })
        .catch(() => { available = false; return false; });
    }
    return probePromise;
  }

  // Runs fn() only if the backend is up; any failure resolves to `fallback`.
  async function guard(fn, fallback) {
    try {
      if (!(await isAvailable())) return fallback;
      return await fn();
    } catch {
      return fallback;
    }
  }

  function postJson(path, payload) {
    return fetchJson(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  // Fire-and-forget: record a play. Never returns/throws.
  function recordPlay(slug) {
    if (!slug || !BASE_URL) return;
    guard(() => postJson('/api/play', { game: slug, pid: getPlayerId() }), null);
  }

  // Resolves to an array of { slug, plays } — [] on any failure.
  function getTrending(opts) {
    opts = opts || {};
    const limit = Math.min(Math.max(parseInt(opts.limit, 10) || 20, 1), 50);
    const win = opts.window === 'all' ? 'all' : '24h';
    return guard(
      () => fetchJson('/api/trending?window=' + win + '&limit=' + limit)
        .then((d) => (d && Array.isArray(d.games)) ? d.games : []),
      []
    );
  }

  // ---- presence ("X playing now") ------------------------------------------
  let presenceTimer = null;

  function startPresence(slug) {
    stopPresence();
    if (!slug || !BASE_URL) return;
    const beat = () => guard(() => postJson('/api/presence', { game: slug, pid: getPlayerId() }), null);
    beat();
    presenceTimer = setInterval(beat, PRESENCE_INTERVAL_MS);
  }

  function stopPresence() {
    if (presenceTimer) { clearInterval(presenceTimer); presenceTimer = null; }
  }

  // Resolves to a number — 0 on any failure.
  function getPresence(slug) {
    if (!slug) return Promise.resolve(0);
    return guard(
      () => fetchJson('/api/presence?game=' + encodeURIComponent(slug))
        .then((d) => (d && typeof d.count === 'number') ? d.count : 0),
      0
    );
  }

  // Dev/runtime override of the base URL (re-probes on next call).
  function config(opts) {
    if (opts && typeof opts.baseUrl === 'string') {
      BASE_URL = opts.baseUrl.replace(/\/+$/, '') || null;
      available = null;
      probePromise = null;
    }
  }

  window.JeoBackend = {
    config,
    isAvailable,
    isConfigured: () => !!BASE_URL,
    getPlayerId,
    recordPlay,
    getTrending,
    startPresence,
    stopPresence,
    getPresence,
  };
})();
