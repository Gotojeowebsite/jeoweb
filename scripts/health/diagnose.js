// scripts/health/diagnose.js
//
// Game Health Doctor — deep diagnose module. Three independent lanes:
//
//   1. byte    : pure-Node stat + content scan of the entry HTML. Catches
//                empty/stub HTML without Playwright. Works on any folder
//                (live Assets/<slug> or candidate Assets/.recovery/<slug>-<ts>).
//   2. static  : delegates to scripts/static-health-scan.js#scanGame for the
//                full reference-resolution + engine-runtime + literal-undefined
//                pass. Only meaningful for slugs that live under Assets/.
//   3. headless: optional. Spawns broken_game_scanner.py on the candidate
//                folder. If Playwright isn't installed, returns
//                { lane: 'unavailable' } — NOT pass. The byte+static lanes
//                are authoritative when headless can't run.
//
// Return shape:
//   {
//     ok: boolean,           // false if ANY lane reports a critical code
//     codes: string[],       // critical codes across all lanes
//     lanes: {
//       byte:     { lane: 'pass'|'fail'|'skip',          codes, details },
//       static:   { lane: 'pass'|'fail'|'skip',          codes, details },
//       headless: { lane: 'pass'|'fail'|'skip'|'unavailable', codes, details },
//     },
//   }
//
// Public API:
//   deepDiagnose(slug, opts) -> Promise<DiagnoseResult>
//   byteGate(folder)        -> { ok, codes, details }  (sync, exported for reuse)
//
// opts:
//   allowPlaywright   default true. Set false to skip the headless lane.
//   rootOverride      absolute path; replaces Assets/<slug> for the byte lane
//                     and headless lane. Used by recover-game.js to pre-check
//                     a candidate folder before swapping.
//   verbose           log lane outcomes
//   scannerTimeoutMs  default 600000 (10min); headless lane watchdog

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const ASSETS_DIR = path.join(ROOT, 'Assets');
const REPORTS_DIR = path.join(ROOT, 'reports');

const MIN_ENTRY_BYTES = Number(process.env.MIN_ENTRY_HTML_BYTES) || 200;

// Regex mirrored from scripts/static-health-scan.js. Keep in sync.
const ENGINE_MARKER_RE = /<canvas|<iframe|<embed|<object|<script|ruffle-(player|embed|object)|ejs_pathtodata|ejs_player|unity|godot|phaser|<meta[^>]+http-equiv\s*=\s*["']refresh["']/i;

function findEntryHtml(folder) {
	const idx = path.join(folder, 'index.html');
	if (fs.existsSync(idx)) return idx;
	try {
		const direct = fs.readdirSync(folder).filter((f) => f.toLowerCase().endsWith('.html'));
		if (direct.length) return path.join(folder, direct.sort()[0]);
	} catch {}
	return null;
}

// Byte gate. Pure Node, no deps. Catches OvO-class silent failures.
// Returns { ok, codes, details }.
function byteGate(folder) {
	const details = { folder };
	if (!fs.existsSync(folder)) {
		return { ok: false, codes: ['MISSING_FOLDER'], details: { ...details, reason: 'folder_does_not_exist' } };
	}
	const html = findEntryHtml(folder);
	if (!html) {
		return { ok: false, codes: ['NO_HTML'], details: { ...details, reason: 'no_html_entry' } };
	}
	details.entry = path.relative(folder, html);
	let stat;
	try { stat = fs.statSync(html); }
	catch (e) {
		return { ok: false, codes: ['ENTRY_HTML_MISSING'], details: { ...details, reason: e.message } };
	}
	details.bytes = stat.size;
	let text = '';
	try { text = fs.readFileSync(html, 'utf-8'); }
	catch (e) {
		return { ok: false, codes: ['ENTRY_HTML_UNREADABLE'], details: { ...details, reason: e.message } };
	}
	const hasMarker = ENGINE_MARKER_RE.test(text);
	details.has_engine_marker = hasMarker;
	const stripped = text.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, '');
	details.stripped_chars = stripped.length;
	// Mutually-exclusive critical codes. EMPTY_ENTRY_HTML_CRITICAL is the
	// narrower diagnosis (tiny + no markers); NO_ENGINE_MARKER is the wider
	// "page has some content but cannot be a game" case. Reporting both
	// is redundant — pick one.
	const codes = [];
	if (!hasMarker) {
		if (stat.size < MIN_ENTRY_BYTES) {
			codes.push('EMPTY_ENTRY_HTML_CRITICAL');
		} else {
			codes.push('NO_ENGINE_MARKER');
		}
	}
	return { ok: codes.length === 0, codes, details };
}

// Static lane. Reads the slug entry from a fresh static-health-scan if the
// folder matches Assets/<slug>; otherwise falls back to byte-only gate
// (because the existing scanGame is slug-keyed by design).
function staticLane(slug, opts) {
	try {
		const { scanGame } = require('../static-health-scan');
		// scanGame(slug) reads Assets/<slug>. If a rootOverride is provided
		// AND it points outside Assets/, we skip — the byte lane covers it.
		const folder = opts.rootOverride || path.join(ASSETS_DIR, slug);
		if (path.resolve(folder) !== path.resolve(path.join(ASSETS_DIR, slug))) {
			return { lane: 'skip', codes: [], details: { reason: 'rootOverride_not_slug_folder' } };
		}
		const r = scanGame(slug);
		const codes = (r && Array.isArray(r.issues) ? r.issues : [])
			.filter((i) => i && i.severity === 'critical')
			.map((i) => i.code);
		return {
			lane: r && r.verdict === 'fail' ? 'fail' : (r && r.verdict === 'pass' ? 'pass' : 'skip'),
			codes,
			details: { verdict: r && r.verdict, issues: r && r.issues },
		};
	} catch (e) {
		return { lane: 'skip', codes: [], details: { reason: `static_scan_threw: ${e.message}` } };
	}
}

