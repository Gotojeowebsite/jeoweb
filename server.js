const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ASSETS_DIR = path.join(ROOT, 'Assets');
const OUTFILE = path.join(ROOT, 'games_list.json');
const PORT = process.env.PORT || 3000;

// Scan function
function scan() {
	const results = [];
	if (!fs.existsSync(ASSETS_DIR)) {
		console.error('Assets folder not found:', ASSETS_DIR);
		fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
		return;
	}
	const items = fs.readdirSync(ASSETS_DIR, { withFileTypes: true });
	for (const it of items) {
		if (it.isDirectory()) {
			const idx = path.join(ASSETS_DIR, it.name, 'index.html');
			if (fs.existsSync(idx)) {
                const logoPath = ['logo.jpeg', 'logo.jpg', 'logo.png'].map(logo => path.join('Assets', it.name, logo)).find(logo => fs.existsSync(path.join(ROOT, logo)));
				results.push({
					name: it.name,
					url: `Assets/${it.name}/`,
					category: 'action',
					image: logoPath || 'https://via.placeholder.com/210x120.png?text=No+Logo'
				});
			}
		}
	}
	fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
	console.log(`[${new Date().toLocaleTimeString()}] Scanned Assets folder - found ${results.length} games`);
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
	'.swf': 'application/x-shockwave-flash'
};

// Create HTTP server
const server = http.createServer((req, res) => {
	// Enable CORS
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
	}

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

// Run initial scan
console.log('Starting game scanner...');
scan();

// Scan every 30 seconds for new games
setInterval(scan, 30000);

// Start server
server.listen(PORT, () => {
	console.log(`\n✓ Server running at http://localhost:${PORT}`);
	console.log(`✓ Games will auto-scan every 30 seconds\n`);
});

process.on('SIGINT', () => {
	console.log('\n✓ Server shutting down gracefully');
	server.close(() => {
		console.log('✓ Server closed');
		process.exit(0);
	});
});
