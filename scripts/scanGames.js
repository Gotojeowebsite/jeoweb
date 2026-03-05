const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const OUTFILE = path.join(ROOT, 'games_list.json');

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
			const logoCandidates = ['logo.jpeg', 'logo.jpg', 'logo.png'];
			const logoFile = logoCandidates.find(file => fs.existsSync(path.join(ASSETS_DIR, it.name, file)));
			if (fs.existsSync(idx) && logoFile) {
				results.push({
					name: it.name,
					url: `Assets/${it.name}/`,
					category: 'action', // Default category, can be improved
					image: `Assets/${it.name}/${logoFile}`
				});
			}
		}
	}
	fs.writeFileSync(OUTFILE, JSON.stringify(results, null, 2));
	console.log('Wrote', OUTFILE, '->', results.length, 'entries');
}

scan();

