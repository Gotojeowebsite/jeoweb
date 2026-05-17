// Game Loader and Interaction Handler
class GameLoader {
    constructor() {
        this.gameContainer = document.getElementById('gameContainer');
        this.iframe = document.getElementById('gameIframe');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.playNowOverlay = document.getElementById('playNowOverlay');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');

        if (this.gameContainer) {
            this.init();
        }
    }

    init() {
        console.log('GameLoader initializing...');
        console.log('Container:', this.gameContainer);
        console.log('Play Overlay:', this.playNowOverlay);
        console.log('Iframe:', this.iframe);

        // Handle Play Now Overlay
        if (this.playNowOverlay) {
            const playBtn = this.playNowOverlay.querySelector('.play-now-btn');
            if (playBtn) {
                playBtn.addEventListener('click', () => this.startGame());
            }
            this.playNowOverlay.addEventListener('click', (e) => {
                // If it's not a link inside the overlay, start game
                if (!e.target.closest('a')) {
                    this.startGame();
                }
            });
        } else {
            // Autostart loading if no play overlay
            if (this.iframe && this.loadingOverlay) {
                this.handleIframeLoad();
            }
        }

        // Fullscreen
        if (this.fullscreenBtn) {
            this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
    }

    startGame() {
        if (!this.iframe) return;

        // Hide Play Now Overlay
        if (this.playNowOverlay) {
            this.playNowOverlay.style.opacity = '0';
            setTimeout(() => {
                this.playNowOverlay.style.display = 'none';
            }, 300);
        }

        // Show loading overlay
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove('hidden');
        }

        // Set iframe source if lazy loaded
        if (this.iframe.dataset.src) {
            this.iframe.src = this.iframe.dataset.src;
        }

        this.handleIframeLoad();
    }

    handleIframeLoad() {
        if (!this.iframe || !this.loadingOverlay) return;

        // Show loading state
        this.loadingOverlay.style.display = 'flex';

        this.iframe.addEventListener('load', () => {
            // Hide loading overlay
            this.loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                this.loadingOverlay.style.display = 'none';
            }, 500);
        });

        // Fallback safety timeout (in case load event doesn't fire or takes too long)
        setTimeout(() => {
            if (this.loadingOverlay.style.display !== 'none') {
                this.loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    this.loadingOverlay.style.display = 'none';
                }, 500);
            }
        }, 8000);
    }

    toggleFullscreen() {
        const wrapper = this.gameContainer.querySelector('.game-frame-wrapper');

        if (!document.fullscreenElement) {
            if (wrapper.requestFullscreen) {
                wrapper.requestFullscreen();
            } else if (wrapper.mozRequestFullScreen) {
                wrapper.mozRequestFullScreen();
            } else if (wrapper.webkitRequestFullscreen) {
                wrapper.webkitRequestFullscreen();
            } else if (wrapper.msRequestFullscreen) {
                wrapper.msRequestFullscreen();
            }
            this.gameContainer.classList.add('fullscreen-mode');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            this.gameContainer.classList.remove('fullscreen-mode');
        }
    }
}

// Recently Played Games Feature
class RecentlyPlayed {
    constructor() {
        this.storageKey = 'gamehub_recently_played';
        this.maxItems = 10;
    }

    add(gameData) {
        let recentGames = this.get();

        recentGames = recentGames.filter(game => game.id !== gameData.id);

        recentGames.unshift({
            id: gameData.id,
            title: gameData.title,
            url: gameData.url,
            thumbnail: gameData.thumbnail,
            timestamp: Date.now()
        });

        if (recentGames.length > this.maxItems) {
            recentGames = recentGames.slice(0, this.maxItems);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(recentGames));
    }

    get() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    clear() {
        localStorage.removeItem(this.storageKey);
    }
}

// Mobile Device Detection and Optimization
class MobileGameOptimizer {
    constructor() {
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    }

    detectOrientation() {
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }

    lockOrientation(mode = 'landscape') {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock(mode).catch(() => {
                console.log('Orientation lock not supported');
            });
        }
    }

    unlockOrientation() {
        if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    }



    optimizeIframe(iframe) {
        if (!iframe || !this.isMobile) return;

        iframe.style.touchAction = 'none';
        iframe.setAttribute('scrolling', 'no');

        if (this.isTablet) {
            iframe.style.minHeight = '600px';
        } else {
            iframe.style.minHeight = '400px';
        }
    }
}

// Report Issue Modal
class ReportIssueModal {
    constructor() {
        this.modal = null;
        this.gameId = null;
    }

    show(gameId, gameTitle) {
        this.gameId = gameId;
        this.createModal(gameTitle);
    }

