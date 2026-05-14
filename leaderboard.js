/* Jeoweb leaderboards UI — window.JeoLeaderboard.
   Renders a global per-game leaderboard into a container element. Fully
   backend-powered (jeo-backend.js); degrades to a friendly message when the
   backend is unconfigured or unreachable. The "🏆 Scores" button in the play
   modal that drives this is shown only for games opted into a leaderboard. */
(function () {
  if (window.JeoLeaderboard) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  function fmtDuration(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    if (s < 60) return s + 's';
    const m = Math.floor(s / 60);
    const rs = s % 60;
    if (m < 60) return m + 'm ' + (rs < 10 ? '0' : '') + rs + 's';
    const h = Math.floor(m / 60);
    return h + 'h ' + (m % 60) + 'm';
  }

  // 'time' boards store ms-survived; 'score' boards store raw points.
  function fmtScore(value, kind) {
    if (kind === 'time') return fmtDuration(Number(value));
    return Number(value).toLocaleString();
  }

  // mount(container, slug, opts) — opts: { kind: 'score' | 'time' }
  async function mount(container, slug, opts) {
    if (!container) return;
    opts = opts || {};
    const kind = opts.kind === 'time' ? 'time' : 'score';
    container.innerHTML = '<div class="lb-state">Loading scores…</div>';

    const configured = !!(window.JeoBackend && window.JeoBackend.isConfigured && window.JeoBackend.isConfigured());
    if (!configured) {
      container.innerHTML = '<div class="lb-state">🏆 Leaderboards are offline right now.</div>';
      return;
    }

    let entries = [];
    try {
      entries = await window.JeoBackend.getLeaderboard(slug, { kind: kind, limit: 25 });
    } catch {
      entries = [];
    }

    if (!entries.length) {
      container.innerHTML = '<div class="lb-state">No scores yet — be the first! 🏆</div>';
      return;
    }

    const myPid = window.JeoBackend.getPlayerId ? window.JeoBackend.getPlayerId() : null;
    const rows = entries.map((e) => {
      const mine = myPid && e.pid === myPid;
      const medal = e.rank === 1 ? '🥇' : e.rank === 2 ? '🥈' : e.rank === 3 ? '🥉' : '#' + e.rank;
      return '<li class="lb-row' + (mine ? ' lb-mine' : '') + '">' +
        '<span class="lb-rank">' + medal + '</span>' +
        '<span class="lb-name">' + esc(e.name) + (mine ? ' <em>(you)</em>' : '') + '</span>' +
        '<span class="lb-score">' + esc(fmtScore(e.score, e.kind || kind)) + '</span>' +
        '</li>';
    }).join('');
    const heading = kind === 'time' ? 'Longest runs' : 'Top scores';
    container.innerHTML =
      '<div class="lb-head">' + heading + '</div>' +
      '<ol class="lb-list">' + rows + '</ol>';
  }

  window.JeoLeaderboard = { mount, fmtScore };
})();
