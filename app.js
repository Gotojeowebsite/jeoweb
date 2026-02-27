class App {
constructor() {
this.games = [];
this.proxies = [];
this.autoRefreshTimer = null;
this.fallbackImage = 'notavailable.svg';

// Define which items are proxies (by folder name or type field)
this.proxyNames = ['interstellar', 'interstellar proxy'];

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
const allItems = await this.resolveGames();
// Separate proxies from games
this.proxies = allItems.filter(g => g.type === 'proxy' || this.proxyNames.includes(g.name.toLowerCase()));
this.games = allItems.filter(g => g.type !== 'proxy' && !this.proxyNames.includes(g.name.toLowerCase()));
console.log('Games loaded:', this.games.length, '| Proxies:', this.proxies.length);
this.updateCounter();
this.renderProxies();
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
this.proxyGrid = document.getElementById('proxyGrid');
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
// Render proxies
this.renderProxies(q);
// Render games
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

renderProxies(q) {
if (!this.proxyGrid) return;
q = q || (this.searchInput.value || '').toLowerCase();
this.proxyGrid.innerHTML = '';
const proxiesSection = this.proxyGrid.closest('.proxies-section');
const filtered = this.proxies.filter(p => !q || p.name.toLowerCase().includes(q) || 'proxy'.includes(q));
if (filtered.length === 0) {
if (proxiesSection) proxiesSection.style.display = 'none';
return;
}
if (proxiesSection) proxiesSection.style.display = '';
filtered.forEach((p, i) => {
const imgSrc = p.image || this.fallbackImage;
const displayName = p.name.charAt(0).toUpperCase() + p.name.slice(1);
const card = document.createElement('div');
card.className = 'proxy-card';
card.style.animationDelay = Math.min(i * 0.05, 0.3) + 's';
card.innerHTML = '<div class="proxy-icon"><img src="' + imgSrc + '" alt="' + displayName + '" onerror="this.onerror=null;this.src=\'' + this.fallbackImage + '\';" /></div><div class="proxy-info"><div class="proxy-name">' + displayName + '</div><div class="proxy-desc">Web Proxy — Browse Freely</div></div><button class="proxy-launch-btn">🚀 Launch</button>';
card.querySelector('.proxy-launch-btn').addEventListener('click', function() { window.app.openProxy(p); });
card.addEventListener('dblclick', function() { window.app.openProxy(p); });
this.proxyGrid.appendChild(card);
});
}

openProxy(proxy) {
// Open proxy in full page — proxies need root-level access for service workers
window.location.href = proxy.url;
}

openPlayer(url) {
var target = url;
if (!target.match(/\.(html|swf)(\?|$)/i)) {
if (target.endsWith('/')) target += 'index.html';
else target += '/index.html';
}
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
