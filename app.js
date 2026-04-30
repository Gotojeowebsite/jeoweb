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
		this.statusFreshness = { generatedAt: null, source: '' };

		this.initElements();
		this.loadTheme();
		this.loadAccent();
		this.loadBackground();
		this.loadCustomizations();
		this.initCloaker();
		this.initFlashToggle();
		this.initRetroToggle();
		this.initMaintenanceToggle();
		this.initAnimations();
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
			if (event.data.type === 'GAME_READY') {
				this.gameReadyReceived = true;
				if (this.hideOverlayFn) this.hideOverlayFn();
			}
		});
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
	}

	initAnimations() {
		// Respect prefers-reduced-motion for tilt
		const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		// 3D Parallax Hover for cards
		document.addEventListener('mousemove', (e) => {
			if (!this.animHover || reduceMotion) return;
			const card = e.target.closest('.game-card, .carousel-card');
			if (!card) return;
			
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			
			const rotateX = ((y - centerY) / centerY) * -8; // Max rotation 8deg
			const rotateY = ((x - centerX) / centerX) * 8;
			
			card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
			card.style.transition = 'none'; // remove transition for smooth tracking
		});

		// More reliable way for mouseleave:
		document.addEventListener('mouseout', (e) => {
			const card = e.target.closest('.game-card, .carousel-card');
			if (!card) return;
			// check if leaving the card entirely
			if (!card.contains(e.relatedTarget)) {
				card.style.transform = ''; // reset to default CSS
				card.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s, box-shadow 0.3s';
			}
		});

		// Ripple Click Effect
		document.addEventListener('click', (e) => {
			if (!this.animRipple) return;
			const btn = e.target.closest('button, .header-nav-link');
			if (!btn || btn.classList.contains('color-wheel-input')) return;
			
			// Don't add ripples to elements without position relative
			const style = window.getComputedStyle(btn);
			if (style.position === 'static') {
				btn.style.position = 'relative';
				btn.style.overflow = 'hidden';
			} else if (style.overflow !== 'hidden') {
				btn.style.overflow = 'hidden';
			}

			const rect = btn.getBoundingClientRect();
			const ripple = document.createElement('span');
			const diameter = Math.max(rect.width, rect.height);
			const radius = diameter / 2;

			ripple.style.width = ripple.style.height = `${diameter}px`;
			ripple.style.left = `${e.clientX - rect.left - radius}px`;
			ripple.style.top = `${e.clientY - rect.top - radius}px`;
			ripple.className = 'ripple';

			btn.appendChild(ripple);

			setTimeout(() => {
				ripple.remove();
			}, 600);
		});
	}

	async bootstrap() {
		await this.loadNewlyAdded();
		await this.reloadGames();
		this.checkTutorial();
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
		const maintenanceStatusByName = await this.resolveMaintenanceStatusMap();
		const scanStatusByName = maintenanceStatusByName.size ? new Map() : await this.resolveScanStatusMap();
		this.games = allItems.map((game) => {
			const currentStatus = this.normalizeScanStatus(game.status);
			const maintenanceStatus = maintenanceStatusByName.get(game.name) || '';
			const scannedStatus = scanStatusByName.get(game.name) || '';
			const mergedStatus = maintenanceStatus || scannedStatus || currentStatus;
			if (!mergedStatus) return game;
			return { ...game, status: mergedStatus };
		});
		console.log('Games loaded:', this.games.length);
		this.updateCounter();
		this.renderCarousels();
		this.renderGames();
		this.renderStatusFreshness();
		this.hideLoading();
	}

	renderSkeletons() {
		if (this.gameGrid) {
			this.gameGrid.innerHTML = '';
			for(let i=0; i<12; i++) {
				this.gameGrid.innerHTML += `
				<div class="skeleton-card">
					<div class="skeleton-thumb"></div>
					<div class="skeleton-content">
						<div class="skeleton-title"></div>
						<div class="skeleton-btn"></div>
					</div>
				</div>`;
			}
		}
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
		if (raw === 'broken' || raw === 'under_maintenance' || raw === 'under-maintenance') {
			return 'under_maintenance';
		}
		return '';
	}

	normalizeGameName(name) {
		return String(name || '').trim().toLowerCase();
	}

	isUnderMaintenance(game) {
		return this.normalizeScanStatus(game && game.status) === 'under_maintenance';
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
		const ts = this.statusFreshness && this.statusFreshness.generatedAt;
		if (!ts) { el.textContent = ''; return; }
		const ageMs = Date.now() - ts * 1000;
		const hours = Math.floor(ageMs / 3600000);
		const days = Math.floor(hours / 24);
		let label;
		if (ageMs < 60000) label = 'fresh (<1 min)';
		else if (hours < 1) label = Math.floor(ageMs / 60000) + ' min ago';
		else if (days < 1) label = hours + ' h ago';
		else label = days + ' d ago';
		el.textContent = '🛈 status: ' + label;
		el.setAttribute('data-age-days', String(days));
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
		if (saved === 'light') {
			document.body.classList.add('theme-light');
			document.body.classList.remove('theme-dark');
			if (this.themeToggle) this.themeToggle.textContent = '☀️';
		} else {
			document.body.classList.add('theme-dark');
			document.body.classList.remove('theme-light');
			if (this.themeToggle) this.themeToggle.textContent = '🌙';
		}
	}

	toggleTheme() {
		if (document.body.classList.contains('theme-light')) {
			document.body.classList.remove('theme-light');
			document.body.classList.add('theme-dark');
			localStorage.setItem('site-theme', 'dark');
			if (this.themeToggle) this.themeToggle.textContent = '🌙';
		} else {
			document.body.classList.remove('theme-dark');
			document.body.classList.add('theme-light');
			localStorage.setItem('site-theme', 'light');
			if (this.themeToggle) this.themeToggle.textContent = '☀️';
		}
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
					try { localStorage.setItem('site-bg-image', dataUrl); } catch(err) {
						console.warn('Image too large for localStorage, applying without saving');
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
		if (save) localStorage.setItem('site-bg-color', color);
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
			_searchTimer = setTimeout(() => this.renderGames(), 140);
		});
		this.refreshBtn.addEventListener('click', () => this.refreshGames());
		this.themeToggle.addEventListener('click', () => this.toggleTheme());
		this.closeModal.addEventListener('click', () => this.closePlayer());
		this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
		this.openNewTabBtn.addEventListener('click', () => this.openGameInNewTab());

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
				if (willShow) this.refreshSaveSidebar();
			});
		}
		if (sbClose && sb) {
			sbClose.addEventListener('click', () => {
				sb.classList.add('hidden');
				sb.setAttribute('aria-hidden', 'true');
			});
		}
		if (saveNowBtn) saveNowBtn.addEventListener('click', () => this.saveNowFromSidebar(false));
		if (saveLabelBtn) saveLabelBtn.addEventListener('click', () => this.saveNowFromSidebar(true));
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
		// Refresh status line when an autosave happens
		if (window.JeoSaves && window.JeoSaves.on) {
			window.JeoSaves.on('autosave', () => {
				if (this.currentGameSlug && sb && !sb.classList.contains('hidden')) this.refreshSaveSidebar();
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
						
						alert('Profile imported successfully! The page will now reload.');
						window.location.reload();
					} catch (err) {
						alert('Invalid profile file.');
						console.error(err);
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

		// Theme Presets Logic
		const PRESETS = {
			default:      { theme: 'dark',  bg: '#0c0b14', accent: '#7c3aed' },
			cyberpunk:    { theme: 'dark',  bg: '#110022', accent: '#ff00ff' },
			matrix:       { theme: 'dark',  bg: '#000000', accent: '#00ff00' },
			crt:          { theme: 'dark',  bg: '#111111', accent: '#ffffff' },
			pastel:       { theme: 'light', bg: '#fdf4ff', accent: '#f9a8d4' },
			'solar-light':{ theme: 'light', bg: '#fdf6e3', accent: '#268bd2' },
			vaporwave:    { theme: 'dark',  bg: '#1a0033', accent: '#ff77e9' },
			forest:       { theme: 'dark',  bg: '#0f1a14', accent: '#3fa67a' },
			y2k:          { theme: 'light', bg: '#dde6ff', accent: '#7c87ff' },
			holo:         { theme: 'dark',  bg: '#06070b', accent: '#a3ff77', grad: 'linear-gradient(135deg,#ff77e9,#22d3ee,#a3ff77)' },
		};
		document.querySelectorAll('.theme-preset-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				const preset = btn.dataset.preset;
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
				if (window.JeoToast) window.JeoToast.info(`Applied "${preset}" theme`);
			});
		});

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

		// Glass intensity slider
		const glassSlider = document.getElementById('glassSlider');
		const glassValue = document.getElementById('glassValue');
		if (glassSlider) {
			const saved = Number(localStorage.getItem('jeo:glass') || '16');
			glassSlider.value = saved;
			document.documentElement.style.setProperty('--glass-blur', `blur(${saved}px)`);
			if (glassValue) glassValue.textContent = `${saved}px`;
			glassSlider.addEventListener('input', () => {
				const v = glassSlider.value;
				document.documentElement.style.setProperty('--glass-blur', `blur(${v}px)`);
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

	renderGames() {
		const q = (this.searchInput.value || '').toLowerCase().trim();
		const terms = q.split(/\s+/).filter(Boolean);
		const rawQ = q.replace(/[^a-z0-9]/g, '');

		this.gameGrid.innerHTML = '';
		const filtered = this.games.filter(g => {
			if (!this.showFlash && g.type === 'flash') return false;
			if (!this.showRetro && g.type === 'snes') return false;
			if (this.hideMaintenance && this.isUnderMaintenance(g)) return false;
			if (this.activeTag) {
				const tags = g.tags || [];
				if (!tags.includes(this.activeTag)) return false;
			}

			if (q) {
				const rawName = g.name.toLowerCase().replace(/[^a-z0-9]/g, '');
				const spacedName = g.name.toLowerCase().replace(/[-_]/g, ' ');
				
				// 1. Direct match on alphanumeric string (handles "subwaysurfers" == "subway-surfers")
				const exactMatch = rawName.includes(rawQ);
				
				// 2. Out of order / spaced matching (handles "surfers subway" == "subway-surfers")
				const outOfOrderMatch = terms.length > 0 && terms.every(term => spacedName.includes(term) || rawName.includes(term.replace(/[^a-z0-9]/g, '')));
				
				if (!exactMatch && !outOfOrderMatch) return false;
			}
			return true;
		});
		filtered.sort((a, b) => a.name.localeCompare(b.name));
		// Announce result count to screen readers
		const live = document.getElementById('searchResultsLive');
		if (live) {
			live.textContent = q
				? `${filtered.length} game${filtered.length === 1 ? '' : 's'} match "${q}"`
				: `${filtered.length} games shown`;
		}
		if (filtered.length === 0) {
			const safeQ = (q || '').replace(/[<>"']/g, '');
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
					<p>${safeQ ? `Nothing matches "<strong>${safeQ}</strong>".` : 'Try a different search.'}</p>
					<div class="empty-actions">
						<a href="https://forms.gle/HgkCSEzaF5iULyfv8" target="_blank" rel="noopener">📩 Request "${safeQ || 'a game'}"</a>
						<button class="secondary" onclick="document.getElementById('searchInput').value='';document.getElementById('searchInput').dispatchEvent(new Event('input'))">Clear search</button>
					</div>
				</div>`;
			return;
		}
		filtered.forEach((g, i) => {
			const imgSrc = g.image || this.fallbackImage;
			const isFav = this.isFavorite(g.name);
			const isMaintenance = this.isUnderMaintenance(g);
			const flashBadge = g.type === 'flash' ? '<span class="flash-badge">⚡ Flash</span>' : '';
			const retroBadge = g.type === 'snes' ? '<span class="retro-badge">🎮 Retro</span>' : '';
			const requestedBadge = g.requested ? '<span class="requested-badge">📩 Requested</span>' : '';
			const maintenanceBadge = isMaintenance ? '<span class="maintenance-badge">⚠ Under Maintenance</span>' : '';
			const badgeHtml = flashBadge + retroBadge + requestedBadge + maintenanceBadge;
			const playLabel = isMaintenance ? '⚠ Play at Risk' : '▶ Play';
			const card = document.createElement('div');
			card.className = 'game-card' + (isMaintenance ? ' under-maintenance' : '');
			card.style.setProperty('--card-img', `url('${imgSrc}')`);
			card.dataset.slug = g.name;
			const isWish = this.isWishlisted(g.name);
			const wishBtn = '<button class="wish-btn' + (isWish ? ' wished' : '') + '" data-game="' + this.escapeAttr(g.name) + '" aria-label="Wishlist" title="Wishlist">' + (isWish ? '🔖' : '📑') + '</button>';
			card.innerHTML = '<div class="game-thumb"><img src="' + imgSrc + '" alt="' + g.name + '" loading="lazy" onload="this.classList.add(\'loaded\')" onerror="this.onerror=null;this.classList.add(\'loaded\');this.src=\'' + this.fallbackImage + '\';" /><button class="heart-btn' + (isFav ? ' hearted' : '') + '" data-game="' + this.escapeAttr(g.name) + '" aria-label="Favorite">' + (isFav ? '♥' : '♡') + '</button>' + wishBtn + badgeHtml + '</div><div class="game-card-content"><div class="game-card-title">' + g.name + '</div><div class="card-actions"><button class="play-btn">' + playLabel + '</button></div></div>';
			card.querySelector('.play-btn').addEventListener('click', (e) => { e.stopPropagation(); this.playGame(g); });
			card.querySelector('.heart-btn').addEventListener('click', (e) => { e.stopPropagation(); this.toggleFavorite(g, e.currentTarget); });
			card.querySelector('.wish-btn').addEventListener('click', (e) => { e.stopPropagation(); this.toggleWishlist(g); });
			card.addEventListener('dblclick', () => { this.playGame(g); });
			card.style.animationDelay = `${i * 0.03}s`;
			this.gameGrid.appendChild(card);
		});
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
			if (btn) {
				btn.classList.remove('hearted');
				btn.textContent = '♡';
			}
		} else {
			this.favorites.push(name);
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
			try { window.JeoAchievements.onEvent('play', { slug: name }); } catch {}
		}
		this.renderCarousels();
	}

	playGame(game) {
		if (this.isUnderMaintenance(game)) {
			const proceed = window.confirm(
				game.name + ' is currently under maintenance and may not work correctly.\n\nYou can still play at your own risk.\n\nContinue?'
			);
			if (!proceed) return;
		}
		this.trackRecentPlay(game);
		this.openPlayer(game.url, game);
	}

	/* =============== CAROUSEL RENDERING =============== */

	renderCarousels() {
		this.renderSpotlight();
		this.renderContinuePlaying();
		this.renderFavorites();
		this.renderTrending();
		this.renderWishlist();
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
		// Honor dismissal for the day
		const today = new Date().toISOString().slice(0, 10);
		if (localStorage.getItem('jeo:spotlight:dismissed') === today) {
			sec.classList.add('hidden');
			return;
		}
		const game = this.pickGameOfTheDay();
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
		if (window.JeoToast) window.JeoToast.info(i >= 0 ? `Removed from wishlist` : `Added to wishlist`);
		if (window.JeoAchievements) window.JeoAchievements.onEvent('wishlist', { count: list.length });
	}

	renderWishlist() {
		const sec = document.getElementById('wishlistSection');
		const track = document.getElementById('wishlistTrack');
		const count = document.getElementById('wishlistCount');
		if (!sec || !track) return;
		const list = this.getWishlist()
			.map(name => this.games.find(g => g.name === name))
			.filter(Boolean);
		if (list.length === 0) { sec.classList.add('hidden'); return; }
		sec.classList.remove('hidden');
		if (count) count.textContent = list.length;
		track.innerHTML = '';
		list.forEach((g, i) => track.appendChild(this.createCarouselCard(g, i)));
	}

	renderFavorites() {
		const favGames = this.favorites
			.map(name => this.games.find(g => g.name === name))
			.filter(Boolean);

		if (favGames.length === 0) {
			this.favoritesSection.classList.add('hidden');
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

	createCarouselCard(g, index = 0) {
		const imgSrc = g.image || this.fallbackImage;
		const isFav = this.isFavorite(g.name);
		const isMaintenance = this.isUnderMaintenance(g);
		const maintenanceBadge = isMaintenance ? '<span class="maintenance-badge">⚠ Under Maintenance</span>' : '';
		const card = document.createElement('div');
		card.className = 'carousel-card' + (isMaintenance ? ' under-maintenance' : '');
		card.style.setProperty('--card-img', `url('${imgSrc}')`);
		card.dataset.slug = g.name;
		card.innerHTML = '<div class="game-thumb"><img src="' + imgSrc + '" alt="' + g.name + '" loading="lazy" onload="this.classList.add(\'loaded\')" onerror="this.onerror=null;this.classList.add(\'loaded\');this.src=\'' + this.fallbackImage + '\';" /><button class="heart-btn' + (isFav ? ' hearted' : '') + '" data-game="' + this.escapeAttr(g.name) + '" aria-label="Favorite">' + (isFav ? '♥' : '♡') + '</button>' + maintenanceBadge + '</div><div class="game-card-content"><div class="game-card-title">' + g.name + '</div></div>';
		card.querySelector('.heart-btn').addEventListener('click', (e) => { e.stopPropagation(); this.toggleFavorite(g, e.currentTarget); });
		card.addEventListener('click', (e) => {
			if (e.target.closest('.heart-btn')) return;
			this.playGame(g);
		});
		card.style.animationDelay = `${index * 0.05}s`;
		return card;
	}

	bindCarouselArrows() {
		document.querySelectorAll('.carousel-arrow').forEach(btn => {
			const newBtn = btn.cloneNode(true);
			btn.parentNode.replaceChild(newBtn, btn);
			newBtn.addEventListener('click', () => {
				const trackId = newBtn.dataset.target;
				const track = document.getElementById(trackId);
				if (!track) return;
				const scrollAmt = track.clientWidth * 0.7;
				if (newBtn.classList.contains('carousel-arrow-left')) {
					track.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
				} else {
					track.scrollBy({ left: scrollAmt, behavior: 'smooth' });
				}
			});
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
		if (window.JeoSaves && this.currentGameSlug) {
			try { window.JeoSaves.bindGame(this.currentGameSlug); } catch {}
			this.refreshSaveSidebar();
		}

		const loadingOverlay = document.getElementById('gameLoadingOverlay');
		const loadingGameTitle = document.getElementById('loadingGameTitle');
		const loadingDynamicBg = document.getElementById('loadingDynamicBg');
		const progressBar = document.getElementById('loadingProgressBar');
		
		if (loadingGameTitle && game) loadingGameTitle.textContent = `Loading ${game.name}...`;
		if (loadingDynamicBg && game && game.image) loadingDynamicBg.style.backgroundImage = `url('${game.image}')`;
		if (progressBar) progressBar.style.width = '10%';

		if (loadingOverlay) {
			loadingOverlay.classList.remove('hidden');
		}

		// Progress Tracking Initialization
		this.currentLoadingGame = game;
		this.loadedBytes.clear();
		this.totalGameSize = game ? (game.size || 0) : 0;

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

		let iframeLoaded = false;
		let minTimeElapsed = false;
		this.gameReadyReceived = false;

		this.hideOverlayFn = () => {
			// Requirements to hide:
			// 1. Min time (2s) passed
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
					this.gameFrame.classList.remove('offscreen-iframe');
					this.gameFrame.focus();
					this.hideOverlayFn = null;
				}, 400); 
			}
		};

		// Enforce a minimum 2 second display time
		setTimeout(() => {
			minTimeElapsed = true;
			if (this.hideOverlayFn) this.hideOverlayFn();
		}, 2000);

		// Hide overlay after iframe loads
		this.gameFrame.onload = () => {
			iframeLoaded = true;
			if (this.hideOverlayFn) this.hideOverlayFn();
		};

		// Ultimate fallback
		setTimeout(() => {
			if (this.hideOverlayFn) {
				this.gameReadyReceived = true; // Force it
				this.hideOverlayFn();
			}
		}, 15000);
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

	closePlayer() {
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
			}
		}
		this.currentSessionStart = null;
		const sb = document.getElementById('saveSidebar');
		if (sb) { sb.classList.add('hidden'); sb.setAttribute('aria-hidden','true'); }
		this.gameFrame.src = 'about:blank';
		this.playModal.classList.add('hidden');
		this.playModal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
		this.gameFrame.classList.remove('offscreen-iframe');
		this.currentGameSlug = null;
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
			alert('Save action failed: ' + (e.message || e));
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
		} catch (e) {
			alert('Save failed: ' + (e.message || e));
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

	/* =============== TUTORIAL SYSTEM =============== */

	checkTutorial() {
		if (!localStorage.getItem('jeo-tutorial-done')) {
			setTimeout(() => this.startTutorial(), 800);
		}
	}

	startTutorial() {
		this.tutorialSteps = [
			{
				target: '.hero',
				title: 'Welcome to Jeo! 👋',
				text: 'This is your gaming hub. You can see how many games are available — WebGL, Flash, and Retro!',
				position: 'bottom'
			},
			{
				target: '.search-container',
				title: 'Search Games 🔍',
				text: 'Type any game name here to instantly filter and find what you want to play.',
				position: 'bottom'
			},
			{
				target: '.flash-toggle',
				title: 'Toggle Game Types ⚡',
				text: 'Use these toggles to show or hide Flash and Retro games from the grid.',
				position: 'bottom'
			},
			{
				target: '.game-card',
				title: 'Game Cards 🎮',
				text: 'Each card shows the game thumbnail. Click Play to start, or double-click the card!',
				position: 'top'
			},
			{
				target: '.heart-btn',
				title: 'Favorite Games ♥',
				text: 'Click the heart to add a game to your Favorites carousel for quick access later.',
				position: 'top'
			},
			{
				target: '#cloakerBtn',
				title: 'Tab Cloaker 🥸',
				text: 'Disguise your tab! Make it look like Google, Google Docs, or anything else. Your teacher won\'t notice.',
				position: 'bottom-left'
			},
			{
				target: '#colorPickerBtn',
				title: 'Customize 🎨',
				text: 'Change the accent color, background color, or upload a custom background image. Make it yours!',
				position: 'bottom-left'
			},
			{
				target: '#themeToggle',
				title: 'Dark / Light Mode 🌙',
				text: 'Toggle between dark and light themes.',
				position: 'bottom-left'
			}
		];
		this.tutorialStep = 0;
		this.showTutorialOverlay();
	}

	showTutorialOverlay() {
		// Remove any existing overlay
		const existing = document.getElementById('tutorialOverlay');
		if (existing) existing.remove();

		if (this.tutorialStep >= this.tutorialSteps.length) {
			this.endTutorial();
			return;
		}

		const step = this.tutorialSteps[this.tutorialStep];
		const targetEl = document.querySelector(step.target);

		// Scroll target into view first, then position after scroll settles
		if (targetEl) {
			targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}

		// Wait for scroll to settle before building overlay
		setTimeout(() => {
			this._buildTutorialOverlay(step, targetEl);
		}, 400);
	}

	_buildTutorialOverlay(step, targetEl) {
		// Create overlay — uses position:fixed, no scroll offset needed
		const overlay = document.createElement('div');
		overlay.id = 'tutorialOverlay';
		overlay.className = 'tutorial-overlay';

		// Spotlight — the box-shadow on this IS the backdrop
		if (targetEl) {
			const rect = targetEl.getBoundingClientRect();
			const pad = 10;

			const spotlight = document.createElement('div');
			spotlight.className = 'tutorial-spotlight';
			spotlight.style.position = 'fixed';
			spotlight.style.top = (rect.top - pad) + 'px';
			spotlight.style.left = (rect.left - pad) + 'px';
			spotlight.style.width = (rect.width + pad * 2) + 'px';
			spotlight.style.height = (rect.height + pad * 2) + 'px';
			spotlight.addEventListener('click', (e) => {
				e.stopPropagation();
				this.nextTutorialStep();
			});
			overlay.appendChild(spotlight);
		} else {
			// No target — just a light backdrop
			const bg = document.createElement('div');
			bg.className = 'tutorial-backdrop';
			bg.addEventListener('click', (e) => {
				e.stopPropagation();
				this.nextTutorialStep();
			});
			overlay.appendChild(bg);
		}

		// Tooltip
		const tooltip = document.createElement('div');
		tooltip.className = 'tutorial-tooltip';
		tooltip.innerHTML = '<div class="tutorial-tooltip-title">' + step.title + '</div>'
			+ '<div class="tutorial-tooltip-text">' + step.text + '</div>'
			+ '<div class="tutorial-tooltip-footer">'
			+ '<span class="tutorial-progress">' + (this.tutorialStep + 1) + ' / ' + this.tutorialSteps.length + '</span>'
			+ '<div class="tutorial-btns">'
			+ '<button class="tutorial-skip-btn">Skip</button>'
			+ '<button class="tutorial-next-btn">' + (this.tutorialStep === this.tutorialSteps.length - 1 ? 'Finish! 🎉' : 'Next →') + '</button>'
			+ '</div></div>';

		overlay.appendChild(tooltip);
		document.body.appendChild(overlay);

		// Position tooltip after render
		requestAnimationFrame(() => {
			if (targetEl) {
				const rect = targetEl.getBoundingClientRect();
				const ttRect = tooltip.getBoundingClientRect();
				let top, left;

				if (step.position === 'bottom' || step.position === 'bottom-left') {
					top = rect.bottom + 20;
				} else {
					top = rect.top - ttRect.height - 20;
					// If tooltip would go off the top, put it below
					if (top < 16) top = rect.bottom + 20;
				}

				if (step.position === 'bottom-left') {
					left = Math.max(16, rect.right - ttRect.width);
				} else {
					left = rect.left + (rect.width / 2) - (ttRect.width / 2);
				}

				// Keep on screen
				left = Math.max(16, Math.min(left, window.innerWidth - ttRect.width - 16));
				top = Math.max(16, Math.min(top, window.innerHeight - ttRect.height - 16));

				tooltip.style.position = 'fixed';
				tooltip.style.top = top + 'px';
				tooltip.style.left = left + 'px';
				tooltip.style.opacity = '1';
				tooltip.style.transform = 'translateY(0)';
			} else {
				// Center the tooltip
				tooltip.style.position = 'fixed';
				tooltip.style.top = '50%';
				tooltip.style.left = '50%';
				tooltip.style.transform = 'translate(-50%, -50%)';
				tooltip.style.opacity = '1';
			}
		});

		// Button handlers
		tooltip.querySelector('.tutorial-next-btn').addEventListener('click', (e) => {
			e.stopPropagation();
			this.nextTutorialStep();
		});
		tooltip.querySelector('.tutorial-skip-btn').addEventListener('click', (e) => {
			e.stopPropagation();
			this.endTutorial();
		});
	}

	nextTutorialStep() {
		this.tutorialStep++;
		this.showTutorialOverlay();
	}

	endTutorial() {
		localStorage.setItem('jeo-tutorial-done', '1');
		const overlay = document.getElementById('tutorialOverlay');
		if (overlay) {
			overlay.classList.add('tutorial-fadeout');
			setTimeout(() => overlay.remove(), 300);
		}
	}
}

if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', function() { window.app = new App(); });
} else {
	window.app = new App();
}
