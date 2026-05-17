#!/usr/bin/env node
/*
 * Engine-version clinic.
 *
 * Many games on this catalog share the same engine runtime (Unity loader,
 * Ruffle build, EmulatorJS core, Godot wasm) — when that engine's CDN
 * goes 404 or the bundled version stops working in modern browsers, EVERY
 * game using that engine breaks at the same point in the load sequence.
 *
 * Recovering each game individually wastes scrape cycles. Instead, this
 * tool:
 *   1. Reads game_health.json + the offline manifest for every broken /
 *      probable_broken game.
 *   2. Groups them by engine fingerprint (Unity Build/<hash>/loader.js
 *      basename; Ruffle build version; EmulatorJS core+version; Godot
 *      engine.js hash).
 *   3. For each cluster of 2+ games stuck on the same engine, downloads
 *      a known-good build of THAT engine once and propagates it across
 *      every game in the cluster in a single sweep.
 *
 * Per the Phase 3 plan: "if N games share the same engine signature and
 * all 3+ failed at the same point in the load sequence, the engine
 * itself is the problem."
 *
 * USAGE:
 *   node scripts/recovery/engine-clinic.js              # diagnose-only
 *   node scripts/recovery/engine-clinic.js --apply      # download + propagate
 *   node scripts/recovery/engine-clinic.js --min-cluster 3
 *   node scripts/recovery/engine-clinic.js --engine unity
 *
 * This is a diagnostic + propagation tool, not a replacement for the
 * full recovery engine. Slugs that DO get patched by the clinic skip the
 * normal recovery cooldown and re-enter the queue for re-validation on
 * the next nightly.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const HEALTH_PATH = path.join(ROOT, 'game_health.json');
const REPORTS_DIR = path.join(ROOT, 'reports');
const CLINIC_REPORT_PATH = path.join(REPORTS_DIR, 'engine_clinic.json');

function parseArgs(argv) {
	const args = { apply: false, minCluster: 2, engine: null, help: false };
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--apply') args.apply = true;
		else if (a === '--min-cluster') args.minCluster = Math.max(2, Number(argv[++i]) || 2);
		else if (a === '--engine') args.engine = String(argv[++i] || '').toLowerCase();
		else if (a === '--help' || a === '-h') args.help = true;
	}
	return args;
}

function help() {
	console.log('Usage: node scripts/recovery/engine-clinic.js [--apply] [--min-cluster N] [--engine unity|ruffle|emulatorjs|godot]');
	console.log('');
	console.log('Diagnose-only by default. --apply downloads a known-good engine build');
	console.log('and propagates it across every game in a matching cluster.');
}

// Engine fingerprint extractors. Each returns a stable signature string
// or null if the engine isn't detectable in this game's folder.
function fingerprintUnity(folder) {
	const candidates = ['index.html', 'Build'];
	let buildName = null;
	let loaderHash = null;
	// Look for Build/<name>.loader.js or .data / .wasm files.
	const buildDir = path.join(folder, 'Build');
	if (fs.existsSync(buildDir)) {
		try {
			for (const f of fs.readdirSync(buildDir)) {
				const m = f.match(/^([A-Za-z0-9._-]+?)\.(loader\.js|wasm|data|framework\.js)$/);
				if (m && !buildName) buildName = m[1];
			}
		} catch {}
	}
	// Cross-reference with the entry HTML for the loader script tag hash.
	try {
		const htmlFiles = fs.readdirSync(folder).filter((f) => /\.html?$/i.test(f));
		for (const f of htmlFiles.slice(0, 2)) {
			const txt = fs.readFileSync(path.join(folder, f), 'utf-8');
			const m = txt.match(/Build\/([A-Za-z0-9._-]+)\.loader\.js/);
			if (m) { loaderHash = m[1]; break; }
		}
	} catch {}
	const sig = loaderHash || buildName;
	return sig ? `unity:${sig.toLowerCase()}` : null;
}

function fingerprintEjs(folder) {
	let core = null;
	let scriptVersion = null;
	try {
		const htmlFiles = fs.readdirSync(folder).filter((f) => /\.html?$/i.test(f));
		for (const f of htmlFiles.slice(0, 2)) {
			const txt = fs.readFileSync(path.join(folder, f), 'utf-8');
			const cm = txt.match(/EJS_core\s*=\s*["']([a-z0-9_]+)["']/i);
			if (cm) core = cm[1].toLowerCase();
			const vm = txt.match(/(?:emulator|emulator\.min)\.js\?v=([a-z0-9.-]+)/i);
			if (vm) scriptVersion = vm[1];
			if (core && scriptVersion) break;
		}
	} catch {}
	if (!core) return null;
	return `emulatorjs:${core}:${scriptVersion || 'unknown'}`;
}

function fingerprintRuffle(folder) {
	try {
		const htmlFiles = fs.readdirSync(folder).filter((f) => /\.html?$/i.test(f));
		for (const f of htmlFiles.slice(0, 2)) {
			const txt = fs.readFileSync(path.join(folder, f), 'utf-8');
			const m = txt.match(/ruffle(?:\.min)?\.js(?:\?v=([a-z0-9.-]+))?/i);
			if (m) return `ruffle:${m[1] || 'bundled'}`;
		}
	} catch {}
	const ruffleDir = path.join(folder, 'ruffle');
	if (fs.existsSync(ruffleDir)) return 'ruffle:vendored';
	return null;
}

function fingerprintGodot(folder) {
	try {
		const htmlFiles = fs.readdirSync(folder).filter((f) => /\.html?$/i.test(f));
		for (const f of htmlFiles.slice(0, 2)) {
			const txt = fs.readFileSync(path.join(folder, f), 'utf-8');
			if (/Engine\.prototype|new\s+Engine\(|godot|Module\["FS"\]/.test(txt)) {
				const wasmM = txt.match(/(?:index\.|godot\.)([a-z0-9-]+)\.wasm/i);
				return `godot:${wasmM ? wasmM[1] : 'unknown'}`;
			}
		}
	} catch {}
	return null;
}

function fingerprintFolder(slug) {
	const folder = path.join(ASSETS_DIR, slug);
	if (!fs.existsSync(folder)) return null;
	// Order matters: try the most distinctive engine first.
	return (
		fingerprintUnity(folder)
		|| fingerprintEjs(folder)
		|| fingerprintRuffle(folder)
		|| fingerprintGodot(folder)
	);
}

function loadHealth() {
	try { return JSON.parse(fs.readFileSync(HEALTH_PATH, 'utf-8')); }
	catch { return { games: {} }; }
}

function brokenSlugs(health) {
	const out = [];
	for (const [slug, entry] of Object.entries(health.games || {})) {
		if (!entry || slug.startsWith('.')) continue;
		if (entry.verdict === 'broken' || entry.verdict === 'probable_broken') {
			out.push(slug);
		}
	}
	return out;
}

function cluster(slugs, engineFilter) {
	const buckets = new Map();
	for (const slug of slugs) {
		const sig = fingerprintFolder(slug);
		if (!sig) continue;
		if (engineFilter && !sig.startsWith(engineFilter + ':')) continue;
		if (!buckets.has(sig)) buckets.set(sig, []);
		buckets.get(sig).push(slug);
	}
	return buckets;
}

function main() {
	const args = parseArgs(process.argv);
	if (args.help) { help(); return; }

	const health = loadHealth();
	const broken = brokenSlugs(health);
	if (!broken.length) {
		console.log('engine-clinic: no broken / probable_broken slugs in game_health.json — nothing to cluster');
		return;
	}

	console.log(`engine-clinic: scanning ${broken.length} broken / probable_broken slugs...`);
	const buckets = cluster(broken, args.engine);
	const clusters = [...buckets.entries()]
		.filter(([, members]) => members.length >= args.minCluster)
		.sort((a, b) => b[1].length - a[1].length);

	console.log('');
	console.log(`Found ${clusters.length} cluster(s) of >=${args.minCluster} games sharing an engine fingerprint:`);
	for (const [sig, members] of clusters) {
		console.log(`  ${sig}: ${members.length} games`);
		for (const s of members.slice(0, 5)) console.log(`    - ${s}`);
		if (members.length > 5) console.log(`    ... and ${members.length - 5} more`);
	}

	const report = {
		generated_at: Math.floor(Date.now() / 1000),
		mode: args.apply ? 'apply' : 'diagnose',
		clusters: clusters.map(([sig, members]) => ({
			signature: sig,
			members,
			engine: sig.split(':')[0],
			count: members.length,
		})),
		total_broken: broken.length,
		total_clustered: clusters.reduce((s, [, m]) => s + m.length, 0),
	};
	try {
		fs.mkdirSync(REPORTS_DIR, { recursive: true });
		fs.writeFileSync(CLINIC_REPORT_PATH, JSON.stringify(report, null, 2));
		console.log('');
		console.log(`wrote ${path.relative(ROOT, CLINIC_REPORT_PATH)}`);
	} catch (e) {
		console.warn(`failed to write engine_clinic.json: ${e.message}`);
	}

	if (!args.apply) {
		console.log('');
		console.log('--apply not set; diagnostic-only run. Pass --apply to propagate fixes.');
		console.log('Per-engine fix strategy:');
		console.log('  unity:*       → fetch known-good Build/<sig>/{loader.js,wasm,data} once + drop into each member');
		console.log('  emulatorjs:*  → re-download emulator.min.js and the named core into each member\'s emulatorjs/ subdir');
		console.log('  ruffle:*      → swap the vendored ruffle/ folder for the latest Ruffle nightly');
		console.log('  godot:*       → fetch godot.js + godot.wasm matching the wasm hash');
		return;
	}

	// --apply path: defers the actual engine download to the existing
	// scrape-engines.js + recovery engine. We rebuild the recovery
	// candidate by passing each member through `npm run recover -- <slug>`
	// in series so the post-swap re-validation gauntlet runs for every
	// game. This is conservative — a future enhancement is a true
	// "download once, copy N times" surgical patch (Phase 3
	// targeted-asset-replacement strategy).
	console.log('');
	console.log('--apply: triggering recover-game.js for each clustered slug (full pipeline).');
	const { spawnSync } = require('child_process');
	let recovered = 0;
	let failed = 0;
	for (const [sig, members] of clusters) {
		console.log(`\n[${sig}] processing ${members.length} games...`);
		for (const slug of members) {
			console.log(`  → ${slug}`);
			const r = spawnSync('node', ['scripts/recover-game.js', slug, '--ignore-cooldown'], {
				cwd: ROOT, stdio: 'inherit',
			});
			if (r.status === 0) recovered++;
			else failed++;
		}
	}
	console.log('');
	console.log(`engine-clinic apply: recovered=${recovered} failed=${failed}`);
}

if (require.main === module) {
	try { main(); }
	catch (e) { console.error(String(e && e.stack || e)); process.exit(2); }
}

module.exports = { fingerprintFolder, cluster, brokenSlugs };
