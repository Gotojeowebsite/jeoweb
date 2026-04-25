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
		this.bootstrap();
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
		// 3D Parallax Hover for cards
		document.addEventListener('mousemove', (e) => {
			if (!this.animHover) return;
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
		this.searchInput.addEventListener('input', () => this.renderGames());
		this.refreshBtn.addEventListener('click', () => this.refreshGames());
		this.themeToggle.addEventListener('click', () => this.toggleTheme());
		this.closeModal.addEventListener('click', () => this.closePlayer());
		this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
		this.openNewTabBtn.addEventListener('click', () => this.openGameInNewTab());

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
		document.querySelectorAll('.theme-preset-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				const preset = btn.dataset.preset;
				if (preset === 'default') {
					document.body.className = 'theme-dark';
					this.setBgColor('#0c0b14', true);
					this.setAccent('#7c3aed', true);
					this.removeBgImage();
					localStorage.removeItem('site-bg-image');
					if (this.themeToggle) this.themeToggle.textContent = '🌙';
					localStorage.setItem('site-theme', 'dark');
				} else if (preset === 'cyberpunk') {
					document.body.className = 'theme-dark';
					this.setBgColor('#110022', true);
					this.setAccent('#ff00ff', true); // Neon pink
					this.removeBgImage();
					localStorage.removeItem('site-bg-image');
					if (this.themeToggle) this.themeToggle.textContent = '🌙';
					localStorage.setItem('site-theme', 'dark');
				} else if (preset === 'matrix') {
					document.body.className = 'theme-dark';
					this.setBgColor('#000000', true);
					this.setAccent('#00ff00', true); // Hacker green
					this.removeBgImage();
					localStorage.removeItem('site-bg-image');
					if (this.themeToggle) this.themeToggle.textContent = '🌙';
					localStorage.setItem('site-theme', 'dark');
				} else if (preset === 'crt') {
					document.body.className = 'theme-dark';
					this.setBgColor('#111111', true);
					this.setAccent('#ffffff', true); // White retro
					this.removeBgImage();
					localStorage.removeItem('site-bg-image');
					if (this.themeToggle) this.themeToggle.textContent = '🌙';
					localStorage.setItem('site-theme', 'dark');
				}
				// Force input fields to update their colors
				const bgInput = document.getElementById('bgColorInput');
				const accentInput = document.getElementById('accentColorInput');
				if (bgInput) bgInput.value = localStorage.getItem('site-bg-color') || '#0c0b14';
				if (accentInput) accentInput.value = localStorage.getItem('site-accent') || '#7c3aed';
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
		if (filtered.length === 0) {
			this.gameGrid.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><h3>No games found</h3><p>Try a different search term</p></div>';
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
			card.innerHTML = '<div class="game-thumb"><img src="' + imgSrc + '" alt="' + g.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + this.fallbackImage + '\';" /><button class="heart-btn' + (isFav ? ' hearted' : '') + '" data-game="' + this.escapeAttr(g.name) + '" aria-label="Favorite">' + (isFav ? '♥' : '♡') + '</button>' + badgeHtml + '</div><div class="game-card-content"><div class="game-card-title">' + g.name + '</div><div class="card-actions"><button class="play-btn">' + playLabel + '</button></div></div>';
			card.querySelector('.play-btn').addEventListener('click', (e) => { e.stopPropagation(); this.playGame(g); });
			card.querySelector('.heart-btn').addEventListener('click', (e) => { e.stopPropagation(); this.toggleFavorite(g, e.currentTarget); });
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
		this.renderFavorites();
		this.renderRecent();
		this.renderNewlyAdded();
		this.renderRequestedBtn();
		this.bindCarouselArrows();
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
		card.innerHTML = '<div class="game-thumb"><img src="' + imgSrc + '" alt="' + g.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + this.fallbackImage + '\';" /><button class="heart-btn' + (isFav ? ' hearted' : '') + '" data-game="' + this.escapeAttr(g.name) + '" aria-label="Favorite">' + (isFav ? '♥' : '♡') + '</button>' + maintenanceBadge + '</div><div class="game-card-content"><div class="game-card-title">' + g.name + '</div></div>';
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
		if (rotatingTip) {
			rotatingTip.textContent = tips[0];
			tipInterval = setInterval(() => {
				tipIndex = (tipIndex + 1) % tips.length;
				rotatingTip.style.opacity = 0;
				setTimeout(() => {
					rotatingTip.textContent = tips[tipIndex];
					rotatingTip.style.opacity = 1;
				}, 300);
			}, 3000);
		}

		// Show modal first so iframe layout doesn't break
		this.playModal.classList.remove('hidden');
		this.playModal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		
		// Move iframe off-screen
		this.gameFrame.classList.add('offscreen-iframe');
		this.gameFrame.src = target;

		// Fake progress
		let progress = 10;
		const progressInterval = setInterval(() => {
			if (progress < 90) {
				progress += Math.random() * 15;
				if (progress > 90) progress = 90;
				if (progressBar) progressBar.style.width = `${progress}%`;
			}
		}, 500);

		let iframeLoaded = false;
		let minTimeElapsed = false;

		const hideOverlay = () => {
			if (loadingOverlay && iframeLoaded && minTimeElapsed) {
				clearInterval(progressInterval);
				if (tipInterval) clearInterval(tipInterval);
				if (progressBar) progressBar.style.width = '100%';
				setTimeout(() => {
					loadingOverlay.classList.add('hidden');
					this.gameFrame.classList.remove('offscreen-iframe');
				}, 400); // Wait a moment at 100%
			}
		};

		// Enforce a minimum 2 second display time for the loading screen
		setTimeout(() => {
			minTimeElapsed = true;
			hideOverlay();
		}, 2000);

		// Hide overlay after iframe loads (if minimum time has elapsed)
		this.gameFrame.onload = () => {
			iframeLoaded = true;
			hideOverlay();
		};

		// Ultimate fallback: force hide after 12 seconds
		setTimeout(() => {
			if (loadingOverlay) {
				clearInterval(progressInterval);
				if (tipInterval) clearInterval(tipInterval);
				loadingOverlay.classList.add('hidden');
				this.gameFrame.classList.remove('offscreen-iframe');
			}
		}, 12000);
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
		this.gameFrame.src = 'about:blank';
		this.playModal.classList.add('hidden');
		this.playModal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
		this.gameFrame.classList.remove('offscreen-iframe');
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
