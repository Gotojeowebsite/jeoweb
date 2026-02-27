const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ASSETS_DIR = path.join(ROOT, 'Assets');
const PORT = process.env.PORT || 3000;

// Store games in memory
let cachedGames = [];

// Bare server for Interstellar proxy
let bareServer = null;

// Image extensions to look for (priority order)
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico'];

// Find the best image in a game folder
function findImage(folderPath, folderName) {
	try {
		const files = fs.readdirSync(folderPath);
		const priorityNames = ['logo', 'icon', 'splash', 'thumb', 'thumbnail', folderName.toLowerCase()];

		const imageFiles = files.filter(f => {
			const ext = path.extname(f).toLowerCase();
			return IMAGE_EXTS.includes(ext);
		});

		if (imageFiles.length === 0) return null;

		for (const name of priorityNames) {
			const match = imageFiles.find(f => path.basename(f, path.extname(f)).toLowerCase() === name);
			if (match) return `Assets/${folderName}/${match}`;
		}

		return `Assets/${folderName}/${imageFiles[0]}`;
	} catch (e) {
		return null;
	}
}

// Scan function - returns games array
function scanGames() {
	const results = [];
	if (!fs.existsSync(ASSETS_DIR)) {
		console.error('Assets folder not found:', ASSETS_DIR);
		return results;
	}
	const items = fs.readdirSync(ASSETS_DIR, { withFileTypes: true });
	for (const it of items) {
		if (!it.isDirectory()) continue;

		// Skip interstellar - it's handled separately as a proxy
		if (it.name.toLowerCase() === 'interstellar') continue;

		const folderPath = path.join(ASSETS_DIR, it.name);

		// Find any .html file in the folder (prefer index.html)
		const files = fs.readdirSync(folderPath);
		const htmlFiles = files.filter(f => f.toLowerCase().endsWith('.html'));
		if (htmlFiles.length === 0) continue;
		const htmlFile = htmlFiles.find(f => f.toLowerCase() === 'index.html') || htmlFiles[0];

		const image = findImage(folderPath, it.name);

		results.push({
			name: it.name,
			url: `Assets/${it.name}/${htmlFile}`,
			image: image || 'notavailable.svg'
		});
	}
	results.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
	return results;
}

// Initial scan on startup
function scan() {
	cachedGames = scanGames();
	console.log(`[${new Date().toLocaleTimeString()}] Scanned Assets folder - found ${cachedGames.length} games`);
}

// MIME types
const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.swf': 'application/x-shockwave-flash',
	'.ico': 'image/x-icon',
	'.webp': 'image/webp',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.ttf': 'font/ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.otf': 'font/otf',
	'.mp3': 'audio/mpeg',
	'.mp4': 'video/mp4',
	'.webm': 'video/webm',
	'.ogg': 'audio/ogg',
	'.wav': 'audio/wav',
	'.wasm': 'application/wasm',
	'.map': 'application/json',
	'.txt': 'text/plain',
	'.xml': 'application/xml',
	'.data': 'application/octet-stream',
	'.unityweb': 'application/octet-stream'
};

// Create HTTP server
const server = http.createServer((req, res) => {
	// Route bare server requests (Interstellar proxy)
	if (bareServer && bareServer.shouldRoute(req)) {
		bareServer.routeRequest(req, res);
		return;
	}

	// Handle Interstellar asset proxy routes (/e/*)
	if (req.url.startsWith('/e/')) {
		handleInterstellarAssetProxy(req, res);
		return;
	}

	// Serve Interstellar static assets from /assets/ (lowercase)
	// These are referenced by absolute paths in Interstellar HTML files
	if (req.url.startsWith('/assets/')) {
		const assetPath = path.join(ROOT, 'Assets', 'interstellar', 'static', req.url);
		const ext = path.extname(assetPath).toLowerCase();
		fs.readFile(assetPath, (err, data) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 - Not Found</h1>');
			} else {
				const contentType = mimeTypes[ext] || 'application/octet-stream';
				res.writeHead(200, { 'Content-Type': contentType });
				res.end(data);
			}
		});
		return;
	}

	// Serve Interstellar root files (sw.js, favicon.png, etc.)
	const interstellarRootFiles = ['/sw.js', '/favicon.png', '/favicon.ico'];
	if (interstellarRootFiles.includes(req.url.split('?')[0])) {
		const filePath = path.join(ROOT, 'Assets', 'interstellar', 'static', req.url.split('?')[0]);
		const ext = path.extname(filePath).toLowerCase();
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 - Not Found</h1>');
			} else {
				const contentType = mimeTypes[ext] || 'application/octet-stream';
				res.writeHead(200, { 'Content-Type': contentType });
				res.end(data);
			}
		});
		return;
	}

	// Serve Interstellar page routes (/proxy, /a=games, /b=apps, /c=settings, /d=tabs)
	const interstellarRoutes = {
		'/proxy': 'index.html',
		'/a': 'games.html',
		'/b': 'apps.html',
		'/c': 'settings.html',
		'/d': 'tabs.html',
	};
	const cleanUrl = req.url.split('?')[0];
	// Match exact routes AND sub-paths like /a/encoded-url
	let matchedRoute = interstellarRoutes[cleanUrl];
	if (!matchedRoute && cleanUrl.startsWith('/a/')) {
		matchedRoute = 'games.html';
	}
	if (matchedRoute) {
		const filePath = path.join(ROOT, 'Assets', 'interstellar', 'static', matchedRoute);
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 - Not Found</h1>');
			} else {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(data);
			}
		});
		return;
	}

	if (req.url === '/api/games') {
		const games = scanGames();
		cachedGames = games;
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
			'Pragma': 'no-cache',
			'Expires': '0'
		});
		res.end(JSON.stringify(games));
		return;
	}

	// Handle index.html specially - inject games list
	if (req.url === '/' || req.url === '/index.html') {
		fs.readFile(path.join(ROOT, 'index.html'), 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 - Not Found</h1>');
				return;
			}
			// Re-scan games when serving the page
			cachedGames = scanGames();
			// Inject games list into the HTML
			const gamesList = JSON.stringify(cachedGames);
			const modifiedHtml = data.replace(
				'</head>',
				`<script>window.GAMES_LIST = ${gamesList};</script>\n</head>`
			);
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
				'Pragma': 'no-cache',
				'Expires': '0'
			});
			res.end(modifiedHtml);
		});
		return;
	}

	// For all other files, serve normally
	let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
	const ext = path.extname(filePath).toLowerCase();

	fs.readFile(filePath, (err, data) => {
		if (err) {
			// Try to serve index.html for directory requests
			if (err.code === 'EISDIR') {
				filePath = path.join(filePath, 'index.html');
				fs.readFile(filePath, (err2, data2) => {
					if (err2) {
						res.writeHead(404, { 'Content-Type': 'text/html' });
						res.end('<h1>404 - Not Found</h1>');
					} else {
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.end(data2);
					}
				});
			} else {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 - Not Found</h1>');
			}
		} else {
			const contentType = mimeTypes[ext] || 'application/octet-stream';
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(data);
		}
	});
});

