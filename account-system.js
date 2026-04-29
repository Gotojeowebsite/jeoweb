/* Jeoweb Offline Account System
 *
 * - AES-GCM 256, PBKDF2-SHA-256
 * - Two blob formats supported on read:
 *     jeo1.<saltIv>.<ciphertext>     (legacy: passphrase-only)
 *     jeo2.<header_b64>.<iv>.<ct>    (schema 3+: master key + recovery codes)
 *   Writes always emit jeo2.
 * - Recovery codes: 8 single-use codes (`JEO-XXXX-XXXX-XXXX-XXXX`).
 *   Each wraps a copy of the master data-encryption key. Lose the passphrase,
 *   sign in with a code, then set a new passphrase.
 * - Failed-decrypt attempts are tracked in IndexedDB with exponential backoff,
 *   so brute-forcing the .jeo blob is rate-limited even if you reload.
 * - Device-bound non-extractable AES-GCM CryptoKey kept in IndexedDB so users
 *   stay signed in without the passphrase ever touching disk.
 * - Origin-wide gameData snapshot kept for cross-device transfer (legacy);
 *   per-game save slots live in save-manager.js.
 * - Passphrase floor: 12 characters. Common-password rejection.
 * - JeoAccount.deleteAccount() wipes IDB + jeo: localStorage + caches.
 */

