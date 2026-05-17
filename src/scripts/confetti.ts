/**
 * Tiny canvas confetti — no lib. Spawns particles from a viewport point,
 * gives each a gravity-pulled trajectory + spin, cleans the canvas after
 * the longest particle has fallen out of frame.
 */

export interface ConfettiOpts {
	x?: number;          // viewport px; default: center
	y?: number;
	count?: number;
	colors?: string[];
	spread?: number;     // degrees of fan
	power?: number;      // initial velocity multiplier
	gravity?: number;
}

const DEFAULT_COLORS = ['#7c3aed', '#ec4899', '#14b8a6', '#f5b54a', '#38bdf8', '#ef4444'];

interface Particle {
	x: number; y: number;
	vx: number; vy: number;
	rot: number; vr: number;
	size: number;
	color: string;
	life: number;
}

function isReducedMotion(): boolean {
	return typeof matchMedia !== 'undefined'
		&& matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let activeCanvas: HTMLCanvasElement | null = null;
let particles: Particle[] = [];
let rafId = 0;

function ensureCanvas(): HTMLCanvasElement {
	if (activeCanvas) return activeCanvas;
	const c = document.createElement('canvas');
	c.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;width:100vw;height:100vh;';
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	document.body.appendChild(c);
	activeCanvas = c;
	const resize = () => {
		if (!activeCanvas) return;
		activeCanvas.width = window.innerWidth;
		activeCanvas.height = window.innerHeight;
	};
	window.addEventListener('resize', resize, { passive: true });
	return c;
}

function tick() {
	const canvas = activeCanvas;
	if (!canvas) return;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (const p of particles) {
		p.x += p.vx;
		p.y += p.vy;
		p.vy += 0.18;
		p.vx *= 0.995;
		p.rot += p.vr;
		p.life -= 1;
		ctx.save();
		ctx.translate(p.x, p.y);
		ctx.rotate(p.rot);
		ctx.fillStyle = p.color;
		ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.4);
		ctx.restore();
	}
	particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 40);
	if (particles.length === 0) {
		canvas.remove();
		activeCanvas = null;
		rafId = 0;
		return;
	}
	rafId = requestAnimationFrame(tick);
}

export function confetti(opts: ConfettiOpts = {}) {
	if (isReducedMotion()) return;
	const x = opts.x ?? window.innerWidth / 2;
	const y = opts.y ?? window.innerHeight / 3;
	const n = opts.count ?? 64;
	const colors = opts.colors ?? DEFAULT_COLORS;
	const spread = opts.spread ?? 75;
	const power = opts.power ?? 9;
	ensureCanvas();
	for (let i = 0; i < n; i++) {
		const angle = (-90 + (Math.random() - 0.5) * spread) * Math.PI / 180;
		const v = power * (0.65 + Math.random() * 0.6);
		particles.push({
			x, y,
			vx: Math.cos(angle) * v,
			vy: Math.sin(angle) * v,
			rot: Math.random() * Math.PI * 2,
			vr: (Math.random() - 0.5) * 0.4,
			size: 6 + Math.random() * 6,
			color: colors[(Math.random() * colors.length) | 0],
			life: 120 + Math.random() * 60,
		});
	}
	if (!rafId) rafId = requestAnimationFrame(tick);
}
