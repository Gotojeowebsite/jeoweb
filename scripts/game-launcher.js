/**
 * Game Launcher Integration
 * Extends the frontend to display and manage downloaded offline games
 */

class GameLauncher {
    constructor() {
        this.games = new Map();
        this.currentGame = null;
        this.progressCache = new Map();
        this.undoStack = [];
        this.UNDO_TIMEOUT = 10000; // 10 seconds
    }

    async init() {
        console.log('[GameLauncher] Initializing...');

        // Load downloaded games
        await this.loadGames();

        // Setup UI event handlers
        this.setupEventHandlers();

        // Setup message listener for iframe communication
        window.addEventListener('message', this.handleIframeMessage.bind(this));

        console.log(`[GameLauncher] Loaded ${this.games.size} games`);
    }

    async loadGames() {
        // In a real implementation, this would scan the ./games directory
        // For now, we'll check localStorage for game metadata
        const gamesData = localStorage.getItem('downloaded_games');

        if (gamesData) {
            const games = JSON.parse(gamesData);
            games.forEach(game => {
                this.games.set(game.slug, game);
            });
        }

        // Also check for games in the /games directory
        // This would require server-side support or File System Access API
        try {
            const response = await fetch('/api/local-games');
            if (response.ok) {
                const localGames = await response.json();
                localGames.forEach(game => {
                    this.games.set(game.slug, game);
                });
            }
        } catch (e) {
            // API might not exist yet
        }
    }

    renderGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card offline-game';
        card.dataset.slug = game.slug;

        card.innerHTML = `
            <div class="game-thumbnail">
                <img src="/games/${game.slug}/thumbnail.png"
                     alt="${game.title}"
                     onerror="this.src='/assets/default-game.png'">
                <div class="game-badge offline">Offline</div>
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-author">by ${game.author}</p>
                <div class="game-actions">
                    <button class="btn btn-primary play-btn" data-slug="${game.slug}">
                        <i class="icon-play"></i> Play
                    </button>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle">
                            <i class="icon-menu"></i>
                        </button>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item export-save" data-slug="${game.slug}">
                                <i class="icon-download"></i> Export Save
                            </a>
                            <a href="#" class="dropdown-item import-save" data-slug="${game.slug}">
                                <i class="icon-upload"></i> Import Save
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item reset-progress danger" data-slug="${game.slug}">
                                <i class="icon-trash"></i> Reset Progress
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="/games/${game.slug}/" class="dropdown-item" target="_blank">
                                <i class="icon-folder"></i> Open Folder
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-status">
                <span class="last-played"></span>
                <span class="progress-indicator"></span>
            </div>
        `;

        // Load and display last played time
        this.updateGameStatus(card, game.slug);

