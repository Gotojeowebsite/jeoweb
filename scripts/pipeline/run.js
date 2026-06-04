#!/usr/bin/env node
'use strict';

// scripts/pipeline/run.js — Master orchestrator for the 4-phase game health pipeline.
//
// Phases:
//   1. DEEP AUDIT      — Headless browser test + asset sniffing + failure detection
//   2. LOCALIZE        — Download external assets + rewrite paths for offline
//   3. SELF-HEAL       — Fallback scraping from mirrors for broken games
//   4. HEALTH VERIFY   — Post-patch re-check + registry update
//
// CLI:
//   node scripts/pipeline/run.js                          # full pipeline, all games
//   node scripts/pipeline/run.js --slug slope             # single game
//   node scripts/pipeline/run.js --phase audit            # audit only
//   node scripts/pipeline/run.js --phase audit,localize   # audit + localize
//   node scripts/pipeline/run.js --broken-only            # only games marked broken
//   node scripts/pipeline/run.js --workers 4              # concurrency
//   node scripts/pipeline/run.js --time-budget 60m        # max runtime
//   node scripts/pipeline/run.js --dry-run                # don't modify anything
//   node scripts/pipeline/run.js --verbose                # detailed logging
//   node scripts/pipeline/run.js --base-url http://localhost:3000  # use server
//   node scripts/pipeline/run.js --skip-healthy           # skip already-healthy games
//   node scripts/pipeline/run.js --rate-limit 2000        # ms between mirror probes

const fs = require('fs');
const path = require('path');
const {
	ROOT, ASSETS_DIR, REPORTS_DIR,
	readJsonSafe, writeJsonSafe, appendJsonl,
	loadCatalog, loadHealthData, loadRecoverySources,
	listGameSlugs, detectGameType,
	sleep, formatDuration, nowStamp,
} = require('./utils');

const { auditGame } = require('./deep-audit');
const { localizeGame } = require('./localize-assets');
const { healGame } = require('./self-heal');
const { verifyGame, updateHealthRegistry } = require('./health-verify');

// ─── CLI Argument Parsing ────────────────────────────────────────────────────

function parseArgs(argv) {
	const args = {
		slugs: [],
		phases: ['audit', 'localize', 'heal', 'verify'],
		brokenOnly: false,
		skipHealthy: false,
		workers: 2,
		timeBudgetMs: Infinity,
		dryRun: false,
		verbose: false,
		baseUrl: null,
		rateLimitMs: 2000,
		auditTimeoutMs: 15000,
		maxGames: Infinity,
	};

	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		switch (a) {
			case '--slug':
				args.slugs.push(argv[++i]);
				break;
			case '--phase':
				args.phases = argv[++i].split(',').map(s => s.trim());
				break;
			case '--broken-only':
				args.brokenOnly = true;
				break;
			case '--skip-healthy':
				args.skipHealthy = true;
				break;
			case '--workers':
				args.workers = parseInt(argv[++i], 10) || 2;
				break;
			case '--time-budget': {
				const raw = argv[++i];
				const match = raw.match(/^(\d+)\s*(m|h|s)?$/i);
				if (match) {
					const num = parseInt(match[1], 10);
					const unit = (match[2] || 'm').toLowerCase();
					args.timeBudgetMs = num * (unit === 'h' ? 3600000 : unit === 's' ? 1000 : 60000);
				}
				break;
			}
			case '--dry-run':
				args.dryRun = true;
				break;
			case '--verbose':
			case '-v':
				args.verbose = true;
				break;
			case '--base-url':
				args.baseUrl = argv[++i];
				break;
			case '--rate-limit':
				args.rateLimitMs = parseInt(argv[++i], 10) || 2000;
				break;
			case '--audit-timeout':
				args.auditTimeoutMs = parseInt(argv[++i], 10) || 15000;
				break;
			case '--max-games':
				args.maxGames = parseInt(argv[++i], 10) || Infinity;
				break;
			default:
				// Treat bare args as slugs
				if (!a.startsWith('-')) args.slugs.push(a);
				break;
		}
	}

	return args;
}

// ─── Game Selection ──────────────────────────────────────────────────────────

