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

  // Resolves to a { slug: playCount } map for the whole catalog — {} on any
  // failure. Used to decorate cards with a play-count badge.
  function getAllCounts() {
    return guard(
      () => fetchJson('/api/counts')
        .then((d) => (d && d.counts && typeof d.counts === 'object') ? d.counts : {}),
      {}
    );
  }

  // Submit a 1..5 star rating (0 = clear). Fire-and-forget; degrades to a
  // no-op when the backend is unreachable.
  function submitRating(slug, stars) {
    if (!slug || !BASE_URL) return;
    const n = parseInt(stars, 10);
    if (!Number.isFinite(n) || n < 0 || n > 5) return;
    guard(() => postJson('/api/rate', { game: slug, stars: n, pid: getPlayerId() }), null);
  }

  // Resolves to a { slug: { avg, count } } map — {} on any failure.
  function getAllRatings() {
    return guard(
      () => fetchJson('/api/ratings')
        .then((d) => (d && d.ratings && typeof d.ratings === 'object') ? d.ratings : {}),
      {}
    );
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

  // ---- leaderboards + score submission (Phase 4) ---------------------------

  // Display name for the board: the signed-in account name, else "Player".
  function displayName() {
    try {
      if (window.JeoAccount && JeoAccount.getState) {
        const st = JeoAccount.getState();
        if (st && st.profile && st.profile.name) return String(st.profile.name).slice(0, 32);
      }
    } catch {}
    return 'Player';
  }

  // Optional HMAC signing key (anti-curl-spam speed bump). Read from a
  // <meta name="jeo-score-key"> tag; if absent, submissions go unsigned and
  // the Worker accepts them (unless it has SCORE_SIGNING_KEY set, in which
  // case set the meta tag to the same value).
  function getScoreKey() {
    const meta = document.querySelector('meta[name="jeo-score-key"]');
    const v = meta && meta.content && meta.content.trim();
    if (v && !/REPLACE|YOUR-/i.test(v)) return v;
    return null;
  }

  async function hmacHex(key, message) {
    const enc = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
      'raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(message));
    return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Resolves to an array of leaderboard entries — [] on any failure.
  // opts: { kind: 'score'|'time', limit }
  function getLeaderboard(slug, opts) {
    if (!slug) return Promise.resolve([]);
    opts = opts || {};
    const kind = opts.kind === 'time' ? 'time' : 'score';
    const limit = Math.min(Math.max(parseInt(opts.limit, 10) || 20, 1), 100);
    const q = '/api/leaderboard?game=' + encodeURIComponent(slug) + '&kind=' + kind + '&limit=' + limit;
    return guard(
      () => fetchJson(q).then((d) => (d && Array.isArray(d.entries)) ? d.entries : []),
      []
    );
  }

  // Submits a score. Resolves to { ok, mine? } — { ok:false } on any failure,
  // never throws. opts: { kind: 'score'|'time' }
  async function submitScore(slug, score, opts) {
    if (!slug || !BASE_URL || !Number.isFinite(Number(score))) return { ok: false };
    opts = opts || {};
    const kind = opts.kind === 'time' ? 'time' : 'score';
    return guard(async () => {
      const pid = getPlayerId();
      const ts = Date.now();
      const payload = {
        game: slug,
        score: Math.round(Number(score)),
        pid: pid,
        ts: ts,
        kind: kind,
        name: displayName(),
      };
      const key = getScoreKey();
      if (key) {
        try {
          payload.sig = await hmacHex(key, [payload.game, payload.score, payload.pid, payload.ts].join('\n'));
        } catch {}
      }
      const d = await postJson('/api/score', payload);
      return { ok: !!(d && d.ok) };
    }, { ok: false });
  }

  // ---- shared profiles + web-push (Phase 5) --------------------------------

  // Resolves to a profile object or null.
  function getProfile(pid) {
    if (!pid) return Promise.resolve(null);
    return guard(
      () => fetchJson('/api/profile?pid=' + encodeURIComponent(pid))
        .then((d) => (d && d.profile) || null),
      null
    );
  }

  // Resolves to { ok } — { ok:false } on any failure.
  function saveProfile(name) {
    return guard(async () => {
      const d = await postJson('/api/profile', {
        pid: getPlayerId(),
        name: String(name || '').slice(0, 32),
      });
      return { ok: !!(d && d.ok) };
    }, { ok: false });
  }

  // `subscription` is a PushSubscription.toJSON() object. Resolves to { ok }.
  function pushSubscribe(subscription) {
    return guard(async () => {
      const d = await postJson('/api/push/subscribe', {
        pid: getPlayerId(),
        subscription: subscription,
      });
      return { ok: !!(d && d.ok) };
    }, { ok: false });
  }

  function pushUnsubscribe(endpoint) {
    return guard(async () => {
      const d = await postJson('/api/push/unsubscribe', { endpoint: endpoint });
      return { ok: !!(d && d.ok) };
    }, { ok: false });
  }

  // Keep the anonymous player_id in sync with the signed-in account so
  // leaderboards/streaks follow the user across devices (the id rides along
  // in the encrypted .jeo blob). Account value wins if present; otherwise we
  // seed it from this device. Pure-local — runs even with no backend.
  function syncPlayerIdWithAccount() {
    try {
      if (!window.JeoAccount || !JeoAccount.getState) return;
      const st = JeoAccount.getState();
      if (!st) return;
      const accId = st.settings && st.settings.backendPlayerId;
      const localId = getPlayerId();
      if (accId && typeof accId === 'string' && /^[a-z0-9-]{1,64}$/i.test(accId)) {
        if (accId !== localId) {
          try { localStorage.setItem('jeo:playerId', accId); } catch {}
        }
      } else if (JeoAccount.setSetting) {
        try { JeoAccount.setSetting('backendPlayerId', localId); } catch {}
      }
    } catch {}
  }

  document.addEventListener('DOMContentLoaded', () => {
    syncPlayerIdWithAccount();
    try {
      if (window.JeoAccount && JeoAccount.onChange) {
        JeoAccount.onChange(() => syncPlayerIdWithAccount());
      }
    } catch {}
  });

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
    getAllCounts,
    submitRating,
    getAllRatings,
    startPresence,
    stopPresence,
    getPresence,
    getLeaderboard,
    submitScore,
    getProfile,
    saveProfile,
    pushSubscribe,
    pushUnsubscribe,
  };
})();
