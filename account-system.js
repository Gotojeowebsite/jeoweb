/* Jeoweb Offline Account System
 *
 * - AES-GCM 256, PBKDF2-SHA-256 250k iters
 * - Portable blob format: jeo1.<saltIv>.<ciphertext>
 *     saltIv = base64( salt(16 bytes) || iv(12 bytes) )  (28 bytes total)
 * - Device-bound non-extractable AES-GCM CryptoKey kept in IndexedDB
 *   ("jeo-account" / store "device") so users can stay signed in without
 *   the passphrase ever touching disk.
 * - Schema 2: { schema:2, profile, settings, favorites, progress, gameData,
 *              last_backup_at } — origin-wide gameData snapshot transfers
 *   in-progress saves between devices.
 * - Auto-capture: interval + visibilitychange(hidden) + beforeunload.
 * - Auto-restore: on signInWithBlob (cross-device transfer).
 * - Avatar data URL hard-capped to 256 KB.
 *
 * No third-party crypto. WebCrypto only.
 */

(function () {
  const PREFIX = 'jeo1';
  const PBKDF2_ITERS = 250_000;
  const AVATAR_MAX_BYTES = 256 * 1024;
  const AUTOSAVE_DEBOUNCE_MS = 5000;
  const CAPTURE_INTERVAL_MS = 60_000;
  const LIVE_KEY = 'JEO_ACCOUNT_LIVE';
  const IDB_NAME = 'jeo-account';
  const IDB_STORE = 'device';
  const RESERVED_LS_PREFIXES = ['jeo:', 'JEO_'];
  const RESERVED_COOKIE_PREFIXES = ['jeo_'];
  const SCHEMA_VERSION = 2;

  const PROFILE_DEFAULTS = () => ({
    schema: SCHEMA_VERSION,
    profile: { name: 'Player', avatar_data_url: null, avatar_preset: 'p1', created_at: new Date().toISOString() },
    settings: { theme: 'dark', accent: '#7a5cff', layout: 'grid', hide_maintenance: true, tab_cloaker: null },
    favorites: [],
    progress: {},                // legacy per-slug — retained for compatibility
    gameData: {                  // origin-wide capture (transfers between devices)
      localStorage: {},
      cookies: [],
      indexedDB: {},
      captured_at: null,
    },
    last_backup_at: null,        // ISO timestamp of last exportBlob call
    exported_at: null,
    exporter_version: '2.0.0',
  });

  // ---------- base64 helpers ----------
  const b64enc = (bytes) => btoa(String.fromCharCode(...bytes));
  const b64dec = (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0));

  // ---------- crypto ----------
  async function deriveKey(passphrase, salt) {
    const enc = new TextEncoder();
    const baseKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: PBKDF2_ITERS, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function encryptWithPassphrase(plaintextObj, passphrase) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(passphrase, salt);
    const enc = new TextEncoder().encode(JSON.stringify(plaintextObj));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc));
    const saltIv = new Uint8Array(28); saltIv.set(salt, 0); saltIv.set(iv, 16);
    return `${PREFIX}.${b64enc(saltIv)}.${b64enc(ct)}`;
  }

  async function decryptWithPassphrase(blob, passphrase) {
    const parts = String(blob).trim().split('.');
    if (parts.length !== 3 || parts[0] !== PREFIX) throw new Error('not a jeo1 blob');
    const saltIv = b64dec(parts[1]);
    if (saltIv.length !== 28) throw new Error('bad saltIv length');
    const salt = saltIv.slice(0, 16);
    const iv = saltIv.slice(16);
    const ct = b64dec(parts[2]);
    const key = await deriveKey(passphrase, salt);
    let pt;
    try { pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct); }
    catch { throw new Error('Wrong passphrase or corrupted file'); }
    return JSON.parse(new TextDecoder().decode(pt));
  }

  // ---------- IndexedDB helpers ----------
  function openDB() {
    return new Promise((res, rej) => {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  }
  async function idbGet(key) {
    const db = await openDB();
    return new Promise((res, rej) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const r = tx.objectStore(IDB_STORE).get(key);
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    });
  }
  async function idbPut(key, val) {
    const db = await openDB();
    return new Promise((res, rej) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(val, key);
      tx.oncomplete = res; tx.onerror = () => rej(tx.error);
    });
  }
  async function idbDel(key) {
    const db = await openDB();
    return new Promise((res, rej) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(key);
      tx.oncomplete = res; tx.onerror = () => rej(tx.error);
    });
  }

  // ---------- device-bound key (non-extractable) ----------
  async function getOrCreateDeviceKey() {
    let key = await idbGet('deviceKey');
    if (key) return key;
    key = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      false,                       // non-extractable
      ['encrypt', 'decrypt']
    );
    await idbPut('deviceKey', key);
    return key;
  }
  async function deviceEncrypt(obj) {
    const key = await getOrCreateDeviceKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const pt = new TextEncoder().encode(JSON.stringify(obj));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, pt));
    return { iv: b64enc(iv), ct: b64enc(ct) };
  }
  async function deviceDecrypt({ iv, ct }) {
    const key = await idbGet('deviceKey');
    if (!key) throw new Error('no device key');
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64dec(iv) }, key, b64dec(ct));
    return JSON.parse(new TextDecoder().decode(pt));
  }

  // ---------- origin-wide game-data capture ----------
  function isReservedLSKey(k) {
    if (!k) return true;
    return RESERVED_LS_PREFIXES.some(p => k.startsWith(p)) || k === LIVE_KEY;
  }
  function isReservedCookie(name) {
    return RESERVED_COOKIE_PREFIXES.some(p => name.startsWith(p));
  }

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
        let tx;
        try { tx = db.transaction(stores, 'readonly'); }
        catch { db.close(); return done(null); }
        const out = { version: db.version, stores: {} };
        let pending = stores.length;
        const finish = () => { if (--pending === 0) { db.close(); done(out); } };
        stores.forEach((s) => {
          const os = tx.objectStore(s);
          const meta = { keyPath: os.keyPath ?? null, autoIncrement: !!os.autoIncrement, records: [] };
          const cur = os.openCursor();
          cur.onsuccess = (e) => {
            const c = e.target.result;
            if (c) {
              try { meta.records.push({ key: c.key, value: c.value }); } catch {}
              c.continue();
            } else { out.stores[s] = meta; finish(); }
          };
          cur.onerror = () => { out.stores[s] = meta; finish(); };
        });
      };
      open.onerror = () => done(null);
      open.onblocked = () => done(null);
    });
  }

  async function dumpAllIndexedDB() {
    if (!indexedDB.databases) return {};
    let dbs = [];
    try { dbs = await indexedDB.databases(); } catch { return {}; }
    const out = {};
    for (const d of dbs) {
      if (!d.name || d.name === IDB_NAME) continue;
      const data = await dumpDB(d.name);
      if (data) out[d.name] = data;
    }
    return out;
  }

  async function captureGameDataSnapshot({ includeIDB = true } = {}) {
    const ls = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || isReservedLSKey(k)) continue;
      ls[k] = localStorage.getItem(k);
    }
    const cookies = [];
    for (const c of document.cookie.split(/;\s*/)) {
      if (!c) continue;
      const idx = c.indexOf('=');
      const name = idx >= 0 ? c.slice(0, idx) : c;
      const value = idx >= 0 ? c.slice(idx + 1) : '';
      if (!name || isReservedCookie(name)) continue;
      cookies.push({ name, value });
    }
    let idb = {};
    if (includeIDB) { try { idb = await dumpAllIndexedDB(); } catch { idb = {}; } }
    return { localStorage: ls, cookies, indexedDB: idb, captured_at: new Date().toISOString() };
  }

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
              try {
                db.createObjectStore(s, {
                  keyPath: meta.keyPath || undefined,
                  autoIncrement: !!meta.autoIncrement,
                });
              } catch {}
            }
          }
        };
        open.onsuccess = () => {
          const db = open.result;
          const stores = Object.keys(data.stores || {}).filter(s => db.objectStoreNames.contains(s));
          if (stores.length === 0) { db.close(); return done(); }
          let tx;
          try { tx = db.transaction(stores, 'readwrite'); }
          catch { db.close(); return done(); }
          for (const s of stores) {
            const meta = data.stores[s];
            const os = tx.objectStore(s);
            for (const r of meta.records || []) {
              try {
                if (meta.keyPath) os.put(r.value);
                else os.put(r.value, r.key);
              } catch {}
            }
          }
          tx.oncomplete = () => { db.close(); done(); };
          tx.onerror = () => { db.close(); done(); };
          tx.onabort = () => { db.close(); done(); };
        };
        open.onerror = () => done();
        open.onblocked = () => done();
      };
      probe.onerror = () => done();
    });
  }

  async function restoreGameDataSnapshot(snap) {
    if (!snap) return;
    for (const [k, v] of Object.entries(snap.localStorage || {})) {
      if (isReservedLSKey(k)) continue;
      try { localStorage.setItem(k, v); } catch {}
    }
    for (const c of snap.cookies || []) {
      if (!c?.name || isReservedCookie(c.name)) continue;
      try {
        document.cookie = `${c.name}=${c.value}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {}
    }
    if (snap.indexedDB) {
      for (const [name, data] of Object.entries(snap.indexedDB)) {
        if (name === IDB_NAME) continue;
        try { await restoreDB(name, data); } catch {}
      }
    }
  }

  // ---------- migration ----------
  function migrate(data) {
    if (!data || typeof data !== 'object') return data;
    if (data.schema === 1) {
      data.schema = 2;
      if (!data.gameData) data.gameData = { localStorage: {}, cookies: [], indexedDB: {}, captured_at: null };
      if (!('last_backup_at' in data)) data.last_backup_at = data.exported_at || null;
      data.exporter_version = '2.0.0';
    }
    return data;
  }

  // ---------- account session ----------
  let _state = null;
  let _autosaveTimer = null;
  let _captureTimer = null;
  let _captureInFlight = false;
  const listeners = new Set();
  const emit = () => listeners.forEach(fn => { try { fn(_state); } catch {} });

  async function loadFromDevice() {
    try {
      const wrapped = await idbGet('account');
      if (!wrapped) return null;
      _state = migrate(await deviceDecrypt(wrapped));
      writeLiveLocalCopy();
      startCaptureLoop();
      emit();
      return _state;
    } catch { return null; }
  }

  async function persistToDevice() {
    if (!_state) return;
    const wrapped = await deviceEncrypt(_state);
    await idbPut('account', wrapped);
  }

  function writeLiveLocalCopy() {
    try {
      // Apply settings to the page's existing localStorage so the rest of
      // the site (theme-manager, app.js, favorites) sees them transparently.
      if (_state?.settings) {
        for (const [k, v] of Object.entries(_state.settings)) {
          localStorage.setItem(`jeo:${k}`, typeof v === 'string' ? v : JSON.stringify(v));
        }
      }
      if (_state?.favorites) {
        localStorage.setItem('jeo:favorites', JSON.stringify(_state.favorites));
      }
      localStorage.setItem(LIVE_KEY, JSON.stringify({ name: _state?.profile?.name, ts: Date.now() }));
    } catch {}
  }

  function scheduleAutosave() {
    clearTimeout(_autosaveTimer);
    _autosaveTimer = setTimeout(() => { persistToDevice().catch(()=>{}); }, AUTOSAVE_DEBOUNCE_MS);
  }

  async function captureGameDataNow({ includeIDB = true } = {}) {
    if (!_state || _captureInFlight) return null;
    _captureInFlight = true;
    try {
      const snap = await captureGameDataSnapshot({ includeIDB });
      _state.gameData = snap;
      scheduleAutosave();
      emit();
      return snap;
    } finally { _captureInFlight = false; }
  }

  function startCaptureLoop() {
    stopCaptureLoop();
    _captureTimer = setInterval(() => { captureGameDataNow({ includeIDB: true }).catch(()=>{}); }, CAPTURE_INTERVAL_MS);
  }
  function stopCaptureLoop() {
    if (_captureTimer) { clearInterval(_captureTimer); _captureTimer = null; }
  }

  // Flush before page hides / unloads. beforeunload skips IDB (async unsafe);
  // visibilitychange does the deeper capture.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      captureGameDataNow({ includeIDB: true }).then(() => persistToDevice()).catch(()=>{});
    }
  });
  window.addEventListener('beforeunload', () => {
    if (!_state) return;
    try {
      const ls = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k || isReservedLSKey(k)) continue;
        ls[k] = localStorage.getItem(k);
      }
      _state.gameData = { ..._state.gameData, localStorage: ls, captured_at: new Date().toISOString() };
      // synchronous-ish persist attempt; best-effort
      persistToDevice().catch(()=>{});
    } catch {}
  });

  function getState() { return _state; }
  function isSignedIn() { return !!_state; }

  function setProfile(patch) {
    if (!_state) return;
    Object.assign(_state.profile, patch);
    emit(); scheduleAutosave();
  }
  function setSetting(k, v) {
    if (!_state) return;
    _state.settings[k] = v; writeLiveLocalCopy(); emit(); scheduleAutosave();
  }
  function toggleFavorite(slug) {
    if (!_state) return;
    const i = _state.favorites.indexOf(slug);
    if (i >= 0) _state.favorites.splice(i, 1); else _state.favorites.push(slug);
    writeLiveLocalCopy(); emit(); scheduleAutosave();
  }
  function recordProgressSnapshot(slug, snapshot) {
    if (!_state) return;
    _state.progress[slug] = { ...snapshot, updated_at: new Date().toISOString() };
    emit(); scheduleAutosave();
  }
  function clearProgress(slug) {
    if (!_state) return;
    delete _state.progress[slug]; emit(); scheduleAutosave();
  }

  async function signUp({ name, passphrase, avatarDataUrl, avatarPreset }) {
    if (!name || name.length < 2) throw new Error('Name must be at least 2 characters');
    if (!passphrase || passphrase.length < 8) throw new Error('Passphrase must be at least 8 characters');
    if (avatarDataUrl && avatarDataUrl.length > AVATAR_MAX_BYTES * 1.4) throw new Error('Avatar too large (>256 KB)');
    _state = PROFILE_DEFAULTS();
    _state.profile.name = name.trim();
    _state.profile.avatar_data_url = avatarDataUrl || null;
    _state.profile.avatar_preset = avatarPreset || (avatarDataUrl ? null : 'p1');
    // Take initial gameData snapshot so any pre-account play still gets captured.
    try { _state.gameData = await captureGameDataSnapshot({ includeIDB: true }); } catch {}
    await persistToDevice();
    writeLiveLocalCopy();
    startCaptureLoop();
    emit();
    return await exportBlob(passphrase);
  }

  async function signInWithBlob({ blob, passphrase, stayOnDevice = true, restoreGameData = true }) {
    let data = await decryptWithPassphrase(blob, passphrase);
    data = migrate(data);
    if (data.schema > SCHEMA_VERSION) throw new Error('This save was created with a newer version of Jeoweb.');
    _state = data;
    if (restoreGameData && _state.gameData) {
      try { await restoreGameDataSnapshot(_state.gameData); } catch {}
    }
    if (stayOnDevice) await persistToDevice();
    writeLiveLocalCopy();
    startCaptureLoop();
    emit();
    return _state;
  }

  async function exportBlob(passphrase) {
    if (!_state) throw new Error('not signed in');
    if (!passphrase || passphrase.length < 8) throw new Error('Passphrase must be at least 8 characters');
    // Flush latest game data into the snapshot before encrypting.
    try { _state.gameData = await captureGameDataSnapshot({ includeIDB: true }); } catch {}
    const now = new Date().toISOString();
    _state.exported_at = now;
    _state.last_backup_at = now;
    await persistToDevice();
    emit();
    return await encryptWithPassphrase(_state, passphrase);
  }

  function getBackupAgeDays() {
    if (!_state?.last_backup_at) return Infinity;
    const t = Date.parse(_state.last_backup_at);
    if (!Number.isFinite(t)) return Infinity;
    return (Date.now() - t) / 86_400_000;
  }

  async function signOut({ forgetDevice = true } = {}) {
    stopCaptureLoop();
    _state = null;
    if (forgetDevice) {
      await idbDel('account');
      await idbDel('deviceKey');
    }
    try { localStorage.removeItem(LIVE_KEY); } catch {}
    emit();
  }

  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

  // ---------- public API ----------
  window.JeoAccount = {
    // session
    loadFromDevice, isSignedIn, getState, onChange,
    // sign-up / sign-in / out
    signUp, signInWithBlob, exportBlob, signOut,
    // mutations
    setProfile, setSetting, toggleFavorite, recordProgressSnapshot, clearProgress,
    // game-data sync
    captureGameData: captureGameDataNow,
    restoreGameData: restoreGameDataSnapshot,
    getBackupAgeDays,
    // helpers exported for reset-progress.js
    _internal: { encryptWithPassphrase, decryptWithPassphrase, AVATAR_MAX_BYTES },
  };

  // auto-restore on load
  loadFromDevice().catch(()=>{});
})();
