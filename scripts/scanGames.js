const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..'); // c:\Users\Jeo\jeoweb\jeoweb
const GAMES_DIR = path.join(ROOT, 'games');
const OUTFILE = path.join(ROOT, 'games_list.json');

function scan() {
	const results = [];
	if (!fs.existsSync(GAMES_DIR)) {
		console.error('Games folder not found:', GAMES_DIR);
		fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
		return;
	}
	const items = fs.readdirSync(GAMES_DIR, { withFileTypes: true });
	for (const it of items) {
		if (it.isDirectory()) {
			const idx = path.join(GAMES_DIR, it.name, 'index.html');
			if (fs.existsSync(idx)) {
				results.push({
					name: it.name,
					url: `/games/${it.name}/`,
					category: 'folder',
					emoji: '🗂️'
				});
			}
		}
	}
	fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
	console.log('Wrote', OUTFILE, '->', results.length, 'entries');
}

scan();