function selectGames(args) {
	const catalog = loadCatalog();
	const healthData = loadHealthData();
	const allSlugs = listGameSlugs();

	let slugs;

	if (args.slugs.length > 0) {
		// Explicit slugs — verify they exist
		slugs = args.slugs.filter(s => {
			const dir = path.join(ASSETS_DIR, s);
			if (!fs.existsSync(dir)) {
				console.warn(`⚠️  Slug "${s}" not found in Assets/ — skipping`);
				return false;
			}
			return true;
		});
	} else if (args.brokenOnly) {
		// Only games with broken verdict
		const games = healthData.games || {};
		slugs = allSlugs.filter(s => {
			const entry = games[s];
			if (!entry) return false;
			return entry.verdict === 'broken' || entry.verdict === 'probable_broken';
		});
		console.log(`📋 Found ${slugs.length} broken/probable_broken games`);
	} else if (args.skipHealthy) {
		// All games except confirmed healthy
		const games = healthData.games || {};
		slugs = allSlugs.filter(s => {
			const entry = games[s];
			if (!entry) return true; // Unknown = include
			return entry.verdict !== 'healthy';
		});
	} else {
		slugs = allSlugs;
	}

	// Apply max limit
	if (slugs.length > args.maxGames) {
		slugs = slugs.slice(0, args.maxGames);
	}

	return slugs.map(slug => ({
		slug,
		type: detectGameType(slug, catalog),
		assetsDir: path.join(ASSETS_DIR, slug),
		catalogEntry: catalog.find(g => g.name === slug) || null,
		healthEntry: (healthData.games || {})[slug] || null,
	}));
}

// ─── Single-Game Pipeline ────────────────────────────────────────────────────

async function processGame(game, args, recoverySources) {
	const { slug, type, assetsDir } = game;
	const startTime = Date.now();
	const log = (...a) => { if (args.verbose) console.log(`  [${slug}]`, ...a); };

	const result = {
		slug,
		type,
		phases: {},
		startedAt: new Date().toISOString(),
		completedAt: null,
		durationMs: 0,
		finalStatus: 'unknown',
	};

	try {
		// ── Phase 1: Deep Audit ──────────────────────────────────────────
		if (args.phases.includes('audit')) {
			log('🔍 Phase 1: Deep Audit');
			try {
				const auditResult = await auditGame({
					slug,
					assetsDir,
					baseUrl: args.baseUrl,
					timeoutMs: args.auditTimeoutMs,
					verbose: args.verbose,
				});
				result.phases.audit = auditResult;
				log(`  audit: ${auditResult.status} (${auditResult.failures.length} failures)`);
			} catch (err) {
				result.phases.audit = {
					slug, status: 'error', failures: ['AUDIT_ERROR'],
					error: err.message, timestamp: Date.now(),
				};
				log(`  audit error: ${err.message}`);
			}
		}

		// ── Phase 2: Localize Assets ─────────────────────────────────────
		if (args.phases.includes('localize')) {
			const auditData = result.phases.audit;
			const externalAssets = auditData?.assets?.external || [];

			if (externalAssets.length > 0) {
				log(`📦 Phase 2: Localizing ${externalAssets.length} external assets`);
				try {
					const localizeResult = await localizeGame({
						slug,
						assetsDir,
						externalAssets,
						verbose: args.verbose,
						dryRun: args.dryRun,
					});
					result.phases.localize = localizeResult;
					log(`  localized: ${localizeResult.downloaded} downloaded, ${localizeResult.rewritten} paths rewritten`);
				} catch (err) {
					result.phases.localize = {
						slug, downloaded: 0, rewritten: 0,
						error: err.message,
					};
					log(`  localize error: ${err.message}`);
				}
			} else {
				result.phases.localize = { slug, downloaded: 0, rewritten: 0, skipped: 'no_external_assets' };
				log('📦 Phase 2: No external assets to localize');
			}
		}

		// ── Phase 3: Self-Heal ───────────────────────────────────────────
		if (args.phases.includes('heal')) {
			const auditData = result.phases.audit;
			const isBroken = auditData?.status === 'broken' ||
				game.healthEntry?.verdict === 'broken' ||
				game.healthEntry?.verdict === 'probable_broken';

			if (isBroken && !args.dryRun) {
				log('🏥 Phase 3: Self-Healing');
				try {
					const healResult = await healGame({
						slug,
						gameType: type,
						failures: auditData?.failures || [],
						assetsDir,
						recoverySources,
						verbose: args.verbose,
						dryRun: args.dryRun,
						rateLimitMs: args.rateLimitMs,
					});
					result.phases.heal = healResult;
					log(`  heal: ${healResult.healed ? '✅ healed' : '❌ not healed'} (tried ${healResult.candidatesTriedCount} sources)`);
				} catch (err) {
					result.phases.heal = {
						slug, healed: false, source: null,
						assetCount: 0, candidatesTriedCount: 0,
						error: err.message,
					};
					log(`  heal error: ${err.message}`);
				}
			} else if (args.dryRun && isBroken) {
				result.phases.heal = { slug, healed: false, skipped: 'dry_run' };
				log('🏥 Phase 3: Skipped (dry-run)');
			} else {
				result.phases.heal = { slug, healed: false, skipped: 'not_broken' };
				log('🏥 Phase 3: Skipped (game not broken)');
			}
		}

		// ── Phase 4: Health Verification ─────────────────────────────────
		if (args.phases.includes('verify')) {
			const wasHealed = result.phases.heal?.healed === true;
			const needsVerify = wasHealed ||
				result.phases.audit?.status === 'broken' ||
				!args.phases.includes('heal'); // Always verify if we skipped healing

			if (needsVerify || !args.skipHealthy) {
				log('✅ Phase 4: Health Verification');
				try {
					const verifyResult = await verifyGame({
						slug,
						assetsDir,
						baseUrl: args.baseUrl,
						timeoutMs: args.auditTimeoutMs,
						verbose: args.verbose,
					});
					result.phases.verify = verifyResult;
					result.finalStatus = verifyResult.status;

					// Update health registry (unless dry-run)
					if (!args.dryRun) {
						updateHealthRegistry({
							slug,
							status: verifyResult.status,
							failures: verifyResult.failures,
							timestamp: verifyResult.timestamp,
							source: wasHealed ? 'pipeline_healed' : 'pipeline_audit',
						});
					}

					log(`  verify: ${verifyResult.status}`);
				} catch (err) {
					result.phases.verify = {
						slug, status: 'error', failures: ['VERIFY_ERROR'],
						error: err.message, timestamp: Date.now(),
					};
					log(`  verify error: ${err.message}`);
				}
			} else {
				result.phases.verify = { slug, status: 'skipped', failures: [] };
				log('✅ Phase 4: Skipped');
			}
		}

		// Set final status from the last meaningful phase
		if (!result.finalStatus || result.finalStatus === 'unknown') {
			if (result.phases.verify?.status) {
				result.finalStatus = result.phases.verify.status;
			} else if (result.phases.audit?.status) {
				result.finalStatus = result.phases.audit.status;
			}
		}

	} catch (err) {
		result.error = err.message;
		result.finalStatus = 'error';
	}

	result.completedAt = new Date().toISOString();
	result.durationMs = Date.now() - startTime;

	return result;
}

