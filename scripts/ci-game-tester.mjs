#!/usr/bin/env node

/**
 * ci-game-tester.mjs
 * Playwright-based game health checker for CI.
 * Samples up to 50 games, checks each for broken indicators,
 * and writes a JSON report to reports/ci-game-check-<date>.json.
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

const BASE_URL = 'http://localhost:3000';
const MAX_GAMES = 50;
const GAME_TIMEOUT = 10_000;

/**
 * Shuffle an array in place (Fisher-Yates) and return the first `n` elements.
 */
function sampleArray(arr, n) {
	const copy = [...arr];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy.slice(0, n);
}

/**
 * Extract the game slug from a game card element.
 * Tries data-slug, data-game, href, and onclick attributes.
 */
async function extractSlugs(page) {
	return page.evaluate(() => {
		const cards = document.querySelectorAll('.game-card');
		const slugs = [];
		for (const card of cards) {
			// Try data attributes first
			let slug = card.dataset.slug || card.dataset.game || '';

			// Try extracting from href
			if (!slug) {
				const link = card.closest('a') || card.querySelector('a');
				if (link && link.href) {
					const match = link.href.match(/\/Assets\/([^/]+)\//);
					if (match) slug = match[1];
				}
			}

			// Try extracting from onclick handler
			if (!slug) {
				const onclick = card.getAttribute('onclick') || '';
				const match = onclick.match(/Assets\/([^/]+)\//);
				if (match) slug = match[1];
			}

			if (slug) slugs.push(slug);
		}
		return slugs;
	});
}

/**
 * Check a single game for broken indicators.
 */
async function checkGame(browser, slug) {
	const result = {
		slug,
		status: 'ok',
		reason: null,
		timestamp: Date.now(),
	};

	let page;
	try {
		page = await browser.newPage();

		const consoleErrors = [];
		page.on('pageerror', (err) => {
			consoleErrors.push(err.message || String(err));
		});

		const url = `${BASE_URL}/Assets/${slug}/index.html`;
		const response = await page.goto(url, {
			timeout: GAME_TIMEOUT,
			waitUntil: 'domcontentloaded',
		});

		// Check HTTP status
		const status = response ? response.status() : 0;
		if (status === 404 || status === 0) {
			result.status = 'broken';
			result.reason = `HTTP ${status} — page not found`;
			return result;
		}
		if (status >= 400) {
			result.status = 'broken';
			result.reason = `HTTP ${status}`;
			return result;
		}

		// Check page title for "not found" / "404"
		const title = await page.title();
		if (/not found|404/i.test(title)) {
			result.status = 'broken';
			result.reason = `Page title indicates not found: "${title}"`;
			return result;
		}

		// Check body content length
		const bodyLength = await page.evaluate(() => document.body.innerText.length);
		if (bodyLength < 100) {
			// Also check if there's meaningful HTML (canvas games may have short innerText)
			const hasCanvas = await page.evaluate(() => !!document.querySelector('canvas'));
			const hasEmbed = await page.evaluate(() => !!document.querySelector('embed, object, iframe'));
			if (!hasCanvas && !hasEmbed) {
				result.status = 'broken';
				result.reason = `Body content too small (${bodyLength} chars, no canvas/embed)`;
				return result;
			}
		}

		// Check for critical console errors
		if (consoleErrors.length > 0) {
			// Only flag as broken if there are many errors (some games have minor warnings)
			if (consoleErrors.length >= 3) {
				result.status = 'broken';
				result.reason = `${consoleErrors.length} console errors: ${consoleErrors[0].slice(0, 120)}`;
				return result;
			}
		}
	} catch (err) {
		result.status = 'broken';
		result.reason = `Error: ${err.message.slice(0, 200)}`;
	} finally {
		if (page) {
			try {
				await page.close();
			} catch {
				// ignore close errors
			}
		}
	}

	return result;
}

async function main() {
	console.log('🎮 Starting game health check...\n');

	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext();
	const page = await context.newPage();

	// Navigate to the main page and wait for the game grid
	console.log(`Navigating to ${BASE_URL}...`);
	await page.goto(BASE_URL, { timeout: 30_000, waitUntil: 'domcontentloaded' });

	// Wait for game grid to have children
	await page.waitForFunction(
		() => {
			const grid = document.querySelector('#gameGrid');
			return grid && grid.children.length > 0;
		},
		{ timeout: 30_000 }
	);

	// Extract all game slugs
	const allSlugs = await extractSlugs(page);
	console.log(`Found ${allSlugs.length} games on the page.`);

	if (allSlugs.length === 0) {
		console.warn('⚠️  No game slugs found! Check if the page structure changed.');
		await browser.close();
		process.exit(0);
	}

	// Sample games
	const sampled = sampleArray(allSlugs, MAX_GAMES);
	console.log(`Sampling ${sampled.length} games for health check...\n`);

	await page.close();

	// Check each game
	const results = [];
	for (let i = 0; i < sampled.length; i++) {
		const slug = sampled[i];
		const pct = `[${i + 1}/${sampled.length}]`;
		const result = await checkGame(browser, slug);
		const icon = result.status === 'ok' ? '✅' : '🔴';
		const extra = result.reason ? ` — ${result.reason}` : '';
		console.log(`  ${pct} ${icon} ${slug}${extra}`);
		results.push(result);
	}

	await browser.close();

	// Build report
	const today = new Date().toISOString().split('T')[0];
	const brokenCount = results.filter((r) => r.status === 'broken').length;
	const okCount = results.filter((r) => r.status === 'ok').length;

	const report = {
		date: today,
		total_checked: results.length,
		broken_count: brokenCount,
		ok_count: okCount,
		results,
	};

	// Write report
	const reportsDir = join(PROJECT_ROOT, 'reports');
	if (!existsSync(reportsDir)) {
		mkdirSync(reportsDir, { recursive: true });
	}

	const reportPath = join(reportsDir, `ci-game-check-${today}.json`);
	writeFileSync(reportPath, JSON.stringify(report, null, 2));

	console.log(`\n📊 Results: ${okCount} ok, ${brokenCount} broken out of ${results.length} checked`);
	console.log(`📁 Report written to: ${reportPath}`);

	// Always exit 0 — we report broken games via GH issues, not CI failure
	process.exit(0);
}

main().catch((err) => {
	console.error('Fatal error in game tester:', err);
	process.exit(0); // Still exit 0 to avoid failing CI
});
