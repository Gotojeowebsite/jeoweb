class App {
	constructor() {
		this.games = [];
		this.autoRefreshTimer = null;
		
		this.initElements();
		this.loadTheme();
		this.bindUI();
		this.bootstrap();
	}

	async bootstrap() {
		await this.reloadGames();
		this.startAutoRefresh();
	}

	async reloadGames() {
		this.games = await this.resolveGames();
		console.log('Games loaded:', this.games.length);
		this.renderGames();
		this.renderFolders();
	}

	startAutoRefresh() {
		if (this.autoRefreshTimer) {
			clearInterval(this.autoRefreshTimer);
		}
		this.autoRefreshTimer = setInterval(() => {
			this.reloadGames();
		}, 10000);
	}

	async resolveGames() {
		// Try games_list.json first (works on GitHub Pages and local)
		try {
			const response = await fetch('games_list.json', { cache: 'no-store' });
			if (response.ok) {
				const data = await response.json();
				if (Array.isArray(data) && data.length > 0) {
					return data;
				}
			}
		} catch (error) {
			console.warn('Could not load games_list.json', error);
		}

		// Fallback: try server API (only works when server.js is running locally)
		try {
			const apiResponse = await fetch('/api/games', { cache: 'no-store' });
			if (apiResponse.ok) {
				const apiData = await apiResponse.json();
				if (Array.isArray(apiData) && apiData.length > 0) {
					return apiData;
				}
			}
		} catch (error) {
			console.warn('Could not load /api/games', error);
		}

		return [];
	}

	initElements() {
		this.searchInput = document.getElementById('searchInput');
		this.gameGrid = document.getElementById('gameGrid');
		this.folderList = document.getElementById('folderList');
		this.refreshBtn = document.getElementById('refreshGames');
		this.themeToggle = document.getElementById('themeToggle');
		this.playModal = document.getElementById('playModal');
		this.gameFrame = document.getElementById('gameFrame');
		this.closeModal = document.getElementById('closeModal');
	}

	loadTheme() {
		const saved = localStorage.getItem('site-theme');
		if (saved === 'light') {
			document.body.classList.add('theme-light');
			document.body.classList.remove('theme-dark');
		} else {
			document.body.classList.add('theme-dark');
			document.body.classList.remove('theme-light');
		}
	}

	toggleTheme() {
		if (document.body.classList.contains('theme-light')) {
			document.body.classList.remove('theme-light');
			document.body.classList.add('theme-dark');
			localStorage.setItem('site-theme', 'dark');
		} else {
			document.body.classList.remove('theme-dark');
			document.body.classList.add('theme-light');
			localStorage.setItem('site-theme', 'light');
		}
	}

	bindUI() {
		this.searchInput.addEventListener('input', () => this.renderGames());
		this.refreshBtn.addEventListener('click', () => this.refreshGames());
		this.themeToggle.addEventListener('click', () => this.toggleTheme());
		this.closeModal.addEventListener('click', () => this.closePlayer());
	}

	refreshGames() {
		this.reloadGames();
	}

	renderGames() {
		const q = (this.searchInput.value || '').toLowerCase();
		this.gameGrid.innerHTML = '';
		
		const filtered = this.games.filter(g => {
			return !q || g.name.toLowerCase().includes(q);
		});
		
		if (filtered.length === 0) {
			this.gameGrid.innerHTML = `<div class="muted">No games found</div>`;
			return;
		}
		
		filtered.forEach(g => {
			const card = document.createElement('div');
			card.className = 'game-card';
			card.innerHTML = `
				<div class="game-thumb" style="background-image: url('${g.image}')"></div>
				<div class="game-card-content">
					<div class="game-card-title">${g.name}</div>
					<button class="play-btn">▶ Play</button>
				</div>
			`;
			card.querySelector('.play-btn').addEventListener('click', (e) => {
				this.openPlayer(g.url);
			});
			this.gameGrid.appendChild(card);
		});
	}

	renderFolders() {
		this.folderList.innerHTML = '';
		
		if (this.games.length === 0) {
			this.folderList.innerHTML = '<li class="muted">No games detected.</li>';
			return;
		}
		
		this.games.forEach(g => {
			const li = document.createElement('li');
			li.innerHTML = `<a href="#" data-url="${g.url}">${g.name}</a>`;
			li.querySelector('a').addEventListener('click', (e) => {
				e.preventDefault();
				this.openPlayer(g.url);
			});
			this.folderList.appendChild(li);
		});
	}

	openPlayer(url) {
		let target = url;
		if (target.endsWith('/')) {
			target = target + 'index.html';
		} else if (!target.includes('.html') && !target.includes('.swf')) {
			target = target + '/index.html';
		}
		this.gameFrame.src = target;
		this.playModal.classList.remove('hidden');
		this.playModal.setAttribute('aria-hidden', 'false');
	}

	closePlayer() {
		this.gameFrame.src = 'about:blank';
		this.playModal.classList.add('hidden');
		this.playModal.setAttribute('aria-hidden', 'true');
	}
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', () => {
		window.app = new App();
	});
} else {
	window.app = new App();
}
