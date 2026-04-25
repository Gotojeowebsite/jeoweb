/**
 * Launcher Hooks for Save/Load Functionality
 * This script is injected into games to provide save/load capabilities
 */

(function() {
    'use strict';

    const GAME_SLUG = window.__GAME_SLUG || window.location.pathname.split('/').filter(p => p).pop() || 'unknown';
    const SAVE_INTERVAL = 30000; // Auto-save every 30 seconds
    const DEBUG = true;

    function log(...args) {
        if (DEBUG) {
            console.log('[Launcher]', ...args);
        }
    }

    // IndexedDB Helper Functions
    const IndexedDBHelper = {
        async exportDatabase(dbName) {
            try {
                const db = await this.openDB(dbName);
                const data = {};

                for (const storeName of db.objectStoreNames) {
                    const transaction = db.transaction(storeName, 'readonly');
                    const store = transaction.objectStore(storeName);
                    const records = await this.getAllRecords(store);
                    data[storeName] = records;
                }

                db.close();
                return data;
            } catch (error) {
                log(`Failed to export IndexedDB ${dbName}:`, error);
                return null;
            }
        },

        async importDatabase(dbName, data) {
            try {
                const db = await this.openDB(dbName);

                for (const [storeName, records] of Object.entries(data)) {
                    if (!db.objectStoreNames.contains(storeName)) {
                        log(`Store ${storeName} doesn't exist in ${dbName}`);
                        continue;
                    }

                    const transaction = db.transaction(storeName, 'readwrite');
                    const store = transaction.objectStore(storeName);

                    // Clear existing data
                    await this.clearStore(store);

                    // Import records
                    for (const record of records) {
                        await this.putRecord(store, record);
                    }
                }

                db.close();
                log(`Imported data into IndexedDB ${dbName}`);
            } catch (error) {
                log(`Failed to import IndexedDB ${dbName}:`, error);
            }
        },

        openDB(name) {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(name);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        },

        getAllRecords(store) {
            return new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        },

        clearStore(store) {
            return new Promise((resolve, reject) => {
                const request = store.clear();
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        },

        putRecord(store, record) {
            return new Promise((resolve, reject) => {
                const request = store.put(record);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        },

        async getAllDatabases() {
            const databases = [];
            if ('databases' in indexedDB) {
                // Modern browsers
                const dbList = await indexedDB.databases();
                return dbList.map(db => db.name);
            } else {
                // Fallback - try common game database names
                const commonNames = [
                    'gameData', 'saveData', 'playerData', 'localStorage',
                    'UnityCache', 'GameSave', 'progress', 'state'
                ];
                for (const name of commonNames) {
                    try {
                        const db = await this.openDB(name);
                        databases.push(name);
                        db.close();
                    } catch (e) {
                        // Database doesn't exist
                    }
                }
            }
            return databases;
        }
    };

    // File System Helper (for games that use virtual file systems)
    const FileSystemHelper = {
        capturedFiles: new Map(),

        interceptFileWrites() {
            // Intercept common file write methods
            if (window.FS && window.FS.writeFile) {
                const originalWriteFile = window.FS.writeFile;
                window.FS.writeFile = (path, data, ...args) => {
                    this.capturedFiles.set(path, data);
                    return originalWriteFile.call(window.FS, path, data, ...args);
                };
            }

            // Intercept Emscripten file system
            if (window.Module && window.Module.FS) {
                const fs = window.Module.FS;
                if (fs.writeFile) {
                    const originalWriteFile = fs.writeFile;
                    fs.writeFile = (path, data, ...args) => {
                        this.capturedFiles.set(path, data);
                        return originalWriteFile.call(fs, path, data, ...args);
                    };
                }
            }
        },

        getFiles() {
            const files = {};
            for (const [path, data] of this.capturedFiles) {
                // Convert to base64 if binary
                if (data instanceof Uint8Array || data instanceof ArrayBuffer) {
                    files[path] = btoa(String.fromCharCode(...new Uint8Array(data)));
                } else {
                    files[path] = data;
                }
            }
            return files;
        },

        restoreFiles(files) {
            for (const [path, data] of Object.entries(files)) {
                // Decode base64 if needed
                let fileData = data;
                if (typeof data === 'string' && /^[A-Za-z0-9+/=]+$/.test(data)) {
                    try {
                        fileData = Uint8Array.from(atob(data), c => c.charCodeAt(0));
                    } catch (e) {
                        // Not base64, use as-is
                    }
                }

                this.capturedFiles.set(path, fileData);

                // Try to write to actual file system
                if (window.FS && window.FS.writeFile) {
                    try {
                        window.FS.writeFile(path, fileData);
                    } catch (e) {
                        log(`Failed to restore file ${path}:`, e);
                    }
                }
            }
        }
    };

    // Main launcher interface
    window.__launcher = {
        async load(progress) {
            if (!progress) {
                log('No progress data to load');
                return;
            }

            log('Loading progress for', GAME_SLUG);

            // Restore localStorage
            if (progress.localStorage) {
                for (const [key, value] of Object.entries(progress.localStorage)) {
                    try {
                        localStorage.setItem(key, value);
                    } catch (e) {
                        log(`Failed to restore localStorage key ${key}:`, e);
                    }
                }
                log(`Restored ${Object.keys(progress.localStorage).length} localStorage items`);
            }

            // Restore IndexedDB
            if (progress.indexedDB) {
                for (const [dbName, dbData] of Object.entries(progress.indexedDB)) {
                    await IndexedDBHelper.importDatabase(dbName, dbData);
                }
                log(`Restored ${Object.keys(progress.indexedDB).length} IndexedDB databases`);
            }

            // Restore files
            if (progress.files) {
                FileSystemHelper.restoreFiles(progress.files);
                log(`Restored ${Object.keys(progress.files).length} files`);
            }

            // Restore cookies (for games that use them)
            if (progress.cookies) {
                for (const [name, value] of Object.entries(progress.cookies)) {
                    document.cookie = `${name}=${value}; path=/; max-age=31536000`;
                }
                log(`Restored ${Object.keys(progress.cookies).length} cookies`);
            }

            log('Progress loaded successfully');
        },

        async save() {
            log('Saving progress for', GAME_SLUG);

            const progress = {
                localStorage: {},
                indexedDB: {},
                files: {},
                cookies: {},
                lastSavedAt: new Date().toISOString()
            };

            // Save localStorage
            try {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    progress.localStorage[key] = localStorage.getItem(key);
                }
                log(`Saved ${Object.keys(progress.localStorage).length} localStorage items`);
            } catch (e) {
                log('Failed to save localStorage:', e);
            }

            // Save IndexedDB
            try {
                const databases = await IndexedDBHelper.getAllDatabases();
                for (const dbName of databases) {
                    const data = await IndexedDBHelper.exportDatabase(dbName);
                    if (data) {
                        progress.indexedDB[dbName] = data;
                    }
                }
                log(`Saved ${Object.keys(progress.indexedDB).length} IndexedDB databases`);
            } catch (e) {
                log('Failed to save IndexedDB:', e);
            }

            // Save files
            try {
                progress.files = FileSystemHelper.getFiles();
                log(`Saved ${Object.keys(progress.files).length} files`);
            } catch (e) {
                log('Failed to save files:', e);
            }

            // Save cookies
            try {
                const cookies = {};
                document.cookie.split(';').forEach(cookie => {
                    const [name, value] = cookie.trim().split('=');
                    if (name && value) {
                        cookies[name] = value;
                    }
                });
                progress.cookies = cookies;
                log(`Saved ${Object.keys(progress.cookies).length} cookies`);
            } catch (e) {
                log('Failed to save cookies:', e);
            }

            return progress;
        },

        sendToParent(type, data) {
            if (window.parent !== window) {
                window.parent.postMessage({
                    type: type,
                    slug: GAME_SLUG,
                    ...data
                }, '*');
            }
        }
    };

    // Legacy interface for compatibility
    window.__launcher_load = window.__launcher.load.bind(window.__launcher);
    window.__launcher_save = window.__launcher.save.bind(window.__launcher);

    // Setup auto-save
    let saveInterval;
    function startAutoSave() {
        if (saveInterval) {
            clearInterval(saveInterval);
        }

        saveInterval = setInterval(async () => {
            const progress = await window.__launcher.save();
            window.__launcher.sendToParent('save-progress', { progress });
        }, SAVE_INTERVAL);

        log('Auto-save enabled (every', SAVE_INTERVAL / 1000, 'seconds)');
    }

    // Save on page unload
    window.addEventListener('beforeunload', async (e) => {
        const progress = await window.__launcher.save();
        window.__launcher.sendToParent('save-progress', { progress });
    });

    // Listen for messages from parent
    window.addEventListener('message', async (event) => {
        if (event.data.type === 'load-progress' && event.data.progress) {
            await window.__launcher.load(event.data.progress);
        } else if (event.data.type === 'request-save') {
            const progress = await window.__launcher.save();
            window.__launcher.sendToParent('save-progress', { progress });
        }
    });

    // Initialize
    function init() {
        log('Initializing launcher hooks for', GAME_SLUG);

        // Intercept file writes
        FileSystemHelper.interceptFileWrites();

        // Request initial progress from parent
        window.__launcher.sendToParent('request-progress', {});

        // Start auto-save
        startAutoSave();

        // Expose debug interface
        if (DEBUG) {
            window.__launcher_debug = {
                saveNow: () => window.__launcher.save(),
                loadProgress: (p) => window.__launcher.load(p),
                getProgress: () => window.__launcher.save(),
                databases: () => IndexedDBHelper.getAllDatabases(),
                files: () => FileSystemHelper.getFiles()
            };
        }
    }

    // Wait for DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();