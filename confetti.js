/* Jeoweb confetti — small canvas burst, no library, accent-colored. */
(function () {
  if (window.JeoConfetti) return;

  function burst(opts = {}) {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:99999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#7c3aed';
    const palette = [accent, '#22d3ee', '#a3ff77', '#ff77e9', '#ffd54a', '#ffffff'];
    const count = opts.count || 80;
    const cx = (opts.x ?? window.innerWidth / 2);
    const cy = (opts.y ?? window.innerHeight * 0.35);
    const parts = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 8;
      parts.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: 4 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: palette[Math.floor(Math.random() * palette.length)],
        life: 60 + Math.random() * 40,
      });
    }

    let frames = 0;
    function tick() {
      frames++;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      let alive = 0;
      for (const p of parts) {
        if (p.life-- <= 0) continue;
        alive++;
        p.vy += 0.25; // gravity
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life / 80);
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      if (alive > 0 && frames < 200) requestAnimationFrame(tick);
      else canvas.remove();
    }
    requestAnimationFrame(tick);
  }

  window.JeoConfetti = { burst };
})();