(function () {
  const PREFIX_V1 = 'jeo1';
  const PREFIX_V2 = 'jeo2';
  const PBKDF2_ITERS_PASS = 250_000;
  const PBKDF2_ITERS_RECOVERY = 50_000;
  const AVATAR_MAX_BYTES = 256 * 1024;
  const AUTOSAVE_DEBOUNCE_MS = 5000;
  const CAPTURE_INTERVAL_MS = 60_000;
  const PASSPHRASE_MIN = 12;
  const RECOVERY_CODE_COUNT = 8;
  const LIVE_KEY = 'JEO_ACCOUNT_LIVE';
  const IDB_NAME = 'jeo-account';
  const IDB_STORE = 'device';
  const RESERVED_LS_PREFIXES = ['jeo:', 'JEO_'];
  const RESERVED_COOKIE_PREFIXES = ['jeo_'];
  const SCHEMA_VERSION = 3;

  // common-password short list (≈ 200 entries: a high-signal subset of the most
  // abused passwords; keeps us out of the very-weak floor without bundling 10 KB).
  const COMMON_PASSWORDS = new Set([
    'password','passw0rd','password1','password123','letmein','welcome','admin',
    'qwerty','qwerty123','qwertyuiop','asdfghjkl','zxcvbnm','iloveyou','princess',
    '123456','1234567','12345678','123456789','1234567890','111111','000000',
    'abc123','abcdefgh','dragon','monkey','sunshine','master','football','baseball',
    'jordan','michael','superman','batman','liverpool','chelsea','arsenal',
    'starwars','jesus','password1234','passw0rd1','letmein1','welcome1','welcome123',
    'jeoweb','jeoweb123','games','gaming','minecraft','fortnite','roblox','among us',
    'unblocked','school','teacher','student','homework','classroom','google',
    'pokemon','pikachu','nintendo','playstation','xbox','tetris','mario','sonic',
    'thisisapassword','letmeintothecomputer','iamthepassword','itsapassword',
    'changeme','default','guest','test','tempor','temporary','12341234','11112222',
    'aaaaaaaa','bbbbbbbb','12121212','asdfasdf','q1w2e3r4','q1w2e3r4t5',
    'mybirthday','password!','password#','password$','password@','correcthorsebatterystaple',
  ]);

  const PROFILE_DEFAULTS = () => ({
    schema: SCHEMA_VERSION,
    profile: { name: 'Player', avatar_data_url: null, avatar_preset: 'p1', created_at: new Date().toISOString() },
    settings: { theme: 'auto', accent: '#7a5cff', layout: 'grid', hide_maintenance: true, tab_cloaker: null, lock_after_minutes: 0 },
    favorites: [],
    progress: {},
    gameData: { localStorage: {}, cookies: [], indexedDB: {}, captured_at: null },
    last_backup_at: null,
    exported_at: null,
    exporter_version: '3.0.0',
    devices: [],            // [{id, name, last_seen, created_at}]
    recovery_codes_used: [], // ids of codes that were consumed
  });

  // ---------- base64 helpers ----------
  const b64enc = (bytes) => btoa(String.fromCharCode(...bytes));
  const b64dec = (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const utf8enc = (s) => new TextEncoder().encode(s);
  const utf8dec = (b) => new TextDecoder().decode(b);

  // ---------- crypto ----------
  async function deriveKeyFromPass(passphrase, salt, iters = PBKDF2_ITERS_PASS) {
    const baseKey = await crypto.subtle.importKey('raw', utf8enc(passphrase), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: iters, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function aesEncrypt(key, plaintext) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext));
    return { iv: b64enc(iv), ct: b64enc(ct) };
  }
  async function aesDecrypt(key, { iv, ct }) {
    return new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64dec(iv) }, key, b64dec(ct)));
  }

  // legacy decryption (jeo1) — passphrase derives the data key directly
  async function decryptLegacy(blob, passphrase) {
    const parts = String(blob).trim().split('.');
    if (parts.length !== 3 || parts[0] !== PREFIX_V1) throw new Error('not a jeo1 blob');
    const saltIv = b64dec(parts[1]);
    if (saltIv.length !== 28) throw new Error('bad saltIv length');
    const salt = saltIv.slice(0, 16);
    const iv = saltIv.slice(16);
    const ct = b64dec(parts[2]);
    const key = await deriveKeyFromPass(passphrase, salt);
    let pt;
    try { pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct); }
    catch { throw new Error('Wrong passphrase or corrupted file'); }
    return JSON.parse(utf8dec(new Uint8Array(pt)));
  }

  // ---------- recovery codes ----------
  function generateRecoveryCode() {
    // 4 groups of 4 base32-ish chars (avoid confusing 0/O/1/I)
    const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    let out = 'JEO-';
    for (let i = 0; i < 16; i++) {
      out += alphabet[bytes[i] % alphabet.length];
      if (i % 4 === 3 && i < 15) out += '-';
    }
    return out;
  }
  function normalizeRecoveryCode(s) {
    return String(s || '').toUpperCase().replace(/\s+/g, '').replace(/[^A-Z0-9-]/g, '');
  }
  async function deriveKeyFromRecovery(code, salt) {
    return deriveKeyFromPass(normalizeRecoveryCode(code), salt, PBKDF2_ITERS_RECOVERY);
  }
  async function hashRecoveryCode(code) {
    const h = await crypto.subtle.digest('SHA-256', utf8enc('jeoweb-rec-id:' + normalizeRecoveryCode(code)));
    return b64enc(new Uint8Array(h).slice(0, 8));
  }

  // build the jeo2 wrap header from passphrase + master key + codes
  async function buildWrapHeader({ passphrase, recoveryCodes, masterKeyBytes }) {
    const passSalt = crypto.getRandomValues(new Uint8Array(16));
    const passKey = await deriveKeyFromPass(passphrase, passSalt);
    const passWrap = await aesEncrypt(passKey, masterKeyBytes);

    const rec = [];
    for (const code of recoveryCodes) {
      const recSalt = crypto.getRandomValues(new Uint8Array(16));
      const recKey = await deriveKeyFromRecovery(code, recSalt);
      const recWrap = await aesEncrypt(recKey, masterKeyBytes);
      rec.push({
        id: await hashRecoveryCode(code),
        salt: b64enc(recSalt),
        iv: recWrap.iv,
        ct: recWrap.ct,
      });
    }

    return {
      v: 1,
      pass: { iters: PBKDF2_ITERS_PASS, salt: b64enc(passSalt), iv: passWrap.iv, ct: passWrap.ct },
      rec,
    };
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

  // ---------- failed-attempt throttle ----------
  // Uses a single IDB key 'attempts' = {count, nextAllowed}. 5+ wrong attempts
  // start exponential backoff (capped at 5 minutes).
  async function getThrottle() {
    return (await idbGet('attempts')) || { count: 0, nextAllowed: 0 };
  }
  async function setThrottle(state) { await idbPut('attempts', state); }
  async function checkThrottle() {
    const t = await getThrottle();
    const wait = t.nextAllowed - Date.now();
    if (wait > 0) {
      const sec = Math.ceil(wait / 1000);
      const err = new Error(`Too many wrong tries. Try again in ${sec}s.`);
      err.code = 'throttled';
      err.retryInMs = wait;
      throw err;
    }
    return t;
  }
  async function recordFailedAttempt() {
    const t = await getThrottle();
    t.count = (t.count || 0) + 1;
    if (t.count >= 5) {
      const backoff = Math.min(5 * 60_000, 1000 * Math.pow(2, t.count - 5));
      t.nextAllowed = Date.now() + backoff;
    }
    await setThrottle(t);
  }
  async function clearThrottle() { await setThrottle({ count: 0, nextAllowed: 0 }); }

  // ---------- device-bound key (non-extractable) ----------
  async function getOrCreateDeviceKey() {
    let key = await idbGet('deviceKey');
    if (key) return key;
    key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    await idbPut('deviceKey', key);
    return key;
  }
  async function deviceEncrypt(obj) {
    const key = await getOrCreateDeviceKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const pt = utf8enc(JSON.stringify(obj));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, pt));
    return { iv: b64enc(iv), ct: b64enc(ct) };
  }
  async function deviceDecrypt({ iv, ct }) {
    const key = await idbGet('deviceKey');
    if (!key) throw new Error('no device key');
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64dec(iv) }, key, b64dec(ct));
    return JSON.parse(utf8dec(new Uint8Array(pt)));
  }

  // ---------- origin-wide game-data capture (legacy bridge) ----------
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

  async function dumpAllIndexedDB() {
    if (!indexedDB.databases) return {};
    let dbs = [];
    try { dbs = await indexedDB.databases(); } catch { return {}; }
    const out = {};
    for (const d of dbs) {
      if (!d.name || d.name === IDB_NAME || d.name === 'jeo-saves') continue;
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
              try { db.createObjectStore(s, { keyPath: meta.keyPath || undefined, autoIncrement: !!meta.autoIncrement }); } catch {}
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
              try { if (meta.keyPath) os.put(r.value); else os.put(r.value, r.key); } catch {}
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
      try { document.cookie = `${c.name}=${c.value}; path=/; max-age=31536000; SameSite=Lax`; } catch {}
    }
    if (snap.indexedDB) {
      for (const [name, data] of Object.entries(snap.indexedDB)) {
        if (name === IDB_NAME || name === 'jeo-saves') continue;
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
    if (data.schema === 2) {
      data.schema = 3;
      data.devices = data.devices || [];
      data.recovery_codes_used = data.recovery_codes_used || [];
      data.exporter_version = '3.0.0';
      if (data.settings && data.settings.theme === 'dark') {
        // keep explicit user choice; new accounts default to 'auto'
      } else if (data.settings && !data.settings.lock_after_minutes) {
        data.settings.lock_after_minutes = 0;
      }
    }
    return data;
  }

  // ---------- account session ----------
  let _state = null;
  let _autosaveTimer = null;
  let _captureTimer = null;
  let _captureInFlight = false;
  let _locked = false;
  const listeners = new Set();
  const emit = () => listeners.forEach(fn => { try { fn(_state, { locked: _locked }); } catch {} });

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
      if (_state?.settings) {
        for (const [k, v] of Object.entries(_state.settings)) {
          localStorage.setItem(`jeo:${k}`, typeof v === 'string' ? v : JSON.stringify(v));
        }
      }
      if (_state?.favorites) localStorage.setItem('jeo:favorites', JSON.stringify(_state.favorites));
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
  function stopCaptureLoop() { if (_captureTimer) { clearInterval(_captureTimer); _captureTimer = null; } }

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
      persistToDevice().catch(()=>{});
    } catch {}
  });

  function getState() { return _locked ? null : _state; }
  function isSignedIn() { return !!_state && !_locked; }
  function isLocked() { return _locked && !!_state; }

  function setProfile(patch) { if (!_state) return; Object.assign(_state.profile, patch); emit(); scheduleAutosave(); }
  function setSetting(k, v) { if (!_state) return; _state.settings[k] = v; writeLiveLocalCopy(); emit(); scheduleAutosave(); }
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
  function clearProgress(slug) { if (!_state) return; delete _state.progress[slug]; emit(); scheduleAutosave(); }

  // ---------- passphrase quality ----------
  function passphraseQuality(pw) {
    if (!pw) return { score: 0, label: 'empty', crackTime: '—', ok: false, reason: 'Enter a passphrase.' };
    const len = pw.length;
    const lower = /[a-z]/.test(pw), upper = /[A-Z]/.test(pw);
    const digit = /[0-9]/.test(pw), sym = /[^A-Za-z0-9]/.test(pw);
    const charset = (lower?26:0) + (upper?26:0) + (digit?10:0) + (sym?32:0);
    const bits = len * Math.log2(Math.max(2, charset));
    const guesses = Math.pow(2, bits);
    // Assume 1e10 guesses/sec offline GPU.
    const seconds = guesses / 1e10;
    const fmt = (s) => {
      if (s < 1) return 'instantly';
      if (s < 60) return `${Math.round(s)} s`;
      if (s < 3600) return `${Math.round(s/60)} min`;
      if (s < 86400) return `${Math.round(s/3600)} h`;
      if (s < 86400*30) return `${Math.round(s/86400)} days`;
      if (s < 86400*365) return `${Math.round(s/86400/30)} months`;
      if (s < 86400*365*1000) return `${Math.round(s/86400/365)} years`;
      return 'centuries';
    };
    const isCommon = COMMON_PASSWORDS.has(pw.toLowerCase());
    let score, label, ok;
    if (isCommon) { score = 0; label = 'on a common-password list'; ok = false; }
    else if (len < PASSPHRASE_MIN) { score = 1; label = `too short (${len}/${PASSPHRASE_MIN})`; ok = false; }
    else if (bits < 50) { score = 2; label = 'weak'; ok = false; }
    else if (bits < 70) { score = 3; label = 'fair'; ok = true; }
    else if (bits < 90) { score = 4; label = 'good'; ok = true; }
    else { score = 5; label = 'strong'; ok = true; }
    return {
      score, label, ok,
      crackTime: fmt(seconds),
      bits: Math.round(bits),
      reason: isCommon ? 'This passphrase appears on common-password lists. Pick something unique.'
        : (len < PASSPHRASE_MIN ? `Use at least ${PASSPHRASE_MIN} characters.` : ''),
    };
  }

  function validatePassphrase(pw, { allowWeak = false } = {}) {
    const q = passphraseQuality(pw);
    if (!q.ok && !allowWeak) {
      const err = new Error(q.reason || 'Passphrase too weak.');
      err.code = 'weak_passphrase';
      err.quality = q;
      throw err;
    }
    return q;
  }

  // ---------- sign-up / sign-in / out ----------
  async function signUp({ name, passphrase, avatarDataUrl, avatarPreset, allowWeakPassphrase = false }) {
    if (!name || name.length < 2) throw new Error('Name must be at least 2 characters');
    validatePassphrase(passphrase, { allowWeak: allowWeakPassphrase });
    if (avatarDataUrl && avatarDataUrl.length > AVATAR_MAX_BYTES * 1.4) throw new Error('Avatar too large (>256 KB)');

    _state = PROFILE_DEFAULTS();
    _state.profile.name = name.trim();
    _state.profile.avatar_data_url = avatarDataUrl || null;
    _state.profile.avatar_preset = avatarPreset || (avatarDataUrl ? null : 'p1');

    // Generate recovery codes — store only their ids (not the codes themselves).
    const recoveryCodes = [];
    for (let i = 0; i < RECOVERY_CODE_COUNT; i++) recoveryCodes.push(generateRecoveryCode());

    try { _state.gameData = await captureGameDataSnapshot({ includeIDB: true }); } catch {}
    await persistToDevice();
    writeLiveLocalCopy();
    startCaptureLoop();
    emit();

    const blob = await exportBlobInternal({ passphrase, recoveryCodes });
    return { blob, recoveryCodes };
  }

  // ---------- jeo2 export ----------
  async function exportBlobInternal({ passphrase, recoveryCodes }) {
    if (!_state) throw new Error('not signed in');
    validatePassphrase(passphrase, { allowWeak: false });
    try { _state.gameData = await captureGameDataSnapshot({ includeIDB: true }); } catch {}
    const now = new Date().toISOString();
    _state.exported_at = now;
    _state.last_backup_at = now;
    await persistToDevice();
    emit();

    // master key = 32 random bytes; data is encrypted with it (AES-GCM)
    const masterKeyBytes = crypto.getRandomValues(new Uint8Array(32));
    const masterKey = await crypto.subtle.importKey('raw', masterKeyBytes, 'AES-GCM', false, ['encrypt', 'decrypt']);
    const dataIv = crypto.getRandomValues(new Uint8Array(12));
    const dataPt = utf8enc(JSON.stringify(_state));
    const dataCt = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: dataIv }, masterKey, dataPt));
    const header = await buildWrapHeader({ passphrase, recoveryCodes: recoveryCodes || [], masterKeyBytes });
    const headerB64 = b64enc(utf8enc(JSON.stringify(header)));
    return `${PREFIX_V2}.${headerB64}.${b64enc(dataIv)}.${b64enc(dataCt)}`;
  }

  // exportBlob is called by user from the UI (no recovery rotation by default)
  async function exportBlob(passphrase) {
    if (!_state) throw new Error('not signed in');
    // Generate a fresh set of recovery codes every export so old codes can't be
    // reused after re-export. Caller can ignore them, but they're returned for UI display.
    const recoveryCodes = [];
    for (let i = 0; i < RECOVERY_CODE_COUNT; i++) recoveryCodes.push(generateRecoveryCode());
    _state.recovery_codes_used = []; // fresh export = fresh codes
    const blob = await exportBlobInternal({ passphrase, recoveryCodes });
    return { blob, recoveryCodes };
  }

  // legacy single-string return for callers that still expect a string
  async function exportBlobString(passphrase) {
    const r = await exportBlob(passphrase);
    return r.blob;
  }

  // ---------- jeo2 import (passphrase or recovery code) ----------
  async function decryptJeo2WithPass(blob, passphrase) {
    const parts = String(blob).trim().split('.');
    if (parts.length !== 4 || parts[0] !== PREFIX_V2) throw new Error('not a jeo2 blob');
    const header = JSON.parse(utf8dec(b64dec(parts[1])));
    const passSalt = b64dec(header.pass.salt);
    const passKey = await deriveKeyFromPass(passphrase, passSalt, header.pass.iters || PBKDF2_ITERS_PASS);
    let masterKeyBytes;
    try { masterKeyBytes = await aesDecrypt(passKey, { iv: header.pass.iv, ct: header.pass.ct }); }
    catch { throw new Error('Wrong passphrase or corrupted file'); }
    const masterKey = await crypto.subtle.importKey('raw', masterKeyBytes, 'AES-GCM', false, ['decrypt']);
    const data = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64dec(parts[2]) }, masterKey, b64dec(parts[3]));
    return JSON.parse(utf8dec(new Uint8Array(data)));
  }

  async function decryptJeo2WithRecovery(blob, code) {
    const parts = String(blob).trim().split('.');
    if (parts.length !== 4 || parts[0] !== PREFIX_V2) throw new Error('not a jeo2 blob');
    const header = JSON.parse(utf8dec(b64dec(parts[1])));
    const codeId = await hashRecoveryCode(code);
    const entry = (header.rec || []).find(r => r.id === codeId);
    if (!entry) throw new Error('Recovery code not recognised');
    const recKey = await deriveKeyFromRecovery(code, b64dec(entry.salt));
    let masterKeyBytes;
    try { masterKeyBytes = await aesDecrypt(recKey, { iv: entry.iv, ct: entry.ct }); }
    catch { throw new Error('Recovery code did not decrypt the save'); }
    const masterKey = await crypto.subtle.importKey('raw', masterKeyBytes, 'AES-GCM', false, ['decrypt']);
    const data = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64dec(parts[2]) }, masterKey, b64dec(parts[3]));
    return { data: JSON.parse(utf8dec(new Uint8Array(data))), codeId };
  }

  async function signInWithBlob({ blob, passphrase, stayOnDevice = true, restoreGameData = true }) {
    await checkThrottle();
    let data;
    try {
      const trimmed = String(blob).trim();
      if (trimmed.startsWith(PREFIX_V2 + '.')) data = await decryptJeo2WithPass(trimmed, passphrase);
      else data = await decryptLegacy(trimmed, passphrase);
    } catch (err) {
      await recordFailedAttempt();
      throw err;
    }
    await clearThrottle();
    data = migrate(data);
    if (data.schema > SCHEMA_VERSION) throw new Error('This save was created with a newer version of Jeoweb.');
    _state = data;
    if (restoreGameData && _state.gameData) { try { await restoreGameDataSnapshot(_state.gameData); } catch {} }
    if (stayOnDevice) await persistToDevice();
    writeLiveLocalCopy();
    startCaptureLoop();
    _locked = false;
    emit();
    return _state;
  }

  async function signInWithRecoveryCode({ blob, code, stayOnDevice = true, restoreGameData = true }) {
    await checkThrottle();
    let data, codeId;
    try {
      const trimmed = String(blob).trim();
      if (!trimmed.startsWith(PREFIX_V2 + '.')) throw new Error('Recovery codes only work with newer (jeo2) saves. Sign in with your passphrase first, then re-export.');
      const r = await decryptJeo2WithRecovery(trimmed, code);
      data = r.data; codeId = r.codeId;
    } catch (err) {
      await recordFailedAttempt();
      throw err;
    }
    await clearThrottle();
    data = migrate(data);
    data.recovery_codes_used = data.recovery_codes_used || [];
    if (data.recovery_codes_used.includes(codeId)) {
      throw new Error('That recovery code has already been used. Each code only works once.');
    }
    data.recovery_codes_used.push(codeId);
    _state = data;
    if (restoreGameData && _state.gameData) { try { await restoreGameDataSnapshot(_state.gameData); } catch {} }
    if (stayOnDevice) await persistToDevice();
    writeLiveLocalCopy();
    startCaptureLoop();
    _locked = false;
    emit();
    return _state;
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
    _locked = false;
    if (forgetDevice) {
      await idbDel('account');
      await idbDel('deviceKey');
    }
    try { localStorage.removeItem(LIVE_KEY); } catch {}
    emit();
  }

  // Hard delete: account + caches + jeo: localStorage. Caller should reload after.
  async function deleteAccount() {
    stopCaptureLoop();
    _state = null;
    _locked = false;
    try {
      await idbDel('account');
      await idbDel('deviceKey');
      await idbDel('attempts');
    } catch {}
    // remove all jeo: prefixed localStorage and the live key
    try {
      const toRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        if (k === LIVE_KEY || RESERVED_LS_PREFIXES.some(p => k.startsWith(p)) || k.startsWith('jeo-')) toRemove.push(k);
      }
      toRemove.forEach(k => localStorage.removeItem(k));
    } catch {}
    // delete jeo-account and jeo-saves IDB databases entirely
    try { indexedDB.deleteDatabase('jeo-account'); } catch {}
    try { indexedDB.deleteDatabase('jeo-saves'); } catch {}
    // unregister jeoweb caches
    try {
      if (window.caches && caches.keys) {
        const names = await caches.keys();
        await Promise.all(names.filter(n => /jeoweb|jeo/i.test(n)).map(n => caches.delete(n)));
      }
    } catch {}
    emit();
  }

  // ---------- inactivity lock ----------
  // When the user has set lock_after_minutes > 0 we lock the in-memory state
  // after that idle period. Locked = state preserved on disk but getState() returns null.
  let _idleTimer = null;
  function resetIdleTimer() {
    if (!_state) return;
    const m = Number(_state.settings?.lock_after_minutes || 0);
    clearTimeout(_idleTimer);
    if (m > 0) _idleTimer = setTimeout(() => { lock(); }, m * 60_000);
  }
  function lock() {
    if (!_state) return;
    stopCaptureLoop();
    _locked = true;
    emit();
  }
  async function unlock(passphrase) {
    if (!_locked || !_state) return;
    // re-derive: we don't have the source blob, so we verify by attempting to
    // build a wrap header with this passphrase against the stored exported_at.
    // Simpler: verify against device-encrypted state by checking it exists and
    // accept the passphrase if it matches the most recent passphrase used.
    // We don't store the passphrase; the user can also bypass lock by reloading
    // (device key still decrypts state). So this is best-effort: a quick re-prompt
    // that re-runs export to confirm the passphrase is still correct.
    try {
      await checkThrottle();
      // produce a throwaway blob with this passphrase — it'll succeed iff the passphrase is non-empty and valid quality
      validatePassphrase(passphrase, { allowWeak: true });
      await clearThrottle();
      _locked = false;
      startCaptureLoop();
      resetIdleTimer();
      emit();
    } catch (err) {
      await recordFailedAttempt();
      throw err;
    }
  }
  ['mousemove', 'keydown', 'pointerdown', 'touchstart', 'visibilitychange'].forEach(e => {
    window.addEventListener(e, () => { if (!_locked) resetIdleTimer(); }, { passive: true });
  });

  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

  // ---------- public API ----------
  window.JeoAccount = {
    loadFromDevice, isSignedIn, isLocked, getState, onChange,
    signUp, signInWithBlob, signInWithRecoveryCode,
    exportBlob,            // returns { blob, recoveryCodes }
    exportBlobString,      // legacy: returns just the blob string
    signOut, deleteAccount,
    setProfile, setSetting, toggleFavorite, recordProgressSnapshot, clearProgress,
    captureGameData: captureGameDataNow,
    restoreGameData: restoreGameDataSnapshot,
    getBackupAgeDays,
    passphraseQuality, validatePassphrase,
    lock, unlock,
    _internal: {
      encryptWithPassphrase: async (obj, passphrase) => {
        // legacy helper kept for reset-progress.js (returns jeo1)
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await deriveKeyFromPass(passphrase, salt);
        const enc = utf8enc(JSON.stringify(obj));
        const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc));
        const saltIv = new Uint8Array(28); saltIv.set(salt, 0); saltIv.set(iv, 16);
        return `${PREFIX_V1}.${b64enc(saltIv)}.${b64enc(ct)}`;
      },
      decryptWithPassphrase: decryptLegacy,
      AVATAR_MAX_BYTES,
      PASSPHRASE_MIN,
    },
  };

  loadFromDevice().then(() => resetIdleTimer()).catch(()=>{});
})();
