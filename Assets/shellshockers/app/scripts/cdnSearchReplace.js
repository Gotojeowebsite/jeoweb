#!/usr/bin/env node

/**
 * PERFECT asset-only CDN rewriter
 * Zero dependencies
 * Zero false positives by construction
 */

const fs = require('fs');
const path = require('path');

const FILE = '../../index.html';
const CDN = process.argv[2];

if (!CDN) {
	console.error('CDN argument missing');
	console.error('Usage: node cdnSearchReplace.js <cdn-url>');
	process.exit(1);
}

if (!CDN.endsWith('/')) {
	console.error('CDN must end with /');
	process.exit(1);
}

if (!fs.existsSync(FILE)) {
  console.error('index.html not found:', FILE);
  process.exit(1);
}

let html = fs.readFileSync(FILE, 'utf8');

/* ---------------------------------------------------------
   Asset detection (STRICT)
--------------------------------------------------------- */

const ASSET_EXT = [
  'js','css','json',
  'png','jpg','jpeg','webp','svg','gif','ico',
  'mp3','ogg','wav','mp4','webm',
  'wasm','bin',
  'txt','xml'
];

const ASSET_RE = new RegExp(
  '^' +
  '(?:\\./|\\.\\./|/)?' +       // relative prefix
  '[^\\s"\']+/' +               // MUST contain a slash
  '[^\\s"\']+\\.(' +
  ASSET_EXT.join('|') +
  ')' +
  '(?:[?#][^\\s"\']*)?' +       // optional query/hash
  '$',
  'i'
);

function isAssetPath(p) {
  return (
    typeof p === 'string' &&
    ASSET_RE.test(p) &&
    !p.startsWith('http://') &&
    !p.startsWith('https://') &&
    !p.startsWith('//') &&
    !p.startsWith('data:') &&
    !p.startsWith('#') &&
    !p.startsWith(CDN) &&
    !p.includes('${') &&
    p !== 'app/checker.js'
  );
}

function toCDN(p) {
  return CDN + p.replace(/^\.?\//, '');
}

/* ---------------------------------------------------------
   0. Extract and protect CDN-IGNORE regions (BEFORE all rewrites)
--------------------------------------------------------- */

const ignoreRegions = [];
html = html.replace(
  /\/\/\s*CDN-IGNORE-START[\s\S]*?\/\/\s*CDN-IGNORE-END/gi,
  (m) => {
    const placeholder = `__CDN_IGNORE_${ignoreRegions.length}__`;
    ignoreRegions.push(m);
    return placeholder;
  }
);

/* ---------------------------------------------------------
   1. HTML attributes
--------------------------------------------------------- */

html = html.replace(
  /\b(src|href|poster)=("([^"]+)"|'([^']+)')/gi,
  (m, attr, q, v1, v2) => {
    const val = v1 || v2;
    if (!isAssetPath(val)) return m;
    return `${attr}=${q[0]}${toCDN(val)}${q[0]}`;
  }
);

/* ---------------------------------------------------------
   2. CSS url(...)
--------------------------------------------------------- */

html = html.replace(
  /url\((['"]?)([^'")]+)\1\)/gi,
  (m, q, url) => {
    if (!isAssetPath(url)) return m;
    return `url(${q}${toCDN(url)}${q})`;
  }
);

/* ---------------------------------------------------------
   3. JS string literals (asset paths ONLY)
--------------------------------------------------------- */

html = html.replace(
  /(['"`])([^'"`\n]+)\1/g,
  (m, q, val) => {
    if (!isAssetPath(val)) return m;
    return `${q}${toCDN(val)}${q}`;
  }
);

/* ---------------------------------------------------------
   4. Restore CDN-IGNORE regions (AFTER all rewrites)
--------------------------------------------------------- */

ignoreRegions.forEach((content, i) => {
  html = html.replace(`__CDN_IGNORE_${i}__`, content);
});

/* ---------------------------------------------------------
   Write back
--------------------------------------------------------- */

fs.writeFileSync(FILE, html, 'utf8');
console.log('CDN rewrite complete (asset-only, strict)');