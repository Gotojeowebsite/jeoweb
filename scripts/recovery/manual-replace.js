#!/usr/bin/env node
/*
 * Manual-replacement admin tool.
 *
 * Phase 3 fallback for the small minority of games where the full auto
 * recovery pipeline (exact → fuzzy → engine-clinic) has run out of
 * options. The recover-game.js queue surfaces these in
 * reports/manual_review.json with the full attempt log + screenshots.
 * This tool walks that queue and, for each entry, lets an operator:
 *
 *   1. See the top-10 search candidates from the last attempt.
 *   2. Pick one (1..10) by URL.
 *   3. Invoke `npm run recover -- <slug> --url <picked>` so the picked
 *      URL flows through the existing exact-match codepath, including
 *      the post-swap re-validation gauntlet.
 *   4. Mark the queue entry `reviewed: true` so subsequent runs skip it.
 *
 * Per the plan: "A 1-minute human-in-the-loop step is acceptable for a
 * small minority of games — the alternative is 'perpetually broken.'"
 *
 * USAGE:
 *   node scripts/recovery/manual-replace.js                # interactive walk
 *   node scripts/recovery/manual-replace.js --slug <slug>  # single slug
 *   node scripts/recovery/manual-replace.js --list         # print queue
 *   node scripts/recovery/manual-replace.js --mark <slug> --note "explanation"
 *
 * `--list` is non-interactive; `--mark` is non-interactive; the bare
 * invocation requires a TTY. Skip a slug with `--skip <slug>` to advance
 * past it for this session without marking reviewed.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const REPORTS_DIR = path.join(ROOT, 'reports');
const QUEUE_PATH = path.join(REPORTS_DIR, 'manual_review.json');

function parseArgs(argv) {
	const args = {
		slug: null,
		list: false,
		mark: null,
		note: '',
		skip: null,
		help: false,
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--slug') args.slug = String(argv[++i] || '');
		else if (a === '--list') args.list = true;
		else if (a === '--mark') args.mark = String(argv[++i] || '');
		else if (a === '--note') args.note = String(argv[++i] || '');
		else if (a === '--skip') args.skip = String(argv[++i] || '');
		else if (a === '--help' || a === '-h') args.help = true;
	}
	return args;
}

function help() {
	console.log('Usage: node scripts/recovery/manual-replace.js [--slug <slug> | --list | --mark <slug> --note "..."]');
	console.log('');
	console.log('Interactive admin tool for the recover-game.js manual-review queue');
	console.log('(reports/manual_review.json). Per-entry walks the top candidates');
	console.log('and lets you pick one to retry via the canonical recovery pipeline.');
}

function loadQueue() {
	try { return JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf-8')); }
	catch { return { schema: 1, items: {} }; }
}

function saveQueue(queue) {
	queue.generated_at = Math.floor(Date.now() / 1000);
	queue.count = Object.keys(queue.items).length;
	fs.mkdirSync(REPORTS_DIR, { recursive: true });
	fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
}

function listQueue(queue, { onlyUnreviewed = true } = {}) {
	const items = Object.values(queue.items || {})
		.filter((e) => (onlyUnreviewed ? !e.reviewed : true))
		.sort((a, b) => (a.last_attempt_at || 0) - (b.last_attempt_at || 0));
	console.log(`manual-review queue: ${items.length}${onlyUnreviewed ? ' unreviewed' : ' total'} entry${items.length === 1 ? '' : 'ies'}`);
	for (const e of items) {
		const last = e.last_attempt_at ? new Date(e.last_attempt_at * 1000).toISOString() : 'unknown';
		console.log(`  ${e.slug} (${e.type}, ${e.attempts}× attempts, last ${last}): ${e.reason}`);
	}
	return items;
}

function markReviewed(queue, slug, note) {
	if (!queue.items[slug]) {
		console.error(`slug "${slug}" not in queue`);
		return false;
	}
	queue.items[slug].reviewed = true;
	queue.items[slug].reviewed_at = Math.floor(Date.now() / 1000);
	if (note) queue.items[slug].notes = note;
	saveQueue(queue);
	console.log(`marked ${slug} as reviewed${note ? ` ("${note}")` : ''}`);
	return true;
}

function presentCandidates(entry) {
	const cands = (entry.candidates_tried || []).slice(0, 10);
	if (!cands.length) {
		console.log('  (no candidates recorded — try `npm run recover -- ' + entry.slug + ' --url <URL>` with a manually-found URL)');
		return [];
	}
	console.log('  Top candidates from last attempt:');
	cands.forEach((c, i) => {
		const sim = c.name_similarity != null ? ` sim=${Number(c.name_similarity).toFixed(2)}` : '';
		const matchTag = c.match_type ? ` ${c.match_type}` : '';
		console.log(`  ${(i + 1).toString().padStart(2)}. [${c.source}${matchTag}${sim} score=${c.score || 0}] ${c.url}`);
		console.log(`      outcome: ${c.outcome}${c.error ? ` — ${c.error}` : ''}`);
	});
	return cands;
}

async function interactiveWalk(queue, focusSlug = null) {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));

	const items = Object.values(queue.items || {})
		.filter((e) => !e.reviewed && (!focusSlug || e.slug === focusSlug))
		.sort((a, b) => (a.last_attempt_at || 0) - (b.last_attempt_at || 0));

	if (!items.length) {
		console.log(focusSlug ? `slug "${focusSlug}" not found in unreviewed queue` : 'queue is empty (or all entries marked reviewed)');
		rl.close();
		return;
	}

	for (const entry of items) {
		console.log('\n========================================================================');
		console.log(`${entry.slug} (${entry.type})`);
		console.log(`first queued: ${entry.first_queued_at ? new Date(entry.first_queued_at * 1000).toISOString() : 'unknown'}`);
		console.log(`last attempt: ${entry.last_attempt_at ? new Date(entry.last_attempt_at * 1000).toISOString() : 'unknown'}, ${entry.attempts}× tries`);
		console.log(`reason: ${entry.reason}`);
		const cands = presentCandidates(entry);
		console.log('');
		console.log('  Actions:');
		console.log('    1-10   = retry with that candidate URL via `npm run recover --url`');
		console.log('    u      = enter a custom URL');
		console.log('    s      = skip this slug for now');
		console.log('    m      = mark this slug as reviewed (with optional note)');
		console.log('    q      = quit');
		const choice = await ask('> ');
		if (choice === 'q' || choice === 'Q') break;
		if (choice === 's' || choice === 'S') continue;
		if (choice === 'm' || choice === 'M') {
			const note = await ask('  note (optional): ');
			markReviewed(queue, entry.slug, note);
			continue;
		}
		let pickedUrl = null;
		if (choice === 'u' || choice === 'U') {
			pickedUrl = await ask('  URL: ');
		} else {
			const idx = parseInt(choice, 10);
			if (Number.isFinite(idx) && idx >= 1 && idx <= cands.length) {
				pickedUrl = cands[idx - 1].url;
			} else {
				console.log('  unrecognized choice, skipping');
				continue;
			}
		}
		if (!pickedUrl) { console.log('  no URL, skipping'); continue; }
		console.log(`  → npm run recover -- ${entry.slug} --url ${pickedUrl}`);
		const r = spawnSync('node', ['scripts/recover-game.js', entry.slug, '--url', pickedUrl, '--ignore-cooldown', '--verbose'], {
			cwd: ROOT, stdio: 'inherit',
		});
		if (r.status === 0) {
			markReviewed(queue, entry.slug, `manual recover from ${pickedUrl}`);
		} else {
			console.log(`  recover exited code ${r.status}; leaving in queue.`);
		}
	}
	rl.close();
}

async function main() {
	const args = parseArgs(process.argv);
	if (args.help) { help(); return; }

	const queue = loadQueue();
	if (!queue.items || !Object.keys(queue.items).length) {
		console.log('manual_review.json is empty or missing. Run `npm run recover` first to populate it.');
		return;
	}

	if (args.list) {
		listQueue(queue);
		return;
	}
	if (args.mark) {
		markReviewed(queue, args.mark, args.note);
		return;
	}
	if (args.skip) {
		// "skip" is just for this session, no state change.
		console.log(`skipping ${args.skip} for this session (no state change)`);
		return;
	}
	if (!process.stdin.isTTY && !args.slug) {
		console.error('interactive walk requires a TTY. Use --list or --slug or --mark.');
		process.exit(1);
	}
	await interactiveWalk(queue, args.slug);
}

if (require.main === module) {
	main().catch((e) => { console.error(String(e && e.stack || e)); process.exit(2); });
}

module.exports = { loadQueue, markReviewed };
