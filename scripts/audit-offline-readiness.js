#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const CRITICAL_EXTENSIONS = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.json',
  '.wasm',
  '.data',
  '.pck',
  '.unityweb',
  '.swf',
  '.bin',
  '.pak',
  '.mem',
  '.worker',
]);

const RUNTIME_TAG_PATTERNS = [
  { kind: 'script', regex: /<script\b[^>]*\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi },
  { kind: 'iframe', regex: /<iframe\b[^>]*\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi },
  { kind: 'embed', regex: /<embed\b[^>]*\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi },
  { kind: 'object', regex: /<object\b[^>]*\bdata\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi },
  { kind: 'link', regex: /<link\b[^>]*\bhref\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi },
  { kind: 'source', regex: /<source\b[^>]*\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi },
];

const RUNTIME_CALL_PATTERNS = [
  { kind: 'fetch', regex: /\bfetch\s*\(\s*(?:"([^"]+)"|'([^']+)')/gi },
  { kind: 'worker', regex: /\bnew\s+Worker\s*\(\s*(?:"([^"]+)"|'([^']+)')/gi },
  { kind: 'importScripts', regex: /\bimportScripts\s*\(\s*(?:"([^"]+)"|'([^']+)')/gi },
  {
    kind: 'xhr',
    regex:
      /\bXMLHttpRequest\s*\.\s*open\s*\(\s*(?:"[A-Z]+"|'[A-Z]+')\s*,\s*(?:"([^"]+)"|'([^']+)')/gi,
  },
];

function readJson(filePath, fallbackValue) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallbackValue;
  }
}

function safeStatMtime(filePath) {
  try {
    return fs.statSync(filePath).mtime.toISOString();
  } catch {
    return null;
  }
}

function cleanRef(rawValue) {
  if (!rawValue) return '';
  let value = String(rawValue).trim();
  if (!value) return '';
  value = value.replace(/&amp;/g, '&');
  value = value.split('#')[0].trim();
  if (!value) return '';
  return value;
}

function isIgnoredScheme(ref) {
  return /^(?:data:|blob:|javascript:|mailto:|tel:|about:)/i.test(ref);
}

function isExternalRef(ref) {
  return /^https?:\/\//i.test(ref) || /^\/\//.test(ref);
}

function stripQuery(ref) {
  return ref.split('?')[0];
}

function isCriticalRef(localPath, kind) {
  if (kind === 'script' || kind === 'iframe' || kind === 'embed' || kind === 'object' || kind === 'worker') {
    return true;
  }

  const normalized = localPath.toLowerCase();
  const extension = path.extname(normalized);
  if (CRITICAL_EXTENSIONS.has(extension)) return true;

  if (normalized.endsWith('.js.gz') || normalized.endsWith('.js.br')) return true;
  if (normalized.endsWith('.wasm.gz') || normalized.endsWith('.wasm.br')) return true;
  if (normalized.endsWith('.data.gz') || normalized.endsWith('.data.br')) return true;
  if (normalized.endsWith('.unityweb.gz') || normalized.endsWith('.unityweb.br')) return true;

  return false;
}

function resolveEntryFile(rootDir, assetsDir, gameName, gameUrl) {
  const gameDir = path.join(assetsDir, gameName);
  if (!fs.existsSync(gameDir) || !fs.statSync(gameDir).isDirectory()) {
    return null;
  }

  if (typeof gameUrl === 'string' && gameUrl.trim()) {
    const cleaned = gameUrl.replace(/\\/g, '/').split('?')[0].replace(/^\/+/, '');
    if (cleaned) {
      const directPath = path.join(rootDir, cleaned);
      if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
        return directPath;
      }
    }
  }

  const indexPath = path.join(gameDir, 'index.html');
  if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
    return indexPath;
  }

  const stack = [gameDir];
  while (stack.length) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        return fullPath;
      }
    }
  }

  return null;
}

