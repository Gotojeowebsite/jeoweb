/* Jeoweb Stats — derives a tiny dashboard from local play log + sessions. */
(function () {
  if (window.JeoStats) return;

  function readSessions() {
    try { return JSON.parse(localStorage.getItem('jeo:sessions') || '[]'); }
    catch { return []; }
  }
  function readPlayLog() {
    try { return JSON.parse(localStorage.getItem('jeo:playlog') || '[]'); }
    catch { return []; }
  }

  function fmtDur(ms) {
    if (!ms || ms < 0) return '0m';
    const m = Math.round(ms / 60000);
    if (m < 60) return m + 'm';
    const h = Math.floor(m / 60);
    const rem = m % 60;
    return rem ? `${h}h ${rem}m` : `${h}h`;
  }

  function compute() {
    const sessions = readSessions();
    const playlog = readPlayLog();
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

    const totalMs = sessions.reduce((s, x) => s + (x.dur || 0), 0);
    const weekMs  = sessions.filter(x => x.start >= weekAgo).reduce((s, x) => s + (x.dur || 0), 0);

    // Top games by total time
    const byGame = new Map();
    for (const s of sessions) {
      byGame.set(s.slug, (byGame.get(s.slug) || 0) + s.dur);
    }
    const topGames = [...byGame.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Day-of-week histogram (0=Sun)
    const byDow = [0,0,0,0,0,0,0];
    for (const s of sessions) byDow[new Date(s.start).getDay()] += s.dur;

    // Streak: consecutive UTC days with at least one play
    const days = new Set(playlog.map(e => new Date(e.ts).toISOString().slice(0,10)));
    let streak = 0;
    for (let i = 0; ; i++) {
      const d = new Date(now - i * 86400000).toISOString().slice(0, 10);
      if (days.has(d)) streak++;
      else break;
    }

    return {
      totalMs, weekMs,
      uniqueGames: byGame.size,
      sessionsCount: sessions.length,
      topGames,
      byDow,
      streak,
    };
  }

  function render() {
    const root = document.getElementById('statsTabBody');
    if (!root) return;
    const s = compute();
    const dowLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const maxDow = Math.max(1, ...s.byDow);
    const heatRow = s.byDow.map((v, i) => {
      const pct = Math.round((v / maxDow) * 100);
      return `<div class="js-heat-cell" style="opacity:${0.15 + (v/maxDow)*0.85}" title="${dowLabels[i]}: ${fmtDur(v)}"><span>${dowLabels[i]}</span></div>`;
    }).join('');
    const topRows = s.topGames.length === 0
      ? `<p class="settings-help">No game time tracked yet.</p>`
      : s.topGames.map(([slug, ms]) => `
          <div class="js-top-row">
            <span class="js-top-name">${escapeHtml(slug)}</span>
            <span class="js-top-time">${fmtDur(ms)}</span>
          </div>`).join('');

    root.innerHTML = `
      <div class="settings-section">
        <h3>📊 Your stats</h3>
        <div class="js-grid">
          <div class="js-stat"><div class="js-num">${fmtDur(s.totalMs)}</div><div class="js-lbl">Total play time</div></div>
          <div class="js-stat"><div class="js-num">${fmtDur(s.weekMs)}</div><div class="js-lbl">This week</div></div>
          <div class="js-stat"><div class="js-num">${s.uniqueGames}</div><div class="js-lbl">Unique games</div></div>
          <div class="js-stat"><div class="js-num">${s.streak}</div><div class="js-lbl">Day streak</div></div>
        </div>
      </div>
      <div class="settings-section">
        <h3>🔥 Most played</h3>
        ${topRows}
      </div>
      <div class="settings-section">
        <h3>🗓 By day of week</h3>
        <div class="js-heat-row">${heatRow}</div>
      </div>
      <div class="settings-section">
        <h3>🏆 Achievements</h3>
        <div id="js-ach-list" class="js-ach-list"></div>
      </div>`;
    renderAchievements();
  }

  function renderAchievements() {
    const list = document.getElementById('js-ach-list');
    if (!list || !window.JeoAchievements) return;
    const items = window.JeoAchievements.getAll();
    list.innerHTML = items.map(a => `
      <div class="js-ach ${a.unlocked ? 'unlocked' : 'locked'}">
        <span class="js-ach-icon">${a.unlocked ? a.icon : '🔒'}</span>
        <span class="js-ach-label">${escapeHtml(a.label)}</span>
      </div>`).join('');
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.settings-tab[data-tab="stats"]');
    if (tab) setTimeout(render, 30);
  });

  window.JeoStats = { render, compute };
})();
