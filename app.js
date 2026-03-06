class App {
	constructor() {
		this.games = [];
		this.fallbackImage = 'notavailable.svg';
		this.favorites = JSON.parse(localStorage.getItem('jeo-favorites') || '[]');
		this.recentlyPlayed = JSON.parse(localStorage.getItem('jeo-recent') || '[]');
		this.MAX_RECENT = 20;

		this.showFlash = localStorage.getItem('jeo-show-flash') !== 'false';
		this.showRetro = localStorage.getItem('jeo-show-retro') !== 'false';

		this.initElements();
		this.loadTheme();
		this.loadAccent();
		this.loadBackground();
		this.initCloaker();
		this.initFlashToggle();
		this.initRetroToggle();
		this.bindUI();
		this.bootstrap();
	}

	async bootstrap() {
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
		const allItems = await this.resolveGames();
		this.games = allItems;
		console.log('Games loaded:', this.games.length);
		this.updateCounter();
		this.renderCarousels();
		this.renderGames();
		this.hideLoading();
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

		// Requested button
		this.requestedBtn = document.getElementById('requestedBtn');
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
		document.documentElement.style.setProperty('--primary', color);
		const r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
		const darker = '#' + [r,g,b].map(c => Math.max(0, c - 30).toString(16).padStart(2,'0')).join('');
		document.documentElement.style.setProperty('--primary-hover', darker);
		if (save) localStorage.setItem('site-accent', color);
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
		document.body.style.backgroundImage = 'url(' + dataUrl + ')';
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
		document.body.classList.add('has-bg-image');
		const preview = document.getElementById('bgPreview');
		if (preview) {
			preview.style.backgroundImage = 'url(' + dataUrl + ')';
			preview.classList.remove('hidden');
		}
	}

	removeBgImage() {
		document.body.style.backgroundImage = '';
		document.body.style.backgroundSize = '';
		document.body.style.backgroundPosition = '';
		document.body.style.backgroundAttachment = '';
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

	refreshGames() {
		this.refreshBtn.classList.add('spinning');
		this.reloadGames().then(() => {
			setTimeout(() => this.refreshBtn.classList.remove('spinning'), 600);
		});
	}

	renderGames() {
		const q = (this.searchInput.value || '').toLowerCase();
		this.gameGrid.innerHTML = '';
		const filtered = this.games.filter(g => {
			if (!this.showFlash && g.type === 'flash') return false;
			if (!this.showRetro && g.type === 'snes') return false;
			if (q && !g.name.toLowerCase().includes(q)) return false;
			return true;
		});
		if (filtered.length === 0) {
			this.gameGrid.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><h3>No games found</h3><p>Try a different search term</p></div>';
			return;
		}
		filtered.forEach((g, i) => {
			const imgSrc = g.image || this.fallbackImage;
			const isFav = this.isFavorite(g.name);
			const flashBadge = g.type === 'flash' ? '<span class="flash-badge">⚡ Flash</span>' : '';
			const retroBadge = g.type === 'snes' ? '<span class="retro-badge">🎮 Retro</span>' : '';
			const requestedBadge = g.requested ? '<span class="requested-badge">📩 Requested</span>' : '';
			const badgeHtml = flashBadge + retroBadge + requestedBadge;
			const card = document.createElement('div');
			card.className = 'game-card';
			card.innerHTML = '<div class="game-thumb"><img src="' + imgSrc + '" alt="' + g.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + this.fallbackImage + '\';" /><button class="heart-btn' + (isFav ? ' hearted' : '') + '" data-game="' + this.escapeAttr(g.name) + '" aria-label="Favorite">' + (isFav ? '♥' : '♡') + '</button>' + badgeHtml + '</div><div class="game-card-content"><div class="game-card-title">' + g.name + '</div><button class="play-btn">▶ Play</button></div>';
			card.querySelector('.play-btn').addEventListener('click', (e) => { e.stopPropagation(); this.playGame(g); });
			card.querySelector('.heart-btn').addEventListener('click', (e) => { e.stopPropagation(); this.toggleFavorite(g, e.currentTarget); });
			card.addEventListener('dblclick', () => { this.playGame(g); });
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
		this.trackRecentPlay(game);
		this.openPlayer(game.url);
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
		favGames.forEach(g => {
			this.favoritesTrack.appendChild(this.createCarouselCard(g));
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
		recentGames.forEach(g => {
			this.recentTrack.appendChild(this.createCarouselCard(g));
		});
	}

	renderRequestedBtn() {
		if (!this.requestedBtn) return;
		const hasRequested = this.games.some(g => g.requested);
		this.requestedBtn.style.display = hasRequested ? '' : 'none';
	}

	renderNewlyAdded() {
		const newGames = this.newlyAddedNames
			.map(name => this.games.find(g => g.name === name))
			.filter(Boolean);

		const hasRequested = this.games.some(g => g.requested);

		if (newGames.length === 0 && !hasRequested) {
			if (this.newlyAddedSection) this.newlyAddedSection.classList.add('hidden');
			return;
		}
		if (this.newlyAddedSection) this.newlyAddedSection.classList.remove('hidden');
	}

	createCarouselCard(g) {
		const imgSrc = g.image || this.fallbackImage;
		const isFav = this.isFavorite(g.name);
		const card = document.createElement('div');
		card.className = 'carousel-card';
		card.innerHTML = '<div class="game-thumb"><img src="' + imgSrc + '" alt="' + g.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + this.fallbackImage + '\';" /><button class="heart-btn' + (isFav ? ' hearted' : '') + '" data-game="' + this.escapeAttr(g.name) + '" aria-label="Favorite">' + (isFav ? '♥' : '♡') + '</button></div><div class="game-card-content"><div class="game-card-title">' + g.name + '</div></div>';
		card.querySelector('.heart-btn').addEventListener('click', (e) => { e.stopPropagation(); this.toggleFavorite(g, e.currentTarget); });
		card.addEventListener('click', (e) => {
			if (e.target.closest('.heart-btn')) return;
			this.playGame(g);
		});
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

	openPlayer(url) {
		var target = url;
		if (!target.match(/\.(html|swf)(\?|$)/i)) {
			if (target.endsWith('/')) target += 'index.html';
			else target += '/index.html';
		}
		this.currentGameUrl = target;
		this.gameFrame.src = target;
		this.playModal.classList.remove('hidden');
		this.playModal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
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
}

if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', function() { window.app = new App(); });
} else {
	window.app = new App();
}
