#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

function printUsage() {
  console.log('Offline game fixer orchestration script');
  console.log('');
  console.log('Usage: node scripts/fix-offline-games.js [options]');
  console.log('');
  console.log('Options:');
  console.log('  --max-games <n>                 Limit how many games are processed this run');
  console.log('  --dry-run                       Log planned actions without changing files');
  console.log('  --force-lock                    Force supervisor lock override');
  console.log('  --skip-pre-audit                Do not refresh offline blocklist before fix');
  console.log('  --skip-post-audit               Do not refresh offline blocklist after fix');
  console.log('  --no-strict-external-test       Disable strict offline validation in supervisor');
  console.log('  --report <file>                 Output scan report path (default: offline_fix_targets.scan_report.json)');
  console.log('  --summary <file>                Output summary path (default: offline_fix_summary.json)');
  console.log('  --log <file>                    Output JSONL log path (default: offline_fix_log.jsonl)');
  console.log('  --fixed-list <file>             Output fixed games txt path (default: offline_fixed_games.txt)');
  console.log('  --unresolved-list <file>        Output unresolved games txt path (default: offline_unresolved_games.txt)');
  console.log('  --test-wait-seconds <seconds>   Scanner wait seconds per validation (default: 5)');
  console.log('  --test-timeout-ms <ms>          Scanner timeout ms per validation (default: 20000)');
  console.log('  --hard-timeout-seconds <sec>    Scanner hard timeout seconds (default: 60)');
  console.log('  --validation-timeout-seconds <s> Validation subprocess timeout seconds (default: 240)');
  console.log('  --help                          Show this help and exit');
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv) {
  const options = {
    maxGames: null,
    dryRun: false,
    forceLock: false,
    preAudit: true,
    postAudit: true,
    strictExternalTest: true,
    reportFile: 'offline_fix_targets.scan_report.json',
    summaryFile: 'offline_fix_summary.json',
    logFile: 'offline_fix_log.jsonl',
    fixedListFile: 'offline_fixed_games.txt',
    unresolvedListFile: 'offline_unresolved_games.txt',
    testWaitSeconds: 5,
    testTimeoutMs: 20000,
    hardTimeoutSeconds: 60,
    validationTimeoutSeconds: 240,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      printUsage();
      process.exit(0);
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--force-lock') {
      options.forceLock = true;
    } else if (arg === '--skip-pre-audit') {
      options.preAudit = false;
    } else if (arg === '--skip-post-audit') {
      options.postAudit = false;
    } else if (arg === '--no-strict-external-test') {
      options.strictExternalTest = false;
    } else if (arg === '--max-games') {
      options.maxGames = Number(argv[i + 1]);
      i += 1;
    } else if (arg === '--report') {
      options.reportFile = String(argv[i + 1] || '').trim();
      i += 1;
    } else if (arg === '--summary') {
      options.summaryFile = String(argv[i + 1] || '').trim();
      i += 1;
    } else if (arg === '--log') {
      options.logFile = String(argv[i + 1] || '').trim();
      i += 1;
    } else if (arg === '--fixed-list') {
      options.fixedListFile = String(argv[i + 1] || '').trim();
      i += 1;
    } else if (arg === '--unresolved-list') {
      options.unresolvedListFile = String(argv[i + 1] || '').trim();
      i += 1;
    } else if (arg === '--test-wait-seconds') {
      options.testWaitSeconds = Number(argv[i + 1]);
      i += 1;
    } else if (arg === '--test-timeout-ms') {
      options.testTimeoutMs = Number(argv[i + 1]);
      i += 1;
    } else if (arg === '--hard-timeout-seconds') {
      options.hardTimeoutSeconds = Number(argv[i + 1]);
      i += 1;
    } else if (arg === '--validation-timeout-seconds') {
      options.validationTimeoutSeconds = Number(argv[i + 1]);
      i += 1;
    } else {
      fail(`Unknown argument: ${arg}`);
    }
  }

  if (options.maxGames !== null && (!Number.isFinite(options.maxGames) || options.maxGames <= 0)) {
    fail('--max-games must be a positive number');
  }
  if (!options.reportFile) fail('--report cannot be empty');
  if (!options.summaryFile) fail('--summary cannot be empty');
  if (!options.logFile) fail('--log cannot be empty');
  if (!options.fixedListFile) fail('--fixed-list cannot be empty');
  if (!options.unresolvedListFile) fail('--unresolved-list cannot be empty');

  return options;
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function writeLines(filePath, lines) {
  const text = lines.length ? `${lines.join('\n')}\n` : '';
  fs.writeFileSync(filePath, text, 'utf8');
}