function extractRuntimeRefs(htmlContent) {
  const refs = [];

  for (const pattern of RUNTIME_TAG_PATTERNS) {
    pattern.regex.lastIndex = 0;
    let match;
    while ((match = pattern.regex.exec(htmlContent)) !== null) {
      const raw = match[1] || match[2] || match[3] || '';
      const value = cleanRef(raw);
      if (value) refs.push({ kind: pattern.kind, ref: value });
    }
  }

  for (const pattern of RUNTIME_CALL_PATTERNS) {
    pattern.regex.lastIndex = 0;
    let match;
    while ((match = pattern.regex.exec(htmlContent)) !== null) {
      const raw = match[1] || match[2] || '';
      const value = cleanRef(raw);
      if (value) refs.push({ kind: pattern.kind, ref: value });
    }
  }

  return refs;
}

function normalizeGameName(value) {
  return String(value || '').trim().toLowerCase();
}

function addIssue(issues, issue) {
  const key = `${issue.code}|${issue.ref || ''}|${issue.message || ''}`;
  if (issues._dedupe.has(key)) return;
  issues._dedupe.add(key);
  issues.list.push(issue);
}

function finalizeIssues(issues) {
  return issues.list;
}

function discoverScanReports(rootDir) {
  try {
    return fs
      .readdirSync(rootDir)
      .filter((fileName) => /^scan_results.*\.json$/i.test(fileName))
      .map((fileName) => path.join(rootDir, fileName))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

function loadScanIssues(scanPaths) {
  const byName = new Map();

  for (const scanPath of scanPaths) {
    const data = readJson(scanPath, []);
    if (!Array.isArray(data)) continue;

    for (const item of data) {
      if (!item || typeof item !== 'object') continue;
      const name = String(item.name || '').trim();
      if (!name) continue;

      const statuses = [];
      const status = String(item.status || '').toLowerCase();
      if (status === 'broken' || status === 'warning') {
        statuses.push({
          code: 'DYNAMIC_SCAN_STATUS',
          message: `Scanner status is ${status}`,
        });
      }

      const mergedIssues = [];
      const critical = Array.isArray(item.critical_issues) ? item.critical_issues : [];
      const warnings = Array.isArray(item.warnings) ? item.warnings : [];
      for (const issue of critical.concat(warnings)) {
        if (!issue || typeof issue !== 'object') continue;
        const code = String(issue.code || '').trim();
        if (!code) continue;

        // Keep only runtime/offline-relevant issue classes.
        if (
          code.startsWith('LOCAL_') ||
          code.startsWith('EXTERNAL_') ||
          code.startsWith('INIT_') ||
          code.startsWith('NAV_') ||
          code.startsWith('SCAN_') ||
          code === 'NO_RENDER_SURFACE' ||
          code === 'RETRO_CORE_NOT_OBSERVED' ||
          code === 'CONSOLE_ERROR' ||
          code === 'PAGE_ERROR'
        ) {
          mergedIssues.push({
            code: `DYNAMIC_${code}`,
            message: String(issue.message || code),
            ref: String(issue.url || ''),
          });
        }
      }

      const combined = statuses.concat(mergedIssues);
      if (!combined.length) continue;

      const existing = byName.get(name) || [];
      const existingKeys = new Set(existing.map((entry) => `${entry.code}|${entry.message || ''}|${entry.ref || ''}`));
      for (const entry of combined) {
        const key = `${entry.code}|${entry.message || ''}|${entry.ref || ''}`;
        if (existingKeys.has(key)) continue;
        existing.push(entry);
        existingKeys.add(key);
      }
      byName.set(name, existing);
    }
  }

  return byName;
}

function analyzeGame(rootDir, assetsDir, game, scanIssueMap) {
  const name = String(game && game.name ? game.name : '').trim();
  if (!name) return null;

  const issueBag = { list: [], _dedupe: new Set() };
  const entryFile = resolveEntryFile(rootDir, assetsDir, name, game.url);

  if (!entryFile) {
    addIssue(issueBag, {
      code: 'ENTRY_FILE_MISSING',
      message: 'Could not find game entry HTML file',
      ref: String(game && game.url ? game.url : ''),
    });
  } else {
    let html = '';
    try {
      html = fs.readFileSync(entryFile, 'utf8');
    } catch {
      addIssue(issueBag, {
        code: 'ENTRY_UNREADABLE',
        message: 'Could not read game entry HTML file',
        ref: path.relative(rootDir, entryFile).replace(/\\/g, '/'),
      });
      html = '';
    }

    if (html) {
      const refs = extractRuntimeRefs(html);
      const entryDir = path.dirname(entryFile);

      for (const item of refs) {
        const ref = item.ref;
        if (!ref || ref === '#') continue;
        if (isIgnoredScheme(ref)) continue;

        if (isExternalRef(ref)) {
          addIssue(issueBag, {
            code: 'EXTERNAL_RUNTIME_LINK',
            message: `External runtime dependency detected in ${item.kind}`,
            ref,
          });
          continue;
        }

        const refWithoutQuery = stripQuery(ref);
        if (!refWithoutQuery) continue;

        if (!isCriticalRef(refWithoutQuery, item.kind)) {
          continue;
        }

        const resolvedPath = refWithoutQuery.startsWith('/')
          ? path.join(rootDir, refWithoutQuery.replace(/^\/+/, ''))
          : path.resolve(entryDir, refWithoutQuery);

        if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isFile()) {
          addIssue(issueBag, {
            code: 'MISSING_LOCAL_ASSET',
            message: `Missing local asset referenced by ${item.kind}`,
            ref,
          });
        }
      }
    }
  }

  const dynamicIssues = scanIssueMap.get(name);
  if (dynamicIssues) {
    for (const item of dynamicIssues) {
      addIssue(issueBag, item);
    }
  }

  const issues = finalizeIssues(issueBag);
  if (!issues.length) return null;

  return { name, issues };
}

function writeOutputs(rootDir, blockedGames, metadata) {
  const txtPath = path.join(rootDir, 'offline_broken_games.txt');
  const jsonPath = path.join(rootDir, 'offline_broken_games.json');
  const detailsPath = path.join(rootDir, 'offline_broken_games_details.json');

  const names = blockedGames.map((item) => item.name).sort((a, b) => a.localeCompare(b));

  fs.writeFileSync(txtPath, names.join('\n') + (names.length ? '\n' : ''), 'utf8');

  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        total: names.length,
        source: metadata,
        games: names,
      },
      null,
      2
    ),
    'utf8'
  );

  fs.writeFileSync(
    detailsPath,
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        total: blockedGames.length,
        source: metadata,
        games: blockedGames,
      },
      null,
      2
    ),
    'utf8'
  );

  return { txtPath, jsonPath, detailsPath, names };
}