// Handle WebSocket upgrades for Interstellar bare server
server.on('upgrade', (req, socket, head) => {
	if (bareServer && bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

// Interstellar asset proxy cache
const assetCache = new Map();
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

async function handleInterstellarAssetProxy(req, res) {
	try {
		if (assetCache.has(req.url)) {
			const { data, contentType, timestamp } = assetCache.get(req.url);
			if (Date.now() - timestamp > CACHE_TTL) {
				assetCache.delete(req.url);
			} else {
				res.writeHead(200, { 'Content-Type': contentType });
				res.end(data);
				return;
			}
		}

		const baseUrls = {
			'/e/1/': 'https://raw.githubusercontent.com/qrs/x/fixy/',
			'/e/2/': 'https://raw.githubusercontent.com/3v1/V5-Assets/main/',
			'/e/3/': 'https://raw.githubusercontent.com/3v1/V5-Retro/master/',
		};

		let reqTarget;
		for (const [prefix, baseUrl] of Object.entries(baseUrls)) {
			if (req.url.startsWith(prefix)) {
				reqTarget = baseUrl + req.url.slice(prefix.length);
				break;
			}
		}

		if (!reqTarget) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end('<h1>404 - Not Found</h1>');
			return;
		}

		const fetch = (await import(path.join(ROOT, 'Assets', 'interstellar', 'node_modules', 'node-fetch', 'src', 'index.js'))).default;
		const asset = await fetch(reqTarget);
		if (!asset.ok) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end('<h1>404 - Asset Not Found</h1>');
			return;
		}

		const data = Buffer.from(await asset.arrayBuffer());
		const ext = path.extname(reqTarget);
		const noMime = ['.unityweb'];
		let contentType = 'application/octet-stream';
		if (!noMime.includes(ext)) {
			const mimeType = mimeTypes[ext];
			if (mimeType) contentType = mimeType;
		}

		assetCache.set(req.url, { data, contentType, timestamp: Date.now() });
		res.writeHead(200, { 'Content-Type': contentType });
		res.end(data);
	} catch (error) {
		console.error('Error fetching Interstellar asset:', error);
		res.writeHead(500, { 'Content-Type': 'text/html' });
		res.end('<h1>500 - Error fetching asset</h1>');
	}
}

// Initialize Interstellar bare server
async function initBareServer() {
	try {
		const bareModule = require(path.join(ROOT, 'Assets', 'interstellar', 'node_modules', '@nebula-services', 'bare-server-node'));
		bareServer = bareModule.createBareServer('/ca/');
		console.log('✓ Interstellar proxy (bare server) initialized on /ca/');
	} catch (e) {
		console.warn('⚠ Could not initialize Interstellar bare server:', e.message);
		console.warn('  Proxy features will not be available. Run: cd Interstellar && npm install');
	}
}

// Run initial scan
console.log('Starting game scanner...');
scan();

// Scan every 30 seconds for new games
setInterval(scan, 30000);

// Start server (after initializing bare server)
initBareServer().then(() => {
	server.listen(PORT, () => {
		console.log(`\n✓ Server running at http://localhost:${PORT}`);
		console.log(`✓ Games will auto-scan every 30 seconds\n`);
	});
});

process.on('SIGINT', () => {
	console.log('\n✓ Server shutting down gracefully');
	server.close(() => {
		console.log('✓ Server closed');
		process.exit(0);
	});
});
