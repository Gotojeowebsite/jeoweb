/**
 * Jeoweb Ratings — Global-first rating system.
 *
 * Architecture:
 *   1. LOCAL cache (localStorage) — instant reads on page load.
 *   2. BACKEND sync (Cloudflare Worker) — every rating write is
 *      immediately sent to the global store. On page load the full
 *      rating map is fetched and merged into the local cache.
 *   3. UI update — all `.jeo-stars` widgets and `.rating-badge`
 *      elements are refreshed whenever global data arrives.
 *
 * Graceful degradation: if the backend is unavailable the rating is
 * still stored locally and submitted on the next reload.
 */
(function () {
  if (window.JeoRatings) return;

  // ── Constants ─────────────────────────────────────────────────────────────
  const LOCAL_KEY      = 'jeo:ratings';        // { slug: stars }  — my ratings
  const GLOBAL_KEY     = 'jeo:globalRatings';  // { slug: { avg, count } }
  const GLOBAL_TTL     = 120_000;              // 2-min client-side cache for global data
  const GLOBAL_TS_KEY  = 'jeo:globalRatingsTs';
  const PENDING_KEY    = 'jeo:ratingsPending'; // { slug: stars } submissions not yet confirmed

  // ── Local my-ratings store ─────────────────────────────────────────────────
  function loadMine() {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}') || {}; } catch { return {}; }
  }
  function saveMine(data) {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(data)); } catch (e) { console.warn('[ratings] save failed', e); }
  }

  // ── Global ratings cache ──────────────────────────────────────────────────
  function loadGlobal() {
    try { return JSON.parse(localStorage.getItem(GLOBAL_KEY) || '{}') || {}; } catch { return {}; }
  }
  function saveGlobal(data) {
    try {
      localStorage.setItem(GLOBAL_KEY, JSON.stringify(data));
      localStorage.setItem(GLOBAL_TS_KEY, String(Date.now()));
    } catch (e) { console.warn('[ratings] global save failed', e); }
  }
  function globalIsFresh() {
    try {
      const ts = Number(localStorage.getItem(GLOBAL_TS_KEY) || 0);
      return ts > 0 && (Date.now() - ts) < GLOBAL_TTL;
    } catch { return false; }
  }

  // ── Pending (unconfirmed) submissions ─────────────────────────────────────
  function loadPending() {
    try { return JSON.parse(localStorage.getItem(PENDING_KEY) || '{}') || {}; } catch { return {}; }
  }
  function savePending(data) {
    try { localStorage.setItem(PENDING_KEY, JSON.stringify(data)); } catch {}
  }

  // ── Change listeners ──────────────────────────────────────────────────────
  const listeners = new Set();
  function notify(slug, stars) {
    listeners.forEach(fn => { try { fn(slug, stars); } catch (e) { console.error(e); } });
  }

  // ── Read API ──────────────────────────────────────────────────────────────
  /** Returns the signed-in user's local rating for a slug (0 = unrated). */
  function get(slug) {
    if (!slug) return 0;
    return Number(loadMine()[slug]) || 0;
  }

  /** Returns global { avg, count } for a slug, or null. */
  function getGlobal(slug) {
    if (!slug) return null;
    const g = loadGlobal()[slug];
    return (g && g.count >= 1) ? g : null;
  }

  /** Returns all global ratings as { slug: { avg, count } }. */
  function getAllGlobal() {
    return loadGlobal();
  }

  // ── Write API ─────────────────────────────────────────────────────────────
  /**
   * Set a rating (1–5) or clear it (0). Immediately writes to localStorage
   * and fires off a backend submission. Optimistically updates the global
   * avg so the UI feels instant even before the server responds.
   */
  function set(slug, stars) {
    if (!slug) return;
    stars = Math.max(0, Math.min(5, Math.floor(Number(stars) || 0)));
    const mine = loadMine();
    const prev = mine[slug] || 0;
    if (stars === 0) delete mine[slug];
    else mine[slug] = stars;
    saveMine(mine);

    // Mark as pending until backend confirms
    const pending = loadPending();
    if (stars === 0) delete pending[slug];
    else pending[slug] = stars;
    savePending(pending);

    // Optimistic global update
    _patchGlobalOptimistic(slug, prev, stars);

    notify(slug, stars);

    // Tell achievements
    if (window.JeoAchievements) {
      try { window.JeoAchievements.onEvent('rate', { slug, stars, prev }); } catch {}
    }

    // Submit to backend
    _submitToBackend(slug, stars);
  }

  function clear(slug) { set(slug, 0); }

  /** Returns all user-local ratings as { slug: stars }. */
  function all() { return loadMine(); }

  /** Count of locally-rated games. */
  function count() { return Object.keys(loadMine()).length; }

  /** Average of local ratings (0 if none). */
  function average() {
    const vals = Object.values(loadMine()).map(Number).filter(n => n > 0);
    if (!vals.length) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }

  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

  // ── Optimistic global average update ──────────────────────────────────────
  function _patchGlobalOptimistic(slug, prevStars, newStars) {
    const global = loadGlobal();
    const entry = global[slug] || { avg: 0, count: 0 };

    // Remove the old vote and add the new one
    let total = entry.avg * entry.count;
    if (prevStars > 0) { total -= prevStars; entry.count = Math.max(0, entry.count - 1); }
    if (newStars > 0)  { total += newStars;  entry.count += 1; }
    entry.avg = entry.count > 0 ? total / entry.count : 0;

    if (entry.count === 0) {
      delete global[slug];
    } else {
      global[slug] = entry;
    }
    saveGlobal(global);
    // Invalidate timestamp so next fetch is not suppressed
    try { localStorage.removeItem(GLOBAL_TS_KEY); } catch {}
    _refreshAllBadges();
  }

  // ── Backend communication ─────────────────────────────────────────────────
  let _backendUrl = null;
  let _pid = null;

  function _resolveBackendUrl() {
    if (_backendUrl) return _backendUrl;
    // 1. localStorage override (dev)
    try {
      const ls = localStorage.getItem('jeo:backendUrl');
      if (ls && /^https?:\/\//.test(ls)) { _backendUrl = ls.replace(/\/+$/, ''); return _backendUrl; }
    } catch {}
    // 2. <meta name="jeo-backend"> tag
    try {
      const meta = document.querySelector('meta[name="jeo-backend"]');
      const v = meta && meta.content && meta.content.trim();
      if (v && /^https?:\/\//.test(v) && !/REPLACE|YOUR-/i.test(v)) {
        _backendUrl = v.replace(/\/+$/, '');
        return _backendUrl;
      }
    } catch {}
    // 3. JeoBackend global (legacy)
    try {
      if (window.JeoBackend && window.JeoBackend.isConfigured && window.JeoBackend.isConfigured()) {
        // JeoBackend doesn't expose its URL directly — use it as the transport instead
        _backendUrl = '__JeoBackend__';
        return _backendUrl;
      }
    } catch {}
    return null;
  }

  function _getPlayerId() {
    if (_pid) return _pid;
    try { _pid = localStorage.getItem('jeo:playerId'); } catch {}
    if (!_pid) {
      _pid = (window.crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : 'p-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
      try { localStorage.setItem('jeo:playerId', _pid); } catch {}
    }
    return _pid;
  }

  async function _fetchJson(path, opts = {}) {
    const url = _resolveBackendUrl();
    if (!url) throw new Error('no backend');
    if (url === '__JeoBackend__') {
      // Delegate to the existing JeoBackend client
      if (path.startsWith('/api/rate')) return window.JeoBackend.submitRating(opts._slug, opts._stars);
      if (path.startsWith('/api/ratings')) return window.JeoBackend.getAllRatings().then(r => ({ ok: true, ratings: r }));
      throw new Error('unsupported');
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    try {
      const res = await fetch(url + path, { signal: ctrl.signal, ...opts });
      if (!res.ok) throw new Error('http ' + res.status);
      return res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function _submitToBackend(slug, stars) {
    try {
      const url = _resolveBackendUrl();
      if (!url) return; // no backend — keep in pending for later
      if (url === '__JeoBackend__') {
        await window.JeoBackend.submitRating(slug, stars);
      } else {
        await _fetchJson('/api/rate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ game: slug, stars, pid: _getPlayerId() }),
        });
      }
      // Confirmed — remove from pending
      const pending = loadPending();
      delete pending[slug];
      savePending(pending);
    } catch (e) {
      // Stay in pending — will retry on next fetchGlobalRatings
      console.debug('[ratings] submit failed, will retry', e.message);
    }
  }

  // ── Flush all pending ratings ─────────────────────────────────────────────
  async function _flushPending() {
    const pending = loadPending();
    const slugs = Object.keys(pending);
    if (!slugs.length) return;
    const url = _resolveBackendUrl();
    if (!url) return;
    for (const slug of slugs) {
      await _submitToBackend(slug, pending[slug]);
    }
  }

  // ── Fetch global ratings from backend ─────────────────────────────────────
  let _fetchPromise = null;

  async function fetchGlobalRatings(force = false) {
    if (!force && globalIsFresh()) return loadGlobal();
    if (_fetchPromise) return _fetchPromise;

    _fetchPromise = (async () => {
      try {
        await _flushPending(); // try to flush pending before fetching fresh data
        let data;
        const url = _resolveBackendUrl();
        if (!url) return loadGlobal();
        if (url === '__JeoBackend__') {
          data = await window.JeoBackend.getAllRatings();
        } else {
          const res = await _fetchJson('/api/ratings');
          data = res && res.ratings ? res.ratings : null;
        }
        if (data && typeof data === 'object') {
          saveGlobal(data);
          _refreshAllBadges();
          return data;
        }
      } catch (e) {
        console.debug('[ratings] fetchGlobalRatings failed:', e.message);
      } finally {
        _fetchPromise = null;
      }
      return loadGlobal();
    })();
    return _fetchPromise;
  }

  // ── UI helpers ────────────────────────────────────────────────────────────

  /** Rebuild all `.rating-badge` elements on the page with fresh data. */
  function _refreshAllBadges() {
    const global = loadGlobal();
    const mine = loadMine();
    // Update all badge elements on existing cards
    document.querySelectorAll('[data-rating-slug]').forEach(el => {
      const slug = el.dataset.ratingSlug;
      const g = global[slug];
      if (g && g.count >= 1) {
        el.textContent = '★ ' + Number(g.avg).toFixed(1);
        el.title = g.count + ' rating' + (g.count !== 1 ? 's' : '') + ' globally';
        el.classList.remove('rating-badge--personal');
        el.classList.add('rating-badge--global');
      } else if (mine[slug]) {
        el.textContent = '★ ' + mine[slug];
        el.title = 'Your rating';
        el.classList.add('rating-badge--personal');
        el.classList.remove('rating-badge--global');
      } else {
        el.textContent = '';
      }
    });
    // Refresh open star widgets
    document.querySelectorAll('.jeo-stars').forEach(wrap => {
      _renderInto(wrap);
    });
    // Notify grid-runtime or app.js of new data (custom event)
    try {
      window.dispatchEvent(new CustomEvent('jeo:ratingsUpdated', { detail: { global } }));
    } catch {}
  }

  // ── Star widget ───────────────────────────────────────────────────────────
  function buildWidget(slug, opts = {}) {
    const size        = opts.size || 18;
    const interactive = opts.interactive !== false;
    const wrap = document.createElement('div');
    wrap.className = 'jeo-stars' + (interactive ? ' interactive' : '') + (opts.compact ? ' compact' : '');
    wrap.dataset.slug = slug || '';
    wrap.setAttribute('role', interactive ? 'radiogroup' : 'img');
    wrap.setAttribute('aria-label', interactive ? 'Rate this game' : 'Rating');
    wrap.style.setProperty('--star-size', size + 'px');

    // Global count hint below stars
    const hint = document.createElement('span');
    hint.className = 'jeo-stars-hint';
    wrap.appendChild(hint);

    const current = get(slug);
    for (let i = 1; i <= 5; i++) {
      const btn = document.createElement(interactive ? 'button' : 'span');
      btn.className = 'jeo-star';
      btn.dataset.value = String(i);
      btn.textContent = i <= current ? '★' : '☆';
      if (interactive) {
        btn.type = 'button';
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', i === current ? 'true' : 'false');
        btn.setAttribute('aria-label', i + ' star' + (i > 1 ? 's' : ''));
        btn.addEventListener('mouseenter', () => _previewStars(wrap, i));
        btn.addEventListener('focus',      () => _previewStars(wrap, i));
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const cur = get(wrap.dataset.slug);
          const next = (cur === i) ? 0 : i;
          set(wrap.dataset.slug, next);
          _renderInto(wrap);
          _updateHint(wrap);
        });
      }
      wrap.insertBefore(btn, hint);
    }
    if (interactive) {
      wrap.addEventListener('mouseleave', () => _renderInto(wrap));
      wrap.addEventListener('blur',       () => _renderInto(wrap), true);
    }
    _renderInto(wrap);
    _updateHint(wrap);
    return wrap;
  }

  function _updateHint(wrap) {
    const slug = wrap.dataset.slug;
    const hint = wrap.querySelector('.jeo-stars-hint');
    if (!hint) return;
    const g = getGlobal(slug);
    if (g && g.count >= 1) {
      const fmt = n => n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
      hint.textContent = '★ ' + Number(g.avg).toFixed(1) + ' (' + fmt(g.count) + ')';
      hint.title = g.count + ' global rating' + (g.count !== 1 ? 's' : '');
    } else {
      hint.textContent = '';
    }
  }

  function _previewStars(wrap, n) {
    wrap.querySelectorAll('.jeo-star').forEach((el, i) => {
      el.textContent = (i + 1) <= n ? '★' : '☆';
    });
  }

  function _renderInto(wrap) {
    const slug = wrap.dataset.slug;
    const cur = get(slug);
    wrap.querySelectorAll('.jeo-star').forEach((el, i) => {
      el.textContent = (i + 1) <= cur ? '★' : '☆';
      if (el.setAttribute) el.setAttribute('aria-checked', (i + 1) === cur ? 'true' : 'false');
    });
  }

  // ── HTML badge helper ─────────────────────────────────────────────────────
  /**
   * Returns HTML for a rating badge for use in card templates.
   * Prefers global avg when available, falls back to personal.
   */
  function badgeHtml(slug) {
    const g = getGlobal(slug);
    if (g && g.count >= 1) {
      const avg   = Number(g.avg).toFixed(1);
      const count = g.count >= 1000
        ? (g.count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
        : String(g.count);
      return `<span class="rating-badge rating-badge--global" data-rating-slug="${slug}" title="${g.count} ratings">★ ${avg} <small>(${count})</small></span>`;
    }
    const personal = get(slug);
    if (personal) {
      return `<span class="rating-badge rating-badge--personal" data-rating-slug="${slug}" title="Your rating">★ ${personal}</span>`;
    }
    return `<span class="rating-badge" data-rating-slug="${slug}"></span>`;
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  // Fetch fresh global ratings as soon as the backend URL is available.
  // We do it on DOMContentLoaded so the meta tag is readable.
  document.addEventListener('DOMContentLoaded', () => {
    // Small delay so the backend client (jeo-backend.js) has time to init first
    setTimeout(() => {
      fetchGlobalRatings();
    }, 200);
  });

  // Re-fetch when the tab becomes visible again (stale data guard)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) fetchGlobalRatings();
  });

  // ── Public API ────────────────────────────────────────────────────────────
  window.JeoRatings = {
    // My ratings
    get,
    set,
    clear,
    all,
    count,
    average,
    onChange,
    // Global ratings
    getGlobal,
    getAllGlobal,
    fetchGlobalRatings,
    // UI helpers
    buildWidget,
    badgeHtml,
    refreshBadges: _refreshAllBadges,
  };
})();
