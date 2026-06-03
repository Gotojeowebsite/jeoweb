#!/usr/bin/env node

/**
 * optimize-images.mjs
 * Batch-converts game thumbnail images to WebP using sharp.
 *
 * Usage:
 *   node scripts/optimize-images.mjs [--dry-run] [--verbose]
 *
 * Flags:
 *   --dry-run   Report what would be done without writing files
 *   --verbose   Print per-file details
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const VERBOSE = args.includes('--verbose');

const MIN_SIZE_BYTES = 5 * 1024; // 5 KB
const MAX_DIM = 400;
const WEBP_QUALITY = 80;
const SKIP_EXTENSIONS = new Set(['.webp', '.avif']);

async function loadCatalog() {
	const catalogPath = path.join(ROOT, 'games_catalog.json');
	const raw = await fs.readFile(catalogPath, 'utf-8');
	return JSON.parse(raw);
}

function extractImagePaths(catalog) {
	const images = new Set();
	const entries = Array.isArray(catalog) ? catalog : Object.values(catalog).flat();

	for (const game of entries) {
		if (game && typeof game.image === 'string' && game.image.trim()) {
			images.add(game.image.trim());
		}
	}
	return [...images];
}

async function fileExists(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function optimizeImage(imagePath, report) {
	const fullPath = path.join(ROOT, imagePath);
	const ext = path.extname(imagePath).toLowerCase();

	// Skip if already webp/avif
	if (SKIP_EXTENSIONS.has(ext)) {
		if (VERBOSE) console.log(`  SKIP (already ${ext}): ${imagePath}`);
		report.skipped.push({ path: imagePath, reason: `already ${ext}` });
		return;
	}

	// Check file exists
	if (!(await fileExists(fullPath))) {
		if (VERBOSE) console.warn(`  SKIP (not found): ${imagePath}`);
		report.skipped.push({ path: imagePath, reason: 'file not found' });
		return;
	}

	// Check file size
	let stat;
	try {
		stat = await fs.stat(fullPath);
	} catch (err) {
		console.error(`  ERROR (stat): ${imagePath} — ${err.message}`);
		report.errors.push({ path: imagePath, error: err.message });
		return;
	}

	if (stat.size < MIN_SIZE_BYTES) {
		if (VERBOSE) console.log(`  SKIP (${stat.size} bytes < ${MIN_SIZE_BYTES}): ${imagePath}`);
		report.skipped.push({ path: imagePath, reason: `too small (${stat.size} bytes)` });
		return;
	}

	// Determine output path
	const parsed = path.parse(fullPath);
	const outputPath = path.join(parsed.dir, `${parsed.name}.webp`);

	// Skip if output already exists
	if (await fileExists(outputPath)) {
		if (VERBOSE) console.log(`  SKIP (webp exists): ${imagePath}`);
		report.skipped.push({ path: imagePath, reason: 'webp already exists' });
		return;
	}

	const originalSize = stat.size;

	if (DRY_RUN) {
		if (VERBOSE) console.log(`  DRY-RUN: would convert ${imagePath} (${originalSize} bytes)`);
		report.wouldProcess.push({ path: imagePath, originalSize });
		return;
	}

	// Convert to WebP
	try {
		const buffer = await sharp(fullPath)
			.resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
			.webp({ quality: WEBP_QUALITY })
			.toBuffer();

		await fs.writeFile(outputPath, buffer);

		const newSize = buffer.length;
		const savings = originalSize - newSize;
		const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

		if (VERBOSE) {
			console.log(`  OK: ${imagePath} — ${originalSize} → ${newSize} bytes (${savingsPercent}% saved)`);
		}

		report.processed.push({
			path: imagePath,
			outputPath: path.relative(ROOT, outputPath),
			originalSize,
			newSize,
			savings,
			savingsPercent: parseFloat(savingsPercent),
		});
	} catch (err) {
		console.error(`  ERROR (convert): ${imagePath} — ${err.message}`);
		report.errors.push({ path: imagePath, error: err.message });
	}
}

async function writeReport(report) {
	const reportsDir = path.join(ROOT, 'reports');
	await fs.mkdir(reportsDir, { recursive: true });

	const date = new Date().toISOString().slice(0, 10);
	const reportPath = path.join(reportsDir, `image-optimization-${date}.json`);
	await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');
	console.log(`\nReport written to: ${path.relative(ROOT, reportPath)}`);
}

function printSummary(report) {
	console.log('\n=== Image Optimization Summary ===');

	if (DRY_RUN) {
		console.log(`Mode: DRY RUN (no files written)`);
		console.log(`Would process: ${report.wouldProcess.length} images`);
	} else {
		const totalSaved = report.processed.reduce((sum, r) => sum + r.savings, 0);
		const avgReduction = report.processed.length > 0
			? (report.processed.reduce((sum, r) => sum + r.savingsPercent, 0) / report.processed.length).toFixed(1)
			: 0;

		console.log(`Images processed: ${report.processed.length}`);
		console.log(`Bytes saved: ${totalSaved.toLocaleString()} bytes (${(totalSaved / 1024).toFixed(1)} KB)`);
		console.log(`Average reduction: ${avgReduction}%`);
	}

	console.log(`Skipped: ${report.skipped.length}`);
	console.log(`Errors: ${report.errors.length}`);
	console.log('==================================');
}

async function main() {
	console.log('Image Optimizer for Jeo Gaming Platform');
	console.log(`Root: ${ROOT}`);
	if (DRY_RUN) console.log('*** DRY RUN MODE ***');
	if (VERBOSE) console.log('*** VERBOSE MODE ***');
	console.log('');

	const report = {
		timestamp: new Date().toISOString(),
		dryRun: DRY_RUN,
		processed: [],
		skipped: [],
		errors: [],
		wouldProcess: [],
	};

	let catalog;
	try {
		catalog = await loadCatalog();
	} catch (err) {
		console.error(`Failed to load games_catalog.json: ${err.message}`);
		process.exit(1);
	}

	const imagePaths = extractImagePaths(catalog);
	console.log(`Found ${imagePaths.length} image references in catalog.\n`);

	for (const imgPath of imagePaths) {
		await optimizeImage(imgPath, report);
	}

	printSummary(report);

	if (!DRY_RUN) {
		await writeReport(report);
	}
}

main().catch((err) => {
	console.error(`Fatal error: ${err.message}`);
	process.exit(1);
});
