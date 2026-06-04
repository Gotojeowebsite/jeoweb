'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { sleep } = require('./utils');

function shouldSkipHost(urlStr) {
	try {
		const u = new URL(urlStr);
		const hostname = u.hostname.toLowerCase();
		if (
			hostname.includes('google-analytics.com') ||
			hostname.includes('googletagmanager.com') ||
			hostname.includes('googlesyndication.com') ||
			hostname.includes('doubleclick.net') ||
			hostname.includes('facebook.net') ||
			hostname.includes('facebook.com') ||
			hostname.includes('twitter.com')
		) return true;

		if (/\/ads?\/|\/track|\/beacon|\/analytics\//i.test(u.pathname)) return true;
		return false;
	} catch {
		return true;
	}
}

async function downloadAsset(url, destPath, { retries = 3, timeoutMs = 15000, rateLimitMs = 200 } = {}) {
	for (let i = 0; i < retries; i++) {
		try {
			await sleep(rateLimitMs);
			const parsedUrl = new URL(url);
			const lib = parsedUrl.protocol === 'https:' ? https : http;
			
			const result = await new Promise((resolve, reject) => {
				const req = lib.get(url, {
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
						'Accept': '*/*'
					},
					timeout: timeoutMs
				}, (res) => {
					if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
						resolve(downloadAsset(res.headers.location, destPath, { retries: 1, timeoutMs, rateLimitMs: 0 }));
						return;
					}
					if (res.statusCode !== 200) {
						reject(new Error(`HTTP ${res.statusCode}`));
						return;
					}
					const destDir = path.dirname(destPath);
					fs.mkdirSync(destDir, { recursive: true });
					const file = fs.createWriteStream(destPath);
					res.pipe(file);
					file.on('finish', () => {
						file.close(() => resolve({ ok: true, size: fs.statSync(destPath).size }));
					});
					file.on('error', err => {
						fs.unlink(destPath, () => {});
						reject(err);
					});
				});
				req.on('error', reject);
				req.on('timeout', () => {
					req.destroy();
					reject(new Error('Timeout'));
				});
			});
			return result;
		} catch (err) {
			if (i === retries - 1) return { ok: false, error: err.message };
			await sleep(1000 * Math.pow(2, i)); // Exponential backoff
		}
	}
}

function rewritePaths(filePath, urlMap, { dryRun = false } = {}) {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let count = 0;
		for (const [externalUrl, localPathRel] of urlMap.entries()) {
			// Find protocol-relative as well
			const protocolRelative = externalUrl.replace(/^https?:/, '');
			
			// Simple replaceAll string-based
			let newContent = content.split(externalUrl).join(localPathRel);
			newContent = newContent.split(protocolRelative).join(localPathRel);
			
			if (newContent !== content) {
				count++;
				content = newContent;
			}
		}
		if (count > 0 && !dryRun) {
			fs.writeFileSync(filePath, content, 'utf-8');
		}
		return count;
	} catch {
		return 0;
	}
}

async function localizeGame({ slug, assetsDir, externalAssets, verbose = false, dryRun = false }) {
	const log = (...a) => { if (verbose) console.log(`  [localize]`, ...a); };
	
	const downloaded = [];
	const failed = [];
	const skipped = [];
	const urlMap = new Map();

	for (const asset of externalAssets) {
		const urlStr = asset.url;
		if (shouldSkipHost(urlStr)) {
			skipped.push(urlStr);
			continue;
		}
		
		try {
			const u = new URL(urlStr);
			const localPathRel = `_external_mirror/${u.hostname}${u.pathname}`;
			const destPath = path.join(assetsDir, localPathRel);
			
			if (!dryRun) {
				const res = await downloadAsset(urlStr, destPath);
				if (res.ok) {
					downloaded.push(urlStr);
					urlMap.set(urlStr, localPathRel);
					log(`Downloaded ${urlStr} -> ${localPathRel}`);
				} else {
					failed.push(urlStr);
					log(`Failed to download ${urlStr}: ${res.error}`);
				}
			} else {
				downloaded.push(urlStr);
				urlMap.set(urlStr, localPathRel);
			}
		} catch (e) {
			failed.push(urlStr);
		}
	}

	let rewritten = 0;
	if (urlMap.size > 0) {
		const walk = (dir) => {
			const files = fs.readdirSync(dir);
			for (const file of files) {
				const fullPath = path.join(dir, file);
				const stat = fs.statSync(fullPath);
				if (stat.isDirectory()) {
					if (file !== '_external_mirror') walk(fullPath);
				} else if (/\.(html|js|css|json)$/i.test(file)) {
					const c = rewritePaths(fullPath, urlMap, { dryRun });
					if (c > 0) {
						rewritten++;
						log(`Rewrote ${c} paths in ${path.relative(assetsDir, fullPath)}`);
					}
				}
			}
		};
		walk(assetsDir);
	}

	return {
		slug,
		downloaded: downloaded.length,
		rewritten,
		failed,
		skipped
	};
}

module.exports = { localizeGame, downloadAsset, rewritePaths };
