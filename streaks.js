/* Jeoweb daily play streak — local-only habit loop.
   Counts consecutive UTC days on which the user played at least one game.
   Renders a "🔥 N Day Streak" pill into the hero stats row, and shows a
   one-per-day "welcome back" nudge when a streak is at risk. No backend,
   no permissions — just localStorage. */
(function () {
  if (window.JeoStreak) return;
  const KEY = 'jeo:streak';
  const GREET_KEY = 'jeo:streak:greeted';

  function todayUTC() { return new Date().toISOString().slice(0, 10); }
  // Whole days since the Unix epoch for a YYYY-MM-DD string, in UTC.
  function dayNumber(dateStr) {
    return Math.floor(Date.parse(dateStr + 'T00:00:00Z') / 86400000);
  }

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || '{}');
      return {
        current: Number(s.current) || 0,
        longest: Number(s.longest) || 0,
        lastDay: typeof s.lastDay === 'string' ? s.lastDay : null,
      };
    } catch { return { current: 0, longest: 0, lastDay: null }; }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  }

  // A streak only counts as "alive" if the last play was today or yesterday.
  // Older than that and it's effectively zero until the next recordActivity().
  function liveCurrent(s) {
    if (!s.lastDay) return 0;
    const gap = dayNumber(todayUTC()) - dayNumber(s.lastDay);
    return (gap === 0 || gap === 1) ? s.current : 0;
  }

  function getState() {
    const s = load();
    return { current: liveCurrent(s), longest: s.longest, lastDay: s.lastDay };
  }

  // Call once whenever the user plays a game. Idempotent within a UTC day.
  function recordActivity() {
    const s = load();
    const today = todayUTC();
    if (s.lastDay === today) { renderPill(); return getState(); }
    const gap = s.lastDay ? dayNumber(today) - dayNumber(s.lastDay) : null;
    s.current = (gap === 1) ? (s.current || 0) + 1 : 1;
    s.lastDay = today;
    if (s.current > (s.longest || 0)) s.longest = s.current;
    save(s);
    renderPill();
    if (window.JeoAchievements) {
      try { window.JeoAchievements.emit('streak', { days: s.current }); } catch {}
    }
    return getState();
  }

  function renderPill() {
    const row = document.querySelector('.hero .stats-row');
    if (!row) return;
    const days = liveCurrent(load());
    let card = document.getElementById('streakStatCard');
    let divider = document.getElementById('streakStatDivider');
    if (days < 1) {
      if (card) card.remove();
      if (divider) divider.remove();
      return;
    }
    if (!divider) {
      divider = document.createElement('div');
      divider.className = 'stat-divider';
      divider.id = 'streakStatDivider';
      row.appendChild(divider);
    }
    if (!card) {
      card = document.createElement('div');
      card.className = 'stat-card streak-stat';
      card.id = 'streakStatCard';
      card.title = 'Play any game each day to keep your streak alive';
      card.innerHTML = '<div class="stat-number streak-number"></div><div class="stat-label">Day Streak</div>';
      row.appendChild(card);
    }
    card.querySelector('.stat-number').textContent = '🔥 ' + days;
  }

  // One-per-day "welcome back" nudge — only fires the day after a play, when
  // there's a live streak the user could still lose today.
  function maybeGreet() {
    const s = load();
    if (!s.lastDay) return;
    const gap = dayNumber(todayUTC()) - dayNumber(s.lastDay);
    if (gap !== 1 || s.current < 1) return;
    if (localStorage.getItem(GREET_KEY) === todayUTC()) return;
    try { localStorage.setItem(GREET_KEY, todayUTC()); } catch {}
    if (window.JeoToast) {
      window.JeoToast.info(
        '🔥 Welcome back! You’re on a ' + s.current + '-day streak — play a game today to keep it alive.',
        { ttl: 7000 }
      );
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderPill();
    setTimeout(maybeGreet, 1800);
  });

  window.JeoStreak = { recordActivity, getState, renderPill };
})();
