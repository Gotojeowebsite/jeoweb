/* Jeoweb Save Manager
 * Per-game save slots with history, separate from origin-wide gameData snapshot.
 *
 * Storage: IndexedDB `jeo-saves` / store `slots`
 * Record:
 *   { id, slug, kind: 'auto'|'manual', label, ts, ls: {k:v}, idb: {dbName: dump}, version }
 *
 * For each slug we keep:
 *   - up to 10 'auto' snapshots (FIFO ring buffer)
 *   - up to 3 'manual' snapshots (FIFO unless pinned; user can pin one to keep)
 *
 * Diffing: when a game launches we capture a baseline snapshot of localStorage
 * for the origin. We only save keys that the game has touched relative to baseline.
 * (IndexedDB diffing is harder; we capture full DBs for now and note dbs that
 * matter via heuristic name match against the slug.)
 */
(function () {
  if (window.JeoSaves) return; // idempotent

  const DB_NAME = 'jeo-saves';
  const STORE = 'slots';
  const MAX_AUTO = 10;
  const MAX_MANUAL = 3;
  const RESERVED_LS = (k) => !k || k.startsWith('jeo:') || k.startsWith('JEO_') || k.startsWith('jeo-') || k === 'jeo:favorites';
  const RESERVED_IDB = (n) => !n || n === DB_NAME || n === 'jeo-account';

  // ---------- IDB helpers ----------
  function openDB() {
    return new Promise((res, rej) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const os = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
          os.createIndex('slug_kind', ['slug', 'kind']);
          os.createIndex('slug_ts', ['slug', 'ts']);
        }
      };
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  }
  async function tx(mode = 'readonly') {
    const db = await openDB();
    return { db, store: db.transaction(STORE, mode).objectStore(STORE) };
  }
  async function putRecord(rec) {
    const db = await openDB();
    return new Promise((res, rej) => {
      const t = db.transaction(STORE, 'readwrite');
      const r = t.objectStore(STORE).put(rec);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  async function deleteRecord(id) {
    const db = await openDB();
    return new Promise((res, rej) => {
      const t = db.transaction(STORE, 'readwrite');
      t.objectStore(STORE).delete(id);
      t.oncomplete = res; t.onerror = () => rej(t.error);
    });
  }
  async function listForSlug(slug) {
    const { db, store } = await tx('readonly');
    return new Promise((res) => {
      const out = [];
      const idx = store.index('slug_ts');
      const cur = idx.openCursor(IDBKeyRange.bound([slug, 0], [slug, Date.now() + 1e15]), 'prev');
      cur.onsuccess = (e) => {
        const c = e.target.result;
        if (c) { out.push(c.value); c.continue(); }
        else { db.close(); res(out); }
      };
      cur.onerror = () => { db.close(); res(out); };
    });
  }

  // ---------- snapshot capture ----------
  function dumpDB(name) {
    return new Promise((resolve) => {
      let settled = false;
      const done = (v) => { if (!settled) { settled = true; resolve(v); } };
      let open;
      try { open = indexedDB.open(name); } catch { return done(null); }
      open.onsuccess = () => {
        const db = open.result;
        const stores = [...db.objectStoreNames];
        if (stores.length === 0) { db.close(); return done({ version: db.version, stores: {} }); }
        let t;
        try { t = db.transaction(stores, 'readonly'); } catch { db.close(); return done(null); }
        const out = { version: db.version, stores: {} };
        let pending = stores.length;
        const finish = () => { if (--pending === 0) { db.close(); done(out); } };
        stores.forEach((s) => {
          const os = t.objectStore(s);
          const meta = { keyPath: os.keyPath ?? null, autoIncrement: !!os.autoIncrement, records: [] };
          const cur = os.openCursor();
          cur.onsuccess = (e) => {
            const c = e.target.result;
            if (c) { try { meta.records.push({ key: c.key, value: c.value }); } catch {} c.continue(); }
            else { out.stores[s] = meta; finish(); }
          };
          cur.onerror = () => { out.stores[s] = meta; finish(); };
        });
      };
      open.onerror = () => done(null);
      open.onblocked = () => done(null);
    });
  }

  function readLocalStorage() {
    const out = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (RESERVED_LS(k)) continue;
      out[k] = localStorage.getItem(k);
    }
    return out;
  }

  async function listOriginDBs() {
    if (!indexedDB.databases) return [];
    try { return (await indexedDB.databases()).map(d => d.name).filter(n => n && !RESERVED_IDB(n)); }
    catch { return []; }
  }

  // Heuristic: a DB is "for this slug" if its name contains slug tokens.
  function dbsLikelyForSlug(slug, names) {
    const tokens = String(slug || '').toLowerCase().split(/[\s\-_]+/).filter(t => t.length >= 3);
    if (tokens.length === 0) return [];
    return names.filter(n => {
      const ln = n.toLowerCase();
      return tokens.some(t => ln.includes(t));
    });
  }

  // baseline cache (slug -> {ls keys present at launch, ls values at launch})
  const _baselines = new Map();

  function captureBaseline(slug) {
    _baselines.set(slug, { ls: readLocalStorage(), ts: Date.now() });
  }

  function diffLocalStorage(slug) {
    const base = _baselines.get(slug);
    const now = readLocalStorage();
    if (!base) return now; // no baseline → save everything
    const out = {};
    // include any key whose value changed OR that wasn't present at baseline.
    for (const [k, v] of Object.entries(now)) {
      if (base.ls[k] !== v) out[k] = v;
    }
    // also include keys that were present at baseline but removed (encode as null)
    for (const k of Object.keys(base.ls)) {
      if (!(k in now)) out[k] = null;
    }
    return out;
  }

  async function captureSnapshot({ slug, kind = 'manual', label = '' }) {
    const ls = diffLocalStorage(slug);
    const allDBs = await listOriginDBs();
    const interesting = dbsLikelyForSlug(slug, allDBs);
    const idb = {};
    for (const name of interesting) {
      try { const data = await dumpDB(name); if (data) idb[name] = data; } catch {}
    }
    // Reliability: skip auto-snapshots that have no diff to record. Otherwise
    // the ring buffer fills up with empty saves and pushes useful ones out.
    // Manual saves always go through — the user explicitly asked.
    if (kind === 'auto' && Object.keys(ls).length === 0 && Object.keys(idb).length === 0) {
      return null;
    }
    return {
      slug, kind, label: label || (kind === 'manual' ? 'Manual save' : 'Auto-save'),
      ts: Date.now(), ls, idb, version: 1,
    };
  }

  async function pruneSlug(slug) {
    const all = await listForSlug(slug);
    const auto = all.filter(r => r.kind === 'auto');
    const manual = all.filter(r => r.kind === 'manual');
    const pinned = manual.filter(r => r.pinned);
    const unpinned = manual.filter(r => !r.pinned);

    // auto: keep newest MAX_AUTO
    for (const r of auto.slice(MAX_AUTO)) await deleteRecord(r.id);
    // manual: keep all pinned + newest unpinned up to (MAX_MANUAL - pinned.length)
    const allowedUnpinned = Math.max(0, MAX_MANUAL - pinned.length);
    for (const r of unpinned.slice(allowedUnpinned)) await deleteRecord(r.id);
  }

  async function saveNow({ slug, label = '', kind = 'manual' }) {
    if (!slug) throw new Error('save requires slug');
    const snap = await captureSnapshot({ slug, kind, label });
    if (snap === null) return null; // empty auto-snapshot — nothing to record
    await putRecord(snap);
    await pruneSlug(slug);
    return snap;
  }

  async function listSaves(slug) {
    return listForSlug(slug);
  }

  async function getSave(id) {
    const { db, store } = await tx('readonly');
    return new Promise((res, rej) => {
      const r = store.get(id);
      r.onsuccess = () => { db.close(); res(r.result); };
      r.onerror = () => { db.close(); rej(r.error); };
    });
  }

  // restore: write ls/idb back into the origin
  function restoreDB(name, data) {
    return new Promise((resolve) => {
      let settled = false;
      const done = () => { if (!settled) { settled = true; resolve(); } };
      const targetVersion = data.version || 1;
      let probe;
      try { probe = indexedDB.open(name); } catch { return done(); }
      probe.onsuccess = () => {
        const cur = probe.result;
        const curVer = cur.version;
        cur.close();
        const ver = Math.max(curVer, targetVersion);
        let open;
        try { open = indexedDB.open(name, ver); } catch { return done(); }
        open.onupgradeneeded = (e) => {
          const db = e.target.result;
          for (const [s, meta] of Object.entries(data.stores || {})) {
            if (!db.objectStoreNames.contains(s)) {
              try { db.createObjectStore(s, { keyPath: meta.keyPath || undefined, autoIncrement: !!meta.autoIncrement }); } catch {}
            }
          }
        };
        open.onsuccess = () => {
          const db = open.result;
          const stores = Object.keys(data.stores || {}).filter(s => db.objectStoreNames.contains(s));
          if (stores.length === 0) { db.close(); return done(); }
          let t;
          try { t = db.transaction(stores, 'readwrite'); } catch { db.close(); return done(); }
          for (const s of stores) {
            const meta = data.stores[s];
            const os = t.objectStore(s);
            try { os.clear(); } catch {}
            for (const r of meta.records || []) {
              try { if (meta.keyPath) os.put(r.value); else os.put(r.value, r.key); } catch {}
            }
          }
          t.oncomplete = () => { db.close(); done(); };
          t.onerror = () => { db.close(); done(); };
          t.onabort = () => { db.close(); done(); };
        };
        open.onerror = () => done();
        open.onblocked = () => done();
      };
      probe.onerror = () => done();
    });
  }

  async function restoreSave(id) {
    const rec = await getSave(id);
    if (!rec) throw new Error('save not found');
    // localStorage
    for (const [k, v] of Object.entries(rec.ls || {})) {
      if (RESERVED_LS(k)) continue;
      try {
        if (v === null) localStorage.removeItem(k);
        else localStorage.setItem(k, v);
      } catch {}
    }
    // idb
    for (const [name, data] of Object.entries(rec.idb || {})) {
      if (RESERVED_IDB(name)) continue;
      try { await restoreDB(name, data); } catch {}
    }
    return rec;
  }

  async function deleteSave(id) { return deleteRecord(id); }
  async function pinSave(id, pinned = true) {
    const rec = await getSave(id);
    if (!rec) return;
    rec.pinned = !!pinned;
    rec.kind = 'manual'; // pinning auto-promotes to manual
    await putRecord(rec);
    await pruneSlug(rec.slug);
  }

  async function clearSlug(slug) {
    const all = await listForSlug(slug);
    for (const r of all) await deleteRecord(r.id);
  }

  async function exportSlugBlob(slug, passphrase) {
    if (!window.JeoAccount?._internal?.encryptWithPassphrase) throw new Error('account-system not loaded');
    const all = await listForSlug(slug);
    const payload = { slug, exported_at: new Date().toISOString(), saves: all };
    return await window.JeoAccount._internal.encryptWithPassphrase(payload, passphrase);
  }

  async function importSlugBlob(blobText, passphrase) {
    if (!window.JeoAccount?._internal?.decryptWithPassphrase) throw new Error('account-system not loaded');
    const payload = await window.JeoAccount._internal.decryptWithPassphrase(blobText, passphrase);
    if (!payload || !Array.isArray(payload.saves)) throw new Error('invalid save bundle');
    for (const r of payload.saves) {
      delete r.id; // let IDB allocate fresh
      r.imported_at = new Date().toISOString();
      await putRecord(r);
    }
    if (payload.slug) await pruneSlug(payload.slug);
    return payload;
  }

  // ---------- autosave loop while a game is open ----------
  // Caller (app.js) calls JeoSaves.bindGame(slug) when the modal opens, and
  // JeoSaves.unbindGame() when it closes. Interval is user-configurable
  // (Settings → Saves), bounded so a runaway tiny interval can't thrash IDB.
  let _activeSlug = null;
  let _autoTimer = null;
  let _lastAutoTs = 0;
  const AUTO_INTERVAL_KEY = 'jeo:autosaveMs';
  const AUTO_INTERVAL_DEFAULT = 60_000;
  const AUTO_INTERVAL_MIN = 15_000;
  const AUTO_INTERVAL_MAX = 600_000;
  const _events = new EventTarget();

  function getAutoInterval() {
    try {
      const n = Number(localStorage.getItem(AUTO_INTERVAL_KEY));
      if (Number.isFinite(n) && n >= AUTO_INTERVAL_MIN && n <= AUTO_INTERVAL_MAX) return n;
    } catch {}
    return AUTO_INTERVAL_DEFAULT;
  }

  function setAutoInterval(ms) {
    const n = Math.max(AUTO_INTERVAL_MIN, Math.min(AUTO_INTERVAL_MAX, Math.floor(Number(ms) || 0)));
    try { localStorage.setItem(AUTO_INTERVAL_KEY, String(n)); } catch {}
    // Re-bind so the new interval applies immediately if a game is open.
    if (_activeSlug) {
      const slug = _activeSlug;
      bindGame(slug);
    }
    return n;
  }

  function bindGame(slug) {
    unbindGame();
    if (!slug) return;
    _activeSlug = slug;
    captureBaseline(slug);
    _lastAutoTs = Date.now();
    const interval = getAutoInterval();
    _autoTimer = setInterval(async () => {
      try {
        const snap = await saveNow({ slug: _activeSlug, kind: 'auto', label: 'Auto-save' });
        if (!snap) return; // nothing changed since the last snapshot
        _lastAutoTs = snap.ts;
        _events.dispatchEvent(new CustomEvent('autosave', { detail: snap }));
      } catch {}
    }, interval);
  }
  function unbindGame() {
    if (_autoTimer) clearInterval(_autoTimer);
    _autoTimer = null; _activeSlug = null;
  }
  function getActiveSlug() { return _activeSlug; }
  function getLastAutoSaveAt() { return _lastAutoTs; }

  // ---------- Optional cloud save sync (Part 5C) ----------
  // AES-GCM with a per-player 256-bit key. The key lives in localStorage AND
  // in the account .jeo blob's settings (if signed in), so it follows the
  // user across devices. The server only ever sees ciphertext.
  //
  // Honest tradeoff: the key is on the device — not derived from the
  // passphrase. If the device is compromised, so is the user's cloud saves.
  // The .jeo backup is still the strongest privacy option.

  const CLOUD_KEY_LS = 'jeo:cloudSaveKey';

  function bytesToB64(bytes) {
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function b64ToBytes(s) {
    const bin = atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  let _cachedCloudKey = null;
  async function getCloudKey() {
    if (_cachedCloudKey) return _cachedCloudKey;
    let raw = null;
    // Account-blob value wins so the key rides along with the .jeo backup.
    try {
      const st = window.JeoAccount && window.JeoAccount.getState && window.JeoAccount.getState();
      if (st && st.settings && typeof st.settings.cloudSaveKey === 'string') raw = st.settings.cloudSaveKey;
    } catch {}
    if (!raw) {
      try { raw = localStorage.getItem(CLOUD_KEY_LS); } catch {}
    }
    if (!raw || raw.length < 40) {
      const bytes = crypto.getRandomValues(new Uint8Array(32));
      raw = bytesToB64(bytes);
    }
    // Mirror to both stores so they stay aligned.
    try { localStorage.setItem(CLOUD_KEY_LS, raw); } catch {}
    if (window.JeoAccount && window.JeoAccount.setSetting) {
      try { window.JeoAccount.setSetting('cloudSaveKey', raw); } catch {}
    }
    _cachedCloudKey = await crypto.subtle.importKey(
      'raw', b64ToBytes(raw), { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
    );
    return _cachedCloudKey;
  }

  async function encryptForCloud(obj) {
    const key = await getCloudKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const plain = new TextEncoder().encode(JSON.stringify(obj));
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, plain);
    const all = new Uint8Array(iv.length + ct.byteLength);
    all.set(iv, 0);
    all.set(new Uint8Array(ct), iv.length);
    return bytesToB64(all);
  }

  async function decryptFromCloud(b64) {
    const key = await getCloudKey();
    const all = b64ToBytes(b64);
    const iv = all.slice(0, 12);
    const ct = all.slice(12);
    const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ct);
    return JSON.parse(new TextDecoder().decode(dec));
  }

  // Push all of a game's MANUAL saves up + pull cloud-only manual saves down.
  // Auto-saves stay device-local (they're noisy). Returns { ok, pushed, pulled }.
  async function cloudSync(slug) {
    if (!slug) return { ok: false, reason: 'no-slug' };
    if (!window.JeoBackend || !window.JeoBackend.isConfigured || !window.JeoBackend.isConfigured()) {
      return { ok: false, reason: 'no-backend' };
    }
    const local = await listForSlug(slug);
    const localManual = local.filter((r) => r.kind === 'manual');
    const cloud = await window.JeoBackend.pullCloudSaves(slug);
    const cloudBySlot = new Map();
    for (const c of (cloud || [])) cloudBySlot.set(c.slot, c);
    const localBySlot = new Map();
    for (const r of localManual) localBySlot.set('manual-' + r.ts, r);

    let pushed = 0, pulled = 0, failed = 0;
    // Push local manual saves the cloud doesn't already have.
    for (const r of localManual) {
      const slot = 'manual-' + r.ts;
      if (cloudBySlot.has(slot)) continue;
      try {
        const payload = await encryptForCloud({
          ls: r.ls || {}, idb: r.idb || {}, label: r.label || '',
          ts: r.ts, version: r.version || 1,
        });
        const res = await window.JeoBackend.pushCloudSave(slug, slot, payload);
        if (res && res.ok) pushed++; else failed++;
      } catch (e) { failed++; }
    }
    // Pull cloud saves we don't have locally.
    for (const c of (cloud || [])) {
      if (localBySlot.has(c.slot)) continue;
      try {
        const data = await decryptFromCloud(c.payload);
        if (!data) { failed++; continue; }
        await putRecord({
          slug, kind: 'manual',
          label: data.label || 'Cloud save',
          ts: Number(data.ts) || c.updated_at || Date.now(),
          ls: data.ls || {}, idb: data.idb || {},
          version: data.version || 1,
        });
        pulled++;
      } catch (e) { failed++; }
    }
    if (pulled > 0) await pruneSlug(slug);
    return { ok: true, pushed, pulled, failed };
  }

  window.JeoSaves = {
    saveNow, listSaves, getSave, restoreSave, deleteSave, pinSave, clearSlug,
    exportSlugBlob, importSlugBlob,
    bindGame, unbindGame, getActiveSlug, getLastAutoSaveAt,
    getAutoInterval, setAutoInterval,
    cloudSync,
    on: (e, fn) => _events.addEventListener(e, fn),
    off: (e, fn) => _events.removeEventListener(e, fn),
  };
})();
