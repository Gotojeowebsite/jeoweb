/* Jeoweb Reset Progress
 *
 * Adds a kebab (⋯) menu on every game card and the same control inside the
 * launcher chrome. Clicking Reset opens a modal that requires the user to
 * type RESET in caps before the destructive action runs. After wiping, a
 * 60-second Undo toast restores the snapshot.
 *
 * What gets wiped for slug S:
 *   - localStorage keys whose name contains S (case-insensitive)
 *   - IndexedDB databases whose name contains S
 *   - Cache Storage caches whose name contains S
 *   - Cookies on this origin whose name contains S
 *
 * The undo snapshot is in-memory only and lives 60s.
 */

(function () {
  const SNAPSHOT_TTL_MS = 60_000;
  const undoStack = new Map(); // slug -> { snapshot, expiresAt, timer }

  // ---------- snapshot / restore ----------
  async function snapshotForSlug(slug) {
    const lc = slug.toLowerCase();
    const ls = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.toLowerCase().includes(lc)) ls[k] = localStorage.getItem(k);
    }
    const cookies = [];
    for (const c of document.cookie.split(/;\s*/)) {
      const [name, ...rest] = c.split('=');
      if (name && name.toLowerCase().includes(lc)) cookies.push({ name, value: rest.join('=') });
    }
    let dbs = [];
    try {
      if (indexedDB.databases) {
        const all = await indexedDB.databases();
        dbs = all.filter(d => d.name && d.name.toLowerCase().includes(lc)).map(d => d.name);
      }
    } catch {}
    let caches_ = [];
    try {
      if (window.caches?.keys) {
        const keys = await caches.keys();
        caches_ = keys.filter(k => k.toLowerCase().includes(lc));
      }
    } catch {}
    return { localStorage: ls, cookies, dbs, caches: caches_ };
  }

  async function wipeForSlug(slug) {
    const lc = slug.toLowerCase();
    // localStorage
    const toDel = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.toLowerCase().includes(lc)) toDel.push(k);
    }
    toDel.forEach(k => localStorage.removeItem(k));
    // cookies
    for (const c of document.cookie.split(/;\s*/)) {
      const name = c.split('=')[0];
      if (name && name.toLowerCase().includes(lc)) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    }
    // IndexedDB
    try {
      if (indexedDB.databases) {
        const all = await indexedDB.databases();
        await Promise.all(all
          .filter(d => d.name && d.name.toLowerCase().includes(lc))
          .map(d => new Promise(res => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = r.onblocked = () => res(); })));
      }
    } catch {}
    // Cache Storage
    try {
      if (window.caches?.keys) {
        const keys = await caches.keys();
        await Promise.all(keys.filter(k => k.toLowerCase().includes(lc)).map(k => caches.delete(k)));
      }
    } catch {}
    // also notify the account system to clear its progress entry
    try { window.JeoAccount?.clearProgress?.(slug); } catch {}
  }

  async function restoreSnapshot(slug, snap) {
    if (!snap) return;
    for (const [k, v] of Object.entries(snap.localStorage || {})) {
      try { localStorage.setItem(k, v); } catch {}
    }
    for (const c of snap.cookies || []) {
      try { document.cookie = `${c.name}=${c.value}; path=/`; } catch {}
    }
    // IndexedDB and Cache Storage cannot be restored from a name list alone
    // (the wipe is destructive). The toast wording is honest about that.
  }

  // ---------- modal ----------
  function openResetModal(slug, displayName) {
    const wrap = document.createElement('div');
    wrap.className = 'jeo-reset-modal';
    wrap.innerHTML = `
      <div class="jeo-reset-backdrop"></div>
      <div class="jeo-reset-card" role="dialog" aria-modal="true" aria-labelledby="jeo-reset-title">
        <div id="jeo-reset-title" class="jeo-reset-title">Reset progress for <span class="jeo-reset-game"></span>?</div>
        <p class="jeo-reset-body">
          This wipes saves, settings, and any cached data for this game on this device.
          Your other games are not affected. You'll have <strong>60 seconds to undo localStorage and cookies</strong>;
          IndexedDB and cache wipes can't be reversed.
        </p>
        <label class="jeo-reset-confirm">Type <code>RESET</code> to confirm:</label>
        <input class="jeo-reset-input" type="text" autocomplete="off" spellcheck="false" placeholder="RESET">
        <div class="jeo-reset-actions">
          <button type="button" class="jeo-reset-cancel">Cancel</button>
          <button type="button" class="jeo-reset-go" disabled>Reset progress</button>
        </div>
      </div>`;
    wrap.querySelector('.jeo-reset-game').textContent = displayName || slug;
    document.body.appendChild(wrap);
    const input = wrap.querySelector('.jeo-reset-input');
    const goBtn = wrap.querySelector('.jeo-reset-go');
    const close = () => wrap.remove();
    wrap.querySelector('.jeo-reset-backdrop').onclick = close;
    wrap.querySelector('.jeo-reset-cancel').onclick = close;
    input.oninput = () => { goBtn.disabled = input.value !== 'RESET'; };
    setTimeout(() => input.focus(), 30);
    goBtn.onclick = async () => {
      goBtn.disabled = true; goBtn.textContent = 'Wiping…';
      const snap = await snapshotForSlug(slug);
      await wipeForSlug(slug);
      close();
      showUndoToast(slug, displayName, snap);
    };
  }

  function showUndoToast(slug, displayName, snap) {
    document.querySelectorAll('.jeo-undo-toast').forEach(n => n.remove());
    const t = document.createElement('div');
    t.className = 'jeo-undo-toast';
    t.innerHTML = `
      <div class="jeo-undo-msg">Cleared progress for <strong></strong>.</div>
      <button type="button" class="jeo-undo-btn">Undo</button>
      <div class="jeo-undo-bar"><div class="jeo-undo-bar-fill"></div></div>`;
    t.querySelector('strong').textContent = displayName || slug;
    document.body.appendChild(t);
    const fill = t.querySelector('.jeo-undo-bar-fill');
    requestAnimationFrame(() => { fill.style.transition = `width ${SNAPSHOT_TTL_MS}ms linear`; fill.style.width = '0%'; });
    const timer = setTimeout(() => { undoStack.delete(slug); t.remove(); }, SNAPSHOT_TTL_MS);
    undoStack.set(slug, { snapshot: snap, expiresAt: Date.now() + SNAPSHOT_TTL_MS, timer });
    t.querySelector('.jeo-undo-btn').onclick = async () => {
      const entry = undoStack.get(slug);
      if (!entry) { t.remove(); return; }
      clearTimeout(entry.timer);
      undoStack.delete(slug);
      await restoreSnapshot(slug, entry.snapshot);
      t.querySelector('.jeo-undo-msg').innerHTML = `Restored localStorage + cookies for <strong></strong>.`;
      t.querySelector('strong').textContent = displayName || slug;
      t.querySelector('.jeo-undo-btn').remove();
      setTimeout(() => t.remove(), 2500);
    };
  }

  // ---------- kebab on game cards ----------
  function ensureKebab(card) {
    if (card.querySelector('.jeo-card-kebab')) return;
    const slug = card.dataset.slug || card.dataset.name || card.getAttribute('data-game');
    if (!slug) return;
    const displayName = (card.querySelector('.title, .game-title, h3')?.textContent || slug).trim();
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'jeo-card-kebab';
    btn.title = 'Game options';
    btn.setAttribute('aria-label', 'Game options');
    btn.innerHTML = '⋯';
    btn.onclick = (e) => {
      e.stopPropagation(); e.preventDefault();
      openCardMenu(btn, slug, displayName);
    };
    card.style.position = card.style.position || 'relative';
    card.appendChild(btn);
  }

  function openCardMenu(anchor, slug, displayName) {
    document.querySelectorAll('.jeo-card-menu').forEach(n => n.remove());
    const m = document.createElement('div');
    m.className = 'jeo-card-menu';
    m.innerHTML = `<button type="button" class="jeo-card-menu-item">Reset progress…</button>`;
    document.body.appendChild(m);
    const r = anchor.getBoundingClientRect();
    m.style.top = `${window.scrollY + r.bottom + 6}px`;
    m.style.left = `${Math.min(window.innerWidth - 180, window.scrollX + r.right - 160)}px`;
    m.querySelector('.jeo-card-menu-item').onclick = () => { m.remove(); openResetModal(slug, displayName); };
    setTimeout(() => {
      const off = (e) => { if (!m.contains(e.target)) { m.remove(); document.removeEventListener('click', off); } };
      document.addEventListener('click', off);
    }, 0);
  }

  function scanCards() {
    const cards = document.querySelectorAll('[data-slug], [data-name], [data-game], .game-card');
    cards.forEach(ensureKebab);
  }

  // public API for app.js to call after rendering
  window.JeoReset = {
    refreshCards: scanCards,
    openModal: openResetModal,
    addLauncherButton(container, slug, displayName) {
      if (!container || container.querySelector('.jeo-launcher-reset')) return;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'jeo-launcher-reset';
      b.textContent = 'Reset progress';
      b.onclick = () => openResetModal(slug, displayName);
      container.appendChild(b);
    },
  };

  // observe DOM for new cards (carousels lazy-render)
  const obs = new MutationObserver(() => scanCards());
  document.addEventListener('DOMContentLoaded', () => {
    scanCards();
    obs.observe(document.body, { childList: true, subtree: true });
  });
})();
