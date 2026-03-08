const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ASSETS_DIR = path.join(ROOT, 'Assets');
const VOTES_FILE = path.join(ROOT, 'votes.json');
const PORT = process.env.PORT || 3000;

let cachedGames = [];

// ---- Votes storage ----
// votes.json structure: { "game-name": { "userId1": true, "userId2": true }, ... }
function loadVotes() {
	try {
		return JSON.parse(fs.readFileSync(VOTES_FILE, 'utf8'));
	} catch (e) {
		return {};
	}
}

function saveVotes(votes) {
	fs.writeFileSync(VOTES_FILE, JSON.stringify(votes));
}

function getVoteCounts(votes) {
	const counts = {};
	for (const game in votes) {
		counts[game] = Object.keys(votes[game]).length;
	}
	return counts;
}

function getUserVotes(votes, userId) {
	const userVotes = [];
	for (const game in votes) {
		if (votes[game][userId]) userVotes.push(game);
	}
	return userVotes;
}

function parseCookies(cookieHeader) {
	const cookies = {};
	if (!cookieHeader) return cookies;
	cookieHeader.split(';').forEach(c => {
		const [key, ...rest] = c.trim().split('=');
		if (key) cookies[key] = rest.join('=');
	});
	return cookies;
}

function getOrCreateUserId(req, res) {
	const cookies = parseCookies(req.headers.cookie);
	let uid = cookies['jeo-uid'];
	if (!uid || uid.length < 8) {
		uid = require('crypto').randomBytes(16).toString('hex');
		res.setHeader('Set-Cookie', 'jeo-uid=' + uid + '; Path=/; Max-Age=315360000; SameSite=Lax');
	}
	return uid;
}

function readBody(req) {
	return new Promise((resolve, reject) => {
		let body = '';
		req.on('data', chunk => {
			body += chunk;
			if (body.length > 1024) { req.destroy(); reject(new Error('Body too large')); }
		});
		req.on('end', () => resolve(body));
		req.on('error', reject);
	});
}

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
	// ---- Vote API ----
	if (req.url === '/api/votes' && req.method === 'GET') {
		const uid = getOrCreateUserId(req, res);
		const votes = loadVotes();
		res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
		res.end(JSON.stringify({ counts: getVoteCounts(votes), myVotes: getUserVotes(votes, uid) }));
		return;
	}

	if (req.url === '/api/votes' && req.method === 'POST') {
		try {
			const uid = getOrCreateUserId(req, res);
			const body = await readBody(req);
			const { game, action } = JSON.parse(body);
			if (!game || typeof game !== 'string' || game.length > 200) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ error: 'Invalid game name' }));
				return;
			}
			const votes = loadVotes();
			if (action === 'upvote') {
				if (!votes[game]) votes[game] = {};
				votes[game][uid] = true;
			} else if (action === 'unvote') {
				if (votes[game]) {
					delete votes[game][uid];
					if (Object.keys(votes[game]).length === 0) delete votes[game];
				}
			} else {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ error: 'Invalid action' }));
				return;
			}
			saveVotes(votes);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ counts: getVoteCounts(votes), myVotes: getUserVotes(votes, uid) }));
		} catch (e) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ error: 'Bad request' }));
		}
		return;
	}

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
	const decodedPath = decodeURIComponent(parsedUrl.pathname);
	let filePath = path.join(ROOT, decodedPath);
	const ext = path.extname(filePath).toLowerCase();

	fs.readFile(filePath, (err, data) => {
		if (err) {
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
			res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
			res.end(data);
		}
	});
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
