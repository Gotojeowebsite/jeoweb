const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ASSETS_DIR = path.join(ROOT, 'Assets');
const PORT = process.env.PORT || 3000;

let cachedGames = [];

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico'];

function collectImages(dir, baseDir) {
	const results = [];
	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				results.push(...collectImages(fullPath, baseDir));
			} else if (IMAGE_EXTS.includes(path.extname(entry.name).toLowerCase())) {
				results.push(path.relative(baseDir, fullPath));
			}
		}
	} catch (e) {}
	return results;
}

function findImage(folderPath, folderName) {
	try {
		const allImages = collectImages(folderPath, folderPath);
		if (allImages.length === 0) return null;
		const priorityNames = ['logo', 'icon', 'splash', 'thumb', 'thumbnail', folderName.toLowerCase()];
		for (const name of priorityNames) {
			const match = allImages.find(f => path.basename(f, path.extname(f)).toLowerCase() === name);
			if (match) return `Assets/${folderName}/${match}`;
		}
		const rootImages = allImages.filter(f => !f.includes(path.sep) && !f.includes('/'));
		if (rootImages.length > 0) return `Assets/${folderName}/${rootImages[0]}`;
		return `Assets/${folderName}/${allImages[0]}`;
	} catch (e) {
		return null;
	}
}

