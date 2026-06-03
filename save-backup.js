/* Jeoweb Save Backup — automatic IndexedDB backup for emulator save states.
 * Catches Retro/GBA .sav data from emulator iframes and stores in IndexedDB
 * so users never lose game progress across sessions.
 * Exposes: window.JeoSaveBackup */
(function () {
	'use strict';
	if (window.JeoSaveBackup) return;

	const DB_NAME = 'jeo-save-backup';
	const DB_VERSION = 1;
	const STORE_NAME = 'saves';
	const MAX_SAVES_PER_GAME = 20;
	const AUTO_BACKUP_INTERVAL = 60000; // 1 minute

	let db = null;
	let backupTimer = null;
	let currentSlug = null;

	/* ─── Database ─── */

	function openDB() {
		return new Promise((resolve, reject) => {
			if (db) { resolve(db); return; }
			if (!window.indexedDB) { resolve(null); return; }

			const req = indexedDB.open(DB_NAME, DB_VERSION);

			req.onupgradeneeded = (e) => {
				const d = e.target.result;
				if (!d.objectStoreNames.contains(STORE_NAME)) {
					const store = d.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
					store.createIndex('slug', 'slug', { unique: false });
					store.createIndex('createdAt', 'createdAt', { unique: false });
					store.createIndex('slug_type', ['slug', 'type'], { unique: false });
				}
			};

			req.onsuccess = (e) => {
				db = e.target.result;
				resolve(db);
			};

			req.onerror = (e) => {
				console.error('[JeoSaveBackup] DB open failed:', e.target.error);
				resolve(null);
			};
		});
	}

	/* ─── Save Operations ─── */

	async function saveToDB(slug, type, data, label) {
		const database = await openDB();
		if (!database) return false;

		return new Promise((resolve) => {
			try {
				const tx = database.transaction(STORE_NAME, 'readwrite');
				const store = tx.objectStore(STORE_NAME);

				const record = {
					slug: slug,
					type: type, // 'auto' | 'manual' | 'sav' | 'state'
					data: data, // ArrayBuffer or base64 string
					label: label || 'Auto-backup',
					createdAt: Date.now(),
					size: data instanceof ArrayBuffer ? data.byteLength : (data ? data.length : 0),
				};

				const req = store.add(record);
				req.onsuccess = () => {
					pruneOldSaves(slug);
					resolve(true);
				};
				req.onerror = () => resolve(false);
			} catch (e) {
				console.error('[JeoSaveBackup] Save failed:', e);
				resolve(false);
			}
		});
	}

	async function pruneOldSaves(slug) {
		const database = await openDB();
		if (!database) return;

		try {
			const tx = database.transaction(STORE_NAME, 'readwrite');
			const store = tx.objectStore(STORE_NAME);
			const index = store.index('slug');
			const req = index.getAll(slug);

			req.onsuccess = () => {
				const saves = req.result;
				if (saves.length <= MAX_SAVES_PER_GAME) return;

				// Sort by createdAt, keep newest MAX_SAVES_PER_GAME
				saves.sort((a, b) => b.createdAt - a.createdAt);
				const toDelete = saves.slice(MAX_SAVES_PER_GAME);

				const delTx = database.transaction(STORE_NAME, 'readwrite');
				const delStore = delTx.objectStore(STORE_NAME);
				toDelete.forEach(s => delStore.delete(s.id));
			};
		} catch (e) {
			console.error('[JeoSaveBackup] Prune failed:', e);
		}
	}

	async function getSaves(slug) {
		const database = await openDB();
		if (!database) return [];

		return new Promise((resolve) => {
			try {
				const tx = database.transaction(STORE_NAME, 'readonly');
				const store = tx.objectStore(STORE_NAME);
				const index = store.index('slug');
				const req = index.getAll(slug);

				req.onsuccess = () => {
					const saves = req.result || [];
					saves.sort((a, b) => b.createdAt - a.createdAt);
					resolve(saves);
				};
				req.onerror = () => resolve([]);
			} catch { resolve([]); }
		});
	}

	async function loadSave(id) {
		const database = await openDB();
		if (!database) return null;

		return new Promise((resolve) => {
			try {
				const tx = database.transaction(STORE_NAME, 'readonly');
				const store = tx.objectStore(STORE_NAME);
				const req = store.get(id);

				req.onsuccess = () => resolve(req.result || null);
				req.onerror = () => resolve(null);
			} catch { resolve(null); }
		});
	}

	async function deleteSave(id) {
		const database = await openDB();
		if (!database) return false;

		return new Promise((resolve) => {
			try {
				const tx = database.transaction(STORE_NAME, 'readwrite');
				const store = tx.objectStore(STORE_NAME);
				const req = store.delete(id);
				req.onsuccess = () => resolve(true);
				req.onerror = () => resolve(false);
			} catch { resolve(false); }
		});
	}

	async function exportSave(id) {
		const save = await loadSave(id);
		if (!save) return null;

		// Convert ArrayBuffer to base64 for export
		let data = save.data;
		if (data instanceof ArrayBuffer) {
			const bytes = new Uint8Array(data);
			let binary = '';
			for (let i = 0; i < bytes.length; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			data = btoa(binary);
		}

		return {
			slug: save.slug,
			type: save.type,
			data: data,
			label: save.label,
			createdAt: save.createdAt,
			exportedAt: Date.now(),
		};
	}

	async function importSave(exportedData) {
		if (!exportedData || !exportedData.slug || !exportedData.data) return false;

		let data = exportedData.data;
		// If it looks like base64, keep it as-is (string storage is fine)

		return saveToDB(
			exportedData.slug,
			exportedData.type || 'imported',
			data,
			exportedData.label || 'Imported save'
		);
	}

	/* ─── Emulator Save Capture ─── */

	function captureEmulatorSaves(iframe, slug) {
		if (!iframe || !slug) return;

		// Listen for messages from emulator iframes
		window.addEventListener('message', function handler(e) {
			if (!e.data || typeof e.data !== 'object') return;

			// EmulatorJS sends save data via postMessage
			if (e.data.type === 'save-state' || e.data.type === 'save-sram') {
				const saveType = e.data.type === 'save-state' ? 'state' : 'sav';
				saveToDB(slug, saveType, e.data.data, `${saveType} — ${new Date().toLocaleTimeString()}`);
				console.log(`[JeoSaveBackup] Captured ${saveType} for ${slug}`);
			}
		});
	}

	/* ─── Auto-backup Timer ─── */

	function startAutoBackup(slug) {
		stopAutoBackup();
		currentSlug = slug;

		backupTimer = setInterval(async () => {
			// Try to extract save data from the iframe
			const iframe = document.getElementById('gameFrame');
			if (!iframe || !currentSlug) return;

			try {
				// Try to get localStorage state from the iframe
				iframe.contentWindow.postMessage({ type: 'jeo-request-save' }, '*');
			} catch {
				// Cross-origin — can't access iframe directly, rely on postMessage
			}
		}, AUTO_BACKUP_INTERVAL);
	}

	function stopAutoBackup() {
		if (backupTimer) {
			clearInterval(backupTimer);
			backupTimer = null;
		}
		currentSlug = null;
	}

	/* ─── Stats ─── */

	async function getStats() {
		const database = await openDB();
		if (!database) return { totalSaves: 0, totalSize: 0, games: 0 };

		return new Promise((resolve) => {
			try {
				const tx = database.transaction(STORE_NAME, 'readonly');
				const store = tx.objectStore(STORE_NAME);
				const req = store.getAll();

				req.onsuccess = () => {
					const saves = req.result || [];
					const games = new Set(saves.map(s => s.slug));
					const totalSize = saves.reduce((sum, s) => sum + (s.size || 0), 0);

					resolve({
						totalSaves: saves.length,
						totalSize,
						games: games.size,
						formattedSize: formatBytes(totalSize),
					});
				};
				req.onerror = () => resolve({ totalSaves: 0, totalSize: 0, games: 0 });
			} catch { resolve({ totalSaves: 0, totalSize: 0, games: 0 }); }
		});
	}

	function formatBytes(bytes) {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
	}

	/* ─── Initialize ─── */
	openDB();

	window.JeoSaveBackup = {
		save: saveToDB,
		getSaves,
		loadSave,
		deleteSave,
		exportSave,
		importSave,
		captureEmulatorSaves,
		startAutoBackup,
		stopAutoBackup,
		getStats,
	};
})();