function normalizeName(value) {
  return String(value || '').trim().toLowerCase();
}

function relToRoot(absPath) {
  return path.relative(ROOT_DIR, absPath).replace(/\\/g, '/');
}

function resolveOutputPath(fileName) {
  return path.resolve(ROOT_DIR, fileName);
}

function deriveEntryFile(gameName, gameUrl) {
  const raw = String(gameUrl || '').replace(/\\/g, '/').split('?')[0].replace(/^\/+/, '');
  if (!raw) return 'index.html';
  const prefix = `Assets/${gameName}/`;
  if (raw.startsWith(prefix) && raw.length > prefix.length) {
    return raw.slice(prefix.length);
  }
  return 'index.html';
}

function isHttpUrl(value) {
  return /^https?:\/\//i.test(String(value || '').trim());
}

function detectPythonCommand() {
  const py3 = cp.spawnSync('python3', ['--version'], { cwd: ROOT_DIR, stdio: 'ignore' });
  if (py3.status === 0) return 'python3';

  const py = cp.spawnSync('python', ['--version'], { cwd: ROOT_DIR, stdio: 'ignore' });
  if (py.status === 0) return 'python';

  fail('Could not find python3 or python in PATH.');
}

function runCommand(command, args) {
  const result = cp.spawnSync(command, args, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: false,
  });
  if (typeof result.status === 'number' && result.status !== 0) {
    fail(`Command failed (${result.status}): ${command} ${args.join(' ')}`);
  }
  if (result.error) {
    fail(`Command failed: ${result.error.message}`);
  }
}

function runNodeScript(relativePath) {
  runCommand('node', [relativePath]);
}

