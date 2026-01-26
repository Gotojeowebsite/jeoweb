class App {
	constructor() {
		this.staticGames = window.STATIC_GAMES || [];
		this.generatedGames = [];
		this.games = [];
		this.initElements();
		this.loadTheme();
		this.bindUI();
		this.loadGames();
	}

	initElements() {
		this.searchInput = document.getElementById('searchInput');
		this.categoryFilter = document.getElementById('categoryFilter');
		this.gameGrid = document.getElementById('gameGrid');
		this.folderList = document.getElementById('folderList');
		this.refreshBtn = document.getElementById('refreshGames');
		this.themeToggle = document.getElementById('themeToggle');
		this.playModal = document.getElementById('playModal');
		this.gameFrame = document.getElementById('gameFrame');
		this.closeModal = document.getElementById('closeModal');
		this.tabButtons = document.querySelectorAll('.tab-button');
	}

	loadTheme() {
		const saved = localStorage.getItem('site-theme');
		if (saved === 'light') document.body.classList.add('theme-light'), document.body.classList.remove('theme-dark');
		else document.body.classList.add('theme-dark'), document.body.classList.remove('theme-light');
		this.updateThemeLabel();
	}

	toggleTheme() {
		if (document.body.classList.contains('theme-light')) {
			document.body.classList.remove('theme-light'); document.body.classList.add('theme-dark'); localStorage.setItem('site-theme','dark');
		} else {
			document.body.classList.remove('theme-dark'); document.body.classList.add('theme-light'); localStorage.setItem('site-theme','light');
		}
		this.updateThemeLabel();
	}

	updateThemeLabel() {
		this.themeToggle.textContent = document.body.classList.contains('theme-light') ? 'Dark' : 'Light';
	}

	bindUI() {
		this.searchInput.addEventListener('input', ()=> this.renderGames());
		this.categoryFilter.addEventListener('change', ()=> this.renderGames());
		this.refreshBtn.addEventListener('click', ()=> this.loadGames(true));
		this.themeToggle.addEventListener('click', ()=> this.toggleTheme());
		this.closeModal.addEventListener('click', ()=> this.closePlayer());
		this.tabButtons.forEach(btn => btn.addEventListener('click', (e)=> this.switchTab(e)));
	}

	switchTab(e) {
		const tab = e.currentTarget.dataset.tab;
		document.querySelectorAll('.tab-button').forEach(b=>b.classList.remove('active'));
		e.currentTarget.classList.add('active');
		document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
		document.getElementById('panel-' + tab).classList.add('active');
	}

	async loadGames(force=false) {
		// try to fetch generated JSON
		try {
			const res = await fetch('games_list.json?ts=' + Date.now(), {cache: 'no-store'});
			if (res.ok) {
				this.generatedGames = await res.json();
			} else {
				this.generatedGames = [];
			}
		} catch (err) {
			this.generatedGames = [];
		}
		this.mergeGames();
		this.renderGames();
		this.renderFolders();
	}

	mergeGames() {
		const map = new Map();
		[...this.staticGames, ...this.generatedGames].forEach(g=>{
			const key = (g.url || g.path || g.name).replace(/\/+$/, '');
			if (!map.has(key)) {
				map.set(key, {
					name: g.name || g.folder || key.split('/').pop(),
					category: g.category || g.type || (g.folder ? 'folder' : 'unknown'),
					image: g.image || 'https://via.placeholder.com/210x120.png?text=No+Image',
					url: g.url || g.path || key
				});
			}
		});
		this.games = Array.from(map.values());
	}

	renderGames() {
		const q = (this.searchInput.value || '').toLowerCase();
		const cat = this.categoryFilter.value;
		this.gameGrid.innerHTML = '';
		const filtered = this.games.filter(g=>{
			return (!cat || g.category === cat) && (!q || g.name.toLowerCase().includes(q));
		});
		if (filtered.length === 0) {
			this.gameGrid.innerHTML = `<div class="muted">No games found</div>`;
			return;
		}
		filtered.forEach(g=>{
			const card = document.createElement('div');
			card.className = 'game-card';
			card.innerHTML = `
				<div class="game-thumb" style="background-image: url('${g.image}')"></div>
				<div class="game-card-content">
					<div class="game-card-title">${g.name}</div>
					<div class="game-card-category">${g.category}</div>
					<button class="play-btn">Play</button>
				</div>
			`;
			card.querySelector('.play-btn').addEventListener('click', (e)=> {
				this.openPlayer(g.url);
			});
			this.gameGrid.appendChild(card);
		});
	}

	renderFolders() {
		this.folderList.innerHTML = '';
		const folders = this.generatedGames.map(g=>({name:g.name,url:g.url}));
		if (folders.length === 0) {
			this.folderList.innerHTML = '<li class="muted">No folders detected. Run the scan script on the server to generate games_list.json.</li>';
			return;
		}
		folders.forEach(f=>{
			const li = document.createElement('li');
			li.innerHTML = `<a href="#" data-url="${f.url}">${f.name}</a>`;
			li.querySelector('a').addEventListener('click', (e)=>{ e.preventDefault(); this.openPlayer(f.url); });
			this.folderList.appendChild(li);
		});
	}

	openPlayer(url) {
		// ensure index.html resolution: if url ends with '/', keep it; else use as-is
		let target = url;
		if (target.endsWith('/')) target = target;
		this.gameFrame.src = target;
		this.playModal.classList.remove('hidden');
		this.playModal.setAttribute('aria-hidden','false');
	}

	closePlayer() {
		this.gameFrame.src = 'about:blank';
		this.playModal.classList.add('hidden');
		this.playModal.setAttribute('aria-hidden','true');
	}
}

window.addEventListener('DOMContentLoaded', ()=> {
	window.app = new App();
});
