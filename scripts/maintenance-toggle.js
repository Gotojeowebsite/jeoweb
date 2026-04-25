#!/usr/bin/env node
// Easy maintenance flag toggler for any game slug.
// Usage:
//   node scripts/maintenance-toggle.js heal <slug> [<slug> ...]
//   node scripts/maintenance-toggle.js break <slug> [<slug> ...]
//   node scripts/maintenance-toggle.js clear <slug> [<slug> ...]   (remove from both override lists)
//   node scripts/maintenance-toggle.js list
//
// Updates BOTH maintenance_overrides.json (durable) and maintenance_status.json
// (live) so the homepage reflects the change without re-running the supervisor.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OVR = path.join(ROOT, 'maintenance_overrides.json');
const STA = path.join(ROOT, 'maintenance_status.json');

function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}
function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}

function main() {
  const [, , cmd, ...slugs] = process.argv;
  if (!cmd || (cmd !== 'list' && slugs.length === 0)) {
    console.error('usage: maintenance-toggle.js heal|break|clear <slug> [...]   |   list');
    process.exit(1);
  }

  const ovr = readJson(OVR, { force_healthy: [], force_maintenance: [] });
  ovr.force_healthy ||= [];
  ovr.force_maintenance ||= [];

  if (cmd === 'list') {
    console.log('force_healthy     :', ovr.force_healthy.join(', ') || '(none)');
    console.log('force_maintenance :', ovr.force_maintenance.join(', ') || '(none)');
    return;
  }

  const status = readJson(STA, { games: {}, summary: {} });
  const games = status.games || (status.games = {});

  const removeFrom = (arr, s) => { const i = arr.indexOf(s); if (i >= 0) arr.splice(i, 1); };
  const addTo = (arr, s) => { if (!arr.includes(s)) arr.push(s); };

  for (const slug of slugs) {
    if (cmd === 'heal') {
      removeFrom(ovr.force_maintenance, slug);
      addTo(ovr.force_healthy, slug);
      games[slug] = { status: 'healthy', reason: 'manual_override_healthy' };
      console.log(`heal  ${slug}`);
    } else if (cmd === 'break') {
      removeFrom(ovr.force_healthy, slug);
      addTo(ovr.force_maintenance, slug);
      games[slug] = { status: 'under_maintenance', reason: 'manual_override_maintenance' };
      console.log(`break ${slug}`);
    } else if (cmd === 'clear') {
      removeFrom(ovr.force_healthy, slug);
      removeFrom(ovr.force_maintenance, slug);
      delete games[slug];
      console.log(`clear ${slug}`);
    } else {
      console.error('unknown command:', cmd);
      process.exit(1);
    }
  }

  ovr.force_healthy.sort();
  ovr.force_maintenance.sort();

  if (status.summary) {
    let h = 0, m = 0;
    for (const v of Object.values(games)) {
      if (v.status === 'healthy') h++;
      else if (v.status === 'under_maintenance') m++;
    }
    status.summary.healthy = h;
    status.summary.under_maintenance = m;
  }

  writeJson(OVR, ovr);
  writeJson(STA, status);
  console.log('saved overrides and status');
}

main();