function scanGames() {
	const results = [];
	if (!fs.existsSync(ASSETS_DIR)) {
		console.error('Assets folder not found:', ASSETS_DIR);
		return results;
	}
	const items = fs.readdirSync(ASSETS_DIR, { withFileTypes: true });
	for (const it of items) {
		if (!it.isDirectory()) continue;
		const folderPath = path.join(ASSETS_DIR, it.name);
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

function scan() {
	cachedGames = scanGames();
	console.log(`[${new Date().toLocaleTimeString()}] Scanned Assets folder - found ${cachedGames.length} games`);
}

const mimeTypes = {
	'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
	'.json': 'application/json', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg',
	'.png': 'image/png', '.gif': 'image/gif', '.svg': 'image/svg+xml',
	'.swf': 'application/x-shockwave-flash', '.ico': 'image/x-icon',
	'.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2',
	'.ttf': 'font/ttf', '.eot': 'application/vnd.ms-fontobject',
	'.otf': 'font/otf', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4',
	'.webm': 'video/webm', '.ogg': 'audio/ogg', '.wav': 'audio/wav',
	'.wasm': 'application/wasm', '.map': 'application/json',
	'.txt': 'text/plain', '.xml': 'application/xml',
	'.data': 'application/octet-stream', '.unityweb': 'application/octet-stream'
};

const server = http.createServer(async (req, res) => {
	if (req.url === '/api/games') {
		cachedGames = scanGames();
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
		});
		res.end(JSON.stringify(cachedGames));
		return;
	}

	if (req.url === '/logs' || req.url === '/logs.html') {
		fs.readFile(path.join(ROOT, 'logs.html'), 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 - Not Found</h1>');
				return;
			}
			res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
			res.end(data);
		});
		return;
	}

	if (req.url === '/' || req.url === '/index.html') {
		fs.readFile(path.join(ROOT, 'index.html'), 'utf-8', (err, data) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 - Not Found</h1>');
				return;
			}
			cachedGames = scanGames();
			const modifiedHtml = data.replace(
				'</head>',
				`<script>window.GAMES_LIST = ${JSON.stringify(cachedGames)};</script>\n</head>`
			);
			res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
			res.end(modifiedHtml);
		});
		return;
	}

	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
	let decodedPath;
	try {
		decodedPath = decodeURIComponent(parsedUrl.pathname);
	} catch (e) {
		res.writeHead(400, { 'Content-Type': 'text/html' });
		res.end('<h1>400 - Bad Request</h1>');
		return;
	}
	let filePath = path.join(ROOT, decodedPath);
	// Block path traversal — path.join normalizes "..", so a crafted URL like
	// "/../etc/passwd" can escape ROOT. Reject anything that resolves outside.
	if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
		res.writeHead(403, { 'Content-Type': 'text/html' });
		res.end('<h1>403 - Forbidden</h1>');
		return;
	}
	const ext = path.extname(filePath).toLowerCase();

	// Handle requests with "undefined" in the path (missing game assets)
	// Return empty response to prevent breaking game loading
	if (decodedPath.includes('/undefined/')) {
		console.log('[BENDY] Intercepting undefined path request:', decodedPath);
		res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
		res.end(Buffer.alloc(0)); // Return empty buffer
		return;
	}

	fs.stat(filePath, (err, stats) => {
		if (err) {
			if (err.code === 'ENOENT' || err.code === 'ENOTDIR') {
				// File not found, try archive fallback
				const dir = path.dirname(filePath);
				const ext2 = path.extname(filePath);
				const base = path.basename(filePath, ext2);
				fs.readdir(dir, (e3, names) => {
					if (e3 || !names) {
						res.writeHead(404, { 'Content-Type': 'text/html' });
						res.end('<h1>404 - Not Found</h1>');
						return;
					}
					const prefix = base + '__q_';
					const hit = names.find(n => n.startsWith(prefix) && n.endsWith(ext2));
					if (!hit) {
						res.writeHead(404, { 'Content-Type': 'text/html' });
						res.end('<h1>404 - Not Found</h1>');
						return;
					}
					const realPath = path.join(dir, hit);
					serveFile(realPath, res);
				});
			} else {
				res.writeHead(500, { 'Content-Type': 'text/html' });
				res.end('<h1>500 - Server Error</h1>');
			}
		} else if (stats.isDirectory()) {
			// Directory requested, try index.html
			const indexPath = path.join(filePath, 'index.html');
			fs.stat(indexPath, (e, s) => {
				if (e || !s.isFile()) {
					res.writeHead(404, { 'Content-Type': 'text/html' });
					res.end('<h1>404 - Not Found</h1>');
				} else {
					serveFile(indexPath, res);
				}
			});
		} else {
			// Regular file, serve it
			serveFile(filePath, res);
		}
	});

	function serveFile(filePath, res) {
		const ext = path.extname(filePath).toLowerCase();
		const headers = { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' };

		// Add Content-Encoding for pre-compressed files
		if (filePath.endsWith('.br')) {
			headers['Content-Encoding'] = 'br';
			const innerExt = path.extname(filePath.slice(0, -3));
			if (innerExt === '.js') headers['Content-Type'] = 'application/javascript';
			else if (innerExt === '.wasm') headers['Content-Type'] = 'application/wasm';
			else if (innerExt === '.data') headers['Content-Type'] = 'application/octet-stream';
		} else if (filePath.endsWith('.gz')) {
			headers['Content-Encoding'] = 'gzip';
			const innerExt = path.extname(filePath.slice(0, -3));
			if (innerExt === '.js') headers['Content-Type'] = 'application/javascript';
			else if (innerExt === '.wasm') headers['Content-Type'] = 'application/wasm';
			else if (innerExt === '.data') headers['Content-Type'] = 'application/octet-stream';
		}

		fs.stat(filePath, (err, stats) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 - Not Found</h1>');
				return;
			}

			headers['Content-Length'] = stats.size;
			res.writeHead(200, headers);

			const stream = fs.createReadStream(filePath);
			stream.pipe(res);
			stream.on('error', () => {
				res.writeHead(500, { 'Content-Type': 'text/html' });
				res.end('<h1>500 - Server Error</h1>');
			});
		});
	}
});

console.log('Starting game scanner...');
scan();
setInterval(scan, 30000);

server.listen(PORT, () => {
	console.log(`\n✓ Server running at http://localhost:${PORT}`);
	console.log(`✓ Games will auto-scan every 30 seconds\n`);
});

process.on('SIGINT', () => {
	console.log('\n✓ Server shutting down gracefully');
	server.close(() => process.exit(0));
});
