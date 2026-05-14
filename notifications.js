/* Jeoweb daily reminders — window.JeoNotify.
   Opt-in web push for a once-a-day "your streak is waiting" nudge. Requires
   the backend deployed with VAPID keys (see backend/README.md) and a
   <meta name="jeo-vapid-key"> tag. When that isn't set up the Settings toggle
   simply hides itself — the feature degrades to nothing, no errors. The
   permission prompt only ever fires from an explicit toggle click. */
(function () {
  if (window.JeoNotify) return;

  function supported() {
    return ('Notification' in window) && ('serviceWorker' in navigator) && ('PushManager' in window);
  }

  function vapidKey() {
    const meta = document.querySelector('meta[name="jeo-vapid-key"]');
    const v = meta && meta.content && meta.content.trim();
    if (v && !/REPLACE|YOUR-/i.test(v) && v.length > 20) return v;
    return null;
  }

  // The feature is usable only when supported AND configured (backend up +
  // a VAPID key present).
  function available() {
    return supported() && !!vapidKey() &&
      !!(window.JeoBackend && window.JeoBackend.isConfigured && window.JeoBackend.isConfigured());
  }

  function urlB64ToUint8Array(b64) {
    const pad = '='.repeat((4 - (b64.length % 4)) % 4);
    const base64 = (b64 + pad).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  async function currentSubscription() {
    try {
      const reg = await navigator.serviceWorker.ready;
      return await reg.pushManager.getSubscription();
    } catch {
      return null;
    }
  }

  // Resolves to true if reminders are currently active on this device.
  async function isEnabled() {
    if (!supported() || Notification.permission !== 'granted') return false;
    return !!(await currentSubscription());
  }

  // Resolves to { ok, reason? }. The permission prompt fires here, so this
  // must only be called from an explicit user action.
  async function enable() {
    if (!available()) return { ok: false, reason: 'unavailable' };
    let perm = Notification.permission;
    if (perm === 'default') {
      try { perm = await Notification.requestPermission(); } catch { perm = 'denied'; }
    }
    if (perm !== 'granted') return { ok: false, reason: 'denied' };
    try {
      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(vapidKey()),
        });
      }
      const res = await window.JeoBackend.pushSubscribe(sub.toJSON());
      if (!res || !res.ok) {
        // Backend rejected it — roll the local subscription back so the UI
        // doesn't claim reminders are on when the server has no record.
        try { await sub.unsubscribe(); } catch {}
        return { ok: false, reason: 'backend' };
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: 'error' };
    }
  }

  // Resolves to { ok }.
  async function disable() {
    try {
      const sub = await currentSubscription();
      if (sub) {
        const endpoint = sub.endpoint;
        try { await sub.unsubscribe(); } catch {}
        if (window.JeoBackend) await window.JeoBackend.pushUnsubscribe(endpoint);
      }
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  // Self-wires the Settings → General toggle, hiding the whole row when the
  // feature can't work (no backend / no VAPID key / unsupported browser).
  function wireToggle() {
    const toggle = document.getElementById('dailyRemindersToggle');
    const row = document.getElementById('dailyRemindersRow');
    if (!toggle) return;
    if (!available()) {
      if (row) row.classList.add('hidden');
      return;
    }
    if (row) row.classList.remove('hidden');
    isEnabled().then((on) => { toggle.checked = on; });
    toggle.addEventListener('change', async () => {
      toggle.disabled = true;
      if (toggle.checked) {
        const r = await enable();
        if (!r.ok) {
          toggle.checked = false;
          if (window.JeoToast) {
            window.JeoToast.warning(r.reason === 'denied'
              ? 'Notifications are blocked in your browser settings.'
              : 'Could not turn on reminders. Try again later.');
          }
        } else if (window.JeoToast) {
          window.JeoToast.success('🔔 Daily reminders on — we’ll nudge you to keep your streak alive.');
        }
      } else {
        await disable();
        if (window.JeoToast) window.JeoToast.info('Daily reminders turned off.');
      }
      toggle.disabled = false;
    });
  }

  document.addEventListener('DOMContentLoaded', wireToggle);

  window.JeoNotify = { supported, available, isEnabled, enable, disable };
})();