function main() {
  const assetsDir = path.join(ROOT_DIR, 'Assets');
  const gamesListPath = path.join(ROOT_DIR, 'games_list.json');
  const scanReportPaths = discoverScanReports(ROOT_DIR);

  const games = readJson(gamesListPath, []);
  if (!Array.isArray(games)) {
    console.error('games_list.json must be an array.');
    process.exit(1);
  }

  const scanIssueMap = loadScanIssues(scanReportPaths);
  const blockedByName = new Map();

  for (const game of games) {
    const analyzed = analyzeGame(ROOT_DIR, assetsDir, game, scanIssueMap);
    if (!analyzed) continue;
    blockedByName.set(normalizeGameName(analyzed.name), analyzed);
  }

  const blockedGames = Array.from(blockedByName.values()).sort((a, b) => a.name.localeCompare(b.name));
  const output = writeOutputs(ROOT_DIR, blockedGames, {
    games_list_path: 'games_list.json',
    scan_results_files: scanReportPaths.map((scanPath) => path.relative(ROOT_DIR, scanPath).replace(/\\/g, '/')),
    games_list_mtime: safeStatMtime(gamesListPath),
    scan_results_mtime: scanReportPaths.reduce((acc, scanPath) => {
      const key = path.relative(ROOT_DIR, scanPath).replace(/\\/g, '/');
      acc[key] = safeStatMtime(scanPath);
      return acc;
    }, {}),
  });

  console.log(`Total catalog games: ${games.length}`);
  console.log(`Offline-blocked games: ${output.names.length}`);
  console.log(`Wrote: ${path.relative(ROOT_DIR, output.txtPath)}`);
  console.log(`Wrote: ${path.relative(ROOT_DIR, output.jsonPath)}`);
  console.log(`Wrote: ${path.relative(ROOT_DIR, output.detailsPath)}`);
}

if (require.main === module) {
  main();
}
