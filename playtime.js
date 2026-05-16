/* Jeoweb per-game playtime — derives times from the local jeo:sessions log.
   Pairs with stats.js (which computes site-wide totals) by exposing the
   per-slug helpers the player modal + Continue Playing band need. Local-only,
   no backend, no permissions. */
(function () {
  if (window.JeoPlaytime) return;

  function readSessions() {
    try { return JSON.parse(localStorage.getItem('jeo:sessions') || '[]'); }
    catch { return []; }
  }

  function getTotalMs(slug) {
    if (!slug) return 0;
    const sessions = readSessions();
    let total = 0;
    for (const s of sessions) {
      if (s && s.slug === slug && Number.isFinite(s.dur)) total += s.dur;
    }
    return total;
  }

  function getSessionCount(slug) {
    if (!slug) return 0;
    const sessions = readSessions();
    let n = 0;
    for (const s of sessions) {
      if (s && s.slug === slug) n++;
    }
    return n;
  }

  function getRecentMs(slug, days) {
    if (!slug) return 0;
    const cutoff = Date.now() - (Number(days) || 7) * 86400000;
    const sessions = readSessions();
    let total = 0;
    for (const s of sessions) {
      if (s && s.slug === slug && s.start >= cutoff && Number.isFinite(s.dur)) total += s.dur;
    }
    return total;
  }

  // 0 -> "< 1m"; under a minute -> "Xs"; under an hour -> "Xm";
  // longer -> "Xh Ym". Compact enough for a card chip.
  function formatDuration(ms) {
    if (!ms || ms < 1000) return '< 1m';
    const sec = Math.round(ms / 1000);
    if (sec < 60) return sec + 's';
    const m = Math.floor(sec / 60);
    if (m < 60) return m + 'm';
    const h = Math.floor(m / 60);
    const rm = m % 60;
    return rm ? h + 'h ' + rm + 'm' : h + 'h';
  }

  window.JeoPlaytime = { getTotalMs, getSessionCount, getRecentMs, formatDuration };
})();
