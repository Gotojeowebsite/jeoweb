/* Jeoweb command palette — Cmd/Ctrl+K to open, fuzzy-match games + actions. */
(function () {
  if (window.JeoPalette) return;

  let backdrop, input, list, hint;
  let items = [];   // {id, label, kind, image, run()}
  let filtered = [];
  let activeIdx = 0;

  function build() {
    backdrop = document.createElement('div');
    backdrop.id = 'jeoPaletteBackdrop';
    backdrop.innerHTML = `
      <div id="jeoPalette" role="dialog" aria-modal="true" aria-label="Command palette">
        <input id="jeoPaletteInput" type="text" placeholder="Search games or run a command…" autocomplete="off" />
        <div id="jeoPaletteList" role="listbox"></div>
        <div class="jp-hint">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>Enter</kbd> select</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>`;
    document.body.appendChild(backdrop);
    input = backdrop.querySelector('#jeoPaletteInput');
    list = backdrop.querySelector('#jeoPaletteList');
    hint = backdrop.querySelector('.jp-hint');

    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
    input.addEventListener('input', () => { activeIdx = 0; render(); });
    input.addEventListener('keydown', onKey);
  }

  function score(query, str) {
    if (!query) return 1;
    const q = query.toLowerCase();
    const s = str.toLowerCase();
    if (s === q) return 1000;
    if (s.startsWith(q)) return 500;
    if (s.includes(q)) return 200;
    // simple subseq
    let qi = 0;
    for (let i = 0; i < s.length && qi < q.length; i++) if (s[i] === q[qi]) qi++;
    return qi === q.length ? 50 - (s.length - q.length) : 0;
  }

  function render() {
    const q = input.value.trim();
    filtered = items
      .map(it => ({ it, sc: score(q, it.label) }))
      .filter(x => x.sc > 0 || !q)
      .sort((a, b) => b.sc - a.sc)
      .slice(0, 50)
      .map(x => x.it);
    if (filtered.length === 0) {
      list.innerHTML = '<div class="jp-empty">No matches</div>';
      return;
    }
    if (activeIdx >= filtered.length) activeIdx = 0;
    list.innerHTML = filtered.map((it, i) => `
      <div class="jp-item${i === activeIdx ? ' active' : ''}" role="option" data-i="${i}">
        ${it.image ? `<div class="jp-thumb" style="background-image:url('${it.image}')"></div>` : `<div class="jp-thumb">${it.icon || '⚡'}</div>`}
        <span>${escapeHtml(it.label)}</span>
        <span class="jp-kind">${it.kind || 'game'}</span>
      </div>`).join('');
    list.querySelectorAll('.jp-item').forEach(el => {
      el.addEventListener('mouseenter', () => { activeIdx = Number(el.dataset.i); render(); });
      el.addEventListener('click', () => runActive());
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(filtered.length - 1, activeIdx + 1); render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(0, activeIdx - 1); render(); }
    else if (e.key === 'Enter') { e.preventDefault(); runActive(); }
  }

  function runActive() {
    const it = filtered[activeIdx];
    if (!it) return;
    close();
    try { it.run(); } catch (e) { console.error(e); }
  }

  function open() {
    if (!backdrop) build();
    refreshItems();
    backdrop.classList.add('show');
    input.value = '';
    activeIdx = 0;
    render();
    setTimeout(() => input.focus(), 10);
  }

  function close() {
    if (backdrop) backdrop.classList.remove('show');
  }

  function refreshItems() {
    items = [];
    // Built-in actions
    items.push(
      { label: 'Toggle theme', kind: 'action', icon: '🌗', run: () => document.getElementById('themeToggle')?.click() },
      { label: 'Open settings', kind: 'action', icon: '⚙', run: () => document.getElementById('settingsBtn')?.click() },
      { label: 'Tab cloaker', kind: 'action', icon: '🥸', run: () => document.getElementById('cloakerBtn')?.click() },
      { label: 'Scroll to top', kind: 'action', icon: '⬆', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    );
    // Games from window.GAMES_LIST or App instance
    const games = (window.app && window.app.games) || window.GAMES_LIST || [];
    for (const g of games) {
      items.push({
        label: g.name,
        kind: 'game',
        image: g.image,
        run: () => {
          if (window.app && typeof window.app.playGame === 'function') window.app.playGame(g);
          else window.location.href = g.url;
        },
      });
    }
  }

  // Global hotkey
  document.addEventListener('keydown', (e) => {
    const isMod = e.metaKey || e.ctrlKey;
    if (isMod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop && backdrop.classList.contains('show')) close();
      else open();
    }
  });

  window.JeoPalette = { open, close };
})();