// ─── Worker Pool ─────────────────────────────────────────────────────────────

async function runWithWorkerPool(games, args, recoverySources) {
	const results = [];
	const queue = [...games];
	const active = new Map();
	let completed = 0;

	const statusLine = () => {
		const pct = games.length > 0 ? Math.floor((completed / games.length) * 100) : 0;
		return `[${completed}/${games.length}] ${pct}%`;
	};

	while (queue.length > 0 || active.size > 0) {
		// Check time budget
		if (args._startTime && Date.now() - args._startTime > args.timeBudgetMs) {
			console.log(`⏱️  Time budget exhausted. ${queue.length} games remaining.`);
			break;
		}

		// Fill worker slots
		while (queue.length > 0 && active.size < args.workers) {
			const game = queue.shift();
			const promise = processGame(game, args, recoverySources)
				.then(result => {
					active.delete(game.slug);
					results.push(result);
					completed++;

					const icon = result.finalStatus === 'healthy' ? '✅'
						: result.finalStatus === 'broken' ? '🔴'
						: result.finalStatus === 'degraded' ? '🟡'
						: '⚪';

					console.log(`${statusLine()} ${icon} ${game.slug} — ${result.finalStatus} (${formatDuration(result.durationMs)})`);

					return result;
				})
				.catch(err => {
					active.delete(game.slug);
					const errorResult = {
						slug: game.slug,
						type: game.type,
						phases: {},
						finalStatus: 'error',
						error: err.message,
						durationMs: 0,
					};
					results.push(errorResult);
					completed++;
					console.log(`${statusLine()} ❌ ${game.slug} — error: ${err.message}`);
					return errorResult;
				});

			active.set(game.slug, promise);
		}

		// Wait for any one worker to finish
		if (active.size > 0) {
			await Promise.race([...active.values()]);
		}
	}

	return results;
}

// ─── Report Generation ───────────────────────────────────────────────────────

