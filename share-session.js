/* Jeoweb Share Session — generates and parses shareable links with encoded state.
 * Encodes: current favorites, selected game, theme, accent color.
 * Exposes: window.JeoShare */
(function () {
	'use strict';
	if (window.JeoShare) return;

	const PREFIX = 'jeo';

	/* ─── Encode/Decode helpers ─── */

	function encodeState(state) {
		try {
			const json = JSON.stringify(state);
			return btoa(unescape(encodeURIComponent(json)))
				.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
		} catch { return ''; }
	}

	function decodeState(encoded) {
		try {
			const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
			const pad = base64.length % 4;
			const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
			return JSON.parse(decodeURIComponent(escape(atob(padded))));
		} catch { return null; }
	}

	/* ─── Generate share URL ─── */

	function generateShareUrl(options) {
		options = options || {};
		const state = {};

		// Current game
		if (options.game) {
			state.g = options.game;
		}

		// Top favorites (max 10)
		if (options.favorites) {
			state.f = options.favorites.slice(0, 10);
		}

		// Theme & accent
		if (options.theme) state.t = options.theme;
		if (options.accent) state.a = options.accent;

		// Custom message
		if (options.message) state.m = options.message.substring(0, 100);

		const encoded = encodeState(state);
		if (!encoded) return null;

		const url = new URL(window.location.href);
		url.search = '';
		url.hash = '';
		url.searchParams.set(PREFIX, encoded);

		return url.toString();
	}

	/* ─── Share actions ─── */

	function shareCurrentGame() {
		const app = window.app;
		if (!app) return null;

		const currentGame = app.currentPlayingGame || null;
		const favorites = (app.favorites || []).slice(0, 10);
		const theme = document.documentElement.getAttribute('data-theme') || 'dark';
		const accent = getComputedStyle(document.documentElement).getPropertyValue('--brand-500').trim();

		const url = generateShareUrl({
			game: currentGame ? currentGame.name : undefined,
			favorites: favorites.length > 0 ? favorites : undefined,
			theme,
			accent: accent !== '#7c3aed' ? accent : undefined,
		});

		return url;
	}

	async function copyShareLink(options) {
		const url = options?.url || shareCurrentGame();
		if (!url) {
			if (window.JeoToast) window.JeoToast.warning('Nothing to share yet — play a game first!');
			return false;
		}

		try {
			if (navigator.share) {
				await navigator.share({
					title: 'Check out Jeo!',
					text: 'Play these awesome games on Jeo:',
					url: url
				});
				return true;
			}

			await navigator.clipboard.writeText(url);
			if (window.JeoToast) window.JeoToast.success('Share link copied to clipboard! 🔗');
			return true;
		} catch {
			// Fallback: select + copy
			const input = document.createElement('input');
			input.value = url;
			document.body.appendChild(input);
			input.select();
			try { document.execCommand('copy'); } catch {}
			document.body.removeChild(input);
			if (window.JeoToast) window.JeoToast.success('Share link copied! 🔗');
			return true;
		}
	}

	/* ─── Parse incoming share URL ─── */

	function parseShareFromUrl() {
		try {
			const params = new URLSearchParams(window.location.search);
			const encoded = params.get(PREFIX);
			if (!encoded) return null;

			const state = decodeState(encoded);
			if (!state) return null;

			return {
				game: state.g || null,
				favorites: state.f || [],
				theme: state.t || null,
				accent: state.a || null,
				message: state.m || null,
			};
		} catch { return null; }
	}

	function applySharedState() {
		const shared = parseShareFromUrl();
		if (!shared) return false;

		// Apply theme
		if (shared.theme) {
			document.documentElement.setAttribute('data-theme', shared.theme);
			document.body.classList.remove('theme-dark', 'theme-light');
			document.body.classList.add('theme-' + shared.theme);
		}

		// Apply accent
		if (shared.accent) {
			document.documentElement.style.setProperty('--brand-500', shared.accent);
			document.documentElement.style.setProperty('--accent', shared.accent);
		}

		// Show message
		if (shared.message && window.JeoToast) {
			setTimeout(() => window.JeoToast.info('💌 ' + shared.message), 1500);
		}

		// Auto-play shared game
		if (shared.game) {
			const waitForApp = setInterval(() => {
				if (window.app && window.app.games && window.app.games.length) {
					clearInterval(waitForApp);
					const game = window.app.games.find(g => g.name === shared.game);
					if (game && window.app.playGame) {
						setTimeout(() => window.app.playGame(game), 500);
					}
				}
			}, 200);
			setTimeout(() => clearInterval(waitForApp), 10000);
		}

		// Import shared favorites
		if (shared.favorites && shared.favorites.length && window.app) {
			const waitForApp2 = setInterval(() => {
				if (window.app && window.app.favorites) {
					clearInterval(waitForApp2);
					const existing = new Set(window.app.favorites);
					let added = 0;
					shared.favorites.forEach(slug => {
						if (!existing.has(slug)) {
							window.app.favorites.push(slug);
							added++;
						}
					});
					if (added > 0) {
						try { localStorage.setItem('jeo-favorites', JSON.stringify(window.app.favorites)); } catch {}
						if (window.JeoToast) window.JeoToast.success(`Added ${added} shared favorites! ❤️`);
					}
				}
			}, 200);
			setTimeout(() => clearInterval(waitForApp2), 10000);
		}

		// Clean URL (remove the share param)
		try {
			const url = new URL(window.location.href);
			url.searchParams.delete(PREFIX);
			window.history.replaceState({}, '', url.toString());
		} catch {}

		return true;
	}

	/* ─── Build Share UI ─── */

	function buildShareModal() {
		const url = shareCurrentGame() || window.location.href;

		const overlay = document.createElement('div');
		overlay.id = 'jeoShareModal';
		overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:200001;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s ease';

		overlay.innerHTML = `
			<div style="background:var(--bg-1,#1a1730);border:1px solid var(--line-0,rgba(255,255,255,0.1));border-radius:var(--radius-xl,20px);box-shadow:var(--shadow-4);max-width:480px;width:90vw;padding:28px;animation:slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)">
				<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
					<h2 style="font-family:var(--font-display,system-ui);font-size:1.4rem;font-weight:700;color:var(--fg-0,#fff);margin:0">🔗 Share Session</h2>
					<button class="jeo-share-close" style="background:none;border:none;color:var(--fg-2,#888);font-size:20px;cursor:pointer;padding:4px 8px;border-radius:8px" aria-label="Close">✕</button>
				</div>
				<p style="color:var(--fg-2,#aaa);font-size:0.85rem;margin-bottom:16px">Share your game setup, favorites, and theme with a friend. They'll see exactly what you see.</p>
				<div style="display:flex;gap:8px;margin-bottom:16px">
					<input class="jeo-share-url" style="flex:1;background:var(--bg-0,#0c0b14);border:1px solid var(--line-0,rgba(255,255,255,0.1));border-radius:12px;padding:12px 16px;color:var(--fg-0,#fff);font-size:0.85rem;font-family:var(--font-mono,monospace);outline:none" value="${escapeAttr(url)}" readonly />
					<button class="jeo-share-copy" style="background:linear-gradient(135deg,var(--brand-500,#7c3aed),var(--brand-600,#6826d4));color:#fff;border:none;padding:12px 20px;border-radius:12px;font-weight:600;cursor:pointer;transition:transform 0.2s;white-space:nowrap">📋 Copy</button>
				</div>
				<div style="display:flex;gap:8px">
					<button class="jeo-share-native" style="flex:1;background:rgba(255,255,255,0.06);border:1px solid var(--line-0,rgba(255,255,255,0.1));border-radius:12px;padding:10px;color:var(--fg-0,#fff);cursor:pointer;font-size:0.85rem;transition:background 0.2s">📤 Share via…</button>
					<button class="jeo-share-qr" style="flex:1;background:rgba(255,255,255,0.06);border:1px solid var(--line-0,rgba(255,255,255,0.1));border-radius:12px;padding:10px;color:var(--fg-0,#fff);cursor:pointer;font-size:0.85rem;transition:background 0.2s">📱 QR Code</button>
				</div>
			</div>
		`;

		document.body.appendChild(overlay);

		// Events
		const closeModal = () => overlay.remove();
		overlay.querySelector('.jeo-share-close').addEventListener('click', closeModal);
		overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

		overlay.querySelector('.jeo-share-copy').addEventListener('click', async () => {
			try {
				await navigator.clipboard.writeText(url);
				const btn = overlay.querySelector('.jeo-share-copy');
				btn.textContent = '✅ Copied!';
				setTimeout(() => btn.textContent = '📋 Copy', 2000);
			} catch {
				overlay.querySelector('.jeo-share-url').select();
				try { document.execCommand('copy'); } catch {}
			}
		});

		overlay.querySelector('.jeo-share-native').addEventListener('click', async () => {
			if (navigator.share) {
				try {
					await navigator.share({ title: 'Check out Jeo!', url });
				} catch {}
			} else {
				if (window.JeoToast) window.JeoToast.info('Use the copy button to share the link');
			}
		});

		overlay.querySelector('.jeo-share-qr').addEventListener('click', () => {
			// Simple QR code using a public API
			const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&bgcolor=1a1730&color=7c3aed`;
			const qrDiv = overlay.querySelector('.jeo-share-qr');
			if (qrDiv.dataset.open) return;
			qrDiv.dataset.open = '1';
			const img = document.createElement('img');
			img.src = qrUrl;
			img.alt = 'QR Code';
			img.style.cssText = 'display:block;margin:16px auto 0;border-radius:12px;border:2px solid var(--line-0,rgba(255,255,255,0.1))';
			qrDiv.closest('div').appendChild(img);
		});
	}

	function escapeAttr(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

	// Auto-apply shared state on load
	document.addEventListener('DOMContentLoaded', () => {
		applySharedState();
	});

	window.JeoShare = {
		generateShareUrl,
		shareCurrentGame,
		copyShareLink,
		parseShareFromUrl,
		applySharedState,
		buildShareModal,
	};
})();