    createModal(gameTitle) {
        const overlay = document.createElement('div');
        overlay.className = 'report-modal-overlay';
        overlay.innerHTML = `
            <div class="report-modal-content">
                <button class="report-modal-close" id="reportCloseBtn">&times;</button>
                <h3>Report Issue</h3>
                <p class="report-game-title">Game: <strong>${gameTitle}</strong></p>

                <form id="reportIssueForm" class="report-form">
                    <div class="form-group">
                        <label>Issue Type *</label>
                        <select name="issue_type" required class="form-control">
                            <option value="">Select issue type</option>
                            <option value="not_loading">Game not loading</option>
                            <option value="broken">Game is broken/glitchy</option>
                            <option value="black_screen">Black screen</option>
                            <option value="wrong_game">Wrong game displayed</option>
                            <option value="inappropriate">Inappropriate content</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="4" class="form-control" placeholder="Please describe the issue..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Your Email (optional)</label>
                        <input type="email" name="email" class="form-control" placeholder="your@email.com">
                    </div>

                    <div class="report-buttons">
                        <button type="button" class="btn btn-secondary" id="reportCancelBtn">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Report</button>
                    </div>
                </form>

                <div id="reportMessage" class="report-message" style="display: none;"></div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.modal = overlay;

        setTimeout(() => overlay.classList.add('active'), 10);

        this.attachEventListeners();
    }

    attachEventListeners() {
        const form = document.getElementById('reportIssueForm');
        const closeBtn = document.getElementById('reportCloseBtn');
        const cancelBtn = document.getElementById('reportCancelBtn');

        form.addEventListener('submit', (e) => this.handleSubmit(e));
        closeBtn.addEventListener('click', () => this.close());
        cancelBtn.addEventListener('click', () => this.close());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const messageEl = document.getElementById('reportMessage');

        formData.append('action', 'report_game_issue');
        formData.append('game_id', this.gameId);
        formData.append('nonce', gamehubData.nonce);

        try {
            const response = await fetch(gamehubData.ajaxUrl, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            messageEl.style.display = 'block';
            messageEl.className = 'report-message ' + (data.success ? 'success' : 'error');
            messageEl.textContent = data.data.message;

            if (data.success) {
                form.reset();
                setTimeout(() => this.close(), 3000);
            }
        } catch (error) {
            messageEl.style.display = 'block';
            messageEl.className = 'report-message error';
            messageEl.textContent = 'Failed to submit report. Please try again.';
        }
    }

    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            setTimeout(() => this.modal.remove(), 300);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    const recentlyPlayed = new RecentlyPlayed();
    const mobileOptimizer = new MobileGameOptimizer();
    const reportModal = new ReportIssueModal();
    const gameLoader = new GameLoader();

    // Track recently played games
    const gameContainer = document.getElementById('gameContainer');
    if (gameContainer) {
        // Get game title from h1 on page or meta tag
        let gameTitle = document.querySelector('.game-header h1')?.textContent ||
            document.querySelector('h1.game-title')?.textContent ||
            document.querySelector('meta[property="og:title"]')?.content ||
            document.title.split(' - ')[0] ||
            document.title;

        // Get thumbnail from meta tag or featured image
        let gameThumbnail = document.querySelector('meta[property="og:image"]')?.content || '';

        // If no thumbnail, try to get from game card image
        if (!gameThumbnail) {
            const featuredImg = document.querySelector('.game-featured-image img') ||
                document.querySelector('.game-thumbnail img');
            gameThumbnail = featuredImg?.src || '';
        }

        const gameData = {
            id: gameContainer.dataset.postId,
            title: gameTitle.trim(),
            url: window.location.href,
            thumbnail: gameThumbnail
        };

        recentlyPlayed.add(gameData);
    }

    // Optimize game iframe for mobile
    const gameIframe = document.getElementById('gameIframe');
    if (gameIframe && mobileOptimizer.isMobile) {
        mobileOptimizer.optimizeIframe(gameIframe);


    }

    // Report Issue button
    const reportBtn = document.getElementById('reportIssueBtn');
    if (reportBtn) {
        reportBtn.addEventListener('click', function () {
            const gameId = gameContainer?.dataset.postId;
            const gameTitle = document.title.split(' - ')[0];
            if (gameId) {
                reportModal.show(gameId, gameTitle);
            }
        });
    }

    // Populate Recently Played Widget
    const recentlyPlayedWidget = document.getElementById('recentlyPlayedWidget');
    if (recentlyPlayedWidget) {
        const limit = parseInt(recentlyPlayedWidget.dataset.limit) || 5;
        const recentGames = recentlyPlayed.get().slice(0, limit);

        if (recentGames.length > 0) {
            let html = '';
            recentGames.forEach(game => {
                html += `
                    <a href="${game.url}" class="widget-game-item">
                        <img src="${game.thumbnail}" alt="${game.title}" class="widget-game-thumbnail" loading="lazy">
                        <div class="widget-game-info">
                            <div class="widget-game-title">${game.title}</div>
                            <div class="widget-game-meta">
                                <span class="widget-game-time">${formatTimeAgo(game.timestamp)}</span>
                            </div>
                        </div>
                    </a>
                `;
            });
            recentlyPlayedWidget.innerHTML = html;
        }
    }

    function formatTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
        return Math.floor(seconds / 604800) + 'w ago';
    }

    // Description Expand/Collapse - Support multiple instances
    const discoverMoreBtns = document.querySelectorAll('[id^="discoverMoreBtn-"]');
    discoverMoreBtns.forEach(function (btn) {
        const container = btn.previousElementSibling;
        if (!container || !container.classList.contains('description-expandable')) return;

        const descriptionPreview = container.querySelector('.description-preview');
        const descriptionRemaining = container.querySelector('.description-remaining');
        const btnTextMore = btn.querySelector('.btn-text-more');
        const btnTextLess = btn.querySelector('.btn-text-less');

        btn.addEventListener('click', function () {
            const isExpanded = btn.classList.contains('expanded');

            if (isExpanded) {
                // Collapse
                descriptionRemaining.style.display = 'none';
                btnTextMore.style.display = '';
                btnTextLess.style.display = 'none';
                btn.classList.remove('expanded');

                // Scroll back to description
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Expand
                descriptionRemaining.style.display = '';
                btnTextMore.style.display = 'none';
                btnTextLess.style.display = '';
                btn.classList.add('expanded');
            }
        });
    });

    // Export API for other scripts
    window.GameHub = {
        recentlyPlayed,
        mobileOptimizer,
        reportModal
    };
});