function generateReport(results, args) {
	const stamp = nowStamp();
	const report = {
		schema: 1,
		generated_at: new Date().toISOString(),
		unix_at: Math.floor(Date.now() / 1000),
		config: {
			phases: args.phases,
			workers: args.workers,
			dryRun: args.dryRun,
			brokenOnly: args.brokenOnly,
			baseUrl: args.baseUrl,
		},
		summary: {
			total: results.length,
			healthy: results.filter(r => r.finalStatus === 'healthy').length,
			broken: results.filter(r => r.finalStatus === 'broken').length,
			degraded: results.filter(r => r.finalStatus === 'degraded').length,
			healed: results.filter(r => r.phases.heal?.healed === true).length,
			localized: results.filter(r => (r.phases.localize?.downloaded || 0) > 0).length,
			errors: results.filter(r => r.finalStatus === 'error').length,
			totalDurationMs: results.reduce((sum, r) => sum + (r.durationMs || 0), 0),
		},
		results,
	};

	// Write full report
	const reportPath = path.join(REPORTS_DIR, `pipeline-report-${stamp}.json`);
	writeJsonSafe(reportPath, report);

	// Append to pipeline log
	const logPath = path.join(REPORTS_DIR, 'pipeline_log.jsonl');
	appendJsonl(logPath, {
		at: report.unix_at,
		summary: report.summary,
		config: report.config,
		report_file: path.relative(ROOT, reportPath),
	});

	return { reportPath, report };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
	const args = parseArgs(process.argv);
	args._startTime = Date.now();

	console.log('\n╔══════════════════════════════════════════════════════════╗');
	console.log('║   🎮  Game Health Pipeline — Audit · Localize · Heal   ║');
	console.log('╚══════════════════════════════════════════════════════════╝\n');

	console.log(`Config:`);
	console.log(`  Phases:      ${args.phases.join(' → ')}`);
	console.log(`  Workers:     ${args.workers}`);
	console.log(`  Dry-run:     ${args.dryRun}`);
	console.log(`  Base URL:    ${args.baseUrl || '(file:// protocol)'}`);
	console.log(`  Rate limit:  ${args.rateLimitMs}ms`);
	if (args.timeBudgetMs < Infinity) {
		console.log(`  Time budget: ${formatDuration(args.timeBudgetMs)}`);
	}
	console.log('');

	// Load recovery sources for heal phase
	const recoverySources = loadRecoverySources();
	console.log(`📚 Loaded ${recoverySources.length} recovery sources`);

	// Select games
	const games = selectGames(args);
	console.log(`🎯 Selected ${games.length} games for processing\n`);

	if (games.length === 0) {
		console.log('No games to process. Exiting.');
		return;
	}

	// Show type breakdown
	const typeCounts = {};
	for (const g of games) {
		typeCounts[g.type] = (typeCounts[g.type] || 0) + 1;
	}
	console.log('Type breakdown:', Object.entries(typeCounts).map(([t, c]) => `${t}: ${c}`).join(', '));
	console.log('');

	// Run pipeline
	console.log('━'.repeat(60));
	const results = await runWithWorkerPool(games, args, recoverySources);
	console.log('━'.repeat(60));

	// Generate report
	const { reportPath, report } = generateReport(results, args);

	// Print summary
	console.log('\n╔══════════════════════════════════════════════════════════╗');
	console.log('║                   Pipeline Summary                      ║');
	console.log('╠══════════════════════════════════════════════════════════╣');
	console.log(`║  Total processed:  ${String(report.summary.total).padStart(5)}                              ║`);
	console.log(`║  ✅ Healthy:       ${String(report.summary.healthy).padStart(5)}                              ║`);
	console.log(`║  🔴 Broken:        ${String(report.summary.broken).padStart(5)}                              ║`);
	console.log(`║  🟡 Degraded:      ${String(report.summary.degraded).padStart(5)}                              ║`);
	console.log(`║  🏥 Healed:        ${String(report.summary.healed).padStart(5)}                              ║`);
	console.log(`║  📦 Localized:     ${String(report.summary.localized).padStart(5)}                              ║`);
	console.log(`║  ❌ Errors:        ${String(report.summary.errors).padStart(5)}                              ║`);
	console.log(`║  ⏱️  Duration:      ${formatDuration(report.summary.totalDurationMs).padStart(10)}                         ║`);
	console.log('╚══════════════════════════════════════════════════════════╝');
	console.log(`\n📝 Report: ${path.relative(ROOT, reportPath)}`);

	// Log broken games for easy reference
	const brokenGames = results.filter(r => r.finalStatus === 'broken');
	if (brokenGames.length > 0) {
		console.log(`\n🔴 Broken games (${brokenGames.length}):`);
		for (const g of brokenGames.slice(0, 20)) {
			const failures = g.phases.audit?.failures || g.phases.verify?.failures || [];
			console.log(`   ${g.slug}: ${failures.join(', ') || 'unknown'}`);
		}
		if (brokenGames.length > 20) {
			console.log(`   ... and ${brokenGames.length - 20} more`);
		}
	}

	// Log healed games
	const healedGames = results.filter(r => r.phases.heal?.healed === true);
	if (healedGames.length > 0) {
		console.log(`\n🏥 Successfully healed (${healedGames.length}):`);
		for (const g of healedGames) {
			console.log(`   ${g.slug} ← ${g.phases.heal.source || 'unknown'}`);
		}
	}

	console.log('\n✨ Pipeline complete.\n');
}

if (require.main === module) {
	main().catch(err => {
		console.error('💥 Fatal pipeline error:', err);
		process.exit(1);
	});
}

module.exports = { processGame, runWithWorkerPool, parseArgs, selectGames, generateReport };
