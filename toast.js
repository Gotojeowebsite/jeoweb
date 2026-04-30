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
  function show(msg, opts = {}) {
    const kind = opts.kind || 'info';
    const ttl = opts.ttl ?? 3500;
    const el = document.createElement('div');
    el.className = 'jeo-toast ' + kind;
    el.innerHTML = '<span class="jt-msg"></span><button class="jt-x" aria-label="Dismiss">✕</button>';
    el.querySelector('.jt-msg').textContent = String(msg);
    el.querySelector('.jt-x').addEventListener('click', () => dismiss(el));
    root().appendChild(el);
    if (ttl > 0) setTimeout(() => dismiss(el), ttl);
    return el;
  }
  window.JeoToast = {
    show,
    info: (m, o) => show(m, { ...o, kind: 'info' }),
    success: (m, o) => show(m, { ...o, kind: 'success' }),
    error: (m, o) => show(m, { ...o, kind: 'error', ttl: 5500 }),
    warning: (m, o) => show(m, { ...o, kind: 'warning' }),
  };
})();
