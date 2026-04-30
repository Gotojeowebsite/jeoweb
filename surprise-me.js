/* Jeoweb Surprise Me — full-screen roulette that picks a random game.
 * Wires to #surpriseMeBtn, reads window.app.games + filter toggles. */
(function () {
  if (window.JeoSurprise) return;

  let overlay, strip, label;

  function build() {
    overlay = document.createElement('div');
    overlay.id = 'jeoSurpriseOverlay';
    overlay.innerHTML = `
      <div class="jsr-card">
        <div class="jsr-frame">
          <div class="jsr-strip" id="jsrStrip"></div>
          <div class="jsr-pointer" aria-hidden="true">▼</div>
        </div>
        <div class="jsr-label" id="jsrLabel">Spinning…</div>
        <button class="jsr-cancel" type="button">Cancel</button>
      </div>`;
    document.body.appendChild(overlay);
    strip = overlay.querySelector('#jsrStrip');
    label = overlay.querySelector('#jsrLabel');
    overlay.querySelector('.jsr-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }

  function close() {
    if (overlay) overlay.classList.remove('show');
  }

  function eligibleGames() {
    const app = window.app;
    if (!app || !app.games) return [];
    return app.games.filter(g => {
      if (app.isUnderMaintenance && app.isUnderMaintenance(g)) return false;
      if (app.showFlash === false && g.type === 'flash') return false;
      if (app.showRetro === false && g.type === 'snes') return false;
      return true;
    });
  }

  function open() {
    if (!overlay) build();
    const games = eligibleGames();
    if (!games.length) {
      if (window.JeoToast) window.JeoToast.warning('No eligible games match your filters.');
      return;
    }
    overlay.classList.add('show');
    label.textContent = 'Spinning…';

    // Build a strip of ~60 random games, with the winner at index 50.
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const winner = games[Math.floor(Math.random() * games.length)];
    const seq = [];
    for (let i = 0; i < 60; i++) {
      seq.push(games[Math.floor(Math.random() * games.length)]);
    }
    seq[50] = winner;
    strip.innerHTML = seq.map(g => `
      <div class="jsr-tile" data-name="${escapeAttr(g.name)}">
        <div class="jsr-thumb" style="background-image:url('${escapeAttr(g.image || '')}')"></div>
        <div class="jsr-name">${escapeHtml(g.name)}</div>
      </div>`).join('');

    // Compute pixel offset to center the 51st tile (index 50)
    requestAnimationFrame(() => {
      const tile = strip.children[50];
      if (!tile) return;
      const tileLeft = tile.offsetLeft;
      const tileWidth = tile.offsetWidth;
      const frameWidth = strip.parentElement.clientWidth;
      const target = tileLeft - (frameWidth / 2) + (tileWidth / 2);

      strip.style.transition = 'none';
      strip.style.transform = 'translateX(0)';
      // force reflow
      void strip.offsetHeight;

      if (reduceMotion) {
        strip.style.transition = 'transform 300ms ease-out';
      } else {
        strip.style.transition = 'transform 2200ms cubic-bezier(0.18, 0.85, 0.18, 1)';
      }
      strip.style.transform = `translateX(${-target}px)`;

      const ms = reduceMotion ? 320 : 2300;
      setTimeout(() => {
        label.textContent = `🎉 ${winner.name}!`;
        strip.children[50]?.classList.add('jsr-winner');
        if (window.JeoAchievements) {
          try { window.JeoAchievements.onEvent('surprise', {}); } catch {}
        }
        setTimeout(() => {
          close();
          if (window.app && window.app.playGame) window.app.playGame(winner);
        }, 700);
      }, ms);
    });
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function escapeAttr(s) { return escapeHtml(s); }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('surpriseMeBtn');
    if (btn) btn.addEventListener('click', open);
  });

  window.JeoSurprise = { open, close };
})();
