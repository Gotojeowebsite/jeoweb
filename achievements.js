/* Jeoweb Achievements — local-only milestones with toasts. */
(function () {
  if (window.JeoAchievements) return;

  const KEY = 'jeo:achievements';
  const STATE_KEY = 'jeo:achievements:state';

  // id, label, icon, condition(state, event)→bool
  const ACHIEVEMENTS = [
    { id: 'first-play',   label: 'First Play',          icon: '🎮', test: (s) => s.uniquePlays >= 1 },
    { id: 'five-games',   label: 'Played 5 different games', icon: '🔥', test: (s) => s.uniquePlays >= 5 },
    { id: 'first-save',   label: 'Created your first save',  icon: '💾', test: (s) => s.saves >= 1 },
    { id: 'fav-ten',      label: 'Favorited 10 games',  icon: '⭐', test: (s) => s.favorites >= 10 },
    { id: 'wishlist-five',label: 'Wishlist of 5+ games',icon: '🔖', test: (s) => s.wishlist >= 5 },
    { id: 'night-owl',    label: 'Played past midnight',icon: '🌙', test: (s, e) => e?.type === 'play' && (new Date().getHours() < 5) },
    { id: 'cloak-user',   label: 'Used the tab cloaker',icon: '🥷', test: (s, e) => e?.type === 'cloak' },
    { id: 'roulette',     label: 'Used Surprise Me 5×', icon: '🎲', test: (s) => s.surprises >= 5 },
    { id: 'marathon',     label: 'Played 50 different games', icon: '🏆', test: (s) => s.uniquePlays >= 50 },
    { id: 'cheat-code',   label: 'Konami code unlocked',icon: '🕹️', test: (s, e) => e?.type === 'konami' },
    { id: 'theme-explorer',label:'Tried 3 different theme presets', icon: '🎨', test: (s) => s.themesTried >= 3 },
  ];

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STATE_KEY) || '{}'); }
    catch { return {}; }
  }
  function saveState(s) { localStorage.setItem(STATE_KEY, JSON.stringify(s)); }
  function unlocked() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  }
  function setUnlocked(arr) { localStorage.setItem(KEY, JSON.stringify(arr)); }

  function recompute(event) {
    const s = loadState();
    // Refresh derived counters
    try {
      const recents = JSON.parse(localStorage.getItem('jeo-recent') || '[]');
      s.uniquePlays = Math.max(s.uniquePlays || 0, new Set(recents).size);
    } catch {}
    try {
      const favs = JSON.parse(localStorage.getItem('jeo-favorites') || '[]');
      s.favorites = favs.length;
    } catch {}
    try {
      const wl = JSON.parse(localStorage.getItem('jeo:wishlist') || '[]');
      s.wishlist = wl.length;
    } catch {}
    saveState(s);

    const have = unlocked();
    const justNow = [];
    for (const a of ACHIEVEMENTS) {
      if (have.includes(a.id)) continue;
      try {
        if (a.test(s, event)) {
          have.push(a.id);
          justNow.push(a);
        }
      } catch {}
    }
    if (justNow.length) {
      setUnlocked(have);
      for (const a of justNow) {
        if (window.JeoToast) {
          window.JeoToast.success(`${a.icon} Achievement: ${a.label}`, { ttl: 5000 });
        }
      }
    }
  }

  function onEvent(type, payload) {
    const s = loadState();
    if (type === 'play') s.uniquePlays = (s.uniquePlays || 0); // recompute will set
    if (type === 'save') s.saves = (s.saves || 0) + 1;
    if (type === 'surprise') s.surprises = (s.surprises || 0) + 1;
    if (type === 'theme-tried') {
      const set = new Set(s.themesTriedList || []);
      if (payload?.preset) set.add(payload.preset);
      s.themesTriedList = [...set];
      s.themesTried = set.size;
    }
    saveState(s);
    recompute({ type, payload });
  }

  function getAll() {
    const have = new Set(unlocked());
    return ACHIEVEMENTS.map(a => ({ ...a, unlocked: have.has(a.id) }));
  }

  // Hook save events from JeoSaves if present
  function bindSaveHooks() {
    if (!window.JeoSaves || !window.JeoSaves.on) return;
    window.JeoSaves.on('autosave', () => onEvent('save'));
  }

  // Konami sequence listener
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let kIdx = 0;
  document.addEventListener('keydown', (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === KONAMI[kIdx]) {
      kIdx++;
      if (kIdx === KONAMI.length) {
        kIdx = 0;
        onEvent('konami');
        // Apply holo theme
        document.querySelector('.theme-preset-btn[data-preset="holo"]')?.click();
        if (window.JeoToast) window.JeoToast.success('🕹️ Cheat code activated!');
      }
    } else {
      kIdx = (k === KONAMI[0]) ? 1 : 0;
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    bindSaveHooks();
    // Initial check
    recompute();
  });

  window.JeoAchievements = { onEvent, getAll, ACHIEVEMENTS };
})();