// Headless lane. Spawns broken_game_scanner.py against a single folder.
// Returns { lane, codes, details } where lane is one of
// 'pass' | 'fail' | 'unavailable' | 'skip'.
function runScanner(folder, slug, opts) {
	return new Promise((resolve) => {
		const timeoutMs = Number(opts.scannerTimeoutMs) || 600_000;
		const reportPath = path.join(REPORTS_DIR, `doctor_scan_${slug}.json`);
		try { fs.mkdirSync(REPORTS_DIR, { recursive: true }); } catch {}
		const args = [
			path.join(ROOT, 'broken_game_scanner.py'),
			'--root', folder,
			'--hard-timeout-seconds', '90',
			'--wait-seconds', '6',
			'--report-json', reportPath,
			'--broken-json', path.join(REPORTS_DIR, `doctor_broken_${slug}.json`),
			'--broken-log', path.join(REPORTS_DIR, `doctor_broken_${slug}.txt`),
			'--working-log', path.join(REPORTS_DIR, `doctor_working_${slug}.txt`),
			'--checked-log', path.join(REPORTS_DIR, `doctor_checked_${slug}.txt`),
			'--review-log', path.join(REPORTS_DIR, `doctor_review_${slug}.txt`),
			'--state-file', path.join(REPORTS_DIR, `doctor_state_${slug}.json`),
			'--port', String(9100 + Math.floor(Math.random() * 800)),
		];
		const proc = spawn('python3', args, { cwd: ROOT, stdio: opts.verbose ? 'inherit' : 'ignore' });
		let settled = false;
		const watchdog = setTimeout(() => {
			if (settled) return;
			settled = true;
			try { proc.kill('SIGKILL'); } catch {}
			resolve({ lane: 'unavailable', codes: [], details: { reason: 'scanner_timeout' } });
		}, timeoutMs);
		proc.on('error', (err) => {
			if (settled) return;
			settled = true;
			clearTimeout(watchdog);
			if (err && err.code === 'ENOENT') {
				resolve({ lane: 'unavailable', codes: [], details: { reason: 'python3_missing' } });
			} else {
				resolve({ lane: 'unavailable', codes: [], details: { reason: `spawn_error:${err.message}` } });
			}
		});
		proc.on('exit', (code) => {
			if (settled) return;
			settled = true;
			clearTimeout(watchdog);
			let report = null;
			try { report = JSON.parse(fs.readFileSync(reportPath, 'utf-8')); } catch {}
			if (code !== 0) {
				// Non-zero exit usually means Playwright missing or scanner crash.
				resolve({ lane: 'unavailable', codes: [], details: { reason: `exit_${code}`, report } });
				return;
			}
			const items = Array.isArray(report) ? report : [];
			const broken = items.filter((g) => g && g.status === 'broken');
			if (broken.length) {
				const lead = broken[0];
				const codes = (Array.isArray(lead.critical_issues) ? lead.critical_issues : [])
					.map((i) => i && i.code)
					.filter(Boolean);
				resolve({
					lane: 'fail',
					codes: codes.length ? codes : ['HEADLESS_BROKEN'],
					details: { lead, total: items.length },
				});
				return;
			}
			resolve({ lane: 'pass', codes: [], details: { total: items.length } });
		});
	});
}

async function deepDiagnose(slug, opts = {}) {
	const rootOverride = opts.rootOverride || null;
	const liveFolder = rootOverride || path.join(ASSETS_DIR, slug);

	// Lane 1: byte gate (always).
	const byte = byteGate(liveFolder);
	const byteLane = byte.ok ? 'pass' : 'fail';
	const byteResult = { lane: byteLane, codes: byte.codes, details: byte.details };
	if (opts.verbose) {
		console.log(`  diagnose[${slug}] byte: ${byteLane}${byte.codes.length ? ' codes=' + byte.codes.join(',') : ''}`);
	}

	// Lane 2: static (slug-keyed; only meaningful for the live folder).
	const stat = staticLane(slug, { rootOverride });
	if (opts.verbose) {
		console.log(`  diagnose[${slug}] static: ${stat.lane}${stat.codes.length ? ' codes=' + stat.codes.join(',') : ''}`);
	}

	// Lane 3: headless (optional).
	let headless;
	if (opts.allowPlaywright === false) {
		headless = { lane: 'skip', codes: [], details: { reason: 'allowPlaywright=false' } };
	} else {
		headless = await runScanner(liveFolder, slug, opts);
	}
	if (opts.verbose) {
		console.log(`  diagnose[${slug}] headless: ${headless.lane}${headless.codes.length ? ' codes=' + headless.codes.join(',') : ''}`);
	}

	const allCodes = [
		...new Set([
			...byteResult.codes,
			...stat.codes,
			...headless.codes,
		]),
	];
	const anyFail = [byteResult, stat, headless].some((l) => l.lane === 'fail');
	return {
		ok: !anyFail,
		codes: allCodes,
		lanes: { byte: byteResult, static: stat, headless },
	};
}

module.exports = { deepDiagnose, byteGate };
