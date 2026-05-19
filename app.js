class App {
	constructor() {
		this.games = [];
		this.fallbackImage = 'notavailable.svg';
		this.favorites = JSON.parse(localStorage.getItem('jeo-favorites') || '[]');
		this.recentlyPlayed = JSON.parse(localStorage.getItem('jeo-recent') || '[]');
		this.MAX_RECENT = 20;

		this.showFlash = localStorage.getItem('jeo-show-flash') !== 'false';
		this.showRetro = localStorage.getItem('jeo-show-retro') !== 'false';
		// Hide-maintenance defaults ON the first visit so users don't land on broken games.
		this.hideMaintenance = localStorage.getItem('jeo-hide-maintenance') !== 'false';
		this.offlineBlockedNames = new Set();
		this.statusFreshness = { generatedAt: null, source: '', maxAgeDays: 7, isStale: false, unknownCount: 0 };
		this.gameHealth = new Map();

		this.initElements();
		this.initRatingsSync();
		this.loadTheme();
		this.loadAccent();
		this.loadBackground();
		this.loadCustomizations();
		this.initCloaker();
		this.initFlashToggle();
		this.initRetroToggle();
		this.initMaintenanceToggle();
		this.initAnimations();
		this.initPremiumFx();
		this.bindUI();
		this.initProgressTracking();
		this.bootstrap();
	}

	initProgressTracking() {
		this.currentLoadingGame = null;
		this.loadedBytes = new Map();
		this.totalGameSize = 0;
		this.gameReadyReceived = false;

		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.addEventListener('message', (event) => {
				if (event.data.type === 'PROGRESS_UPDATE') {
					this.handleProgressUpdate(event.data);
				}
			});
		}

		window.addEventListener('message', (event) => {
			const data = event.data;
			if (!data || typeof data !== 'object') return;
			if (data.type === 'GAME_READY') {
				this.gameReadyReceived = true;
				if (this.hideOverlayFn) this.hideOverlayFn();
			} else if (data.type === 'jeo-score') {
				this.handleGameScoreMessage(event);
			}
		});
	}

	formatVerifiedAgo(ts) {
		if (!ts || typeof ts !== 'number') return '';
		const ageSec = Math.floor(Date.now() / 1000) - ts;
		if (ageSec < 0) return 'just now';
		if (ageSec < 90) return 'just now';
		if (ageSec < 3600) return Math.round(ageSec / 60) + 'm ago';
		if (ageSec < 86400) return Math.round(ageSec / 3600) + 'h ago';
		const d = Math.round(ageSec / 86400);
		if (d <= 60) return d + 'd ago';
		return Math.round(d / 30) + 'mo ago';
	}

	handleProgressUpdate(data) {
		if (!this.currentLoadingGame) return;
		
		const { url, loaded, total, isDone } = data;
		// Check if URL belongs to the current game folder
		// We use the slug/name to identify if this asset belongs to the game
		if (url.includes(`/Assets/${this.currentLoadingGame.name}/`)) {
			this.loadedBytes.set(url, loaded);
			this.updateRealProgress();
		}
	}

	updateRealProgress() {
		const progressBar = document.getElementById('loadingProgressBar');
		const rotatingTip = document.getElementById('rotatingTip');
		if (!progressBar || !this.currentLoadingGame) return;

		let currentTotalLoaded = 0;
		this.loadedBytes.forEach(bytes => currentTotalLoaded += bytes);
		
		const totalSize = this.currentLoadingGame.size || 0;
		if (totalSize > 0) {
			let progress = (currentTotalLoaded / totalSize) * 100;
			// Keep it within 10-95% range while loading assets to keep the fake/real transition smooth
			// and ensure the final 100% comes from the iframe onload.
			let displayProgress = 10 + (progress * 0.85); 
			if (displayProgress > 95) displayProgress = 95;
			
			progressBar.style.width = `${displayProgress}%`;
			
			if (rotatingTip) {
				const loadedMb = (currentTotalLoaded / (1024 * 1024)).toFixed(1);
				const totalMb = (totalSize / (1024 * 1024)).toFixed(1);
				rotatingTip.textContent = `Downloading assets: ${loadedMb} / ${totalMb} MB (${Math.round(progress)}%)`;
				rotatingTip.style.opacity = 1;
			}
		}
	}

	loadCustomizations() {
		// Layout
		const layout = localStorage.getItem('jeo-layout') || 'normal';
		if (layout === 'compact') document.body.classList.add('layout-compact');

		// Radius
		const radius = localStorage.getItem('jeo-radius') || 'rounded';
		document.body.classList.add(`radius-${radius}`);

		// Animations
		this.animHover = localStorage.getItem('jeo-anim-hover') !== 'false';
		this.animRipple = localStorage.getItem('jeo-anim-ripple') !== 'false';
		if (!this.animHover) document.body.classList.add('no-anim-hover');

		// Premium FX — master toggle for glass blur, 3D tilt, animated hero,
		// waterfall stagger. Off by default so scroll stays at 60fps; users
		// flip it on from Settings → Animations & Effects.
		this.premiumFx = localStorage.getItem('jeo-fx-premium') === 'true';
		// The inline pre-paint script in <head> already applied data-fx before
		// the stylesheet parsed, but mirror it here for safety.
		if (this.premiumFx) document.documentElement.setAttribute('data-fx', 'premium');
		else document.documentElement.removeAttribute('data-fx');
	}

	initAnimations() {
		// Respect prefers-reduced-motion for tilt
		const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		// 3D Parallax Hover for cards — only when Premium FX is on. The default
		// path returns at the first guard so cost is one property read per move.
		let tiltRAF = 0;
		document.addEventListener('mousemove', (e) => {
			if (!this.premiumFx || !this.animHover || reduceMotion) return;
			const card = e.target.closest('.game-card, .carousel-card');
			if (!card) return;
			// rAF-throttle to one update per frame; cache rect on the card so we
			// don't trigger layout reads on every mousemove.
			if (tiltRAF) return;
			tiltRAF = requestAnimationFrame(() => {
				tiltRAF = 0;
				const rect = card._tiltRect || (card._tiltRect = card.getBoundingClientRect());
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
				const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
				card.style.transform = `perspective(1000px) scale(var(--fx-tilt-scale)) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
				card.style.transition = 'none';
			});
		}, { passive: true });

		// Invalidate the cached rect when the user leaves a card.
		document.addEventListener('mouseout', (e) => {
			const card = e.target.closest('.game-card, .carousel-card');
			if (!card) return;
			if (!card.contains(e.relatedTarget)) {
				card._tiltRect = null;
				card.style.transform = '';
				card.style.transition = '';
			}
		}, { passive: true });

		// Ripple Click Effect — gated to Premium FX so default mode skips it
		// entirely. The CSS rule `button, .header-nav-link { position: relative;
		// overflow: hidden; }` removes the need for the old sync getComputedStyle.
		document.addEventListener('click', (e) => {
			if (!this.premiumFx || !this.animRipple) return;
			const btn = e.target.closest('button, .header-nav-link');
			if (!btn || btn.classList.contains('color-wheel-input')) return;

			const rect = btn.getBoundingClientRect();
			const diameter = Math.max(rect.width, rect.height);
			const radius = diameter / 2;
			const ripple = document.createElement('span');
			ripple.style.width = ripple.style.height = `${diameter}px`;
			ripple.style.left = `${e.clientX - rect.left - radius}px`;
			ripple.style.top = `${e.clientY - rect.top - radius}px`;
			ripple.className = 'ripple';
			btn.appendChild(ripple);
			setTimeout(() => ripple.remove(), 600);
		}, { passive: true });
	}

	// Wire up the Premium FX toggle in the settings modal and pause the hero
	// aurora animation when the hero is off-screen.
	initPremiumFx() {
		const toggle = document.getElementById('premiumFxToggle');
		if (toggle) {
			toggle.checked = this.premiumFx;
			toggle.addEventListener('change', () => {
				this.premiumFx = !!toggle.checked;
				if (this.premiumFx) document.documentElement.setAttribute('data-fx', 'premium');
				else document.documentElement.removeAttribute('data-fx');
				try { localStorage.setItem('jeo-fx-premium', String(this.premiumFx)); } catch (e) {}
				// Re-apply the glass slider value (it's no-op when FX is off).
				const slider = document.getElementById('glassSlider');
				if (slider) slider.dispatchEvent(new Event('input'));
			});
		}
		// Pause kenBurns / heroAurora when the hero leaves the viewport.
		const hero = document.querySelector('.hero');
		if (hero && 'IntersectionObserver' in window) {
			new IntersectionObserver(([entry]) => {
				hero.classList.toggle('in-view', entry.isIntersecting);
			}, { rootMargin: '0px 0px -10% 0px' }).observe(hero);
			hero.classList.add('in-view');
		}
	}

	async bootstrap() {
		// Show skeletons immediately so the user sees structure during the async fetches.
		this.renderSkeletons();
		await this.loadNewlyAdded();
		await this.reloadGames();
	}

	async loadNewlyAdded() {
		try {
			const res = await fetch('recently_added.json', { cache: 'no-store' });
			if (res.ok) {
				const data = await res.json();
				if (Array.isArray(data)) this.newlyAddedNames = data;
			}
		} catch (e) {
			console.warn('Could not load recently_added.json', e);
		}
	}

	async reloadGames() {
		this.renderSkeletons();
		const allItems = await this.resolveGames();
		this.offlineBlockedNames = new Set();
		// Verdict pipeline: prefer the new game_health.json (single source of truth,
		// freshness-gated, quorum-based). Fall back to legacy files only if it's
		// missing entirely so old deploys keep working.
		const healthByName = await this.resolveGameHealth();
		let legacyMaintenance = new Map();
		let legacyScan = new Map();
		if (!healthByName.size) {
			legacyMaintenance = await this.resolveMaintenanceStatusMap();
			legacyScan = legacyMaintenance.size ? new Map() : await this.resolveScanStatusMap();
		}
		this.games = allItems.map((game) => {
			const currentStatus = this.normalizeScanStatus(game.status);
			const health = healthByName.get(game.name);
			let resolvedStatus = '';
			let healthMeta = null;
			if (health) {
				resolvedStatus = this.normalizeScanStatus(health.status);
				healthMeta = health;
			} else {
				const maintenanceStatus = legacyMaintenance.get(game.name) || '';
				const scannedStatus = legacyScan.get(game.name) || '';
				resolvedStatus = maintenanceStatus || scannedStatus || currentStatus;
			}
			if (!resolvedStatus && !healthMeta) return game;
			return { ...game, status: resolvedStatus, health: healthMeta };
		});
		console.log('Games loaded:', this.games.length);
		if (this.games.length === 0 && !this._degradedNotified) {
			this._degradedNotified = true;
			if (window.JeoToast) window.JeoToast.error(
				'Catalog failed to load. Check your connection and try refreshing.',
				{ ttl: 0, action: { label: 'Reload', onClick: () => window.location.reload() } }
			);
		}
		this.updateCounter();
		this.renderCarousels();
		this.renderGames();
		this.loadPlayCounts();
		this.renderStatusFreshness();
		this.hideLoading();
		// Resolve any pending deep-link request now that the catalog is ready.
		if (typeof this.resolvePendingDeepLink === 'function') this.resolvePendingDeepLink();
	}

	renderSkeletons() {
		if (!this.gameGrid) return;
		const cell = '<div class="skeleton-card"><div class="skeleton-thumb"></div>'
			+ '<div class="skeleton-content"><div class="skeleton-title"></div>'
			+ '<div class="skeleton-btn"></div></div></div>';
		this.gameGrid.innerHTML = cell.repeat(12);
		// Stagger fade-in only for the first row or two; long cascades feel laggy.
		Array.from(this.gameGrid.children).forEach((el, i) => {
			if (i < 12) el.style.animationDelay = (i * 0.04) + 's';
		});
	}

	async resolveGames() {
		try {
			const response = await fetch('games_list.json', { cache: 'no-store' });
			if (response.ok) {
				const data = await response.json();
				if (Array.isArray(data) && data.length > 0) return data;
			}
		} catch (e) {
			console.warn('Could not load games_list.json', e);
		}
		try {
			const apiResponse = await fetch('/api/games', { cache: 'no-store' });
			if (apiResponse.ok) {
				const apiData = await apiResponse.json();
				if (Array.isArray(apiData) && apiData.length > 0) return apiData;
			}
		} catch (e) {
			console.warn('Could not load /api/games', e);
		}
		return [];
	}

	normalizeScanStatus(status) {
		const raw = String(status || '').toLowerCase();
		if (raw === 'broken') return 'broken';
		if (raw === 'under_maintenance' || raw === 'under-maintenance') return 'under_maintenance';
		if (raw === 'unknown' || raw === 'unverified') return 'unverified';
		if (raw === 'healthy' || raw === 'ok') return '';
		return '';
	}

	normalizeGameName(name) {
		return String(name || '').trim().toLowerCase();
	}

	// True for both "broken" and "under_maintenance" — both should be hidden when
	// hideMaintenance is on, and both warrant a "play at your own risk" prompt.
	isUnderMaintenance(game) {
		const s = this.normalizeScanStatus(game && game.status);
		return s === 'broken' || s === 'under_maintenance';
	}

	isUnverified(game) {
		return this.normalizeScanStatus(game && game.status) === 'unverified';
	}

	gameStatusKind(game) {
		// 'broken' | 'maintenance' | 'unverified' | ''
		const s = this.normalizeScanStatus(game && game.status);
		if (s === 'broken') return 'broken';
		if (s === 'under_maintenance') return 'maintenance';
		if (s === 'unverified') return 'unverified';
		return '';
	}

	async resolveGameHealth() {
		// Reads game_health.json (schema 2). Verdicts are accepted only when the
		// file is fresh; if it's older than max_age_days, we fall back to "unverified"
		// so the UI shows a banner instead of silently trusting stale data.
		const byName = new Map();
		try {
			const response = await fetch('game_health.json', { cache: 'no-store' });
			if (!response.ok) {
				console.warn('[health] game_health.json missing — catalog will degrade to legacy status chain');
				return byName;
			}
			const data = await response.json();
			if (!data || typeof data !== 'object' || data.schema !== 2) {
				console.warn('[health] game_health.json has unexpected schema — degrading to legacy chain');
				return byName;
			}
			const generatedAt = Number(data.generated_at) || 0;
			const maxAgeDays = Number(data.max_age_days) || 7;
			const ageMs = Date.now() - generatedAt * 1000;
			const isStale = generatedAt > 0 && ageMs > maxAgeDays * 86400 * 1000;
			if (isStale) {
				const ageDays = Math.round(ageMs / 86400000);
				console.warn(`[health] game_health.json is stale (${ageDays}d old, max=${maxAgeDays}d). Verdicts degrade to "unverified".`);
			}
			this.statusFreshness = {
				generatedAt,
				source: 'game_health.json',
				maxAgeDays,
				isStale,
				unknownCount: (data.counts && Number(data.counts.unknown)) || 0,
			};
			const games = data.games && typeof data.games === 'object' ? data.games : {};
			for (const [name, entry] of Object.entries(games)) {
				if (!name || !entry || typeof entry !== 'object') continue;
				const verdictRaw = String(entry.verdict || '').toLowerCase();
				const confidence = String(entry.confidence || 'low').toLowerCase();
				let status;
				if (isStale) {
					// Stale data: degrade everything to "unverified" except hard overrides.
					if (entry.source === 'override' && verdictRaw === 'broken') status = 'broken';
					else if (entry.source === 'override' && verdictRaw === 'healthy') status = '';
					else status = 'unknown';
				} else if (verdictRaw === 'broken') {
					// Only fully-confirmed broken hides the game.
					status = entry.source === 'override' ? 'under_maintenance' : 'broken';
				} else if (verdictRaw === 'healthy') {
					status = '';
				} else if (verdictRaw === 'probable_broken') {
					// Triple-confirm rule: two fails but no third. Per the plan,
					// the game stays live in the catalog (we'd rather show a
					// maybe-broken game than hide a working one). Internal flag
					// only; the admin "broken games" report includes these.
					status = '';
				} else if (verdictRaw === 'unverified') {
					// Single signal, not enough corroboration. Live; no badge.
					status = '';
				} else {
					status = 'unknown';
				}
				byName.set(name, {
					status,
					verdict: verdictRaw,
					confidence,
					source: String(entry.source || ''),
					reason: String(entry.reason || ''),
				});
			}
			this.gameHealth = byName;
		} catch (e) {
			console.warn('Could not load game_health.json', e);
		}
		return byName;
	}

	async resolveScanStatusMap() {
		const statusByName = new Map();
		try {
			const response = await fetch('scan_results.json', { cache: 'no-store' });
			if (!response.ok) return statusByName;
			const data = await response.json();
			if (!Array.isArray(data)) return statusByName;
			data.forEach((item) => {
				if (!item || typeof item !== 'object') return;
				const name = typeof item.name === 'string' ? item.name : '';
				const normalized = this.normalizeScanStatus(item.status);
				if (name && normalized) statusByName.set(name, normalized);
			});
		} catch (e) {
			console.warn('Could not load scan_results.json', e);
		}
		return statusByName;
	}

	async resolveOfflineBlockedSet() {
		const blocked = new Set();
		try {
			const response = await fetch('offline_broken_games.json', { cache: 'no-store' });
			if (response.ok) {
				const data = await response.json();
				const names = Array.isArray(data)
					? data
					: (data && Array.isArray(data.games) ? data.games : []);
				names.forEach((name) => {
					const normalized = this.normalizeGameName(name);
					if (normalized) blocked.add(normalized);
				});
				return blocked;
			}
		} catch (e) {
			console.warn('Could not load offline_broken_games.json', e);
		}

		try {
			const response = await fetch('offline_broken_games.txt', { cache: 'no-store' });
			if (response.ok) {
				const text = await response.text();
				text
					.split(/\r?\n/)
					.map((line) => this.normalizeGameName(line))
					.filter(Boolean)
					.forEach((name) => blocked.add(name));
			}
		} catch (e) {
			console.warn('Could not load offline_broken_games.txt', e);
		}

		return blocked;
	}

	async resolveMaintenanceStatusMap() {
		const statusByName = new Map();
		try {
			const response = await fetch('maintenance_status.json', { cache: 'no-store' });
			if (!response.ok) return statusByName;
			const data = await response.json();
			const games = data && typeof data === 'object' ? data.games : null;
			if (data && typeof data === 'object' && Number.isFinite(data.generated_at)) {
				this.statusFreshness = { generatedAt: Number(data.generated_at), source: 'maintenance_status.json' };
			}
			if (!games || typeof games !== 'object') return statusByName;
			Object.entries(games).forEach(([name, entry]) => {
				if (!name || !entry || typeof entry !== 'object') return;
				const raw = String(entry.status || '').toLowerCase();
				if (raw === 'under_maintenance' || raw === 'under-maintenance') {
					statusByName.set(name, 'under_maintenance');
				}
			});
		} catch (e) {
			console.warn('Could not load maintenance_status.json', e);
		}
		return statusByName;
	}

	renderStatusFreshness() {
		const el = document.getElementById('statusFreshness');
		if (!el) return;
		const fresh = this.statusFreshness || {};
		const ts = fresh.generatedAt;
		if (!ts) {
			// No verdict file at all — be honest about it instead of going silent.
			el.textContent = '🛈 status: unverified';
			el.setAttribute('data-age-days', '999');
			el.title = 'No game_health.json available — game status is not verified.';
			return;
		}
		const ageMs = Date.now() - ts * 1000;
		const hours = Math.floor(ageMs / 3600000);
		const days = Math.floor(hours / 24);
		let label;
		if (ageMs < 60000) label = 'fresh (<1 min)';
		else if (hours < 1) label = Math.floor(ageMs / 60000) + ' min ago';
		else if (days < 1) label = hours + ' h ago';
		else label = days + ' d ago';
		const stalePrefix = fresh.isStale ? ' (stale)' : '';
		el.textContent = '🛈 status: ' + label + stalePrefix;
		el.setAttribute('data-age-days', String(days));
		el.title = fresh.isStale
			? `Verdicts are older than ${fresh.maxAgeDays} days. Showing games as unverified until a fresh scan runs.`
			: `Verdicts generated ${label}.`;
	}

	initElements() {
		this.searchInput = document.getElementById('searchInput');
		this.gameGrid = document.getElementById('gameGrid');
		this.gameCount = document.getElementById('gameCount');
		this.webglCount = document.getElementById('webglCount');
		this.flashCount = document.getElementById('flashCount');
		this.retroCount = document.getElementById('retroCount');
		this.loadingState = document.getElementById('loadingState');
		this.refreshBtn = document.getElementById('refreshGames');
		this.flashToggle = document.getElementById('flashToggle');
		this.retroToggle = document.getElementById('retroToggle');
		this.themeToggle = document.getElementById('themeToggle');
		this.playModal = document.getElementById('playModal');
		this.gameFrame = document.getElementById('gameFrame');
		this.closeModal = document.getElementById('closeModal');
		this.fullscreenBtn = document.getElementById('fullscreenBtn');
		this.openNewTabBtn = document.getElementById('openNewTabBtn');
		this.currentGameUrl = '';

		// Carousel elements
		this.favoritesSection = document.getElementById('favoritesSection');
		this.favoritesTrack = document.getElementById('favoritesTrack');
		this.favCount = document.getElementById('favCount');
		this.recentSection = document.getElementById('recentSection');
		this.recentTrack = document.getElementById('recentTrack');
		this.recentCount = document.getElementById('recentCount');

		// Newly added elements
		this.newlyAddedSection = document.getElementById('newlyAddedSection');
		this.newlyAddedTrack = document.getElementById('newlyAddedTrack');
		this.newlyAddedCount = document.getElementById('newlyAddedCount');
		this.newlyAddedNames = [];

		// Global "Trending Now" carousel + live presence/playtime/saves chips
		this.globalTrendingSection = document.getElementById('globalTrendingSection');
		this.globalTrendingTrack = document.getElementById('globalTrendingTrack');
		this.globalTrendingCount = document.getElementById('globalTrendingCount');
		this.playerPresence = document.getElementById('playerPresence');
		this.playerPlaytime = document.getElementById('playerPlaytime');
		this.playerSavesBadge = document.getElementById('playerSavesBadge');
	}

	hideLoading() {
		if (this.loadingState) this.loadingState.style.display = 'none';
	}

	animateCounter(el, target) {
		if (!el) return;
		const current = parseInt(el.textContent) || 0;
		if (current === target) return;
		const step = target > current ? 1 : -1;
		const steps = Math.abs(target - current);
		const interval = Math.max(Math.floor(500 / steps), 5);
		let count = current;
		const timer = setInterval(() => {
			count += step;
			el.textContent = count;
			if (count === target) clearInterval(timer);
		}, interval);
	}

	updateCounter() {
		const total = this.games.length;
		const flashGames = this.games.filter(g => g.type === 'flash').length;
		const retroGames = this.games.filter(g => g.type === 'snes').length;
		const webglGames = total - flashGames - retroGames;
		this.animateCounter(this.gameCount, total);
		this.animateCounter(this.webglCount, webglGames);
		this.animateCounter(this.flashCount, flashGames);
		this.animateCounter(this.retroCount, retroGames);
	}

	loadTheme() {
		const saved = localStorage.getItem('site-theme');
		const light = saved === 'light';
		document.body.classList.toggle('theme-light', light);
		document.body.classList.toggle('theme-dark', !light);
		// Mirror onto <html data-theme> so /styles/tokens.css picks the right
		// palette (its [data-theme='dark'] / [data-theme='light'] blocks).
		document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
		if (this.themeToggle) this.themeToggle.textContent = light ? '☀️' : '🌙';
	}

	toggleTheme() {
		const goingLight = !document.body.classList.contains('theme-light');
		document.body.classList.toggle('theme-light', goingLight);
		document.body.classList.toggle('theme-dark', !goingLight);
		document.documentElement.setAttribute('data-theme', goingLight ? 'light' : 'dark');
		localStorage.setItem('site-theme', goingLight ? 'light' : 'dark');
		if (this.themeToggle) this.themeToggle.textContent = goingLight ? '☀️' : '🌙';
		if (window.JeoAnalytics) window.JeoAnalytics.trackThemeToggle(goingLight ? 'light' : 'dark');
	}

	loadAccent() {
		const defaultAccent = '#7c3aed';
		const saved = localStorage.getItem('site-accent');
		const currentAccent = saved || defaultAccent;
		if (saved) this.setAccent(saved, false);

		const accentInput = document.getElementById('accentColorInput');
		const accentValue = document.getElementById('accentColorValue');
		const accentReset = document.getElementById('accentReset');

		if (accentInput) {
			accentInput.value = currentAccent;
			if (accentValue) accentValue.textContent = currentAccent;
			accentInput.addEventListener('input', () => {
				this.setAccent(accentInput.value, true);
				if (accentValue) accentValue.textContent = accentInput.value;
			});
		}
		if (accentReset) {
			accentReset.addEventListener('click', () => {
				this.setAccent(defaultAccent, true);
				if (accentInput) accentInput.value = defaultAccent;
				if (accentValue) accentValue.textContent = defaultAccent;
			});
		}
	}

	setAccent(color, save) {
		document.documentElement.style.setProperty('--accent', color);
		// Simple darken for hover effect.
		try {
			let r = parseInt(color.slice(1, 3), 16),
				g = parseInt(color.slice(3, 5), 16),
				b = parseInt(color.slice(5, 7), 16);
			// Darken by a factor (e.g., 0.8)
			r = Math.floor(r * 0.9);
			g = Math.floor(g * 0.9);
			b = Math.floor(b * 0.9);
			const hoverColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
			document.documentElement.style.setProperty('--accent-hover', hoverColor);
		} catch (e) {
			document.documentElement.style.setProperty('--accent-hover', color);
		}

		if (save) {
			localStorage.setItem('site-accent', color);
			if (window.JeoAnalytics) window.JeoAnalytics.trackCustomization('accent', color);
		}
	}

	loadBackground() {
		// Background color
		const defaultBg = '#0c0b14';
		const savedBg = localStorage.getItem('site-bg-color');
		const currentBg = savedBg || defaultBg;
		if (savedBg) this.setBgColor(savedBg, false);

		const bgInput = document.getElementById('bgColorInput');
		const bgValue = document.getElementById('bgColorValue');
		const bgReset = document.getElementById('bgReset');

		if (bgInput) {
			bgInput.value = currentBg;
			if (bgValue) bgValue.textContent = currentBg;
			bgInput.addEventListener('input', () => {
				this.setBgColor(bgInput.value, true);
				if (bgValue) bgValue.textContent = bgInput.value;
			});
		}
		if (bgReset) {
			bgReset.addEventListener('click', () => {
				this.setBgColor(defaultBg, true);
				if (bgInput) bgInput.value = defaultBg;
				if (bgValue) bgValue.textContent = defaultBg;
			});
		}

		// Background image
		const savedImg = localStorage.getItem('site-bg-image');
		if (savedImg) this.applyBgImage(savedImg);

		const fileInput = document.getElementById('bgImageInput');
		const clearBtn = document.getElementById('bgImageClear');
		if (fileInput) {
			fileInput.addEventListener('change', (e) => {
				const file = e.target.files[0];
				if (!file) return;
				const reader = new FileReader();
				reader.onload = (ev) => {
					const dataUrl = ev.target.result;
					try { 
						localStorage.setItem('site-bg-image', dataUrl);
						if (window.JeoAnalytics) window.JeoAnalytics.trackCustomization('bg_image', 'user_upload');
					} catch(err) {
						console.warn('Image too large for localStorage, applying without saving');
						if (window.JeoAnalytics) window.JeoAnalytics.trackCustomization('bg_image', 'too_large');
						if (window.JeoToast) window.JeoToast.warning(
							'Image too large to save (max ~5MB). Applied for this session only.',
							{ ttl: 6000 }
						);
					}
					this.applyBgImage(dataUrl);
				};
				reader.readAsDataURL(file);
			});
		}
		if (clearBtn) {
			clearBtn.addEventListener('click', () => {
				localStorage.removeItem('site-bg-image');
				this.removeBgImage();
			});
		}
	}

	setBgColor(color, save) {
		document.documentElement.style.setProperty('--bg', color);
		const r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
		const lighter = '#' + [r,g,b].map(c => Math.min(255, c + 12).toString(16).padStart(2,'0')).join('');
		const cardL = '#' + [r,g,b].map(c => Math.min(255, c + 18).toString(16).padStart(2,'0')).join('');
		document.documentElement.style.setProperty('--bg-surface', lighter);
		document.documentElement.style.setProperty('--card-bg', cardL);
		if (save) {
			localStorage.setItem('site-bg-color', color);
			if (window.JeoAnalytics) window.JeoAnalytics.trackCustomization('bg_color', color);
		}
	}

	applyBgImage(dataUrl) {
		let bgLayer = document.querySelector('.custom-background-layer');
		if (!bgLayer) {
			bgLayer = document.createElement('img');
			bgLayer.className = 'custom-background-layer';
			document.body.appendChild(bgLayer);
		}
		bgLayer.src = dataUrl;

		let overlay = document.querySelector('.accessibility-overlay');
		if (!overlay) {
			overlay = document.createElement('div');
			overlay.className = 'accessibility-overlay';
			document.body.appendChild(overlay);
		}

		document.body.classList.add('has-bg-image');
		const preview = document.getElementById('bgPreview');
		if (preview) {
			preview.style.backgroundImage = 'url(' + dataUrl + ')';
			preview.classList.remove('hidden');
		}
	}

	removeBgImage() {
		const bgLayer = document.querySelector('.custom-background-layer');
		if (bgLayer) bgLayer.remove();

		const overlay = document.querySelector('.accessibility-overlay');
		if (overlay) overlay.remove();

		document.body.classList.remove('has-bg-image');
		const preview = document.getElementById('bgPreview');
		if (preview) {
			preview.style.backgroundImage = '';
			preview.classList.add('hidden');
		}
	}

	bindUI() {
		// Debounced search input — avoids re-rendering on every keystroke
		let _searchTimer = null;
		this.searchInput.addEventListener('input', () => {
			if (_searchTimer) clearTimeout(_searchTimer);
			_searchTimer = setTimeout(() => {
				this.renderGames();
				if (window.JeoAnalytics) window.JeoAnalytics.trackSearch(this.searchInput.value);
			}, 140);
		});
		this.refreshBtn.addEventListener('click', () => this.refreshGames());
		this.themeToggle.addEventListener('click', () => this.toggleTheme());
		this.closeModal.addEventListener('click', () => this.closePlayer());
		this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
		this.openNewTabBtn.addEventListener('click', () => this.openGameInNewTab());

		// Share button + deep-link routing
		const shareGameBtn = document.getElementById('shareGameBtn');
		if (shareGameBtn) shareGameBtn.addEventListener('click', () => this.copyShareLink());
		const skipLoadingBtn = document.getElementById('skipLoadingBtn');
		if (skipLoadingBtn) skipLoadingBtn.addEventListener('click', () => this.skipLoadingOverlay());
		this.initDeepLinks();
		this.bindCollectionUI();
		this.bindLeaderboardUI();
		this.bindMoreMenu();
		// Re-render the collections row whenever playlists change
		if (window.JeoPlaylists) window.JeoPlaylists.onChange(() => this.renderCollections());

		// Save sidebar wiring
		const sbToggle = document.getElementById('saveSidebarToggle');
		const sbClose = document.getElementById('saveSidebarClose');
		const sb = document.getElementById('saveSidebar');
		const saveNowBtn = document.getElementById('saveNowBtn');
		const saveLabelBtn = document.getElementById('saveLabelBtn');
		const sbList = document.getElementById('saveSidebarList');
		if (sbToggle && sb) {
			sbToggle.addEventListener('click', () => {
				const willShow = sb.classList.contains('hidden');
				sb.classList.toggle('hidden');
				sb.setAttribute('aria-hidden', willShow ? 'false' : 'true');
				if (willShow) { this.refreshSaveSidebar(); this.startSaveStatusTicker(); }
				else this.stopSaveStatusTicker();
			});
		}
		if (sbClose && sb) {
			sbClose.addEventListener('click', () => {
				sb.classList.add('hidden');
				sb.setAttribute('aria-hidden', 'true');
				this.stopSaveStatusTicker();
			});
		}
		if (saveNowBtn) saveNowBtn.addEventListener('click', () => this.saveNowFromSidebar(false));
		if (saveLabelBtn) saveLabelBtn.addEventListener('click', () => this.saveNowFromSidebar(true));
		const cloudSyncBtn = document.getElementById('cloudSyncBtn');
		if (cloudSyncBtn) {
			// Only surface the cloud-sync button when the backend is reachable.
			if (window.JeoBackend && window.JeoBackend.isConfigured && window.JeoBackend.isConfigured()) {
				cloudSyncBtn.classList.remove('hidden');
			}
			cloudSyncBtn.addEventListener('click', () => this.runCloudSync());
		}
		if (sbList) {
			sbList.addEventListener('click', (e) => {
				const btn = e.target.closest('button[data-act]');
				if (!btn) return;
				const row = btn.closest('.save-row');
				if (!row) return;
				const id = Number(row.dataset.id);
				this.handleSaveAction(id, btn.dataset.act);
			});
		}
		// Ctrl/Cmd+S to save the active game
		document.addEventListener('keydown', (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
				if (this.currentGameSlug && this.playModal && !this.playModal.classList.contains('hidden')) {
					e.preventDefault();
					this.saveNowFromSidebar(false);
				}
			}
		});
		// Refresh sidebar + saves chip when an autosave happens, plus an
		// opt-in toast so users can *see* that auto-save is working.
		if (window.JeoSaves && window.JeoSaves.on) {
			window.JeoSaves.on('autosave', () => {
				if (this.currentGameSlug && sb && !sb.classList.contains('hidden')) this.refreshSaveSidebar();
				this.updateSavesBadge(this.currentGameName || this.currentGameSlug);
				if (window.JeoToast && localStorage.getItem('jeo:autosaveToast') === 'true') {
					window.JeoToast.info('💾 Saved', { ttl: 1800 });
				}
			});
		}
		// Saves preferences (Settings → General) — interval + autosave toast.
		const intervalSel = document.getElementById('autosaveIntervalSel');
		if (intervalSel && window.JeoSaves) {
			intervalSel.value = String(window.JeoSaves.getAutoInterval());
			intervalSel.addEventListener('change', () => {
				window.JeoSaves.setAutoInterval(parseInt(intervalSel.value, 10));
				if (window.JeoToast) window.JeoToast.info('Auto-save interval updated.');
			});
		}
		const toastToggle = document.getElementById('autosaveToastToggle');
		if (toastToggle) {
			toastToggle.checked = localStorage.getItem('jeo:autosaveToast') === 'true';
			toastToggle.addEventListener('change', () => {
				localStorage.setItem('jeo:autosaveToast', String(toastToggle.checked));
			});
		}

		const shareBtn = document.getElementById('shareWebsiteBtn');
		if (shareBtn) {
			shareBtn.addEventListener('click', () => {
				navigator.clipboard.writeText(window.location.origin).then(() => {
					shareBtn.textContent = '✅ Copied!';
					setTimeout(() => shareBtn.textContent = '🔗 Share Website', 2000);
				});
			});
		}

		// Color picker toggle
		const colorBtn = document.getElementById('colorPickerBtn');
		const colorMenu = document.getElementById('colorMenu');
		if (colorBtn && colorMenu) {
			colorBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				colorMenu.classList.toggle('open');
				// close cloaker if open
				const cm = document.getElementById('cloakerMenu');
				if (cm) cm.classList.remove('open');
			});
			document.addEventListener('click', (e) => {
				if (!colorMenu.contains(e.target) && e.target !== colorBtn) {
					colorMenu.classList.remove('open');
				}
			});
		}

		// Cloaker toggle
		const cloakerBtn = document.getElementById('cloakerBtn');
		const cloakerMenu = document.getElementById('cloakerMenu');
		if (cloakerBtn && cloakerMenu) {
			cloakerBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				cloakerMenu.classList.toggle('open');
				// close color menu if open
				if (colorMenu) colorMenu.classList.remove('open');
			});
			document.addEventListener('click', (e) => {
				if (!cloakerMenu.contains(e.target) && !cloakerBtn.contains(e.target)) {
					cloakerMenu.classList.remove('open');
				}
			});
		}

		// Settings Modal Logic
		const settingsBtn = document.getElementById('settingsBtn');
		const settingsModal = document.getElementById('settingsModal');
		const closeSettingsModal = document.getElementById('closeSettingsModal');
		
		if (settingsBtn && settingsModal && closeSettingsModal) {
			settingsBtn.addEventListener('click', () => {
				settingsModal.classList.remove('hidden');
				settingsModal.setAttribute('aria-hidden', 'false');
				document.body.style.overflow = 'hidden';
			});
			closeSettingsModal.addEventListener('click', () => {
				settingsModal.classList.add('hidden');
				settingsModal.setAttribute('aria-hidden', 'true');
				document.body.style.overflow = '';
			});
		}

		// Export Profile
		const exportProfileBtn = document.getElementById('exportProfileBtn');
		if (exportProfileBtn) {
			exportProfileBtn.addEventListener('click', () => {
				const profileData = {
					favorites: JSON.parse(localStorage.getItem('jeo-favorites') || '[]'),
					recentlyPlayed: JSON.parse(localStorage.getItem('jeo-recent') || '[]'),
					theme: localStorage.getItem('site-theme'),
					accent: localStorage.getItem('site-accent'),
					bgColor: localStorage.getItem('site-bg-color'),
					bgImage: localStorage.getItem('site-bg-image'),
					cloak: JSON.parse(localStorage.getItem('jeo-cloak') || 'null'),
					panicConfig: JSON.parse(localStorage.getItem('jeo-panic') || 'null')
				};

				const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: 'application/json' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `jeoweb-profile-${new Date().toISOString().slice(0,10)}.jeo`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);

				const originalText = exportProfileBtn.textContent;
				exportProfileBtn.textContent = '✅ Exported!';
				setTimeout(() => exportProfileBtn.textContent = originalText, 2000);
			});
		}

		// Import Profile
		const importProfileInput = document.getElementById('importProfileInput');
		if (importProfileInput) {
			importProfileInput.addEventListener('change', (e) => {
				const file = e.target.files[0];
				if (!file) return;

				const reader = new FileReader();
				reader.onload = (ev) => {
					try {
						const data = JSON.parse(ev.target.result);
						if (data.favorites) localStorage.setItem('jeo-favorites', JSON.stringify(data.favorites));
						if (data.recentlyPlayed) localStorage.setItem('jeo-recent', JSON.stringify(data.recentlyPlayed));
						if (data.theme) localStorage.setItem('site-theme', data.theme);
						if (data.accent) localStorage.setItem('site-accent', data.accent);
						if (data.bgColor) localStorage.setItem('site-bg-color', data.bgColor);
						if (data.bgImage) localStorage.setItem('site-bg-image', data.bgImage);
						if (data.cloak) localStorage.setItem('jeo-cloak', JSON.stringify(data.cloak));
						if (data.panicConfig) localStorage.setItem('jeo-panic', JSON.stringify(data.panicConfig));
						
						if (window.JeoToast) window.JeoToast.success('Profile imported. Reloading…');
						setTimeout(() => window.location.reload(), 600);
					} catch (err) {
						console.error(err);
						if (window.JeoToast) window.JeoToast.error('Invalid profile file — could not import.');
						else alert('Invalid profile file.');
					}
				};
				reader.readAsText(file);
			});
		}

		// Panic Button Logic
		this.panicConfig = JSON.parse(localStorage.getItem('jeo-panic') || '{"key":"","url":"https://classroom.google.com"}');
		const panicKeyInput = document.getElementById('panicKeyInput');
		const panicUrlInput = document.getElementById('panicUrlInput');
		const savePanicBtn = document.getElementById('savePanicBtn');

		if (panicKeyInput && panicUrlInput && savePanicBtn) {
			panicKeyInput.value = this.panicConfig.key || '';
			panicUrlInput.value = this.panicConfig.url || 'https://classroom.google.com';

			// Record Hotkey
			panicKeyInput.addEventListener('keydown', (e) => {
				e.preventDefault();
				if (e.key === 'Escape' || e.key === 'Backspace' || e.key === 'Delete') {
					panicKeyInput.value = '';
				} else {
					panicKeyInput.value = e.key;
				}
			});

			// Save
			savePanicBtn.addEventListener('click', () => {
				this.panicConfig = {
					key: panicKeyInput.value,
					url: panicUrlInput.value || 'https://classroom.google.com'
				};
				localStorage.setItem('jeo-panic', JSON.stringify(this.panicConfig));
				const og = savePanicBtn.textContent;
				savePanicBtn.textContent = 'Saved!';
				setTimeout(() => savePanicBtn.textContent = og, 2000);
			});
		}

		// Listen for Panic Key globally
		document.addEventListener('keydown', (e) => {
			if (this.panicConfig && this.panicConfig.key && e.key === this.panicConfig.key) {
				// Don't trigger if they are typing in an input!
				if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
				
				e.preventDefault();
				
				// Hide game modal if open
				if (this.playModal && !this.playModal.classList.contains('hidden')) {
					this.closePlayer();
				}
				
				// Hide settings if open
				if (settingsModal && !settingsModal.classList.contains('hidden')) {
					settingsModal.classList.add('hidden');
				}

				// The ultimate panic: replace the whole document body with an iframe to the safe site
				document.body.innerHTML = `<iframe src="${this.panicConfig.url}" style="position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;z-index:9999999;background:#fff;"></iframe>`;
			}
		});

		// Theme / Look Profiles
		// Each preset defines mood, theme, background base color, accent, and an
		// optional `surface` (mid-tone for cards) and `grad` (accent gradient).
		const PRESETS = {
			default:    { label: 'Default',     icon: '🟣', theme: 'dark',  bg: '#0c0b14', accent: '#7c3aed' },
			midnight:   { label: 'Midnight',    icon: '🌌', theme: 'dark',  bg: '#070a18', accent: '#3b82f6' },
			aurora:     { label: 'Aurora',      icon: '🌠', theme: 'dark',  bg: '#0a1422', accent: '#10b981', grad: 'linear-gradient(135deg,#10b981,#22d3ee,#a78bfa)' },
			sunset:     { label: 'Sunset',      icon: '🌇', theme: 'dark',  bg: '#170a0e', accent: '#f97316', grad: 'linear-gradient(135deg,#f97316,#ec4899)' },
			ocean:      { label: 'Ocean',       icon: '🌊', theme: 'dark',  bg: '#06121c', accent: '#0ea5e9' },
			forest:     { label: 'Forest',      icon: '🌲', theme: 'dark',  bg: '#0f1a14', accent: '#3fa67a' },
			carbon:     { label: 'Carbon',      icon: '⚫', theme: 'dark',  bg: '#0a0a0a', accent: '#e5e7eb' },
			mono:       { label: 'Mono',        icon: '◾', theme: 'dark',  bg: '#101010', accent: '#a3a3a3' },
			cyberpunk:  { label: 'Cyberpunk',   icon: '🤖', theme: 'dark',  bg: '#110022', accent: '#ff00ff', grad: 'linear-gradient(135deg,#ff00ff,#22d3ee)' },
			vaporwave:  { label: 'Vaporwave',   icon: '🌴', theme: 'dark',  bg: '#1a0033', accent: '#ff77e9', grad: 'linear-gradient(135deg,#ff77e9,#22d3ee)' },
			matrix:     { label: 'Matrix',      icon: '💚', theme: 'dark',  bg: '#000000', accent: '#00ff00' },
			crt:        { label: 'Retro CRT',   icon: '📺', theme: 'dark',  bg: '#111111', accent: '#facc15' },
			holo:       { label: 'Holographic', icon: '🪩', theme: 'dark',  bg: '#06070b', accent: '#a3ff77', grad: 'linear-gradient(135deg,#ff77e9,#22d3ee,#a3ff77)' },
			rose:       { label: 'Rose',        icon: '🌹', theme: 'dark',  bg: '#170a10', accent: '#f43f5e' },
			pastel:     { label: 'Pastel',      icon: '🍡', theme: 'light', bg: '#fdf4ff', accent: '#ec4899' },
			'solar-light':{ label: 'Solar',     icon: '☀️', theme: 'light', bg: '#fdf6e3', accent: '#268bd2' },
			y2k:        { label: 'Y2K',         icon: '💿', theme: 'light', bg: '#dde6ff', accent: '#7c87ff', grad: 'linear-gradient(135deg,#7c87ff,#ec4899)' },
			mint:       { label: 'Mint',        icon: '🌿', theme: 'light', bg: '#ecfdf5', accent: '#14b8a6' },
			sakura:     { label: 'Sakura',      icon: '🌸', theme: 'light', bg: '#fff1f2', accent: '#e11d48' },
			bubblegum:  { label: 'Bubblegum',   icon: '🍬', theme: 'light', bg: '#fef2ff', accent: '#a855f7', grad: 'linear-gradient(135deg,#a855f7,#22d3ee)' },
		};
		this._lookPresets = PRESETS;

		const applyPreset = (preset) => {
			const cfg = PRESETS[preset];
			if (!cfg) return;
			document.body.className = cfg.theme === 'light' ? 'theme-light' : 'theme-dark';
			this.setBgColor(cfg.bg, true);
			this.setAccent(cfg.accent, true);
			if (cfg.grad) document.documentElement.style.setProperty('--accent-grad', cfg.grad);
			else document.documentElement.style.removeProperty('--accent-grad');
			localStorage.setItem('site-theme', cfg.theme);
			localStorage.setItem('site-preset', preset);
			if (cfg.grad) localStorage.setItem('site-accent-grad', cfg.grad);
			else localStorage.removeItem('site-accent-grad');
			this.removeBgImage();
			localStorage.removeItem('site-bg-image');
			if (this.themeToggle) this.themeToggle.textContent = cfg.theme === 'light' ? '☀️' : '🌙';
			const bgInput = document.getElementById('bgColorInput');
			const accentInput = document.getElementById('accentColorInput');
			if (bgInput) bgInput.value = cfg.bg;
			if (accentInput) accentInput.value = cfg.accent;
			if (window.JeoAchievements) {
				try { window.JeoAchievements.onEvent('theme-tried', { preset }); } catch (e) {}
			}
			this.markActiveLookProfile(preset);
			if (window.JeoToast) window.JeoToast.info(`Applied “${cfg.label}”`);
		};

		// Render the look-profile grid into #lookProfileGrid (replaces inline buttons)
		this.renderLookProfileGrid = () => {
			const grid = document.getElementById('lookProfileGrid');
			if (!grid) return;
			grid.innerHTML = '';
			const active = localStorage.getItem('site-preset') || 'default';
			for (const [id, cfg] of Object.entries(PRESETS)) {
				const tile = document.createElement('button');
				tile.type = 'button';
				tile.className = 'look-profile-tile';
				if (id === active) tile.classList.add('active');
				tile.dataset.preset = id;
				tile.setAttribute('aria-label', cfg.label);
				const accentDisplay = cfg.grad || cfg.accent;
				const surface = cfg.theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.06)';
				const fg = cfg.theme === 'light' ? '#1d1d1f' : '#fff';
				tile.innerHTML =
					'<div class="lp-preview" style="background:' + cfg.bg + ';color:' + fg + '">' +
						'<div class="lp-preview-top">' +
							'<span class="lp-dot" style="background:' + accentDisplay + '"></span>' +
							'<span class="lp-dot" style="background:' + surface + ';border:1px solid ' + (cfg.theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)') + '"></span>' +
						'</div>' +
						'<div class="lp-preview-bar" style="background:' + accentDisplay + '"></div>' +
						'<div class="lp-preview-card" style="background:' + surface + ';border-color:' + (cfg.theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)') + '"></div>' +
					'</div>' +
					'<div class="lp-meta"><span class="lp-icon">' + cfg.icon + '</span><span class="lp-name">' + cfg.label + '</span></div>';
				tile.addEventListener('click', () => applyPreset(id));
				grid.appendChild(tile);
			}
		};

		this.markActiveLookProfile = (preset) => {
			const grid = document.getElementById('lookProfileGrid');
			if (!grid) return;
			grid.querySelectorAll('.look-profile-tile').forEach(t => {
				t.classList.toggle('active', t.dataset.preset === preset);
			});
		};

		this.renderLookProfileGrid();

		// Animation Toggles Logic
		const animHoverToggle = document.getElementById('animHoverToggle');
		const animRippleToggle = document.getElementById('animRippleToggle');
		
		if (animHoverToggle) {
			animHoverToggle.checked = this.animHover;
			animHoverToggle.addEventListener('change', () => {
				this.animHover = animHoverToggle.checked;
				localStorage.setItem('jeo-anim-hover', this.animHover);
				if (this.animHover) document.body.classList.remove('no-anim-hover');
				else document.body.classList.add('no-anim-hover');
			});
		}
		if (animRippleToggle) {
			animRippleToggle.checked = this.animRipple;
			animRippleToggle.addEventListener('change', () => {
				this.animRipple = animRippleToggle.checked;
				localStorage.setItem('jeo-anim-ripple', this.animRipple);
			});
		}

		// Glass intensity slider — only takes effect when Premium FX is on.
		// In default (flat) mode the CSS hides the slider section entirely; the
		// JS still binds so the saved value is restored next time FX is on.
		const glassSlider = document.getElementById('glassSlider');
		const glassValue = document.getElementById('glassValue');
		const applyGlass = (v) => {
			if (this.premiumFx) {
				document.documentElement.style.setProperty('--glass-blur', `blur(${v}px)`);
			} else {
				document.documentElement.style.removeProperty('--glass-blur');
			}
		};
		if (glassSlider) {
			const saved = Number(localStorage.getItem('jeo:glass') || '16');
			glassSlider.value = saved;
			applyGlass(saved);
			if (glassValue) glassValue.textContent = `${saved}px`;
			glassSlider.addEventListener('input', () => {
				const v = glassSlider.value;
				applyGlass(v);
				if (glassValue) glassValue.textContent = `${v}px`;
				localStorage.setItem('jeo:glass', v);
			});
		}

		// Accent mode (solid / gradient)
		const accentSolidBtn = document.getElementById('accentSolidBtn');
		const accentGradBtn = document.getElementById('accentGradBtn');
		const gStop1 = document.getElementById('accentGradStop1');
		const gStop2 = document.getElementById('accentGradStop2');
		const gAngle = document.getElementById('accentGradAngle');
		const applyAccentGrad = () => {
			if (!gStop1 || !gStop2 || !gAngle) return;
			const grad = `linear-gradient(${gAngle.value}deg, ${gStop1.value}, ${gStop2.value})`;
			document.documentElement.style.setProperty('--accent-grad', grad);
			localStorage.setItem('site-accent-grad', grad);
		};
		const setAccentMode = (mode) => {
			if (mode === 'grad') {
				accentSolidBtn?.classList.remove('active');
				accentGradBtn?.classList.add('active');
				gStop1?.removeAttribute('hidden');
				gStop2?.removeAttribute('hidden');
				gAngle?.removeAttribute('hidden');
				applyAccentGrad();
				localStorage.setItem('jeo:accent-mode', 'grad');
			} else {
				accentSolidBtn?.classList.add('active');
				accentGradBtn?.classList.remove('active');
				gStop1?.setAttribute('hidden', '');
				gStop2?.setAttribute('hidden', '');
				gAngle?.setAttribute('hidden', '');
				document.documentElement.style.removeProperty('--accent-grad');
				localStorage.removeItem('site-accent-grad');
				localStorage.setItem('jeo:accent-mode', 'solid');
			}
		};
		accentSolidBtn?.addEventListener('click', () => setAccentMode('solid'));
		accentGradBtn?.addEventListener('click', () => setAccentMode('grad'));
		[gStop1, gStop2, gAngle].forEach(el => el?.addEventListener('input', applyAccentGrad));
		// restore saved mode
		const savedMode = localStorage.getItem('jeo:accent-mode');
		if (savedMode === 'grad') setAccentMode('grad');
		const savedGrad = localStorage.getItem('site-accent-grad');
		if (savedGrad) document.documentElement.style.setProperty('--accent-grad', savedGrad);

		// Layout Buttons Logic
		document.querySelectorAll('.layout-btn').forEach(btn => {
			const layout = btn.dataset.layout;
			// Highlight current
			const savedLayout = localStorage.getItem('jeo-layout') || 'normal';
			if (layout === savedLayout) {
				btn.style.borderColor = 'var(--accent)';
				btn.style.background = 'rgba(124,58,237,0.1)';
			}

			btn.addEventListener('click', () => {
				document.body.classList.remove('layout-compact');
				if (layout === 'compact') document.body.classList.add('layout-compact');
				localStorage.setItem('jeo-layout', layout);
				
				// Update UI highlighting
				document.querySelectorAll('.layout-btn').forEach(b => {
					b.style.borderColor = 'var(--border)';
					b.style.background = 'var(--bg)';
				});
				btn.style.borderColor = 'var(--accent)';
				btn.style.background = 'rgba(124,58,237,0.1)';
			});
		});

		// Border Radius Logic
		document.querySelectorAll('.radius-btn').forEach(btn => {
			const r = btn.dataset.radius;
			// Highlight current
			const savedRadius = localStorage.getItem('jeo-radius') || 'rounded';
			if (r === savedRadius) {
				btn.style.borderColor = 'var(--accent)';
				btn.style.background = 'rgba(124,58,237,0.1)';
			}

			btn.addEventListener('click', () => {
				document.body.classList.remove('radius-square', 'radius-rounded', 'radius-pill');
				document.body.classList.add(`radius-${r}`);
				localStorage.setItem('jeo-radius', r);

				// Update UI highlighting
				document.querySelectorAll('.radius-btn').forEach(b => {
					b.style.borderColor = 'var(--border)';
					b.style.background = 'var(--bg)';
				});
				btn.style.borderColor = 'var(--accent)';
				btn.style.background = 'rgba(124,58,237,0.1)';
			});
		});
	}

	initFlashToggle() {
		if (this.flashToggle) {
			this.flashToggle.checked = this.showFlash;
			this.flashToggle.addEventListener('change', () => {
				this.showFlash = this.flashToggle.checked;
				localStorage.setItem('jeo-show-flash', this.showFlash);
				this.renderGames();
			});
		}
	}

	initRetroToggle() {
		if (this.retroToggle) {
			this.retroToggle.checked = this.showRetro;
			this.retroToggle.addEventListener('change', () => {
				this.showRetro = this.retroToggle.checked;
				localStorage.setItem('jeo-show-retro', this.showRetro);
				this.renderGames();
			});
		}
	}

	initMaintenanceToggle() {
		const toggle = document.getElementById('hideMaintenanceToggle');
		if (!toggle) return;
		toggle.checked = this.hideMaintenance;
		toggle.addEventListener('change', () => {
			this.hideMaintenance = toggle.checked;
			localStorage.setItem('jeo-hide-maintenance', this.hideMaintenance);
			this.renderGames();
		});
	}

	refreshGames() {
		this.refreshBtn.classList.add('spinning');
		this.reloadGames().then(() => {
			setTimeout(() => this.refreshBtn.classList.remove('spinning'), 600);
		});
	}

	/* Levenshtein edit distance with an early-exit cap for performance. */
	editDistance(a, b, cap) {
		if (a === b) return 0;
		const al = a.length, bl = b.length;
		if (Math.abs(al - bl) > cap) return cap + 1;
		if (al === 0) return bl;
		if (bl === 0) return al;
		let prev = new Array(bl + 1);
		let curr = new Array(bl + 1);
		for (let j = 0; j <= bl; j++) prev[j] = j;
		for (let i = 1; i <= al; i++) {
			curr[0] = i;
			let rowMin = curr[0];
			const ac = a.charCodeAt(i - 1);
			for (let j = 1; j <= bl; j++) {
				const cost = ac === b.charCodeAt(j - 1) ? 0 : 1;
				curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
				if (curr[j] < rowMin) rowMin = curr[j];
			}
			if (rowMin > cap) return cap + 1;
			[prev, curr] = [curr, prev];
		}
		return prev[bl];
	}

	/* Returns 0 = no match, larger = better. Combines exact / prefix / fuzzy heuristics. */
	scoreGameMatch(g, q, terms, rawQ) {
		const name = g.name.toLowerCase();
		const rawName = name.replace(/[^a-z0-9]/g, '');
		const spaced = name.replace(/[-_]/g, ' ');
		let score = 0;

		// Exact / substring matches (existing behavior, weighted)
		if (rawQ && rawName === rawQ) score += 1000;
		else if (rawQ && rawName.startsWith(rawQ)) score += 500;
		else if (rawQ && rawName.includes(rawQ)) score += 200;

		// Multi-term out-of-order match
		if (terms.length > 1) {
			const allHit = terms.every(t => spaced.includes(t) || rawName.includes(t.replace(/[^a-z0-9]/g, '')));
			if (allHit) score += 150;
		}

		// Per-term contribution (prefix / contains)
		for (const t of terms) {
			if (!t) continue;
			const rt = t.replace(/[^a-z0-9]/g, '');
			if (rt && rawName.startsWith(rt)) score += 80;
			else if (spaced.split(' ').some(w => w.startsWith(t))) score += 60;
			else if (rt && rawName.includes(rt)) score += 30;
		}

		// Fuzzy: tolerate typos. Cap distance based on query length.
		// Only useful when no strong substring match was found.
		if (score < 200 && rawQ.length >= 3) {
			const cap = rawQ.length <= 4 ? 1 : (rawQ.length <= 7 ? 2 : 3);
			const distFull = this.editDistance(rawQ, rawName, cap);
			if (distFull <= cap) {
				score += 120 - distFull * 30;
			} else {
				// Try per-word distance against each token of the name (handles "tetras" → "tetris" inside "tetris-blitz")
				const words = spaced.split(' ').filter(Boolean);
				let best = cap + 1;
				for (const w of words) {
					if (Math.abs(w.length - rawQ.length) > cap) continue;
					const d = this.editDistance(rawQ, w, cap);
					if (d < best) best = d;
					if (best === 0) break;
				}
				if (best <= cap) score += 80 - best * 25;
			}
		}

		return score > 0 ? score : 0;
	}

	renderGames() {
		const q = (this.searchInput.value || '').toLowerCase().trim();
		const terms = q.split(/\s+/).filter(Boolean);
		const rawQ = q.replace(/[^a-z0-9]/g, '');

		this.gameGrid.innerHTML = '';
		// Tear down any in-flight incremental render from a previous call
		// (search/filter changes re-run renderGames and must start fresh).
		if (this._gridObserver) { this._gridObserver.disconnect(); this._gridObserver = null; }
		const scored = [];
		for (const g of this.games) {
			if (!this.showFlash && g.type === 'flash') continue;
			if (!this.showRetro && g.type === 'snes') continue;
			if (this.hideMaintenance && this.isUnderMaintenance(g)) continue;
			if (this.activeTag) {
				const tags = g.tags || [];
				if (!tags.includes(this.activeTag)) continue;
			}

			if (!q) {
				scored.push({ g, score: 0 });
				continue;
			}
			const score = this.scoreGameMatch(g, q, terms, rawQ);
			if (score > 0) scored.push({ g, score });
		}
		// When searching: rank by score (desc), tiebreak alpha. Otherwise: pure alpha.
		if (q) scored.sort((a, b) => b.score - a.score || a.g.name.localeCompare(b.g.name));
		else scored.sort((a, b) => a.g.name.localeCompare(b.g.name));
		const filtered = scored.map(s => s.g);
		// Announce result count to screen readers
		const live = document.getElementById('searchResultsLive');
		if (live) {
			live.textContent = q
				? `${filtered.length} game${filtered.length === 1 ? '' : 's'} match "${q}"`
				: `${filtered.length} games shown`;
		}
		if (filtered.length === 0) {
			const safeQ = (q || '').replace(/[<>"']/g, '');
			const tagBtn = this.activeTag
				? `<button class="secondary" id="emptyClearTag">Clear tag "${this.escapeAttr(this.activeTag)}"</button>`
				: '';
			const maintBtn = this.hideMaintenance
				? '<button class="secondary" id="emptyShowMaintenance">Show maintenance games</button>'
				: '';
			this.gameGrid.innerHTML = `
				<div class="empty-state-illustrated">
					<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<rect x="14" y="20" width="36" height="30" rx="3"/>
						<rect x="20" y="26" width="24" height="8" rx="1.5"/>
						<circle cx="22" cy="42" r="2"/>
						<circle cx="42" cy="42" r="2"/>
						<path d="M14 28 L8 28 M14 36 L8 36 M50 28 L56 28 M50 36 L56 36"/>
						<path d="M24 12 L40 12 M28 8 L36 8" />
					</svg>
					<h3>No games found</h3>
					<p>${safeQ ? `Nothing matches "<strong>${safeQ}</strong>".` : 'Try a different search or clear the active filters.'}</p>
					<div class="empty-actions">
						<a href="https://forms.gle/HgkCSEzaF5iULyfv8" target="_blank" rel="noopener">📩 Request "${safeQ || 'a game'}"</a>
						<button class="secondary" onclick="document.getElementById('searchInput').value='';document.getElementById('searchInput').dispatchEvent(new Event('input'))">Clear search</button>
						${tagBtn}
						${maintBtn}
					</div>
				</div>`;
			const clearTagBtn = document.getElementById('emptyClearTag');
			if (clearTagBtn) clearTagBtn.addEventListener('click', () => { this.activeTag = null; this.renderGames(); this.renderTagChips(); });
			const showMaintBtn = document.getElementById('emptyShowMaintenance');
			if (showMaintBtn) showMaintBtn.addEventListener('click', () => {
				this.hideMaintenance = false;
				localStorage.setItem('jeo-hide-maintenance', 'false');
				this.renderGames();
			});
			return;
		}
		// Incremental render: append one page of cards now, then render the rest
		// in batches as the user scrolls. Rendering all 500+ cards (each with its
		// own listeners) in a single pass janks the main thread on filter changes.
		this._renderQueue = filtered;
		this._renderIndex = 0;
		if ('IntersectionObserver' in window) {
			this._gridObserver = new IntersectionObserver((entries) => {
				for (const e of entries) {
					if (e.isIntersecting) { this._renderNextPage(); break; }
				}
			}, { rootMargin: '250px 0px' });
			this._renderNextPage();
		} else {
			// No IntersectionObserver: fall back to rendering everything at once.
			this._gridObserver = null;
			while (this._renderIndex < this._renderQueue.length) this._renderNextPage();
		}
	}

	// Renders the next page of cards from this._renderQueue and, if more remain,
	// drops a sentinel the IntersectionObserver watches to trigger the next page.
	_renderNextPage() {
		const PAGE_SIZE = 60;
		const queue = this._renderQueue || [];
		const start = this._renderIndex || 0;
		if (start >= queue.length) return;
		const end = Math.min(start + PAGE_SIZE, queue.length);
		const frag = document.createDocumentFragment();
		for (let i = start; i < end; i++) {
			frag.appendChild(this.buildGameCard(queue[i], i));
		}
		const oldSentinel = this.gameGrid.querySelector('.grid-sentinel');
		if (oldSentinel) oldSentinel.remove();
		this.gameGrid.appendChild(frag);
		this._renderIndex = end;
		if (end < queue.length && this._gridObserver) {
			const sentinel = document.createElement('div');
			sentinel.className = 'grid-sentinel';
			sentinel.setAttribute('aria-hidden', 'true');
			this.gameGrid.appendChild(sentinel);
			this._gridObserver.observe(sentinel);
		} else if (this._gridObserver) {
			this._gridObserver.disconnect();
			this._gridObserver = null;
		}
	}

	buildGameCard(g, i) {
		const imgSrc = g.image || this.fallbackImage;
		const isFav = this.isFavorite(g.name);
		const statusKind = this.gameStatusKind(g); // 'broken' | 'maintenance' | 'unverified' | ''
		const isFail = statusKind === 'broken' || statusKind === 'maintenance';
		const isWish = this.isWishlisted(g.name);
		const safeName = this.escapeAttr(g.name);
		const safeImg = this.escapeAttr(imgSrc);
		const safeFallback = this.escapeAttr(this.fallbackImage);

		// Build the badge list with a hard cap so the cover isn't half-buried.
		// Order: status badge first (most important), then type, then meta.
		const badges = [];
		if (statusKind === 'broken') badges.push('<span class="status-badge status-broken" title="Confirmed broken">✕ Broken</span>');
		else if (statusKind === 'maintenance') badges.push('<span class="status-badge status-maintenance" title="Marked under maintenance">⚠ Maintenance</span>');
		else if (statusKind === 'unverified') badges.push('<span class="status-badge status-unverified" title="Not recently verified">? Unverified</span>');
		if (g.type === 'flash') badges.push('<span class="flash-badge">⚡ Flash</span>');
		if (g.type === 'snes') badges.push('<span class="retro-badge">🎮 Retro</span>');
		if (g.requested) badges.push('<span class="requested-badge">📩 Requested</span>');
		const ratingHtml = this.ratingBadgeHtml(g.name);
		if (ratingHtml) badges.push(ratingHtml);
		const plays = this._playCounts && this._playCounts[g.name];
		if (plays) badges.push('<span class="play-count-badge">▶ ' + this.formatPlayCount(plays) + '</span>');
		const MAX_VISIBLE_BADGES = 2;
		let badgeHtml = badges.slice(0, MAX_VISIBLE_BADGES).join('');
		if (badges.length > MAX_VISIBLE_BADGES) {
			badgeHtml += '<span class="badge-more" title="' + (badges.length - MAX_VISIBLE_BADGES) + ' more">+' + (badges.length - MAX_VISIBLE_BADGES) + '</span>';
		}

		let playLabel;
		if (statusKind === 'broken') playLabel = '✕ Likely Broken';
		else if (statusKind === 'maintenance') playLabel = '⚠ Play at Risk';
		else if (statusKind === 'unverified') playLabel = '▶ Play (Unverified)';
		else playLabel = '▶ Play';

		const card = document.createElement('div');
		const stateClass = statusKind ? ' card-status-' + statusKind : '';
		card.className = 'game-card' + (isFail ? ' under-maintenance' : '') + stateClass;
		card.style.setProperty('--card-img', "url('" + imgSrc.replace(/'/g, "\\'") + "')");
		card.dataset.slug = g.name;

		const wishBtn = '<button class="wish-btn' + (isWish ? ' wished' : '') + '" data-game="' + safeName + '" aria-label="Save for later" title="Save for later">' + (isWish ? '🔖' : '📑') + '</button>';
		const heartBtn = '<button class="heart-btn' + (isFav ? ' hearted' : '') + '" data-game="' + safeName + '" aria-label="Favorite">' + (isFav ? '♥' : '♡') + '</button>';
		const verifiedAt = (this.statusFreshness && this.statusFreshness.generatedAt) || 0;
		const verifiedAgoText = (!isFail && verifiedAt) ? this.formatVerifiedAgo(verifiedAt) : '';
		const verifiedAgo = verifiedAgoText
			? '<span class="verified-ago" title="Last verified by the QA pipeline">✓ Verified ' + verifiedAgoText + '</span>'
			: '';
		// width/height supplied so the browser can reserve box & avoid CLS;
		// CSS still scales image to fill via object-fit. onerror swaps to the
		// shared fallback once if the cover is missing or broken.
		const img = '<img src="' + safeImg + '" alt="' + safeName + '" width="320" height="200" loading="lazy"'
			+ ' onload="this.classList.add(\'loaded\')"'
			+ ' onerror="this.onerror=null;this.classList.add(\'loaded\');this.src=\'' + safeFallback + '\';" />';

		card.innerHTML =
			'<div class="game-thumb">' + img + heartBtn + wishBtn + badgeHtml + '</div>' +
			'<div class="game-card-content">' +
				'<div class="game-card-title">' + safeName + '</div>' +
				(verifiedAgo ? '<div class="game-card-meta">' + verifiedAgo + '</div>' : '') +
				'<div class="card-actions"><button class="play-btn">' + playLabel + '</button></div>' +
			'</div>';

		card.querySelector('.play-btn').addEventListener('click', (e) => { e.stopPropagation(); this.playGame(g); });
		card.querySelector('.heart-btn').addEventListener('click', (e) => { e.stopPropagation(); this.toggleFavorite(g, e.currentTarget); });
		card.querySelector('.wish-btn').addEventListener('click', (e) => { e.stopPropagation(); this.toggleWishlist(g); });
		card.addEventListener('dblclick', () => { this.playGame(g); });
		// Stagger only applies under Premium FX (CSS gates the animation itself
		// to [data-fx='premium']). Capped at the first 24 cards.
		if (this.premiumFx && i < 24) card.style.animationDelay = (i * 0.03) + 's';
		return card;
	}

	/* =============== FAVORITES SYSTEM =============== */

	isFavorite(name) {
		return this.favorites.includes(name);
	}

	toggleFavorite(game, btn) {
		const name = game.name;
		const idx = this.favorites.indexOf(name);
		if (idx > -1) {
			this.favorites.splice(idx, 1);
			if (window.JeoAnalytics) window.JeoAnalytics.trackFavorite(name, false);
			if (btn) {
				btn.classList.remove('hearted');
				btn.textContent = '♡';
			}
		} else {
			this.favorites.push(name);
			if (window.JeoAnalytics) window.JeoAnalytics.trackFavorite(name, true);
			if (btn) {
				btn.classList.add('hearted');
				btn.textContent = '♥';
				btn.classList.remove('pop');
				void btn.offsetWidth;
				btn.classList.add('pop');
			}
		}
		localStorage.setItem('jeo-favorites', JSON.stringify(this.favorites));
		this.renderCarousels();
		// Sync all heart buttons for this game
		document.querySelectorAll('.heart-btn[data-game="' + this.escapeAttr(name) + '"]').forEach(b => {
			if (this.isFavorite(name)) {
				b.classList.add('hearted');
				b.textContent = '♥';
			} else {
				b.classList.remove('hearted');
				b.textContent = '♡';
			}
		});
	}

	/* =============== RECENTLY PLAYED =============== */

	trackRecentPlay(game) {
		const name = game.name;
		this._lastPlayType = game && game.type;
		this.recentlyPlayed = this.recentlyPlayed.filter(n => n !== name);
		this.recentlyPlayed.unshift(name);
		if (this.recentlyPlayed.length > this.MAX_RECENT) {
			this.recentlyPlayed = this.recentlyPlayed.slice(0, this.MAX_RECENT);
		}
		localStorage.setItem('jeo-recent', JSON.stringify(this.recentlyPlayed));
		// Trending log: keep last 200 plays with timestamps
		try {
			const log = JSON.parse(localStorage.getItem('jeo:playlog') || '[]');
			log.push({ slug: name, ts: Date.now() });
			while (log.length > 200) log.shift();
			localStorage.setItem('jeo:playlog', JSON.stringify(log));
			localStorage.setItem('jeo:lastPlayed', name);
		} catch {}
		// First-play confetti for a brand-new game
		try {
			const seen = JSON.parse(localStorage.getItem('jeo:gamesSeen') || '[]');
			if (!seen.includes(name)) {
				seen.push(name);
				localStorage.setItem('jeo:gamesSeen', JSON.stringify(seen));
				if (window.JeoConfetti) setTimeout(() => window.JeoConfetti.burst({ y: window.innerHeight * 0.3 }), 100);
			}
		} catch {}
		// Fire achievements check (if available)
		if (window.JeoAchievements) {
			try { window.JeoAchievements.onEvent('play', { slug: name, type: this._lastPlayType }); } catch {}
		}
		// Daily play streak + daily challenge (local-only habit loops)
		if (window.JeoStreak) {
			try { window.JeoStreak.recordActivity(); } catch {}
		}
		if (window.JeoDailyChallenge) {
			try { window.JeoDailyChallenge.notifyPlay(name); } catch {}
		}
		// Global play count (backend-powered, fire-and-forget, degrades to no-op)
		if (window.JeoBackend) {
			try { window.JeoBackend.recordPlay(name); } catch {}
		}
		this.renderCarousels();
	}

	playGame(game) {
		const kind = this.gameStatusKind(game);
		if (kind === 'broken' || kind === 'maintenance') {
			const isBroken = kind === 'broken';
			const title = isBroken ? 'This game is broken' : 'This game is under maintenance';
			const body = isBroken
				? game.name + ' failed verification (missing assets or runtime errors). It probably won\'t load. Open anyway?'
				: game.name + ' is marked under maintenance. It may not work correctly. Continue?';
			this.showRiskPrompt(title, body, () => {
				this.trackRecentPlay(game);
				this.openPlayer(game.url, game);
			});
			return;
		}
		this.trackRecentPlay(game);
		if (window.JeoAnalytics) window.JeoAnalytics.trackGameStart(game.name, game.type);
		this.openPlayer(game.url, game);
	}

	// Lightweight in-page confirm. Falls back to native confirm if the toast
	// system isn't loaded for some reason.
	showRiskPrompt(title, body, onConfirm) {
		// Native fallback for the worst case (script load failure).
		if (typeof document === 'undefined') { if (window.confirm(body)) onConfirm(); return; }
		// Reuse one DOM node so repeated prompts don't pile up.
		let host = document.getElementById('jeoRiskPrompt');
		if (!host) {
			host = document.createElement('div');
			host.id = 'jeoRiskPrompt';
			host.className = 'jeo-risk-overlay';
			host.setAttribute('role', 'dialog');
			host.setAttribute('aria-modal', 'true');
			document.body.appendChild(host);
		}
		host.innerHTML =
			'<div class="jeo-risk-card">' +
				'<div class="jeo-risk-title"></div>' +
				'<div class="jeo-risk-body"></div>' +
				'<div class="jeo-risk-actions">' +
					'<button class="jeo-risk-cancel" type="button">Cancel</button>' +
					'<button class="jeo-risk-confirm" type="button">Play anyway</button>' +
				'</div>' +
			'</div>';
		host.querySelector('.jeo-risk-title').textContent = title;
		host.querySelector('.jeo-risk-body').textContent = body;
		host.classList.add('open');
		const close = () => { host.classList.remove('open'); document.removeEventListener('keydown', onKey); };
		const onKey = (e) => {
			if (e.key === 'Escape') { close(); }
			else if (e.key === 'Enter') { close(); onConfirm(); }
		};
		document.addEventListener('keydown', onKey);
		host.querySelector('.jeo-risk-cancel').onclick = close;
		host.querySelector('.jeo-risk-confirm').onclick = () => { close(); onConfirm(); };
		// Click outside the card cancels.
		host.onclick = (e) => { if (e.target === host) close(); };
		// Focus the confirm button for keyboard users.
		setTimeout(() => host.querySelector('.jeo-risk-confirm')?.focus(), 0);
	}

	/* =============== CAROUSEL RENDERING =============== */

	renderCarousels() {
		this.renderSpotlight();
		this.renderContinuePlaying();
		this.renderFavorites();
		this.renderTrending();
		this.renderGlobalTrending();
		this.renderWishlist();
		this.renderCollections();
		this.renderRecent();
		this.renderNewlyAdded();
		this.renderRequestedBtn();
		this.renderTagChips();
		this.bindCarouselArrows();
	}

	/* =============== TAG CHIPS =============== */
	renderTagChips() {
		const row = document.getElementById('tagChipRow');
		if (!row || !this.games) return;
		const tally = new Map();
		for (const g of this.games) {
			if (!g.tags) continue;
			for (const t of g.tags) tally.set(t, (tally.get(t) || 0) + 1);
		}
		const top = [...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
		if (!top.length) { row.classList.add('hidden'); return; }
		row.classList.remove('hidden');
		const active = this.activeTag || null;
		row.innerHTML = top.map(([t, n]) =>
			`<button class="tag-chip${active === t ? ' active' : ''}" data-tag="${this.escapeAttr(t)}">${this.escapeAttr(t)} <span class="tag-count">${n}</span></button>`
		).join('');
		row.querySelectorAll('.tag-chip').forEach(btn => {
			btn.addEventListener('click', () => {
				const tag = btn.dataset.tag;
				this.activeTag = (this.activeTag === tag) ? null : tag;
				this.renderTagChips();
				this.renderGames();
			});
		});
	}

	/* =============== SPOTLIGHT (Game of the Day) =============== */
	pickGameOfTheDay() {
		if (!this.games || this.games.length === 0) return null;
		// Eligibility: skip Flash/retro if user has those toggled off, skip maintenance
		const eligible = this.games.filter(g => {
			if (this.isUnderMaintenance(g)) return false;
			if (!this.showFlash && g.type === 'flash') return false;
			if (!this.showRetro && g.type === 'snes') return false;
			return true;
		});
		if (!eligible.length) return null;
		const day = new Date();
		const seed = day.getUTCFullYear() * 10000 + (day.getUTCMonth() + 1) * 100 + day.getUTCDate();
		// Mulberry32 hash for stable per-day index
		let h = seed >>> 0;
		h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
		h = Math.imul(h ^ (h >>> 12), 0x297a2d39);
		h ^= h >>> 15;
		const idx = (h >>> 0) % eligible.length;
		return eligible[idx];
	}

	renderSpotlight() {
		const sec = document.getElementById('spotlightSection');
		if (!sec) return;
		const today = new Date().toISOString().slice(0, 10);
		const game = this.pickGameOfTheDay();
		// Today's spotlight game doubles as the daily challenge game — set this
		// even when the spotlight is dismissed so the challenge still tracks.
		if (window.JeoDailyChallenge) {
			try { window.JeoDailyChallenge.setGame(game || null); } catch {}
		}
		// Honor dismissal for the day
		if (localStorage.getItem('jeo:spotlight:dismissed') === today) {
			sec.classList.add('hidden');
			return;
		}
		if (!game) { sec.classList.add('hidden'); return; }
		const img = game.image || this.fallbackImage;
		const bg = document.getElementById('spotlightBg');
		const cover = document.getElementById('spotlightCover');
		const title = document.getElementById('spotlightTitle');
		const sub = document.getElementById('spotlightSub');
		const playBtn = document.getElementById('spotlightPlay');
		const skipBtn = document.getElementById('spotlightSkip');
		if (bg) bg.style.backgroundImage = `url('${img}')`;
		if (cover) { cover.style.backgroundImage = `url('${img}')`; cover.setAttribute('aria-label', game.name); }
		if (title) title.textContent = game.name;
		if (sub) {
			const typeLabel = game.type === 'flash' ? '⚡ Flash' : (game.type === 'snes' || game.type === 'gba' ? '🎮 Retro' : '🎮 WebGL');
			sub.textContent = `Today's pick · ${typeLabel}`;
		}
		if (playBtn) playBtn.onclick = () => this.playGame(game);
		if (skipBtn) skipBtn.onclick = () => {
			localStorage.setItem('jeo:spotlight:dismissed', today);
			sec.classList.add('hidden');
		};
		sec.classList.remove('hidden');
	}

	/* =============== CONTINUE PLAYING =============== */
	renderContinuePlaying() {
		const sec = document.getElementById('continueSection');
		if (!sec) return;
		const lastSlug = localStorage.getItem('jeo:lastPlayed');
		if (!lastSlug) { sec.classList.add('hidden'); return; }
		const game = this.games.find(g => g.name === lastSlug);
		if (!game) { sec.classList.add('hidden'); return; }
		const cover = document.getElementById('continueCover');
		const title = document.getElementById('continueTitle');
		const playBtn = document.getElementById('continuePlay');
		const dismissBtn = document.getElementById('continueDismiss');
		if (cover) cover.style.backgroundImage = `url('${game.image || this.fallbackImage}')`;
		if (title) title.textContent = game.name;
		// Continue band's eyebrow gets an inline playtime hint when there's history.
		const eyebrow = sec.querySelector('.continue-eyebrow');
		if (eyebrow) {
			const ms = window.JeoPlaytime ? window.JeoPlaytime.getTotalMs(lastSlug) : 0;
			eyebrow.textContent = ms > 60000
				? '⏱ Continue playing · ' + window.JeoPlaytime.formatDuration(ms)
				: '⏱ Continue playing';
		}
		if (playBtn) playBtn.onclick = () => this.playGame(game);
		if (dismissBtn) dismissBtn.onclick = () => {
			localStorage.removeItem('jeo:lastPlayed');
			sec.classList.add('hidden');
		};
		sec.classList.remove('hidden');
	}

	/* =============== TRENDING (your top this week) =============== */
	renderTrending() {
		const sec = document.getElementById('trendingSection');
		const track = document.getElementById('trendingTrack');
		const count = document.getElementById('trendingCount');
		if (!sec || !track) return;
		const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
		let log = [];
		try { log = JSON.parse(localStorage.getItem('jeo:playlog') || '[]'); } catch {}
		const tally = new Map();
		for (const e of log) {
			if (e.ts < cutoff) continue;
			tally.set(e.slug, (tally.get(e.slug) || 0) + 1);
		}
		// Need 3+ unique games or 5+ total plays to be useful
		const totalPlays = [...tally.values()].reduce((a, b) => a + b, 0);
		if (tally.size < 3 || totalPlays < 5) { sec.classList.add('hidden'); return; }
		const ranked = [...tally.entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 12)
			.map(([slug]) => this.games.find(g => g.name === slug))
			.filter(Boolean);
		if (ranked.length === 0) { sec.classList.add('hidden'); return; }
		sec.classList.remove('hidden');
		if (count) count.textContent = ranked.length;
		track.innerHTML = '';
		ranked.forEach((g, i) => track.appendChild(this.createCarouselCard(g, i)));
	}

	/* =============== WISHLIST =============== */
	getWishlist() {
		try { return JSON.parse(localStorage.getItem('jeo:wishlist') || '[]'); }
		catch { return []; }
	}
	setWishlist(arr) {
		localStorage.setItem('jeo:wishlist', JSON.stringify(arr));
	}
	isWishlisted(name) { return this.getWishlist().includes(name); }
	toggleWishlist(game) {
		const list = this.getWishlist();
		const i = list.indexOf(game.name);
		if (i >= 0) list.splice(i, 1);
		else list.push(game.name);
		this.setWishlist(list);
		this.renderCarousels();
		this.renderGames();
		if (window.JeoToast) window.JeoToast.info(i >= 0 ? 'Removed from Play Later' : 'Saved for later');
		if (window.JeoAchievements) window.JeoAchievements.onEvent('wishlist', { count: list.length });
	}

	/* Renders a one-card empty state inside a carousel track. Returns true if shown. */
	renderCarouselEmptyState(track, opts) {
		track.innerHTML = '';
		if (localStorage.getItem(opts.dismissKey) === '1') return false;
		const card = document.createElement('div');
		card.className = 'carousel-empty';
		card.innerHTML = `
			<div class="carousel-empty-icon" aria-hidden="true">${opts.icon}</div>
			<div class="carousel-empty-body">
				<div class="carousel-empty-title">${opts.title}</div>
				<div class="carousel-empty-hint">${opts.hint}</div>
			</div>
			<button class="carousel-empty-dismiss" aria-label="Dismiss">✕</button>
		`;
		card.querySelector('.carousel-empty-dismiss').addEventListener('click', () => {
			localStorage.setItem(opts.dismissKey, '1');
			this.renderCarousels();
		});
		track.appendChild(card);
		return true;
	}

	renderWishlist() {
		const sec = document.getElementById('wishlistSection');
		const track = document.getElementById('wishlistTrack');
		const count = document.getElementById('wishlistCount');
		if (!sec || !track) return;
		const list = this.getWishlist()
			.map(name => this.games.find(g => g.name === name))
			.filter(Boolean);
		if (list.length === 0) {
			const shown = this.renderCarouselEmptyState(track, {
				dismissKey: 'jeo:emptyDismissed:wishlist',
				icon: '🔖',
				title: 'Save games for later',
				hint: 'Tap the bookmark on any game to add it to Play Later.',
			});
			if (!shown) { sec.classList.add('hidden'); return; }
			sec.classList.remove('hidden');
			if (count) count.textContent = '0';
			return;
		}
		sec.classList.remove('hidden');
		if (count) count.textContent = list.length;
		track.innerHTML = '';
		list.forEach((g, i) => track.appendChild(this.createCarouselCard(g, i)));
	}

	/* =============== COLLECTIONS / PLAYLISTS =============== */
	renderCollections() {
		const sec = document.getElementById('collectionsSection');
		const track = document.getElementById('collectionsTrack');
		const count = document.getElementById('collectionsCount');
		if (!sec || !track || !window.JeoPlaylists) return;
		const all = window.JeoPlaylists.list();
		if (!all.length) { sec.classList.add('hidden'); return; }
		sec.classList.remove('hidden');
		if (count) count.textContent = all.length;
		track.innerHTML = '';
		for (const pl of all) {
			track.appendChild(this.createCollectionCard(pl));
		}
	}

	createCollectionCard(pl) {
		const card = document.createElement('div');
		card.className = 'collection-card';
		card.dataset.id = pl.id;
		card.setAttribute('role', 'button');
		card.setAttribute('tabindex', '0');
		card.setAttribute('aria-label', pl.name + ', ' + pl.slugs.length + ' games');

		const thumbs = document.createElement('div');
		thumbs.className = 'collection-card-thumbs';
		const sample = pl.slugs.slice(0, 4)
			.map(s => this.games.find(g => g.name === s))
			.filter(Boolean);
		if (!sample.length) {
			thumbs.classList.add('empty');
			thumbs.textContent = '📚';
		} else {
			for (let i = 0; i < 4; i++) {
				const cell = document.createElement('div');
				const game = sample[i % sample.length];
				if (game) cell.style.backgroundImage = `url('${game.image || this.fallbackImage}')`;
				thumbs.appendChild(cell);
			}
		}
		card.appendChild(thumbs);

		const meta = document.createElement('div');
		meta.className = 'collection-card-meta';
		const name = document.createElement('div');
		name.className = 'collection-card-name';
		name.textContent = pl.name;
		const cnt = document.createElement('div');
		cnt.className = 'collection-card-count';
		cnt.textContent = pl.slugs.length + ' game' + (pl.slugs.length === 1 ? '' : 's');
		meta.appendChild(name);
		meta.appendChild(cnt);
		card.appendChild(meta);

		const open = () => this.openCollectionModal(pl.id);
		card.addEventListener('click', open);
		card.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
		});
		return card;
	}

	openCollectionModal(id) {
		if (!window.JeoPlaylists) return;
		const pl = window.JeoPlaylists.get(id);
		if (!pl) return;
		const modal = document.getElementById('collectionModal');
		const title = document.getElementById('collectionModalTitle');
		const count = document.getElementById('collectionModalCount');
		const grid = document.getElementById('collectionModalGrid');
		if (!modal || !grid) return;
		title.textContent = pl.name;
		count.textContent = pl.slugs.length + ' game' + (pl.slugs.length === 1 ? '' : 's');
		grid.innerHTML = '';
		const games = pl.slugs.map(s => this.games.find(g => g.name === s)).filter(Boolean);
		if (!games.length) {
			grid.innerHTML = '<div class="empty-state-illustrated"><h3>This collection is empty</h3><p>Open a game and use “📚 Add to…” in the player toolbar.</p></div>';
		} else {
			games.forEach(g => grid.appendChild(this.createCarouselCard(g, 0)));
		}
		modal.classList.remove('hidden');
		modal.setAttribute('aria-hidden', 'false');
		this._activeCollectionId = pl.id;
		document.body.style.overflow = 'hidden';
	}

	closeCollectionModal() {
		const modal = document.getElementById('collectionModal');
		if (!modal) return;
		modal.classList.add('hidden');
		modal.setAttribute('aria-hidden', 'true');
		this._activeCollectionId = null;
		// Only un-freeze body if play modal is also closed
		if (this.playModal && this.playModal.classList.contains('hidden')) {
			document.body.style.overflow = '';
		}
	}

	bindCollectionUI() {
		const newBtn = document.getElementById('newCollectionBtn');
		if (newBtn) newBtn.addEventListener('click', () => this.promptNewCollection());

		const addBtn = document.getElementById('addToCollectionBtn');
		const popover = document.getElementById('collectionsPopover');
		if (addBtn && popover) {
			addBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				const isOpen = !popover.classList.contains('hidden');
				if (isOpen) this.closeCollectionPopover();
				else this.openCollectionPopover();
			});
			document.addEventListener('click', (e) => {
				if (popover.classList.contains('hidden')) return;
				if (e.target.closest('#collectionsPopover')) return;
				if (e.target.closest('#addToCollectionBtn')) return;
				this.closeCollectionPopover();
			});
		}

		const close = document.getElementById('collectionModalClose');
		if (close) close.addEventListener('click', () => this.closeCollectionModal());
		const renameBtn = document.getElementById('collectionRenameBtn');
		if (renameBtn) renameBtn.addEventListener('click', () => {
			if (!this._activeCollectionId) return;
			const pl = window.JeoPlaylists.get(this._activeCollectionId);
			if (!pl) return;
			const next = window.prompt('Rename collection:', pl.name);
			if (!next || !next.trim()) return;
			window.JeoPlaylists.rename(pl.id, next.trim());
			this.openCollectionModal(pl.id);
			this.renderCollections();
		});
		const deleteBtn = document.getElementById('collectionDeleteBtn');
		if (deleteBtn) deleteBtn.addEventListener('click', () => {
			if (!this._activeCollectionId) return;
			if (!window.confirm('Delete this collection? Games inside it will not be removed from your library.')) return;
			window.JeoPlaylists.remove(this._activeCollectionId);
			this.closeCollectionModal();
			this.renderCollections();
			if (window.JeoToast) window.JeoToast.info('Collection deleted.');
		});
	}

	promptNewCollection(slugToAdd) {
		const name = window.prompt('Name your new collection:', '');
		if (!name || !name.trim()) return;
		const pl = window.JeoPlaylists.create(name.trim());
		if (!pl) return;
		if (slugToAdd) window.JeoPlaylists.addGame(pl.id, slugToAdd);
		this.renderCollections();
		if (window.JeoToast) {
			window.JeoToast.success(slugToAdd
				? `Created “${pl.name}” and added this game.`
				: `Created “${pl.name}”.`);
		}
		return pl;
	}

	openCollectionPopover() {
		const popover = document.getElementById('collectionsPopover');
		const addBtn = document.getElementById('addToCollectionBtn');
		if (!popover || !window.JeoPlaylists) return;
		const slug = this.currentGameSlug;
		if (!slug) {
			if (window.JeoToast) window.JeoToast.warning('No game open.');
			return;
		}
		this.renderCollectionPopover(slug);
		popover.classList.remove('hidden');
		popover.setAttribute('aria-hidden', 'false');
		if (addBtn) addBtn.setAttribute('aria-expanded', 'true');
	}

	closeCollectionPopover() {
		const popover = document.getElementById('collectionsPopover');
		const addBtn = document.getElementById('addToCollectionBtn');
		if (!popover) return;
		popover.classList.add('hidden');
		popover.setAttribute('aria-hidden', 'true');
		if (addBtn) addBtn.setAttribute('aria-expanded', 'false');
	}

	/* =============== LEADERBOARD POPOVER (backend-powered) =============== */
	bindLeaderboardUI() {
		const btn = document.getElementById('leaderboardBtn');
		const popover = document.getElementById('leaderboardPopover');
		if (!btn || !popover) return;
		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			if (popover.classList.contains('hidden')) this.openLeaderboardPopover();
			else this.closeLeaderboardPopover();
		});
		document.addEventListener('click', (e) => {
			if (popover.classList.contains('hidden')) return;
			if (e.target.closest('#leaderboardPopover')) return;
			if (e.target.closest('#leaderboardBtn')) return;
			this.closeLeaderboardPopover();
		});
	}

	openLeaderboardPopover() {
		const popover = document.getElementById('leaderboardPopover');
		const btn = document.getElementById('leaderboardBtn');
		if (!popover) return;
		const slug = this.currentGameName || this.currentGameSlug;
		if (!slug) return;
		popover.classList.remove('hidden');
		popover.setAttribute('aria-hidden', 'false');
		if (btn) btn.setAttribute('aria-expanded', 'true');
		if (window.JeoLeaderboard) {
			window.JeoLeaderboard.mount(popover, slug, { kind: this.currentGameLeaderboard || 'score' });
		}
	}

	closeLeaderboardPopover() {
		const popover = document.getElementById('leaderboardPopover');
		const btn = document.getElementById('leaderboardBtn');
		if (!popover) return;
		popover.classList.add('hidden');
		popover.setAttribute('aria-hidden', 'true');
		if (btn) btn.setAttribute('aria-expanded', 'false');
	}

	/* =============== "⋯ MORE" OVERFLOW MENU =============== */
	bindMoreMenu() {
		const btn = document.getElementById('moreBtn');
		const popover = document.getElementById('morePopover');
		if (!btn || !popover) return;
		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			const open = !popover.classList.contains('hidden');
			if (open) this.closeMoreMenu();
			else this.openMoreMenu();
		});
		document.addEventListener('click', (e) => {
			if (popover.classList.contains('hidden')) return;
			if (e.target.closest('#morePopover')) return;
			if (e.target.closest('#moreBtn')) return;
			this.closeMoreMenu();
		});
	}

	openMoreMenu() {
		const popover = document.getElementById('morePopover');
		const btn = document.getElementById('moreBtn');
		if (!popover) return;
		popover.classList.remove('hidden');
		popover.setAttribute('aria-hidden', 'false');
		if (btn) btn.setAttribute('aria-expanded', 'true');
	}

	closeMoreMenu() {
		const popover = document.getElementById('morePopover');
		const btn = document.getElementById('moreBtn');
		if (!popover) return;
		popover.classList.add('hidden');
		popover.setAttribute('aria-hidden', 'true');
		if (btn) btn.setAttribute('aria-expanded', 'false');
	}

	// Handles a `{type:'jeo-score', score}` postMessage from a game iframe.
	// Only games opted into a 'score'-kind leaderboard are accepted, and only
	// from the iframe currently open.
	handleGameScoreMessage(event) {
		if (!this.gameFrame || event.source !== this.gameFrame.contentWindow) return;
		if (this.currentGameLeaderboard !== 'score') return;
		const score = Number(event.data && event.data.score);
		if (!Number.isFinite(score) || score < 0) return;
		const slug = this.currentGameName;
		if (!slug || !window.JeoBackend) return;
		window.JeoBackend.submitScore(slug, score, { kind: 'score' }).then((r) => {
			if (r && r.ok && window.JeoToast) {
				window.JeoToast.info('🏆 Score ' + score.toLocaleString() + ' submitted to the leaderboard.', { ttl: 4000 });
			}
		}).catch(() => {});
	}

	renderCollectionPopover(slug) {
		const popover = document.getElementById('collectionsPopover');
		if (!popover) return;
		popover.innerHTML = '';
		const all = window.JeoPlaylists.list();
		if (!all.length) {
			const empty = document.createElement('div');
			empty.className = 'collections-popover-empty';
			empty.textContent = 'No collections yet — create one below.';
			popover.appendChild(empty);
		} else {
			for (const pl of all) {
				const row = document.createElement('button');
				row.type = 'button';
				row.className = 'collections-popover-row';
				const isIn = pl.slugs.includes(slug);
				if (isIn) row.classList.add('in');
				row.innerHTML = `<span class="check">${isIn ? '✓' : ''}</span><span>${this.escapeAttr(pl.name)}</span><span style="margin-left:auto;color:var(--muted);font-size:11px">${pl.slugs.length}</span>`;
				row.addEventListener('click', () => {
					if (isIn) {
						window.JeoPlaylists.removeGame(pl.id, slug);
						if (window.JeoToast) window.JeoToast.info(`Removed from “${pl.name}”.`);
					} else {
						window.JeoPlaylists.addGame(pl.id, slug);
						if (window.JeoToast) window.JeoToast.success(`Added to “${pl.name}”.`);
					}
					this.renderCollectionPopover(slug);
					this.renderCollections();
				});
				popover.appendChild(row);
			}
		}
		const divider = document.createElement('div');
		divider.className = 'collections-popover-divider';
		popover.appendChild(divider);

		const newRow = document.createElement('div');
		newRow.className = 'collections-popover-new';
		newRow.innerHTML = '<input type="text" maxlength="60" placeholder="New collection name…" /><button type="button">Add</button>';
		const input = newRow.querySelector('input');
		const btn = newRow.querySelector('button');
		const submit = () => {
			const name = (input.value || '').trim();
			if (!name) return;
			const pl = window.JeoPlaylists.create(name);
			if (pl) {
				window.JeoPlaylists.addGame(pl.id, slug);
				if (window.JeoToast) window.JeoToast.success(`Created “${pl.name}” and added this game.`);
				input.value = '';
				this.renderCollectionPopover(slug);
				this.renderCollections();
			}
		};
		btn.addEventListener('click', submit);
		input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
		popover.appendChild(newRow);
		setTimeout(() => input.focus(), 50);
	}

	renderFavorites() {
		const favGames = this.favorites
			.map(name => this.games.find(g => g.name === name))
			.filter(Boolean);

		if (favGames.length === 0) {
			const shown = this.renderCarouselEmptyState(this.favoritesTrack, {
				dismissKey: 'jeo:emptyDismissed:favorites',
				icon: '❤️',
				title: 'Favorite games appear here',
				hint: 'Tap the ♡ on any game card to pin it to this row.',
			});
			if (!shown) { this.favoritesSection.classList.add('hidden'); return; }
			this.favoritesSection.classList.remove('hidden');
			this.favCount.textContent = '0';
			return;
		}
		this.favoritesSection.classList.remove('hidden');
		this.favCount.textContent = favGames.length;
		this.favoritesTrack.innerHTML = '';
		favGames.forEach((g, i) => {
			this.favoritesTrack.appendChild(this.createCarouselCard(g, i));
		});
	}

	renderRecent() {
		const recentGames = this.recentlyPlayed
			.map(name => this.games.find(g => g.name === name))
			.filter(Boolean);

		if (recentGames.length === 0) {
			this.recentSection.classList.add('hidden');
			return;
		}
		this.recentSection.classList.remove('hidden');
		this.recentCount.textContent = recentGames.length;
		this.recentTrack.innerHTML = '';
		recentGames.forEach((g, i) => {
			this.recentTrack.appendChild(this.createCarouselCard(g, i));
		});
	}

	renderRequestedBtn() {
		if (!this.requestedSection) return;
		const requestedGames = this.games.filter(g => g.requested);
		
		if (requestedGames.length === 0) {
			this.requestedSection.classList.add('hidden');
			return;
		}
		
		this.requestedSection.classList.remove('hidden');
		if (this.requestedCount) this.requestedCount.textContent = requestedGames.length;
		
		if (this.requestedTrack) {
			this.requestedTrack.innerHTML = '';
			requestedGames.forEach((g, i) => {
				this.requestedTrack.appendChild(this.createCarouselCard(g, i));
			});
		}
	}

	renderNewlyAdded() {
		const newGames = this.newlyAddedNames
			.map(item => {
				const gameName = typeof item === 'string' ? item : item.name;
				return this.games.find(g => g.name === gameName);
			})
			.filter(Boolean);

		if (newGames.length === 0) {
			if (this.newlyAddedSection) this.newlyAddedSection.classList.add('hidden');
			return;
		}
		if (this.newlyAddedSection) this.newlyAddedSection.classList.remove('hidden');

		if (this.newlyAddedCount) {
			this.newlyAddedCount.textContent = newGames.length;
		}

		if (this.newlyAddedTrack) {
			this.newlyAddedTrack.innerHTML = '';
			newGames.forEach((g, i) => {
				this.newlyAddedTrack.appendChild(this.createCarouselCard(g, i));
			});
		}
	}

	/* =============== GLOBAL TRENDING (backend-powered) =============== */
	async renderGlobalTrending() {
		const sec = this.globalTrendingSection;
		const track = this.globalTrendingTrack;
		if (!sec || !track) return;
		if (!window.JeoBackend) { sec.classList.add('hidden'); return; }
		// Cache the backend list for ~2 min so the many renderCarousels() calls
		// (every favorite toggle, every play) don't each hit the network.
		const now = Date.now();
		if (!this._trendingCache || now - this._trendingCache.ts > 120000) {
			this._trendingCache = { ts: now, entries: this._trendingCache ? this._trendingCache.entries : [] };
			try {
				const entries = await window.JeoBackend.getTrending({ window: '24h', limit: 20 });
				this._trendingCache = { ts: Date.now(), entries: entries || [] };
			} catch {
				this._trendingCache = { ts: Date.now(), entries: [] };
			}
		}
		// Prime the play-count map from the trending response itself so cards
		// show "▶ N" on first paint instead of waiting on /api/counts.
		this._playCounts = this._playCounts || {};
		for (const e of this._trendingCache.entries) {
			if (e && e.plays != null) this._playCounts[e.slug] = e.plays;
		}
		// Map backend slugs onto the local catalog; respect the same filters
		// the main grid uses so hidden/maintenance games don't leak in.
		const games = [];
		for (const e of this._trendingCache.entries) {
			const g = this.games.find(x => x.name === e.slug);
			if (!g) continue;
			if (this.hideMaintenance && this.isUnderMaintenance(g)) continue;
			if (!this.showFlash && g.type === 'flash') continue;
			if (!this.showRetro && g.type === 'snes') continue;
			games.push(g);
		}
		if (!games.length) { sec.classList.add('hidden'); return; }
		sec.classList.remove('hidden');
		if (this.globalTrendingCount) this.globalTrendingCount.textContent = games.length;
		track.innerHTML = '';
		games.forEach((g, i) => {
			const card = this.createCarouselCard(g, i);
			// Rank chip — only the top 10 get one; first three are medal-styled.
			if (i < 10) card.dataset.rank = String(i + 1);
			track.appendChild(card);
		});
	}

	// Fetches all-time play counts + global ratings once and re-renders so
	// cards show a "▶ N" play count and a "★ 4.3 (1.2k)" global rating badge.
	// Backend-powered; a silent no-op when the backend is down (cards keep
	// showing the user's personal star as the fallback).
	async loadPlayCounts() {
		if (!window.JeoBackend) return;
		let changed = false;
		try {
			const counts = await window.JeoBackend.getAllCounts();
			if (counts && Object.keys(counts).length) {
				this._playCounts = counts;
				changed = true;
			}
		} catch {}
		try {
			const ratings = await window.JeoBackend.getAllRatings();
			if (ratings && Object.keys(ratings).length) {
				this._globalRatings = ratings;
				changed = true;
			}
		} catch {}
		if (changed) {
			this.renderGames();
			this.renderCarousels();
		}
	}

	// Returns the HTML for a card's rating badge. Prefers the global average
	// when available (the discovery signal); falls back to the user's personal
	// star so the card isn't empty when the backend isn't deployed yet.
	ratingBadgeHtml(slug) {
		const g = this._globalRatings && this._globalRatings[slug];
		if (g && g.count >= 1) {
			const avg = Number(g.avg).toFixed(1);
			const count = this.formatPlayCount ? this.formatPlayCount(g.count) : String(g.count);
			return '<span class="rating-badge" title="' + g.count + ' ratings">★ ' + avg + ' <small>(' + count + ')</small></span>';
		}
		const personal = window.JeoRatings ? window.JeoRatings.get(slug) : 0;
		if (personal) return '<span class="rating-badge" title="Your rating">★ ' + personal + '</span>';
		return '';
	}

	// 1234 -> "1.2k", 1200000 -> "1.2m". Keeps the card badge compact.
	formatPlayCount(n) {
		n = Number(n) || 0;
		if (n < 1000) return String(n);
		if (n < 1000000) {
			const k = n / 1000;
			return (k < 10 ? k.toFixed(1).replace(/\.0$/, '') : String(Math.round(k))) + 'k';
		}
		return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
	}

	// "⏱ 2h 14m played · 8 sessions" in the player toolbar — only shown when
	// there's at least a minute of recorded history for this game.
	updatePlaytimeChip(slug) {
		const el = this.playerPlaytime;
		if (!el) return;
		el.classList.add('hidden');
		el.textContent = '';
		if (!slug || !window.JeoPlaytime) return;
		const ms = window.JeoPlaytime.getTotalMs(slug);
		if (ms < 60000) return;
		const n = window.JeoPlaytime.getSessionCount(slug);
		el.textContent = '⏱ ' + window.JeoPlaytime.formatDuration(ms) +
			' · ' + n + (n === 1 ? ' session' : ' sessions');
		el.classList.remove('hidden');
	}

	// "💾 3" chip showing the number of saved snapshots for the open game.
	async updateSavesBadge(slug) {
		const el = this.playerSavesBadge;
		if (!el) return;
		el.classList.add('hidden');
		el.textContent = '';
		if (!slug || !window.JeoSaves) return;
		try {
			const saves = await window.JeoSaves.listSaves(slug);
			if (saves && saves.length) {
				el.textContent = '💾 ' + saves.length;
				el.classList.remove('hidden');
				el.title = saves.length + ' saved snapshot' + (saves.length === 1 ? '' : 's');
			}
		} catch {}
	}

	// Live "Saved Xs ago" refresh inside the save sidebar — runs only while
	// the sidebar is open so it never wakes a backgrounded tab needlessly.
	startSaveStatusTicker() {
		this.stopSaveStatusTicker();
		const sb = document.getElementById('saveSidebar');
		const status = document.getElementById('saveSidebarStatus');
		if (!sb || !status) return;
		this._saveStatusTicker = setInterval(() => {
			if (!sb || sb.classList.contains('hidden') || !window.JeoSaves) {
				this.stopSaveStatusTicker();
				return;
			}
			const last = window.JeoSaves.getLastAutoSaveAt();
			status.textContent = last ? 'Auto-save: ' + this.formatRelTime(last) : 'Auto-save active';
		}, 10000);
	}
	stopSaveStatusTicker() {
		if (this._saveStatusTicker) { clearInterval(this._saveStatusTicker); this._saveStatusTicker = null; }
	}

	// "☁ Sync saves" — push local manuals up, pull cloud-only manuals down.
	// Backend-gated; degrades to a warning toast when unreachable.
	async runCloudSync() {
		const slug = this.currentGameName || this.currentGameSlug;
		const btn = document.getElementById('cloudSyncBtn');
		if (!slug || !window.JeoSaves || !window.JeoSaves.cloudSync) {
			if (window.JeoToast) window.JeoToast.warning('No game open.');
			return;
		}
		if (btn) { btn.disabled = true; btn.textContent = '☁ Syncing…'; }
		try {
			const res = await window.JeoSaves.cloudSync(slug);
			if (!res || !res.ok) {
				if (window.JeoToast) window.JeoToast.warning(
					res && res.reason === 'no-backend'
						? 'Cloud sync is offline right now.'
						: 'Sync failed. Try again later.'
				);
			} else {
				const parts = [];
				if (res.pushed) parts.push(res.pushed + ' uploaded');
				if (res.pulled) parts.push(res.pulled + ' downloaded');
				if (!parts.length) parts.push('already in sync');
				if (window.JeoToast) window.JeoToast.success('☁ ' + parts.join(' · '));
				this.refreshSaveSidebar();
				this.updateSavesBadge(slug);
			}
		} catch (e) {
			if (window.JeoToast) window.JeoToast.error('Sync error: ' + (e.message || e));
		} finally {
			if (btn) { btn.disabled = false; btn.textContent = '☁ Sync saves'; }
		}
	}

	// Snapshot of "X playing now" for the open game, shown in the player toolbar.
	updatePresenceBadge(slug) {
		const el = this.playerPresence;
		if (!el) return;
		el.classList.add('hidden');
		el.textContent = '';
		if (!slug || !window.JeoBackend) return;
		window.JeoBackend.getPresence(slug).then((count) => {
			if (this._presenceSlug !== slug) return; // a different game opened since
			if (count && count > 0) {
				el.textContent = '👥 ' + count + ' playing now';
				el.classList.remove('hidden');
			}
		}).catch(() => {});
	}

	createCarouselCard(g, index = 0) {
		const imgSrc = g.image || this.fallbackImage;
		const isFav = this.isFavorite(g.name);
		const statusKind = this.gameStatusKind(g);
		const isFail = statusKind === 'broken' || statusKind === 'maintenance';
		const safeName = this.escapeAttr(g.name);
		const safeImg = this.escapeAttr(imgSrc);
		const safeFallback = this.escapeAttr(this.fallbackImage);

		let statusBadge = '';
		if (statusKind === 'broken') statusBadge = '<span class="status-badge status-broken" title="Confirmed broken">✕ Broken</span>';
		else if (statusKind === 'maintenance') statusBadge = '<span class="status-badge status-maintenance" title="Marked under maintenance">⚠ Maintenance</span>';
		else if (statusKind === 'unverified') statusBadge = '<span class="status-badge status-unverified" title="Not recently verified">? Unverified</span>';
		const ratingBadge = this.ratingBadgeHtml(g.name);
		const plays = this._playCounts && this._playCounts[g.name];
		const playBadge = plays ? '<span class="play-count-badge">▶ ' + this.formatPlayCount(plays) + '</span>' : '';

		const card = document.createElement('div');
		const stateClass = statusKind ? ' card-status-' + statusKind : '';
		card.className = 'carousel-card' + (isFail ? ' under-maintenance' : '') + stateClass;
		card.style.setProperty('--card-img', "url('" + imgSrc.replace(/'/g, "\\'") + "')");
		card.dataset.slug = g.name;
		const img = '<img src="' + safeImg + '" alt="' + safeName + '" width="240" height="150" loading="lazy"'
			+ ' onload="this.classList.add(\'loaded\')"'
			+ ' onerror="this.onerror=null;this.classList.add(\'loaded\');this.src=\'' + safeFallback + '\';" />';
		card.innerHTML =
			'<div class="game-thumb">' + img +
				'<button class="heart-btn' + (isFav ? ' hearted' : '') + '" data-game="' + safeName + '" aria-label="Favorite">' + (isFav ? '♥' : '♡') + '</button>' +
				statusBadge + ratingBadge + playBadge +
			'</div>' +
			'<div class="game-card-content"><div class="game-card-title">' + safeName + '</div></div>';
		card.querySelector('.heart-btn').addEventListener('click', (e) => { e.stopPropagation(); this.toggleFavorite(g, e.currentTarget); });
		card.addEventListener('click', (e) => {
			if (e.target.closest('.heart-btn')) return;
			this.playGame(g);
		});
		if (index < 16) card.style.animationDelay = (index * 0.05) + 's';
		return card;
	}

	bindCarouselArrows() {
		// Single delegated listener — avoids the clone-node leak this used to do.
		if (this._carouselArrowsBound) return;
		this._carouselArrowsBound = true;
		document.addEventListener('click', (e) => {
			const btn = e.target.closest('.carousel-arrow');
			if (!btn) return;
			const trackId = btn.dataset.target;
			const track = trackId && document.getElementById(trackId);
			if (!track) return;
			const scrollAmt = track.clientWidth * 0.7;
			if (btn.classList.contains('carousel-arrow-left')) {
				track.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
			} else {
				track.scrollBy({ left: scrollAmt, behavior: 'smooth' });
			}
		});
	}

	escapeAttr(str) {
		return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	openPlayer(url, game) {
		var target = url;
		if (!target.match(/\.(html|swf)(\?|$)/i)) {
			if (target.endsWith('/')) target += 'index.html';
			else target += '/index.html';
		}
		this.currentGameUrl = target;
		this.currentGameSlug = this.deriveSlugFromUrl(target);
		this.currentGameName = game ? game.name : this.currentGameSlug;
		this.currentSessionStart = Date.now();
		// Reflect current game in URL so the page can be shared / bookmarked.
		this.setShareHash(game ? game.name : this.currentGameSlug);
		// Mount the rating widget for this game in the player toolbar
		this.mountRatingWidget(game ? game.name : this.currentGameSlug);
		if (window.JeoSaves && this.currentGameSlug) {
			try { window.JeoSaves.bindGame(this.currentGameSlug); } catch {}
			this.refreshSaveSidebar();
		}

		// Live presence — heartbeat while playing, show "X playing now".
		// Keyed on game.name to match recordPlay / trending slugs.
		this._presenceSlug = game ? game.name : this.currentGameSlug;
		this.updatePresenceBadge(this._presenceSlug);
		if (window.JeoBackend && this._presenceSlug) {
			try { window.JeoBackend.startPresence(this._presenceSlug); } catch {}
		}

		// Leaderboard: only games opted into one show the "🏆 Scores" button.
		this.currentGameLeaderboard = game ? (game.leaderboard || null) : null;
		const lbBtn = document.getElementById('leaderboardBtn');
		if (lbBtn) lbBtn.classList.toggle('hidden', !this.currentGameLeaderboard);
		this.closeLeaderboardPopover();

		// Per-game playtime + save-count chips (local, always available).
		this.updatePlaytimeChip(this._presenceSlug);
		this.updateSavesBadge(this._presenceSlug);

		const loadingOverlay = document.getElementById('gameLoadingOverlay');
		const loadingGameTitle = document.getElementById('loadingGameTitle');
		const loadingDynamicBg = document.getElementById('loadingDynamicBg');
		const progressBar = document.getElementById('loadingProgressBar');
		
		if (loadingGameTitle && game) loadingGameTitle.textContent = `Loading ${game.name}...`;
		if (loadingDynamicBg && game && game.image) loadingDynamicBg.style.backgroundImage = `url('${game.image}')`;
		if (progressBar) progressBar.style.width = '10%';

		if (loadingOverlay) {
			loadingOverlay.classList.remove('hidden');
			loadingOverlay.classList.remove('show-skip');
		}

		// Progress Tracking Initialization
		this.currentLoadingGame = game;
		this.loadedBytes.clear();
		this.totalGameSize = game ? (game.size || 0) : 0;
		// Clear any leftover timers from a previous open
		if (this._loadingTimers) this._loadingTimers.forEach(clearTimeout);
		if (this._loadingIntervals) this._loadingIntervals.forEach(clearInterval);
		this._loadingTimers = [];
		this._loadingIntervals = [];

		// Tips rotation
		const tips = [
			"Jeo is fetching your game...",
			"Tip: Use Tab Cloaker if the teacher walks by...",
			"Reticulating splines...",
			"Downloading more RAM...",
			"Preparing the fun...",
			"Did you know? You can favorite games to find them faster!",
		];
		const rotatingTip = document.getElementById('rotatingTip');
		let tipIndex = 0;
		let tipInterval = null;
		
		const startTips = () => {
			if (rotatingTip) {
				rotatingTip.textContent = tips[0];
				tipInterval = setInterval(() => {
					// Don't rotate tips if we are showing real progress
					if (this.loadedBytes.size > 0 && this.totalGameSize > 0) return;

					tipIndex = (tipIndex + 1) % tips.length;
					rotatingTip.style.opacity = 0;
					setTimeout(() => {
						rotatingTip.textContent = tips[tipIndex];
						rotatingTip.style.opacity = 1;
					}, 300);
				}, 3000);
				this._loadingIntervals.push(tipInterval);
			}
		};
		startTips();

		// Show modal first so iframe layout doesn't break
		this.playModal.classList.remove('hidden');
		this.playModal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		
		// Move iframe off-screen
		this.gameFrame.classList.add('offscreen-iframe');
		this.gameFrame.src = target;

		// Fake progress (acts as a baseline if no assets are tracked yet)
		let progress = 10;
		const progressInterval = setInterval(() => {
			// If we have real progress updates, stop the fake one
			if (this.loadedBytes.size > 0 && this.totalGameSize > 0) {
				clearInterval(progressInterval);
				return;
			}
			if (progress < 90) {
				progress += Math.random() * 15;
				if (progress > 90) progress = 90;
				if (progressBar) progressBar.style.width = `${progress}%`;
			}
		}, 500);
		this._loadingIntervals.push(progressInterval);

		let iframeLoaded = false;
		let minTimeElapsed = false;
		this.gameReadyReceived = false;

		this.hideOverlayFn = () => {
			// Requirements to hide:
			// 1. Min time (1.2s) passed
			// 2. Iframe loaded
			// 3. IF it's a complex game (has size > 1MB), wait for GAME_READY OR 90% progress
			const isLargeGame = this.totalGameSize > 1024 * 1024;
			const readyToHide = iframeLoaded && minTimeElapsed && (!isLargeGame || this.gameReadyReceived || progress >= 90);

			if (loadingOverlay && readyToHide) {
				clearInterval(progressInterval);
				if (tipInterval) clearInterval(tipInterval);
				if (progressBar) progressBar.style.width = '100%';
				setTimeout(() => {
					loadingOverlay.classList.add('hidden');
					loadingOverlay.classList.remove('show-skip');
					this.gameFrame.classList.remove('offscreen-iframe');
					this.gameFrame.focus();
					this.hideOverlayFn = null;
				}, 400);
			}
		};

		// Enforce a minimum 1.2 second display time (snappier than 2s)
		this._loadingTimers.push(setTimeout(() => {
			minTimeElapsed = true;
			if (this.hideOverlayFn) this.hideOverlayFn();
		}, 1200));

		// Reveal a manual "Show game" skip button after 4s for impatient users
		this._loadingTimers.push(setTimeout(() => {
			if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
				loadingOverlay.classList.add('show-skip');
			}
		}, 4000));

		// Hide overlay after iframe loads
		this.gameFrame.onload = () => {
			iframeLoaded = true;
			if (this.hideOverlayFn) this.hideOverlayFn();
		};

		// Ultimate fallback
		this._loadingTimers.push(setTimeout(() => {
			if (this.hideOverlayFn) {
				this.gameReadyReceived = true; // Force it
				this.hideOverlayFn();
			}
		}, 15000));
	}

	skipLoadingOverlay() {
		// User-initiated bypass: force-hide the overlay even if iframe hasn't fired onload yet.
		const loadingOverlay = document.getElementById('gameLoadingOverlay');
		if (!loadingOverlay) return;
		if (this._loadingIntervals) this._loadingIntervals.forEach(clearInterval);
		this._loadingIntervals = [];
		loadingOverlay.classList.add('hidden');
		loadingOverlay.classList.remove('show-skip');
		this.gameFrame.classList.remove('offscreen-iframe');
		this.gameFrame.focus();
		this.hideOverlayFn = null;
	}

	toggleFullscreen() {
		const modalInner = this.playModal.querySelector('.modal-inner');
		if (!document.fullscreenElement) {
			(modalInner.requestFullscreen || modalInner.webkitRequestFullscreen || modalInner.msRequestFullscreen).call(modalInner);
		} else {
			(document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
		}
	}

	openGameInNewTab() {
		if (this.currentGameUrl) {
			window.open(this.currentGameUrl, '_blank');
		}
	}

	initRatingsSync() {
		if (!window.JeoRatings) return;
		window.JeoRatings.onChange((slug, stars) => this.updateRatingBadge(slug, stars));
	}

	updateRatingBadge(slug, stars) {
		const cards = document.querySelectorAll('.game-card[data-slug], .carousel-card[data-slug]');
		cards.forEach(card => {
			if (card.dataset.slug !== slug) return;
			const thumb = card.querySelector('.game-thumb');
			if (!thumb) return;
			let badge = thumb.querySelector('.rating-badge');
			if (stars > 0) {
				if (!badge) {
					badge = document.createElement('span');
					badge.className = 'rating-badge';
					thumb.appendChild(badge);
				}
				badge.textContent = '★ ' + stars;
			} else if (badge) {
				badge.remove();
			}
		});
	}

	mountRatingWidget(slug) {
		const slot = document.getElementById('playerRatingSlot');
		if (!slot) return;
		slot.innerHTML = '';
		if (!slug || !window.JeoRatings) return;
		const widget = window.JeoRatings.buildWidget(slug, { size: 18, interactive: true });
		slot.appendChild(widget);
	}

	/* =============== DEEP LINKS =============== */
	initDeepLinks() {
		this._suppressHashChange = false;
		window.addEventListener('hashchange', () => {
			if (this._suppressHashChange) { this._suppressHashChange = false; return; }
			this.resolvePendingDeepLink();
		});
		// First resolution happens after the catalog loads (called from reloadGames).
	}

	parseGameSlugFromHash() {
		const h = String(window.location.hash || '').replace(/^#/, '');
		if (!h) return null;
		const parts = h.split('&').map(p => p.trim()).filter(Boolean);
		for (const p of parts) {
			const eq = p.indexOf('=');
			if (eq < 0) continue;
			const k = decodeURIComponent(p.slice(0, eq));
			const v = decodeURIComponent(p.slice(eq + 1));
			if (k === 'game' && v) return v;
		}
		return null;
	}

	resolvePendingDeepLink() {
		const slug = this.parseGameSlugFromHash();
		if (!slug || !Array.isArray(this.games) || !this.games.length) return;
		// If the player is already showing this slug, do nothing.
		if (this.currentGameSlug === slug && this.playModal && !this.playModal.classList.contains('hidden')) return;
		const target = slug.toLowerCase();
		const game = this.games.find(g => String(g.name).toLowerCase() === target);
		if (!game) {
			if (window.JeoToast) window.JeoToast.warning(`No game named "${slug}" — clearing link.`);
			this.setShareHash(null);
			return;
		}
		this.playGame(game);
	}

	setShareHash(slug) {
		const target = slug ? '#game=' + encodeURIComponent(slug) : '';
		const cur = window.location.hash || '';
		if (cur === target) return;
		this._suppressHashChange = true;
		try {
			const base = window.location.pathname + window.location.search;
			history.replaceState(null, '', target ? base + target : base);
		} catch (e) { /* fall through */ }
	}

	copyShareLink() {
		if (!this.currentGameSlug) return;
		const url = window.location.origin + window.location.pathname + '#game=' + encodeURIComponent(this.currentGameSlug);
		const done = () => {
			if (window.JeoToast) window.JeoToast.success('Link copied to clipboard.');
			if (window.JeoAchievements) { try { window.JeoAchievements.emit('share', { slug: this.currentGameSlug }); } catch {} }
		};
		const fail = (e) => {
			console.warn('clipboard copy failed', e);
			if (window.JeoToast) window.JeoToast.warning('Could not copy. Link: ' + url, { ttl: 8000 });
		};
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(url).then(done).catch(fail);
		} else {
			try {
				const ta = document.createElement('textarea');
				ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
				document.body.appendChild(ta); ta.select();
				document.execCommand('copy');
				ta.remove();
				done();
			} catch (e) { fail(e); }
		}
	}

	closePlayer() {
		// Clear any in-flight loading timers/intervals so they don't fire after close.
		if (this._loadingTimers) this._loadingTimers.forEach(clearTimeout);
		if (this._loadingIntervals) this._loadingIntervals.forEach(clearInterval);
		this._loadingTimers = [];
		this._loadingIntervals = [];
		const _overlay = document.getElementById('gameLoadingOverlay');
		if (_overlay) { _overlay.classList.add('hidden'); _overlay.classList.remove('show-skip'); }
		this.hideOverlayFn = null;
		this.closeCollectionPopover();

		if (window.JeoSaves) {
			try { window.JeoSaves.unbindGame(); } catch {}
		}
		// Record session duration
		if (this.currentGameSlug && this.currentSessionStart) {
			const dur = Date.now() - this.currentSessionStart;
			if (dur > 5000 && dur < 12 * 60 * 60 * 1000) {
				try {
					const log = JSON.parse(localStorage.getItem('jeo:sessions') || '[]');
					log.push({ slug: this.currentGameSlug, start: this.currentSessionStart, dur });
					while (log.length > 500) log.shift();
					localStorage.setItem('jeo:sessions', JSON.stringify(log));
				} catch {}
				if (window.JeoAnalytics) window.JeoAnalytics.trackGamePlayTime(this.currentGameName, dur / 1000);
				// 'time'-kind leaderboard games auto-submit the session length
				// as the score ("longest run") — no game cooperation needed.
				if (this.currentGameLeaderboard === 'time' && window.JeoBackend && this.currentGameName) {
					window.JeoBackend.submitScore(this.currentGameName, dur, { kind: 'time' }).then((r) => {
						if (r && r.ok && window.JeoToast && window.JeoLeaderboard) {
							window.JeoToast.info('🏆 ' + window.JeoLeaderboard.fmtScore(dur, 'time') + ' run submitted to the leaderboard.', { ttl: 4000 });
						}
					}).catch(() => {});
				}
			}
			if (window.JeoAchievements) {
				try { window.JeoAchievements.emit('session-end', { slug: this.currentGameSlug, dur, type: this._lastPlayType }); } catch {}
			}
		}
		this.currentSessionStart = null;
		// Stop the presence heartbeat + clear the "X playing now" badge.
		if (window.JeoBackend) { try { window.JeoBackend.stopPresence(); } catch {} }
		this._presenceSlug = null;
		if (this.playerPresence) { this.playerPresence.classList.add('hidden'); this.playerPresence.textContent = ''; }
		// Close + reset the leaderboard popover for the next game.
		this.closeLeaderboardPopover();
		this.closeMoreMenu();
		this.currentGameLeaderboard = null;
		// Hide the per-game chips and stop the save-status ticker.
		if (this.playerPlaytime) { this.playerPlaytime.classList.add('hidden'); this.playerPlaytime.textContent = ''; }
		if (this.playerSavesBadge) { this.playerSavesBadge.classList.add('hidden'); this.playerSavesBadge.textContent = ''; }
		this.stopSaveStatusTicker();
		const sb = document.getElementById('saveSidebar');
		if (sb) { sb.classList.add('hidden'); sb.setAttribute('aria-hidden','true'); }
		this.gameFrame.src = 'about:blank';
		this.playModal.classList.add('hidden');
		this.playModal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
		this.gameFrame.classList.remove('offscreen-iframe');
		this.currentGameSlug = null;
		this.setShareHash(null);
	}

	deriveSlugFromUrl(url) {
		try {
			const m = String(url || '').match(/Assets\/([^\/]+)\//i);
			return m ? decodeURIComponent(m[1]) : null;
		} catch { return null; }
	}

	formatRelTime(ts) {
		const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
		if (s < 60) return s + 's ago';
		const m = Math.floor(s / 60);
		if (m < 60) return m + 'm ago';
		const h = Math.floor(m / 60);
		if (h < 24) return h + 'h ago';
		const d = Math.floor(h / 24);
		return d + 'd ago';
	}

	async refreshSaveSidebar() {
		const list = document.getElementById('saveSidebarList');
		const status = document.getElementById('saveSidebarStatus');
		if (!list || !window.JeoSaves || !this.currentGameSlug) return;
		const saves = await window.JeoSaves.listSaves(this.currentGameSlug);
		if (status) {
			const last = window.JeoSaves.getLastAutoSaveAt();
			status.textContent = last ? 'Auto-save: ' + this.formatRelTime(last) : 'Auto-save active';
		}
		if (!saves.length) {
			list.innerHTML = '<p class="save-empty">No saves yet for this game. Press <kbd>Ctrl/Cmd+S</kbd> while playing.</p>';
			return;
		}
		const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
		list.innerHTML = saves.map(r => `
			<div class="save-row${r.pinned ? ' pinned' : ''}" data-id="${r.id}">
				<div class="save-row-head">
					<span class="save-row-kind ${r.kind}">${r.pinned ? '📌 ' : ''}${esc(r.kind)}</span>
					<span class="save-row-label">${esc(r.label || '(no label)')}</span>
				</div>
				<div class="save-row-time">${this.formatRelTime(r.ts)} · ${new Date(r.ts).toLocaleString()}</div>
				<div class="save-row-actions">
					<button data-act="restore">↩ Restore</button>
					<button data-act="pin">${r.pinned ? '📍 Unpin' : '📌 Pin'}</button>
					<button data-act="delete" class="danger">🗑 Delete</button>
				</div>
			</div>
		`).join('');
	}

	async handleSaveAction(id, action) {
		if (!window.JeoSaves) return;
		try {
			if (action === 'restore') {
				if (!window.confirm('Restore this save? The game iframe will reload to apply changes.')) return;
				await window.JeoSaves.restoreSave(id);
				this.gameFrame.src = this.currentGameUrl + '?_r=' + Date.now();
			} else if (action === 'pin') {
				const saves = await window.JeoSaves.listSaves(this.currentGameSlug);
				const cur = saves.find(s => s.id === id);
				await window.JeoSaves.pinSave(id, !cur?.pinned);
			} else if (action === 'delete') {
				if (!window.confirm('Delete this save? This cannot be undone.')) return;
				await window.JeoSaves.deleteSave(id);
			}
			this.refreshSaveSidebar();
		} catch (e) {
			console.error('save action failed', e);
			const msg = 'Save action failed: ' + (e.message || e);
			if (window.JeoToast) window.JeoToast.error(msg, {
				action: { label: 'Retry', onClick: () => this.handleSaveAction(id, action) }
			});
			else alert(msg);
		}
	}

	async saveNowFromSidebar(withLabel = false) {
		if (!window.JeoSaves || !this.currentGameSlug) return;
		let label = '';
		if (withLabel) {
			label = window.prompt('Label this save:', '') || '';
			if (!label.trim()) return;
		}
		try {
			await window.JeoSaves.saveNow({ slug: this.currentGameSlug, kind: 'manual', label: label.trim() });
			this.refreshSaveSidebar();
			if (window.JeoToast) window.JeoToast.success(label ? `Saved “${label}”` : 'Saved.');
		} catch (e) {
			console.error('saveNow failed', e);
			const msg = 'Save failed: ' + (e.message || e);
			if (window.JeoToast) window.JeoToast.error(msg, {
				action: { label: 'Retry', onClick: () => this.saveNowFromSidebar(withLabel) }
			});
			else alert(msg);
		}
	}

	/* =============== TAB CLOAKER =============== */

	initCloaker() {
		this.originalTitle = document.title;
		this.originalFavicon = this.getCurrentFavicon();

		// Restore saved cloak
		const savedCloak = JSON.parse(localStorage.getItem('jeo-cloak') || 'null');
		if (savedCloak) {
			this.applyCloak(savedCloak.title, savedCloak.icon, false);
		}

		// Preset buttons
		document.querySelectorAll('.cloaker-preset').forEach(btn => {
			btn.addEventListener('click', () => {
				const title = btn.dataset.title;
				const icon = btn.dataset.icon;
				this.applyCloak(title, icon, true);
				this.highlightActivePreset(title, icon);
				if (window.JeoAnalytics) window.JeoAnalytics.trackCloakerChange(title);
				// Populate custom inputs
				const ti = document.getElementById('cloakerTitle');
				const ii = document.getElementById('cloakerIcon');
				if (ti) ti.value = title;
				if (ii) ii.value = icon;
			});
		});

		// Custom apply
		const applyBtn = document.getElementById('cloakerApply');
		if (applyBtn) {
			applyBtn.addEventListener('click', () => {
				const title = (document.getElementById('cloakerTitle').value || '').trim();
				const icon = (document.getElementById('cloakerIcon').value || '').trim();
				if (title || icon) {
					this.applyCloak(title || document.title, icon || '', true);
					this.highlightActivePreset(null, null);
					if (window.JeoAnalytics) window.JeoAnalytics.trackCloakerChange('custom');
				}
			});
		}

		// Reset
		const resetBtn = document.getElementById('cloakerReset');
		if (resetBtn) {
			resetBtn.addEventListener('click', () => {
				this.resetCloak();
			});
		}

		// Highlight current preset if saved
		if (savedCloak) {
			this.highlightActivePreset(savedCloak.title, savedCloak.icon);
			const ti = document.getElementById('cloakerTitle');
			const ii = document.getElementById('cloakerIcon');
			if (ti) ti.value = savedCloak.title || '';
			if (ii) ii.value = savedCloak.icon || '';
		}
	}

	getCurrentFavicon() {
		const link = document.querySelector('link[rel*="icon"]');
		return link ? link.href : '';
	}

	applyCloak(title, iconUrl, save) {
		if (title) document.title = title;
		if (iconUrl) {
			let link = document.querySelector('link[rel*="icon"]');
			if (!link) {
				link = document.createElement('link');
				link.rel = 'icon';
				document.head.appendChild(link);
			}
			link.href = iconUrl;
			link.type = 'image/x-icon';
		}
		if (save) {
			localStorage.setItem('jeo-cloak', JSON.stringify({ title: title, icon: iconUrl }));
		}
	}

	resetCloak() {
		document.title = this.originalTitle;
		const link = document.querySelector('link[rel*="icon"]');
		if (link && this.originalFavicon) {
			link.href = this.originalFavicon;
		} else if (link) {
			link.remove();
		}
		localStorage.removeItem('jeo-cloak');
		this.highlightActivePreset(null, null);
		const ti = document.getElementById('cloakerTitle');
		const ii = document.getElementById('cloakerIcon');
		if (ti) ti.value = '';
		if (ii) ii.value = '';
	}

	highlightActivePreset(title, icon) {
		document.querySelectorAll('.cloaker-preset').forEach(btn => {
			if (title && btn.dataset.title === title && btn.dataset.icon === icon) {
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
			}
		});
	}

}

if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', function() { window.app = new App(); });
} else {
	window.app = new App();
}