function buildOfflineFixReport(catalog, detailsByName, blockedNames) {
  const catalogByName = new Map();
  for (const game of catalog) {
    if (!game || typeof game !== 'object') continue;
    const name = String(game.name || '').trim();
    if (!name) continue;
    catalogByName.set(normalizeName(name), game);
  }

  const report = [];
  for (const blockedName of blockedNames) {
    const key = normalizeName(blockedName);
    const game = catalogByName.get(key) || {};
    const issueList = detailsByName.get(key) || [];

    const criticalIssues = [];
    for (const issue of issueList) {
      if (!issue || typeof issue !== 'object') continue;
      const code = String(issue.code || 'OFFLINE_BLOCKED').trim() || 'OFFLINE_BLOCKED';
      const message = String(issue.message || 'Offline runtime issue detected').trim() || 'Offline runtime issue detected';
      const ref = String(issue.ref || '').trim();
      criticalIssues.push({
        code,
        message,
        severity: 'critical',
        url: isHttpUrl(ref) ? ref : '',
      });
    }

    if (!criticalIssues.length) {
      criticalIssues.push({
        code: 'OFFLINE_BLOCKED',
        message: 'Marked by offline audit as not offline-ready',
        severity: 'critical',
        url: '',
      });
    }

    const name = String(game.name || blockedName).trim() || blockedName;
    const gameUrl = String(game.url || `Assets/${name}/index.html`);
    report.push({
      name,
      type: String(game.type || 'webgl'),
      url: gameUrl,
      entry_file: deriveEntryFile(name, gameUrl),
      status: 'broken',
      critical_issues: criticalIssues,
      warnings: [],
    });
  }

  report.sort((a, b) => a.name.localeCompare(b.name));
  return report;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));

  const offlineBrokenTxt = path.join(ROOT_DIR, 'offline_broken_games.txt');
  const offlineBrokenDetails = path.join(ROOT_DIR, 'offline_broken_games_details.json');
  const gamesListPath = path.join(ROOT_DIR, 'games_list.json');

  if (!fs.existsSync(gamesListPath)) {
    fail('games_list.json is missing. Run node scan.js first.');
  }

  if (opts.preAudit || !fs.existsSync(offlineBrokenTxt) || !fs.existsSync(offlineBrokenDetails)) {
    console.log('Refreshing offline broken list...');
    runNodeScript('scripts/audit-offline-readiness.js');
  }

  if (!fs.existsSync(offlineBrokenTxt)) {
    fail('offline_broken_games.txt is missing after audit.');
  }

  const blockedNames = fs
    .readFileSync(offlineBrokenTxt, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!blockedNames.length) {
    console.log('No offline-broken games found. Nothing to fix.');
    return;
  }

  const detailsPayload = readJson(offlineBrokenDetails, { games: [] });
  const detailsByName = new Map();
  const detailsGames = Array.isArray(detailsPayload.games) ? detailsPayload.games : [];
  for (const item of detailsGames) {
    if (!item || typeof item !== 'object') continue;
    const name = normalizeName(item.name);
    if (!name) continue;
    const issues = Array.isArray(item.issues) ? item.issues : [];
    detailsByName.set(name, issues);
  }

  const catalog = readJson(gamesListPath, []);
  if (!Array.isArray(catalog)) {
    fail('games_list.json must be a JSON array.');
  }

  let selectedNames = blockedNames;
  if (opts.maxGames !== null) {
    selectedNames = blockedNames.slice(0, opts.maxGames);
  }

  const reportData = buildOfflineFixReport(catalog, detailsByName, selectedNames);

  const reportPath = resolveOutputPath(opts.reportFile);
  const summaryPath = resolveOutputPath(opts.summaryFile);
  const logPath = resolveOutputPath(opts.logFile);
  const fixedListPath = resolveOutputPath(opts.fixedListFile);
  const unresolvedListPath = resolveOutputPath(opts.unresolvedListFile);

  writeJson(reportPath, reportData);
  console.log(`Prepared scan report with ${reportData.length} games: ${relToRoot(reportPath)}`);

  const python = detectPythonCommand();
  const supervisorArgs = [
    'auto_fix_and_recover_games.py',
    '--scan-report',
    relToRoot(reportPath),
    '--summary-json',
    relToRoot(summaryPath),
    '--log-jsonl',
    relToRoot(logPath),
    '--maintenance-json',
    'maintenance_status.json',
    '--test-wait-seconds',
    String(opts.testWaitSeconds),
    '--test-timeout-ms',
    String(opts.testTimeoutMs),
    '--hard-timeout-seconds',
    String(opts.hardTimeoutSeconds),
    '--validation-call-timeout-seconds',
    String(opts.validationTimeoutSeconds),
  ];

  if (opts.strictExternalTest) supervisorArgs.push('--strict-external-test');
  if (opts.forceLock) supervisorArgs.push('--force-lock');
  if (opts.dryRun) supervisorArgs.push('--dry-run');

  console.log('Running repair supervisor...');
  runCommand(python, supervisorArgs);

  if (opts.postAudit) {
    console.log('Refreshing offline broken list after repair run...');
    runNodeScript('scripts/audit-offline-readiness.js');
  }

  const summary = readJson(summaryPath, {});
  const fixedLocal = Array.isArray(summary.fixed_local) ? summary.fixed_local : [];
  const recovered = Array.isArray(summary.recovered) ? summary.recovered : [];
  const unresolved = Array.isArray(summary.unresolved) ? summary.unresolved : [];

  const fixedSet = new Set();
  for (const name of fixedLocal.concat(recovered)) {
    const normalized = String(name || '').trim();
    if (normalized) fixedSet.add(normalized);
  }
  const fixed = Array.from(fixedSet).sort((a, b) => a.localeCompare(b));
  const unresolvedSorted = unresolved
    .map((name) => String(name || '').trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  writeLines(fixedListPath, fixed);
  writeLines(unresolvedListPath, unresolvedSorted);

  console.log('Offline fix run complete.');
  console.log(`  Targets: ${summary.targets || reportData.length}`);
  console.log(`  Fixed locally: ${summary.fixed_local_count || fixedLocal.length}`);
  console.log(`  Recovered from providers: ${summary.recovered_count || recovered.length}`);
  console.log(`  Unresolved: ${summary.unresolved_count || unresolvedSorted.length}`);
  console.log(`  Fixed list: ${relToRoot(fixedListPath)}`);
  console.log(`  Unresolved list: ${relToRoot(unresolvedListPath)}`);
  console.log(`  Summary: ${relToRoot(summaryPath)}`);
  console.log(`  Log: ${relToRoot(logPath)}`);
}

if (require.main === module) {
  main();
}
