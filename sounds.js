/* Jeoweb UI sounds — WebAudio synthesized, no asset fetches. */
(function () {
  if (window.JeoSounds) return;

  let ctx = null;
  let enabled = localStorage.getItem('jeo:sounds') === '1';

  function ensureCtx() {
    if (!enabled) return null;
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch { return null; }
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function blip({ freq = 600, dur = 0.08, type = 'sine', vol = 0.06, slide = 0 }) {
    const c = ensureCtx();
    if (!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), c.currentTime + dur);
    gain.gain.setValueAtTime(vol, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    osc.connect(gain).connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + dur);
  }

  const SOUNDS = {
    hover:    () => blip({ freq: 880, dur: 0.04, type: 'sine', vol: 0.025 }),
    click:    () => blip({ freq: 520, dur: 0.06, type: 'triangle', vol: 0.05, slide: -100 }),
    open:     () => { blip({ freq: 440, dur: 0.08, type: 'sine', vol: 0.05 }); setTimeout(() => blip({ freq: 660, dur: 0.10, type: 'sine', vol: 0.05 }), 60); },
    achievement: () => {
      [523, 659, 784, 988].forEach((f, i) => setTimeout(() => blip({ freq: f, dur: 0.12, type: 'triangle', vol: 0.06 }), i * 80));
    },
  };

  function play(name) {
    if (!enabled) return;
    const fn = SOUNDS[name];
    if (fn) try { fn(); } catch {}
  }

  function setEnabled(on) {
    enabled = !!on;
    localStorage.setItem('jeo:sounds', enabled ? '1' : '0');
  }

  // Wire global listeners
  document.addEventListener('click', (e) => {
    if (!enabled) return;
    const btn = e.target.closest('button, a.btn, .play-btn, .spotlight-btn, .continue-btn');
    if (btn) play('click');
  });
  document.addEventListener('mouseover', (e) => {
    if (!enabled) return;
    const btn = e.target.closest('.game-card, .carousel-card, .preset-tile');
    if (btn && !btn._playedHover) {
      btn._playedHover = true;
      setTimeout(() => { btn._playedHover = false; }, 250);
      play('hover');
    }
  });

  window.JeoSounds = { play, setEnabled, isEnabled: () => enabled };
})();
