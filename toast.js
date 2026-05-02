/* Jeoweb toast system — minimal pub/sub UI for status feedback. */
(function () {
  if (window.JeoToast) return;
  function root() {
    let r = document.getElementById('jeoToastRoot');
    if (!r) {
      r = document.createElement('div');
      r.id = 'jeoToastRoot';
      r.setAttribute('role', 'status');
      r.setAttribute('aria-live', 'polite');
      document.body.appendChild(r);
    }
    return r;
  }
  function dismiss(el) {
    if (!el || el._leaving) return;
    el._leaving = true;
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 220);
  }
  function show(msg, opts) {
    opts = opts || {};
    const kind = opts.kind || 'info';
    const ttl = opts.ttl != null ? opts.ttl : (kind === 'error' ? 6500 : 3800);
    const el = document.createElement('div');
    el.className = 'jeo-toast ' + kind;

    const msgEl = document.createElement('span');
    msgEl.className = 'jt-msg';
    msgEl.textContent = String(msg);
    el.appendChild(msgEl);

    if (opts.action && typeof opts.action.onClick === 'function') {
      const btn = document.createElement('button');
      btn.className = 'jt-action';
      btn.type = 'button';
      btn.textContent = String(opts.action.label || 'Action');
      btn.addEventListener('click', () => {
        try { opts.action.onClick(); } catch (e) { console.error(e); }
        dismiss(el);
      });
      el.appendChild(btn);
    }

    const x = document.createElement('button');
    x.className = 'jt-x';
    x.type = 'button';
    x.setAttribute('aria-label', 'Dismiss');
    x.textContent = '✕';
    x.addEventListener('click', () => dismiss(el));
    el.appendChild(x);

    root().appendChild(el);
    if (ttl > 0) setTimeout(() => dismiss(el), ttl);
    return el;
  }
  // Accept a positional ttl number as the 2nd arg too (legacy callers).
  function normalize(opts) {
    if (typeof opts === 'number') return { ttl: opts };
    return opts || {};
  }
  window.JeoToast = {
    show: (m, o) => show(m, normalize(o)),
    info: (m, o) => show(m, Object.assign({}, normalize(o), { kind: 'info' })),
    success: (m, o) => show(m, Object.assign({}, normalize(o), { kind: 'success' })),
    error: (m, o) => show(m, Object.assign({}, normalize(o), { kind: 'error' })),
    warning: (m, o) => show(m, Object.assign({}, normalize(o), { kind: 'warning' })),
    warn: (m, o) => show(m, Object.assign({}, normalize(o), { kind: 'warning' })),
    dismissAll: () => {
      const r = document.getElementById('jeoToastRoot');
      if (r) Array.from(r.children).forEach(dismiss);
    },
  };
})();
