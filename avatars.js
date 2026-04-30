/* Jeoweb procedural avatars — deterministic SVG from hash(name). */
(function () {
  if (window.JeoAvatars) return;

  const PALETTES = [
    ['#7c3aed','#22d3ee'],
    ['#f9a8d4','#f59e0b'],
    ['#3fa67a','#a3ff77'],
    ['#ff77e9','#7c87ff'],
    ['#22c55e','#0ea5e9'],
    ['#ef4444','#f59e0b'],
    ['#06b6d4','#8b5cf6'],
    ['#ec4899','#f43f5e'],
  ];
  const SHAPES = ['waves','dots','chevrons','blob','grid'];

  function hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return h >>> 0;
  }

  function svg(name, size = 64) {
    const h = hash(String(name || 'guest'));
    const pal = PALETTES[h % PALETTES.length];
    const shape = SHAPES[(h >>> 8) % SHAPES.length];
    const initial = (String(name || '?').trim()[0] || '?').toUpperCase();
    const id = 'av-' + (h.toString(36));
    let bg;
    if (shape === 'waves')
      bg = `<path d="M0 ${size*0.6} Q${size*0.25} ${size*0.4} ${size*0.5} ${size*0.6} T${size} ${size*0.6} V${size} H0 Z" fill="${pal[1]}" opacity="0.5"/>`;
    else if (shape === 'dots')
      bg = Array.from({length: 6}, (_, i) => `<circle cx="${(h>>>(i*4))%size}" cy="${(h>>>(i*4+2))%size}" r="${4 + (i%3)}" fill="${pal[1]}" opacity="0.45"/>`).join('');
    else if (shape === 'chevrons')
      bg = `<path d="M0 ${size*0.7} L${size*0.5} ${size*0.4} L${size} ${size*0.7} L${size} ${size} L0 ${size} Z" fill="${pal[1]}" opacity="0.5"/>`;
    else if (shape === 'blob')
      bg = `<path d="M${size*0.2} ${size*0.5} Q${size*0.3} ${size*0.2} ${size*0.6} ${size*0.3} Q${size*0.9} ${size*0.5} ${size*0.7} ${size*0.8} Q${size*0.4} ${size*1.0} ${size*0.2} ${size*0.5} Z" fill="${pal[1]}" opacity="0.55"/>`;
    else
      bg = Array.from({length: 4}, (_, i) => `<rect x="${i * (size/4)}" y="${size*0.6}" width="${size/4 - 2}" height="${size*0.4}" fill="${pal[1]}" opacity="${0.3 + (i*0.1)}"/>`).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${pal[0]}"/><stop offset="100%" stop-color="${pal[1]}"/>
      </linearGradient></defs>
      <rect width="${size}" height="${size}" fill="url(#${id})"/>
      ${bg}
      <text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle"
            font-family="system-ui, -apple-system, Segoe UI, sans-serif"
            font-size="${size * 0.45}" font-weight="700" fill="#fff"
            style="paint-order: stroke; stroke: rgba(0,0,0,0.25); stroke-width: 1px;">${initial}</text>
    </svg>`;
  }

  function dataUrl(name, size = 64) {
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg(name, size))));
  }

  window.JeoAvatars = { svg, dataUrl, hash };
})();
