class App {
	constructor() {
		// Games list is injected into the HTML by the server
		this.games = window.GAMES_LIST || [];
		console.log('Games loaded:', this.games);
		
		this.initElements();
		this.loadTheme();
		this.bindUI();
		this.renderGames();
		this.renderFolders();
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
		// Reload the page to get updated games list
		location.reload();
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
