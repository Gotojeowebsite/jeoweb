class App {
	constructor() {
		this.games = [];
		this.fallbackImage = 'notavailable.svg';
		this.favorites = JSON.parse(localStorage.getItem('jeo-favorites') || '[]');
		this.recentlyPlayed = JSON.parse(localStorage.getItem('jeo-recent') || '[]');
		this.MAX_RECENT = 20;

		this.initElements();
		this.loadTheme();
		this.loadAccent();
		this.loadBackground();
		this.bindUI();
		this.bootstrap();
	}

	async bootstrap() {
		await this.reloadGames();
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
		this.loadingState = document.getElementById('loadingState');
		this.refreshBtn = document.getElementById('refreshGames');
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
	}

	hideLoading() {
		if (this.loadingState) this.loadingState.style.display = 'none';
	}

	updateCounter() {
		if (this.gameCount) {
			const target = this.games.length;
			const current = parseInt(this.gameCount.textContent) || 0;
			if (current === target) return;
			const step = target > current ? 1 : -1;
			const steps = Math.abs(target - current);
			const interval = Math.max(Math.floor(500 / steps), 5);
			let count = current;
			const timer = setInterval(() => {
				count += step;
				this.gameCount.textContent = count;
				if (count === target) clearInterval(timer);
			}, interval);
		}
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
		const saved = localStorage.getItem('site-accent');
		if (saved) this.setAccent(saved, false);
		const swatches = document.querySelectorAll('.color-swatch');
		swatches.forEach(s => {
			s.addEventListener('click', () => {
				const color = s.dataset.color;
				this.setAccent(color, true);
				swatches.forEach(sw => sw.classList.remove('active'));
				s.classList.add('active');
			});
			if (saved && s.dataset.color === saved) s.classList.add('active');
		});
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
		const savedBg = localStorage.getItem('site-bg-color');
		if (savedBg) this.setBgColor(savedBg, false);
		const bgSwatches = document.querySelectorAll('.bg-swatch');
		bgSwatches.forEach(s => {
			s.addEventListener('click', () => {
				const color = s.dataset.bg;
				this.setBgColor(color, true);
				bgSwatches.forEach(sw => sw.classList.remove('active'));
				s.classList.add('active');
			});
			if (savedBg && s.dataset.bg === savedBg) s.classList.add('active');
		});

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
			});
			document.addEventListener('click', (e) => {
				if (!colorMenu.contains(e.target) && e.target !== colorBtn) {
					colorMenu.classList.remove('open');
				}
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
		const filtered = this.games.filter(g => !q || g.name.toLowerCase().includes(q));
		if (filtered.length === 0) {
			this.gameGrid.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><h3>No games found</h3><p>Try a different search term</p></div>';
			return;
		}
		filtered.forEach((g, i) => {
			const imgSrc = g.image || this.fallbackImage;
			const isFav = this.isFavorite(g.name);
			const card = document.createElement('div');
			card.className = 'game-card';
			card.innerHTML = '<div class="game-thumb"><img src="' + imgSrc + '" alt="' + g.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + this.fallbackImage + '\';" /><button class="heart-btn' + (isFav ? ' hearted' : '') + '" data-game="' + this.escapeAttr(g.name) + '" aria-label="Favorite">' + (isFav ? '♥' : '♡') + '</button></div><div class="game-card-content"><div class="game-card-title">' + g.name + '</div><button class="play-btn">▶ Play</button></div>';
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
}

if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', function() { window.app = new App(); });
} else {
	window.app = new App();
}
