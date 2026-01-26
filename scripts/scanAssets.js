const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'assests');
const OUTFILE = path.join(ROOT, 'assets_list.json');

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
				results.push({
					name: it.name,
					url: `/assests/${it.name}/`,
					category: 'asset',
					emoji: '📦'
				});
			}
		}
	}
	fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
	console.log('Wrote', OUTFILE, '->', results.length, 'entries');
}

scan();
