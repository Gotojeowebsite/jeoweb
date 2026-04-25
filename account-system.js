/* Jeoweb Offline Account System
 *
 * - AES-GCM 256, PBKDF2-SHA-256 250k iters
 * - Portable blob format: jeo1.<saltIv>.<ciphertext>
 *     saltIv = base64( salt(16 bytes) || iv(12 bytes) )  (28 bytes total)
 *     The user's spec listed "jeo1.<iv>.<ciphertext>" — this packs the
 *     PBKDF2 salt into the iv segment so the format stays 3 parts on the wire.
 * - Device-bound non-extractable AES-GCM CryptoKey kept in IndexedDB
 *   ("jeo-account" / store "device") so users can stay signed in without
 *   the passphrase ever touching disk.
 * - Schema { schema:1, profile, settings, favorites, progress } — see PROFILE_DEFAULTS.
 * - Avatar data URL hard-capped to 256 KB.
 * - Live state in localStorage under JEO_ACCOUNT_LIVE; autosave debounced 5s.
 *
 * No third-party crypto. WebCrypto only.
 */

(function () {
  const PREFIX = 'jeo1';
  const PBKDF2_ITERS = 250_000;
  const AVATAR_MAX_BYTES = 256 * 1024;
  const AUTOSAVE_DEBOUNCE_MS = 5000;
  const LIVE_KEY = 'JEO_ACCOUNT_LIVE';
  const IDB_NAME = 'jeo-account';
  const IDB_STORE = 'device';

  const PROFILE_DEFAULTS = () => ({
    schema: 1,
    profile: { name: 'Player', avatar_data_url: null, avatar_preset: 'p1', created_at: new Date().toISOString() },
    settings: { theme: 'dark', accent: '#7a5cff', layout: 'grid', hide_maintenance: true, tab_cloaker: null },
    favorites: [],
    progress: {},                // { [slug]: { localStorage: {...}, indexedDB: [...], cookies: [...], updated_at } }
    exported_at: null,
    exporter_version: '1.0.0',
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

  // ---------- account session ----------
  let _state = null;
  let _autosaveTimer = null;
  const listeners = new Set();
  const emit = () => listeners.forEach(fn => { try { fn(_state); } catch {} });

  async function loadFromDevice() {
    try {
      const wrapped = await idbGet('account');
      if (!wrapped) return null;
      _state = await deviceDecrypt(wrapped);
      writeLiveLocalCopy();
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
    await persistToDevice();
    writeLiveLocalCopy();
    emit();
    return await exportBlob(passphrase);
  }

  async function signInWithBlob({ blob, passphrase, stayOnDevice = true }) {
    const data = await decryptWithPassphrase(blob, passphrase);
    if (data.schema !== 1) throw new Error('This save was created with a newer version of Jeoweb.');
    _state = data;
    if (stayOnDevice) await persistToDevice();
    writeLiveLocalCopy();
    emit();
    return _state;
  }

  async function exportBlob(passphrase) {
    if (!_state) throw new Error('not signed in');
    if (!passphrase || passphrase.length < 8) throw new Error('Passphrase must be at least 8 characters');
    _state.exported_at = new Date().toISOString();
    return await encryptWithPassphrase(_state, passphrase);
  }

  async function signOut({ forgetDevice = true } = {}) {
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
    // helpers exported for reset-progress.js
    _internal: { encryptWithPassphrase, decryptWithPassphrase, AVATAR_MAX_BYTES },
  };

  // auto-restore on load
  loadFromDevice().catch(()=>{});
})();
