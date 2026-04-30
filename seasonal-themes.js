/* Jeoweb seasonal theme suggestions — non-intrusive toast nudge once per session. */
(function () {
  if (window.JeoSeasonal) return;
  if (sessionStorage.getItem('jeo:seasonal-shown')) return;

  const now = new Date();
  const m = now.getMonth() + 1; // 1-12
  const d = now.getDate();
  let suggestion = null;
  if (m === 10 && d >= 25) suggestion = { preset: 'cyberpunk', label: '🎃 Spooky', emoji: '🎃' };
  else if (m === 12 && d >= 18) suggestion = { preset: 'crt', label: '❄️ Frost', emoji: '❄️' };
  else if (m === 6) suggestion = { preset: 'holo', label: '🌈 Pride', emoji: '🌈' };
  else if (m === 2 && d === 14) suggestion = { preset: 'pastel', label: '💝 Sweet', emoji: '💝' };

  if (!suggestion) return;
  if (localStorage.getItem('jeo:seasonal-dismissed-' + suggestion.preset)) return;

  // Wait for app + toasts to be ready
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (!window.JeoToast) return;
      sessionStorage.setItem('jeo:seasonal-shown', '1');
      const t = window.JeoToast.show(`${suggestion.emoji} ${suggestion.label} theme available — try it?`, { ttl: 0 });
      if (!t) return;
      const apply = document.createElement('button');
      apply.textContent = 'Apply';
      apply.style.cssText = 'background:var(--accent);color:#fff;border:0;border-radius:6px;padding:4px 10px;font-size:12px;cursor:pointer;margin-left:8px';
      apply.addEventListener('click', () => {
        document.querySelector('.theme-preset-btn[data-preset="' + suggestion.preset + '"]')?.click();
        t.remove();
      });
      const dismiss = document.createElement('button');
      dismiss.textContent = 'Not now';
      dismiss.style.cssText = 'background:transparent;color:var(--muted);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:12px;cursor:pointer;margin-left:6px';
      dismiss.addEventListener('click', () => {
        localStorage.setItem('jeo:seasonal-dismissed-' + suggestion.preset, '1');
        t.remove();
      });
      t.querySelector('.jt-msg').appendChild(apply);
      t.querySelector('.jt-msg').appendChild(dismiss);
    }, 2500);
  });

  window.JeoSeasonal = { suggestion };
})();
