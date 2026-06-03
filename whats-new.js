/* Jeoweb What's New — patch notes modal triggered by version change.
 * Reads version from games_catalog.json (or a dedicated version.json)
 * and shows a "What's New" modal when the version increases.
 * Exposes: window.JeoWhatsNew */
(function () {
	'use strict';
	if (window.JeoWhatsNew) return;

	const STORAGE_KEY = 'jeo-whats-new-version';
	const CURRENT_VERSION = '2.5.0'; // bump this with each release

	const CHANGELOG = [
		{
			version: '2.5.0',
			date: '2026-06-03',
			title: '🚀 Platform Overhaul',
			items: [
				'✨ New immersive dashboard UI with smooth animations',
				'🎰 Enhanced Game Roulette with flashy spin animation',
				'🔗 Share Session — send your favorites to friends',
				'💾 IndexedDB profile system — your data persists forever',
				'⚡ Lazy-loaded images for instant page loads',
				'🦴 Skeleton loading placeholders — no more layout shifts',
				'🛡️ about:blank spawner for stealth gaming',
				'🔄 CORS proxy router for unblockable access',
				'🤖 Automated weekly game health checks',
				'📦 Image optimization pipeline (WebP)',
			]
		},
		{
			version: '2.4.0',
			date: '2026-05-15',
			title: '🎮 Collections & Saves',
			items: [
				'📚 Custom game collections',
				'💾 Auto-save system with IndexedDB backup',
				'🏆 Global leaderboards',
				'🎯 Daily challenges',
			]
		},
		{
			version: '2.3.0',
			date: '2026-04-20',
			title: '🎨 Look Profiles',
			items: [
				'🌫 Glass blur effects (Premium FX)',
				'🎛 Per-effect animation toggles',
				'🌈 Gradient accent mode',
				'📐 Square / Rounded / Pill card shapes',
			]
		}
	];

	let modal = null;

	function buildModal() {
		if (modal) return;

		modal = document.createElement('div');
		modal.id = 'jeoWhatsNewModal';
		modal.className = 'jeo-wn-overlay';
		modal.innerHTML = `
			<div class="jeo-wn-card">
				<div class="jeo-wn-header">
					<div class="jeo-wn-sparkle">✨</div>
					<h2 class="jeo-wn-title">What's New</h2>
					<button class="jeo-wn-close" aria-label="Close" type="button">✕</button>
				</div>
				<div class="jeo-wn-body" id="jeoWnBody"></div>
				<div class="jeo-wn-footer">
					<button class="jeo-wn-dismiss" type="button">Got it!</button>
				</div>
			</div>
		`;

		// Inject styles
		const style = document.createElement('style');
		style.textContent = `
			.jeo-wn-overlay {
				position: fixed; inset: 0;
				background: rgba(0,0,0,0.7);
				backdrop-filter: blur(8px);
				-webkit-backdrop-filter: blur(8px);
				z-index: 200000;
				display: flex; align-items: center; justify-content: center;
				opacity: 0;
				transition: opacity 0.3s ease;
				pointer-events: none;
			}
			.jeo-wn-overlay.show {
				opacity: 1;
				pointer-events: auto;
			}
			.jeo-wn-card {
				background: var(--bg-1, #1a1730);
				border: 1px solid var(--line-0, rgba(255,255,255,0.1));
				border-radius: var(--radius-xl, 20px);
				box-shadow: var(--shadow-4, 0 24px 64px rgba(0,0,0,0.55));
				max-width: 520px;
				width: 90vw;
				max-height: 80vh;
				overflow: hidden;
				transform: translateY(30px) scale(0.95);
				transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
			}
			.jeo-wn-overlay.show .jeo-wn-card {
				transform: translateY(0) scale(1);
			}
			.jeo-wn-header {
				display: flex;
				align-items: center;
				gap: 12px;
				padding: 20px 24px 16px;
				border-bottom: 1px solid var(--line-0, rgba(255,255,255,0.08));
			}
			.jeo-wn-sparkle {
				font-size: 28px;
				animation: jeoWnPulse 2s ease-in-out infinite;
			}
			@keyframes jeoWnPulse {
				0%, 100% { transform: scale(1); }
				50% { transform: scale(1.2) rotate(10deg); }
			}
			.jeo-wn-title {
				flex: 1;
				font-family: var(--font-display, system-ui);
				font-size: 1.5rem;
				font-weight: 700;
				color: var(--fg-0, #fff);
				margin: 0;
			}
			.jeo-wn-close {
				background: none; border: none;
				color: var(--fg-2, #888);
				font-size: 20px;
				cursor: pointer;
				padding: 4px 8px;
				border-radius: 8px;
				transition: background 0.2s;
			}
			.jeo-wn-close:hover { background: rgba(255,255,255,0.1); }
			.jeo-wn-body {
				padding: 20px 24px;
				overflow-y: auto;
				max-height: 50vh;
			}
			.jeo-wn-version {
				margin-bottom: 24px;
			}
			.jeo-wn-version:last-child { margin-bottom: 0; }
			.jeo-wn-version-header {
				display: flex;
				align-items: center;
				gap: 12px;
				margin-bottom: 12px;
			}
			.jeo-wn-badge {
				background: linear-gradient(135deg, var(--brand-500, #7c3aed), var(--brand-600, #6826d4));
				color: #fff;
				font-size: 0.75rem;
				font-weight: 700;
				padding: 3px 10px;
				border-radius: var(--radius-pill, 999px);
				letter-spacing: 0.04em;
			}
			.jeo-wn-version-title {
				font-family: var(--font-display, system-ui);
				font-size: 1.1rem;
				font-weight: 600;
				color: var(--fg-0, #fff);
				margin: 0;
			}
			.jeo-wn-date {
				font-size: 0.75rem;
				color: var(--fg-2, #888);
				margin-left: auto;
			}
			.jeo-wn-list {
				list-style: none;
				padding: 0;
				margin: 0;
			}
			.jeo-wn-list li {
				padding: 8px 0;
				font-size: 0.9rem;
				color: var(--fg-1, #ccc);
				border-bottom: 1px solid rgba(255,255,255,0.04);
				transition: transform 0.2s ease;
			}
			.jeo-wn-list li:last-child { border-bottom: none; }
			.jeo-wn-list li:hover { transform: translateX(4px); }
			.jeo-wn-footer {
				padding: 16px 24px;
				border-top: 1px solid var(--line-0, rgba(255,255,255,0.08));
				display: flex;
				justify-content: flex-end;
			}
			.jeo-wn-dismiss {
				background: linear-gradient(135deg, var(--brand-500, #7c3aed), var(--brand-600, #6826d4));
				color: #fff;
				border: none;
				padding: 10px 28px;
				border-radius: var(--radius-pill, 999px);
				font-size: 0.95rem;
				font-weight: 600;
				cursor: pointer;
				transition: transform 0.2s, box-shadow 0.2s;
			}
			.jeo-wn-dismiss:hover {
				transform: translateY(-1px);
				box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
			}
			@media (prefers-reduced-motion: reduce) {
				.jeo-wn-card { transition: none; }
				.jeo-wn-sparkle { animation: none; }
				.jeo-wn-list li:hover { transform: none; }
			}
		`;
		document.head.appendChild(style);
		document.body.appendChild(modal);

		// Populate body
		const body = modal.querySelector('#jeoWnBody');
		body.innerHTML = CHANGELOG.map((release, i) => `
			<div class="jeo-wn-version" style="animation: fadeIn 0.3s ease ${i * 0.1}s both;">
				<div class="jeo-wn-version-header">
					<span class="jeo-wn-badge">v${escapeHtml(release.version)}</span>
					<h3 class="jeo-wn-version-title">${escapeHtml(release.title)}</h3>
					<span class="jeo-wn-date">${escapeHtml(release.date)}</span>
				</div>
				<ul class="jeo-wn-list">
					${release.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
				</ul>
			</div>
		`).join('');

		// Events
		modal.querySelector('.jeo-wn-close').addEventListener('click', close);
		modal.querySelector('.jeo-wn-dismiss').addEventListener('click', close);
		modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
	}

	function open() {
		buildModal();
		requestAnimationFrame(() => {
			modal.classList.add('show');
		});
	}

	function close() {
		if (modal) modal.classList.remove('show');
		try { localStorage.setItem(STORAGE_KEY, CURRENT_VERSION); } catch {}
	}

	function checkAndShow() {
		try {
			const seen = localStorage.getItem(STORAGE_KEY);
			if (seen !== CURRENT_VERSION) {
				// Wait a bit for the page to settle
				setTimeout(open, 2000);
			}
		} catch {}
	}

	function escapeHtml(s) {
		return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
	}

	document.addEventListener('DOMContentLoaded', checkAndShow);

	window.JeoWhatsNew = { open, close, CURRENT_VERSION };
})();
