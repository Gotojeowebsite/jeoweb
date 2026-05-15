/* Jeoweb daily challenge — "play today's Game of the Day".
   Reuses the existing Game-of-the-Day pick (app.js#pickGameOfTheDay), so the
   challenge game is always the same as the spotlight game. app.js calls
   setGame() when it renders the spotlight and notifyPlay() on every play.
   Local-only, no backend. */
(function () {
  if (window.JeoDailyChallenge) return;
  const KEY = 'jeo:dailyChallenge';

  function todayUTC() { return new Date().toISOString().slice(0, 10); }

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (s.day !== todayUTC()) return { day: todayUTC(), completed: false };
      return { day: s.day, completed: !!s.completed };
    } catch { return { day: todayUTC(), completed: false }; }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }

  let challengeGame = null;

  function isComplete() { return load().completed; }

  // app.js hands us today's spotlight game when it renders the spotlight.
  function setGame(game) {
    challengeGame = (game && game.name) ? game.name : null;
    renderRibbon();
  }

  // app.js calls this from trackRecentPlay() for every game played.
  function notifyPlay(name) {
    if (!challengeGame || name !== challengeGame) return;
    const s = load();
    if (s.completed) return;
    s.completed = true;
    save(s);
    renderRibbon();
    if (window.JeoToast) {
      window.JeoToast.success('🎯 Daily Challenge complete! A fresh one unlocks tomorrow.', { ttl: 6000 });
    }
    if (window.JeoSounds) { try { window.JeoSounds.play('achievement'); } catch {} }
    if (window.JeoConfetti) { try { window.JeoConfetti.burst({ count: 60, y: window.innerHeight * 0.3 }); } catch {} }
    if (window.JeoAchievements) { try { window.JeoAchievements.emit('daily-done', { day: s.day }); } catch {} }
  }

  function renderRibbon() {
    const sec = document.getElementById('spotlightSection');
    if (!sec) return;
    let ribbon = document.getElementById('dailyChallengeRibbon');
    if (!challengeGame) { if (ribbon) ribbon.remove(); return; }
    if (!ribbon) {
      ribbon = document.createElement('div');
      ribbon.id = 'dailyChallengeRibbon';
      ribbon.className = 'daily-challenge-ribbon';
      sec.appendChild(ribbon);
    }
    const done = isComplete();
    ribbon.classList.toggle('done', done);
    ribbon.textContent = done ? '✅ Daily Challenge complete' : '🎯 Daily Challenge — play this game';
  }

  function getState() {
    return { game: challengeGame, completed: isComplete(), day: todayUTC() };
  }

  window.JeoDailyChallenge = { setGame, notifyPlay, isComplete, getState, renderRibbon };
})();