        return card;
    }

    updateGameStatus(card, slug) {
        const progress = this.loadProgress(slug);
        if (progress && progress.lastSavedAt) {
            const lastPlayed = new Date(progress.lastSavedAt);
            const timeAgo = this.getTimeAgo(lastPlayed);
            const statusEl = card.querySelector('.last-played');
            if (statusEl) {
                statusEl.textContent = `Last played: ${timeAgo}`;
            }

            // Show progress indicator
            const indicator = card.querySelector('.progress-indicator');
            if (indicator) {
                indicator.innerHTML = '<i class="icon-save"></i> Progress saved';
            }
        }
    }

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;

        return date.toLocaleDateString();
    }

    setupEventHandlers() {
        // Play button
        document.addEventListener('click', async (e) => {
            if (e.target.closest('.play-btn')) {
                const slug = e.target.closest('.play-btn').dataset.slug;
                await this.playGame(slug);
            }

            // Export save
            if (e.target.closest('.export-save')) {
                e.preventDefault();
                const slug = e.target.closest('.export-save').dataset.slug;
                this.exportSave(slug);
            }

            // Import save
            if (e.target.closest('.import-save')) {
                e.preventDefault();
                const slug = e.target.closest('.import-save').dataset.slug;
                this.importSave(slug);
            }

            // Reset progress
            if (e.target.closest('.reset-progress')) {
                e.preventDefault();
                const slug = e.target.closest('.reset-progress').dataset.slug;
                this.showResetModal(slug);
            }

            // Dropdown toggle
            if (e.target.closest('.dropdown-toggle')) {
                e.target.closest('.dropdown').classList.toggle('open');
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown.open').forEach(d => {
                    d.classList.remove('open');
                });
            }
        });
    }

    async playGame(slug) {
        const game = this.games.get(slug);
        if (!game) {
            console.error('[GameLauncher] Game not found:', slug);
            return;
        }

        console.log('[GameLauncher] Launching game:', game.title);

        // Create game container
        const container = this.createGameContainer(game);
        document.body.appendChild(container);

        // Create iframe
        const iframe = container.querySelector('iframe');

        // Load progress before game starts
        const progress = this.loadProgress(slug);
        if (progress) {
            // Send progress after iframe loads
            iframe.addEventListener('load', () => {
                setTimeout(() => {
                    iframe.contentWindow.postMessage({
                        type: 'load-progress',
                        progress: progress
                    }, '*');
                }, 100);
            });
        }

        // Set current game
        this.currentGame = { slug, iframe, container };

        // Load game
        iframe.src = `/games/${slug}/index.html`;
    }

    createGameContainer(game) {
        const container = document.createElement('div');
        container.className = 'game-container fullscreen';
        container.innerHTML = `
            <div class="game-header">
                <div class="game-title">${game.title}</div>
                <div class="game-controls">
                    <button class="btn-icon save-now" title="Save Now">
                        <i class="icon-save"></i>
                    </button>
                    <button class="btn-icon fullscreen-toggle" title="Fullscreen">
                        <i class="icon-fullscreen"></i>
                    </button>
                    <button class="btn-icon close-game" title="Close">
                        <i class="icon-close"></i>
                    </button>
                </div>
            </div>
            <iframe
                class="game-iframe"
                sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
                allowfullscreen>
            </iframe>
            <div class="game-status-bar">
                <span class="status-text">Loading...</span>
                <span class="auto-save-indicator"></span>
            </div>
        `;

        // Setup container controls
        container.querySelector('.close-game').addEventListener('click', () => {
            this.closeGame();
        });

        container.querySelector('.save-now').addEventListener('click', () => {
            this.saveCurrentGame();
        });

        container.querySelector('.fullscreen-toggle').addEventListener('click', () => {
            this.toggleFullscreen(container);
        });

        return container;
    }

    closeGame() {
        if (!this.currentGame) return;

        // Save before closing
        this.saveCurrentGame();

        // Remove container
        this.currentGame.container.remove();
        this.currentGame = null;
    }

    toggleFullscreen(container) {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.error('Failed to enter fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    handleIframeMessage(event) {
        if (!event.data || !event.data.type) return;

        switch (event.data.type) {
            case 'save-progress':
                this.handleSaveProgress(event.data);
                break;

            case 'request-progress':
                this.handleRequestProgress(event.data);
                break;

            case 'game-ready':
                this.handleGameReady(event.data);
                break;
        }
    }

    handleSaveProgress(data) {
        const { slug, progress } = data;

        // Save to localStorage
        this.saveProgress(slug, progress);

        // Update UI
        this.updateSaveIndicator('saved');

        console.log(`[GameLauncher] Progress saved for ${slug}`);
    }

    handleRequestProgress(data) {
        const { slug } = data;
        const progress = this.loadProgress(slug);

        if (this.currentGame && this.currentGame.iframe) {
            this.currentGame.iframe.contentWindow.postMessage({
                type: 'load-progress',
                progress: progress
            }, '*');
        }
    }

    handleGameReady(data) {
        // Update status bar
        const statusBar = document.querySelector('.game-status-bar .status-text');
        if (statusBar) {
            statusBar.textContent = 'Game loaded';
        }
    }

    saveCurrentGame() {
        if (!this.currentGame) return;

        // Request save from iframe
        this.currentGame.iframe.contentWindow.postMessage({
            type: 'request-save'
        }, '*');

        this.updateSaveIndicator('saving');
    }

    updateSaveIndicator(status) {
        const indicator = document.querySelector('.auto-save-indicator');
        if (!indicator) return;

        switch (status) {
            case 'saving':
                indicator.innerHTML = '<i class="icon-spinner spin"></i> Saving...';
                break;
            case 'saved':
                indicator.innerHTML = '<i class="icon-check"></i> Saved';
                setTimeout(() => {
                    indicator.innerHTML = '';
                }, 3000);
                break;
            case 'error':
                indicator.innerHTML = '<i class="icon-alert"></i> Save failed';
                break;
        }
    }

    saveProgress(slug, progress) {
        const key = `game_progress_${slug}`;
        localStorage.setItem(key, JSON.stringify(progress));

        // Update cache
        this.progressCache.set(slug, progress);

        // Update game card status
        const card = document.querySelector(`[data-slug="${slug}"]`);
        if (card) {
            this.updateGameStatus(card, slug);
        }
    }

    loadProgress(slug) {
        // Check cache first
        if (this.progressCache.has(slug)) {
            return this.progressCache.get(slug);
        }

        // Load from localStorage
        const key = `game_progress_${slug}`;
        const data = localStorage.getItem(key);

        if (data) {
            try {
                const progress = JSON.parse(data);
                this.progressCache.set(slug, progress);
                return progress;
            } catch (e) {
                console.error('Failed to parse progress:', e);
            }
        }

        return null;
    }

    exportSave(slug) {
        const progress = this.loadProgress(slug);
        const game = this.games.get(slug);

        if (!progress) {
            alert('No save data found for this game');
            return;
        }

        const exportData = {
            game: slug,
            title: game.title,
            progress: progress,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slug}-save-${Date.now()}.json`;
        a.click();

        URL.revokeObjectURL(url);
    }

    importSave(slug) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const text = await file.text();
                const data = JSON.parse(text);

                if (data.game !== slug) {
                    alert('This save file is for a different game');
                    return;
                }

                this.saveProgress(slug, data.progress);
                alert('Save imported successfully');

                // Reload if game is currently playing
                if (this.currentGame && this.currentGame.slug === slug) {
                    this.currentGame.iframe.contentWindow.postMessage({
                        type: 'load-progress',
                        progress: data.progress
                    }, '*');
                }
            } catch (error) {
                alert('Failed to import save file: ' + error.message);
            }
        };

        input.click();
    }

    showResetModal(slug) {
        const game = this.games.get(slug);
        if (!game) return;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal reset-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Reset Progress</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="warning">
                        <i class="icon-warning"></i>
                        This will permanently delete all progress for <strong>${game.title}</strong>.
                    </p>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="confirm-checkbox">
                            I understand this will permanently delete my progress
                        </label>
                    </div>
                    <div class="form-group">
                        <label>Type <strong>${game.title}</strong> to confirm:</label>
                        <input type="text" id="confirm-text" class="form-control"
                               placeholder="Type game title here">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary cancel-btn">Cancel</button>
                    <button class="btn btn-danger confirm-btn" disabled>Reset Progress</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup modal logic
        const checkbox = modal.querySelector('#confirm-checkbox');
        const textInput = modal.querySelector('#confirm-text');
        const confirmBtn = modal.querySelector('.confirm-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const closeBtn = modal.querySelector('.close-modal');

        const checkConfirmation = () => {
            const isChecked = checkbox.checked;
            const isTyped = textInput.value.toLowerCase() === game.title.toLowerCase() ||
                           textInput.value === 'RESET';
            confirmBtn.disabled = !(isChecked && isTyped);
        };

        checkbox.addEventListener('change', checkConfirmation);
        textInput.addEventListener('input', checkConfirmation);

        confirmBtn.addEventListener('click', () => {
            this.resetProgress(slug);
            modal.remove();
        });

        cancelBtn.addEventListener('click', () => modal.remove());
        closeBtn.addEventListener('click', () => modal.remove());

        // Focus text input
        setTimeout(() => textInput.focus(), 100);
    }

    resetProgress(slug) {
        const game = this.games.get(slug);

        // Backup current progress for undo
        const currentProgress = this.loadProgress(slug);
        if (currentProgress) {
            this.createUndo(slug, currentProgress);
        }

        // Clear progress
        const key = `game_progress_${slug}`;
        localStorage.removeItem(key);
        this.progressCache.delete(slug);

        // Update UI
        const card = document.querySelector(`[data-slug="${slug}"]`);
        if (card) {
            this.updateGameStatus(card, slug);
        }

        // Show undo toast
        this.showUndoToast(game.title, slug);

        console.log(`[GameLauncher] Progress reset for ${slug}`);
    }

    createUndo(slug, progress) {
        const undoItem = {
            slug,
            progress,
            timestamp: Date.now()
        };

        this.undoStack.push(undoItem);

        // Remove undo after timeout
        setTimeout(() => {
            const index = this.undoStack.indexOf(undoItem);
            if (index > -1) {
                this.undoStack.splice(index, 1);
            }
        }, this.UNDO_TIMEOUT);
    }

    showUndoToast(title, slug) {
        const toast = document.createElement('div');
        toast.className = 'toast undo-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="icon-info"></i>
                <span>Progress reset for ${title}</span>
                <button class="btn-link undo-btn">Undo</button>
            </div>
            <div class="toast-progress">
                <div class="progress-bar"></div>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate progress bar
        const progressBar = toast.querySelector('.progress-bar');
        progressBar.style.animation = `countdown ${this.UNDO_TIMEOUT}ms linear`;

        // Setup undo button
        const undoBtn = toast.querySelector('.undo-btn');
        undoBtn.addEventListener('click', () => {
            this.undoReset(slug);
            toast.remove();
        });

        // Auto remove after timeout
        setTimeout(() => {
            toast.remove();
        }, this.UNDO_TIMEOUT);
    }

    undoReset(slug) {
        const undoItem = this.undoStack.find(item => item.slug === slug);
        if (!undoItem) return;

        // Restore progress
        this.saveProgress(slug, undoItem.progress);

        // Remove from undo stack
        const index = this.undoStack.indexOf(undoItem);
        if (index > -1) {
            this.undoStack.splice(index, 1);
        }

        console.log(`[GameLauncher] Progress restored for ${slug}`);
    }
}

// Initialize launcher when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.gameLauncher = new GameLauncher();
        window.gameLauncher.init();
    });
} else {
    window.gameLauncher = new GameLauncher();
    window.gameLauncher.init();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameLauncher;
}