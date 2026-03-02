const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'media_catalog.json');

function fail(message) {
  console.error(`Validation failed: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(CATALOG_PATH)) {
  fail('media_catalog.json does not exist. Run `npm run media:ingest` first.');
}

let catalog;
try {
  catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
} catch (error) {
  fail(`media_catalog.json is invalid JSON: ${error.message}`);
}

if (!Array.isArray(catalog)) {
  fail('media_catalog.json must be an array.');
}

const ids = new Set();
for (const entry of catalog) {
  if (!entry || typeof entry !== 'object') {
    fail('catalog contains a non-object entry.');
  }

  if (!entry.id || !entry.title || !entry.type || !entry.file) {
    fail(`missing required fields on entry: ${JSON.stringify(entry)}`);
  }

  if (ids.has(entry.id)) {
    fail(`duplicate id: ${entry.id}`);
  }
  ids.add(entry.id);

  const absolutePath = path.join(ROOT, entry.file);
  if (!fs.existsSync(absolutePath)) {
    fail(`missing file for entry ${entry.id}: ${entry.file}`);
  }
}

console.log(`Catalog valid: ${catalog.length} entries.`);
