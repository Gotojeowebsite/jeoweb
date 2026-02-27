class App {
constructor() {
this.games = [];
this.autoRefreshTimer = null;
this.fallbackImage = 'notavailable.svg';

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
this.updateCounter();
this.renderGames();
this.hideLoading();
}

startAutoRefresh() {
if (this.autoRefreshTimer) clearInterval(this.autoRefreshTimer);
this.autoRefreshTimer = setInterval(() => this.reloadGames(), 15000);
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
const duration = 600;
const steps = Math.abs(target - current);
const interval = Math.max(duration / steps, 10);
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

bindUI() {
this.searchInput.addEventListener('input', () => this.renderGames());
this.refreshBtn.addEventListener('click', () => this.refreshGames());
this.themeToggle.addEventListener('click', () => this.toggleTheme());
this.closeModal.addEventListener('click', () => this.closePlayer());
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
const card = document.createElement('div');
card.className = 'game-card';
card.style.animationDelay = Math.min(i * 0.03, 0.5) + 's';
card.innerHTML = '<div class="game-thumb"><img src="' + imgSrc + '" alt="' + g.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + this.fallbackImage + '\';" /></div><div class="game-card-content"><div class="game-card-title">' + g.name + '</div><button class="play-btn">▶ Play</button></div>';
card.querySelector('.play-btn').addEventListener('click', function() { window.app.openPlayer(g.url); });
card.addEventListener('dblclick', function() { window.app.openPlayer(g.url); });
this.gameGrid.appendChild(card);
});
}

openPlayer(url) {
var target = url;
if (target.endsWith('/')) target += 'index.html';
else if (target.indexOf('.html') === -1 && target.indexOf('.swf') === -1) target += '/index.html';
this.gameFrame.src = target;
this.playModal.classList.remove('hidden');
this.playModal.setAttribute('aria-hidden', 'false');
document.body.style.overflow = 'hidden';
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
