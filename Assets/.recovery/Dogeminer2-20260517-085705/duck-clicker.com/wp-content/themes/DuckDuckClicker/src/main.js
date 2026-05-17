// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {
    // ========================================
    // Enhanced Fullscreen Manager - iOS Fixed
    // ========================================
    const FullscreenManager = {
        state: {
            gameLoaded: false,
            isStable: false,
            isManualFullscreen: false,
            fullscreenLoading: false,
            scrollY: 0,
            originalViewport: null,
            currentFullscreen: null,
            originalIframeSrc: null
        },

        refs: {
            fullscreenBtn: null,
            gameContainer: null,
            gameIframe: null,
            loadingOverlay: null,
            stabilityTimeout: null,
            fullscreenTimeout: null,
            closeButton: null
        },

        init() {
            this.refs.fullscreenBtn = document.getElementById('fullscreenBtn');
            this.refs.gameContainer = document.getElementById('gameContainer');
            this.refs.gameIframe = document.getElementById('gameIframe');
            this.refs.loadingOverlay = document.getElementById('loadingOverlay');

            // Exit if required elements not found, but continue without iframe check
            // (iframe might be loaded later via Play Now overlay)
            if (!this.refs.fullscreenBtn || !this.refs.gameContainer) {
                console.log('Fullscreen: Required elements not found');
                return;
            }

            // Enhanced iOS/Apple detection
            this.isIOS = this.detectIOS();
            this.isSafari = this.detectSafari();

            console.log('FullscreenManager initialized');
            console.log('Device is iOS:', this.isIOS);
            console.log('Browser is Safari:', this.isSafari);

            // Handle case where iframe uses data-src (Play Now overlay)
            if (this.refs.gameIframe) {
                // Store original iframe src (could be data-src or src)
                this.state.originalIframeSrc = this.refs.gameIframe.src || this.refs.gameIframe.dataset.src;

                // If iframe already has src, it will trigger load event
                // If it has data-src, mark as not loaded until Play Now is clicked
                if (this.refs.gameIframe.src && this.refs.gameIframe.src !== '' && this.refs.gameIframe.src !== 'about:blank') {
                    // Setup iframe load events
                    this.refs.gameIframe.addEventListener('load', () => this.handleIframeLoad());
                    this.refs.gameIframe.addEventListener('error', () => this.handleIframeError());
                } else {
                    // Iframe has data-src, will be loaded by Play Now overlay
                    // Set up a MutationObserver to detect when src is set
                    const observer = new MutationObserver((mutations) => {
                        mutations.forEach((mutation) => {
                            if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                                const newSrc = this.refs.gameIframe.src;
                                if (newSrc && newSrc !== '' && newSrc !== 'about:blank') {
                                    console.log('Iframe src changed, setting up load events');
                                    this.refs.gameIframe.addEventListener('load', () => this.handleIframeLoad());
                                    this.refs.gameIframe.addEventListener('error', () => this.handleIframeError());
                                    observer.disconnect();
                                }
                            }
                        });
                    });
                    observer.observe(this.refs.gameIframe, { attributes: true });

                    // For iOS, allow fullscreen even before game loads (game will load in fullscreen)
                    if (this.isIOS || this.isSafari) {
                        this.state.gameLoaded = true;
                        this.state.isStable = true;
                    }
                }
            } else {
                // No iframe at all (HTML content game)
                this.state.gameLoaded = true;
                this.state.isStable = true;
            }

            // Setup fullscreen button
            this.refs.fullscreenBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFullscreen();
            });

            // Setup fullscreen change events
            ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(event => {
                document.addEventListener(event, () => this.updateButtonState());
            });

            // Escape key handler
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.state.isManualFullscreen) {
                    this.exitManualFullscreen();
                }
            });

            // Prevent iOS scroll bounce in fullscreen (but allow close button interaction)
            // Prevent iOS scroll bounce in fullscreen (but allow close button interaction)
            // REMOVED: This was causing issues with game interaction. Body scroll lock is sufficient.
            /*
            document.addEventListener('touchmove', (e) => {
                if (this.state.isManualFullscreen) {
                    // Allow touch on close button
                    if (e.target.closest('.ios-fullscreen-close')) {
                        return;
                    }
                    // Allow touch on iframe (for game interaction)
                    if (e.target.tagName === 'IFRAME' || e.target.closest('iframe')) {
                        return;
                    }
                    e.preventDefault();
                }
            }, { passive: false });
            */

            // Handle orientation change
            window.addEventListener('orientationchange', () => {
                if (this.state.isManualFullscreen) {
                    this.handleOrientationChange();
                }
            });

            // Create close button
            this.createCloseButton();

            // Initial button state update
            this.updateButtonState();
        },

        detectMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },

        detectIOS() {
            const userAgent = window.navigator.userAgent.toLowerCase();
            const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
            const isMacLike = /mac/.test(userAgent);
            const isTouchable = navigator.maxTouchPoints && navigator.maxTouchPoints > 2;

            return isIOSDevice || (isMacLike && isTouchable);
        },

        detectSafari() {
            const ua = window.navigator.userAgent;
            const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
            const webkit = !!ua.match(/WebKit/i);
            const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

            return iOSSafari || (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1);
        },

        handleIframeLoad() {
            console.log('Game iframe loaded');
            this.state.gameLoaded = true;

            // Don't hide loading immediately if entering fullscreen
            if (!this.state.fullscreenLoading) {
                setTimeout(() => {
                    if (this.refs.loadingOverlay) {
                        this.refs.loadingOverlay.classList.add('hidden');
                    }
                }, 500);
            }

            if (this.refs.stabilityTimeout) clearTimeout(this.refs.stabilityTimeout);

            this.refs.stabilityTimeout = setTimeout(() => {
                this.state.isStable = true;
                console.log('Game is now stable');
                if (this.refs.fullscreenBtn) {
                    this.refs.fullscreenBtn.classList.remove('disabled');
                    this.refs.fullscreenBtn.removeAttribute('disabled');
                }
            }, 1500);
        },

        handleIframeError() {
            console.log('Game iframe error');
            this.state.gameLoaded = false;
            this.state.isStable = false;
            this.state.fullscreenLoading = false;

            if (this.refs.loadingOverlay) {
                this.refs.loadingOverlay.classList.add('hidden');
            }
        },

        isNativeFullscreenAvailable() {
            return !!(
                document.fullscreenEnabled ||
                document.webkitFullscreenEnabled ||
                document.mozFullScreenEnabled ||
                document.msFullscreenEnabled
            );
        },

        isNativeFullscreenActive() {
            return !!(
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            );
        },

        toggleFullscreen() {
            const isCurrentlyFullscreen = this.isNativeFullscreenActive() || this.state.isManualFullscreen;

            if (!isCurrentlyFullscreen) {
                this.enterFullscreen();
            } else {
                this.exitFullscreen();
            }
        },

        enterFullscreen(force = false) {
            console.log('enterFullscreen called', { force });
            console.log('gameLoaded:', this.state.gameLoaded);
            console.log('isStable:', this.state.isStable);
            console.log('isIOS:', this.isIOS);
            console.log('isSafari:', this.isSafari);

            // For iOS/Safari, be more lenient with loading check
            if (this.isIOS || this.isSafari || force) {
                // On iOS, allow fullscreen even if game isn't fully stable
                // The game will continue loading in fullscreen mode
                console.log('iOS/Safari or Force detected, entering fullscreen');

                if (this.isNativeFullscreenAvailable() && !this.isIOS) {
                    this.enterNativeFullscreen();
                } else {
                    this.enterIOSFullscreen();
                }
                return;
            }

            // For other browsers, check if game is ready
            if (!this.state.gameLoaded || !this.state.isStable) {
                console.log('Game not ready for fullscreen (non-iOS)');
                return;
            }

            if (this.isNativeFullscreenAvailable()) {
                this.enterNativeFullscreen();
            } else {
                // Fallback to CSS fullscreen
                this.enterIOSFullscreen();
            }
        },

        async enterNativeFullscreen() {
            console.log('Attempting native fullscreen');
            this.state.fullscreenLoading = true;

            try {
                const container = this.refs.gameContainer;

                if (container.requestFullscreen) {
                    await container.requestFullscreen();
                } else if (container.webkitRequestFullscreen) {
                    await container.webkitRequestFullscreen();
                } else if (container.mozRequestFullScreen) {
                    await container.mozRequestFullScreen();
                } else if (container.msRequestFullscreen) {
                    await container.msRequestFullscreen();
                } else {
                    throw new Error('No fullscreen method available');
                }

                this.state.currentFullscreen = 'native';
                this.state.fullscreenLoading = false;
                this.updateButtonState();
            } catch (e) {
                console.log('Native fullscreen failed:', e.message);
                this.enterIOSFullscreen();
            }
        },

        enterIOSFullscreen() {
            console.log('Entering iOS fullscreen mode');

            // Prevent duplicate fullscreen
            if (this.state.isManualFullscreen) {
                console.log('Already in fullscreen');
                return;
            }

            this.state.isManualFullscreen = true;
            this.state.fullscreenLoading = true;
            this.state.scrollY = window.scrollY;
            this.state.currentFullscreen = 'manual';

            // Save and update viewport
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta) {
                this.state.originalViewport = viewportMeta.getAttribute('content');
                // iOS-optimized viewport
                viewportMeta.setAttribute('content',
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
                );
            }

            // Apply fullscreen classes
            document.documentElement.classList.add('ios-fullscreen-active');
            document.body.classList.add('ios-fullscreen-active');
            this.refs.gameContainer.classList.add('ios-fullscreen');

            // Lock body scroll
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
            document.body.style.top = `-${this.state.scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.bottom = '0';

            // Ensure game container is on top with inline styles (backup for CSS)
            this.refs.gameContainer.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 2147483647 !important;
                background: #000 !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
                border-radius: 0 !important;
            `;

            // Also apply to game-frame-wrapper
            const frameWrapper = this.refs.gameContainer.querySelector('.game-frame-wrapper');
            if (frameWrapper) {
                frameWrapper.style.cssText = `
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    background: #000 !important;
                `;
            }

            // Apply to iframe
            if (this.refs.gameIframe) {
                this.refs.gameIframe.style.cssText = `
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    border: none !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    pointer-events: auto !important; /* Ensure iframe receives events */
                    -webkit-overflow-scrolling: touch !important;
                `;
            }

            // Hide game actions/controls
            const gameActions = this.refs.gameContainer.querySelector('.game-actions');
            if (gameActions) {
                gameActions.style.display = 'none';
            }

            // Show close button
            if (this.refs.closeButton) {
                this.refs.closeButton.style.display = 'flex';
            }

            // Try to lock orientation to landscape
            this.lockOrientation('landscape');

            // Scroll to hide address bar on iOS
            setTimeout(() => {
                window.scrollTo(0, 0);

                // Request animation frame for smooth transition
                requestAnimationFrame(() => {
                    if (this.refs.loadingOverlay) {
                        this.refs.loadingOverlay.classList.remove('hidden');
                    }
                });
            }, 50);

            // Hide loading and update button after iframe is ready
            setTimeout(() => {
                this.state.fullscreenLoading = false;
                if (this.refs.loadingOverlay) {
                    this.refs.loadingOverlay.classList.add('hidden');
                }
                this.updateButtonState();
            }, 1000);

            // Focus iframe for better interaction
            setTimeout(() => {
                if (this.refs.gameIframe) {
                    this.refs.gameIframe.focus();
                }
            }, 100);
        },

        exitFullscreen() {
            if (this.state.isManualFullscreen) {
                this.exitManualFullscreen();
            } else if (this.isNativeFullscreenActive()) {
                this.exitNativeFullscreen();
            }
        },

        exitManualFullscreen() {
            console.log('Exiting iOS fullscreen');

            if (!this.state.isManualFullscreen) {
                return;
            }

            this.state.isManualFullscreen = false;
            this.state.fullscreenLoading = false;
            this.state.currentFullscreen = null;

            const scrollY = this.state.scrollY;

            // Remove fullscreen classes
            document.documentElement.classList.remove('ios-fullscreen-active');
            document.body.classList.remove('ios-fullscreen-active');
            this.refs.gameContainer.classList.remove('ios-fullscreen');

            // Restore viewport
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta && this.state.originalViewport) {
                viewportMeta.setAttribute('content', this.state.originalViewport);
            }

            // Restore body styles
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.bottom = '';

            // Restore game container styles (clear all inline styles)
            this.refs.gameContainer.style.cssText = '';

            // Restore game-frame-wrapper styles
            const frameWrapper = this.refs.gameContainer.querySelector('.game-frame-wrapper');
            if (frameWrapper) {
                frameWrapper.style.cssText = '';
            }

            // Restore iframe styles
            if (this.refs.gameIframe) {
                this.refs.gameIframe.style.cssText = '';
            }

            // Show game actions/controls again
            const gameActions = this.refs.gameContainer.querySelector('.game-actions');
            if (gameActions) {
                gameActions.style.display = '';
            }

            // Hide close button and reset its state
            if (this.refs.closeButton) {
                this.refs.closeButton.style.display = 'none';
                this.refs.closeButton.style.background = 'rgba(0, 0, 0, 0.9)';
                this.refs.closeButton.style.transform = 'scale(1)';
            }

            // Unlock orientation
            this.unlockOrientation();

            // Restore scroll position
            window.scrollTo(0, scrollY);

            // Hide loading overlay
            if (this.refs.loadingOverlay) {
                this.refs.loadingOverlay.classList.add('hidden');
            }

            this.updateButtonState();
        },

        async exitNativeFullscreen() {
            try {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                }
            } catch (e) {
                console.log('Exit fullscreen error:', e);
            }

            this.state.fullscreenLoading = false;
            this.state.currentFullscreen = null;
            this.updateButtonState();
        },

        lockOrientation(orientation) {
            try {
                const screen = window.screen;

                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock(orientation).catch(() => {
                        console.log('Orientation lock not supported');
                    });
                } else if (screen.lockOrientation) {
                    screen.lockOrientation(orientation);
                } else if (screen.mozLockOrientation) {
                    screen.mozLockOrientation(orientation);
                } else if (screen.msLockOrientation) {
                    screen.msLockOrientation(orientation);
                }
            } catch (e) {
                console.log('Orientation lock failed:', e);
            }
        },

        unlockOrientation() {
            try {
                const screen = window.screen;

                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                } else if (screen.unlockOrientation) {
                    screen.unlockOrientation();
                } else if (screen.mozUnlockOrientation) {
                    screen.mozUnlockOrientation();
                } else if (screen.msUnlockOrientation) {
                    screen.msUnlockOrientation();
                }
            } catch (e) {
                console.log('Orientation unlock failed:', e);
            }
        },

        handleOrientationChange() {
            if (!this.state.isManualFullscreen) return;

            // Re-apply dimensions after orientation change
            setTimeout(() => {
                this.refs.gameContainer.style.width = '100vw';
                this.refs.gameContainer.style.height = '100vh';
                window.scrollTo(0, 0);
            }, 100);
        },

        createCloseButton() {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'ios-fullscreen-close';
            closeBtn.id = 'ios-fullscreen-close-btn';
            closeBtn.setAttribute('aria-label', 'Exit Fullscreen');
            closeBtn.setAttribute('type', 'button');

            // Apply critical inline styles directly for iOS
            closeBtn.style.cssText = `
                display: none;
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                width: 54px !important;
                height: 54px !important;
                background: rgba(0, 0, 0, 0.9) !important;
                border: 3px solid rgba(255, 255, 255, 0.5) !important;
                border-radius: 50% !important;
                color: white !important;
                cursor: pointer !important;
                z-index: 2147483647 !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 0 !important;
                margin: 0 !important;
                -webkit-tap-highlight-color: transparent !important;
                touch-action: manipulation !important;
                -webkit-user-select: none !important;
                user-select: none !important;
                pointer-events: auto !important;
            `;

            closeBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width: 28px; height: 28px; pointer-events: none;">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;

            // Bind this for event handlers
            const self = this;

            // Simple click handler
            closeBtn.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                self.exitManualFullscreen();
                return false;
            };

            // Touch event handler for iOS - using ontouchend property
            closeBtn.ontouchend = function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button touchend');
                self.exitManualFullscreen();
                return false;
            };

            closeBtn.ontouchstart = function (e) {
                e.stopPropagation();
                // Visual feedback
                closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
                closeBtn.style.transform = 'scale(0.95)';
            };

            closeBtn.ontouchmove = function (e) {
                e.stopPropagation();
            };

            closeBtn.ontouchcancel = function (e) {
                // Reset visual feedback
                closeBtn.style.background = 'rgba(0, 0, 0, 0.9)';
                closeBtn.style.transform = 'scale(1)';
            };

            // Append to body instead of gameContainer for better z-index handling
            document.body.appendChild(closeBtn);
            this.refs.closeButton = closeBtn;

            // Re-attach events to ensure they work
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked (EventListener)');
                self.exitManualFullscreen();
            });

            closeBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button touchend (EventListener)');
                self.exitManualFullscreen();
            });
        },

        updateButtonState() {
            if (!this.refs.fullscreenBtn) return;

            const isFullscreen = this.isNativeFullscreenActive() || this.state.isManualFullscreen;
            const enterIcon = this.refs.fullscreenBtn.querySelector('.fullscreen-enter-icon');
            const exitIcon = this.refs.fullscreenBtn.querySelector('.fullscreen-exit-icon');

            if (enterIcon && exitIcon) {
                if (isFullscreen) {
                    enterIcon.classList.add('hidden');
                    exitIcon.classList.remove('hidden');
                    this.refs.fullscreenBtn.setAttribute('title', 'Exit Fullscreen');
                } else {
                    enterIcon.classList.remove('hidden');
                    exitIcon.classList.add('hidden');
                    this.refs.fullscreenBtn.setAttribute('title', 'Enter Fullscreen');
                }
            }
        }
    };

    // Initialize Fullscreen Manager
    FullscreenManager.init();

    // ========================================
    // Random Game Button functionality
    // ========================================
    const randomBtn = document.getElementById('headerRandomBtn');
    if (randomBtn && typeof gamehubData !== 'undefined') {
        randomBtn.addEventListener('click', function () {
            randomBtn.classList.add('loading');
            fetch(gamehubData.ajaxUrl + '?action=get_random_game&nonce=' + gamehubData.nonce)
                .then(response => response.json())
                .then(data => {
                    randomBtn.classList.remove('loading');
                    if (data.success && data.data.url) {
                        window.location.href = data.data.url;
                    } else {
                        alert(data.data && data.data.message ? data.data.message : 'No game found');
                    }
                })
                .catch(() => {
                    randomBtn.classList.remove('loading');
                    alert('Failed to get random game.');
                });
        });
    }

    // ========================================
    // Header scroll effect
    // ========================================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // Autocomplete search
    // ========================================
    const searchInput = document.getElementById('searchInput');
    const searchAutocomplete = document.getElementById('searchAutocomplete');
    let searchTimeout;
    let selectedIndex = -1;

    if (searchInput && searchAutocomplete) {
        searchInput.addEventListener('input', function () {
            const query = this.value.trim();

            clearTimeout(searchTimeout);

            if (query.length < 2) {
                searchAutocomplete.classList.remove('active');
                return;
            }

            searchAutocomplete.innerHTML = '<div class="search-autocomplete-loading">Searching...</div>';
            searchAutocomplete.classList.add('active');

            searchTimeout = setTimeout(function () {
                fetch(gamehubData.ajaxUrl + '?action=search_games&q=' + encodeURIComponent(query) + '&nonce=' + gamehubData.nonce)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success && data.data.games) {
                            renderSearchResults(data.data.games);
                        }
                    })
                    .catch(error => {
                        console.error('Search error:', error);
                        searchAutocomplete.classList.remove('active');
                    });
            }, 300);
        });

        searchInput.addEventListener('keydown', function (e) {
            const items = searchAutocomplete.querySelectorAll('.search-autocomplete-item');

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                updateSelectedItem(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                updateSelectedItem(items);
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                items[selectedIndex].click();
            } else if (e.key === 'Escape') {
                searchAutocomplete.classList.remove('active');
                selectedIndex = -1;
            }
        });

        document.addEventListener('click', function (event) {
            if (!searchInput.contains(event.target) && !searchAutocomplete.contains(event.target)) {
                searchAutocomplete.classList.remove('active');
                selectedIndex = -1;
            }
        });

        function renderSearchResults(games) {
            if (games.length === 0) {
                searchAutocomplete.innerHTML = `
                    <div class="search-autocomplete-empty">
                        <div class="search-autocomplete-empty-icon">🎮</div>
                        <div>No games found</div>
                    </div>
                `;
                return;
            }

            let html = '';
            games.forEach(game => {
                html += `
                    <a href="${game.url}" class="search-autocomplete-item">
                        <img src="${game.thumbnail}" alt="${game.title}" class="search-autocomplete-thumb" loading="lazy">
                        <div class="search-autocomplete-info">
                            <h4 class="search-autocomplete-title">${game.title}</h4>
                            <div class="search-autocomplete-meta">
                                ${game.category ? `<span class="search-autocomplete-category">${game.category}</span>` : ''}
                                <span>${game.plays} plays</span>
                            </div>
                        </div>
                    </a>
                `;
            });

            searchAutocomplete.innerHTML = html;
            selectedIndex = -1;
        }

        function updateSelectedItem(items) {
            items.forEach((item, index) => {
                item.classList.toggle('selected', index === selectedIndex);
            });

            if (selectedIndex >= 0 && items[selectedIndex]) {
                items[selectedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }

    // ========================================
    // Mobile menu toggle
    // ========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            if (!mobileMenu.contains(event.target) &&
                !mobileMenuToggle.contains(event.target) &&
                mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // ========================================
    // Categories dropdown
    // ========================================
    const categoriesDropdown = document.getElementById('categoriesDropdown');
    const categoriesMenu = document.getElementById('categoriesMenu');

    if (categoriesDropdown && categoriesMenu) {
        categoriesDropdown.addEventListener('click', function (e) {
            e.preventDefault();
            categoriesMenu.classList.toggle('active');
            categoriesDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            if (!categoriesDropdown.contains(event.target) &&
                !categoriesMenu.contains(event.target) &&
                categoriesMenu.classList.contains('active')) {
                categoriesMenu.classList.remove('active');
                categoriesDropdown.classList.remove('active');
            }
        });
    }

    // ========================================
    // Game iframe loading
    // ========================================
    const gameIframe = document.getElementById('gameIframe');
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (gameIframe && loadingOverlay) {
        const animationStyle = loadingOverlay.dataset.animation || 'spinner';
        const loadingSpinner = loadingOverlay.querySelector('.loading-spinner');

        if (loadingSpinner) {
            loadingSpinner.classList.add('animation-' + animationStyle);
        }

        const loadingTip = loadingOverlay.querySelector('.loading-tip');
        if (loadingTip && window.gameHubLoadingTips && window.gameHubLoadingTips.length > 0) {
            const randomTip = window.gameHubLoadingTips[Math.floor(Math.random() * window.gameHubLoadingTips.length)];
            loadingTip.textContent = randomTip;
        }
    }

    // ========================================
    // Reload game functionality
    // ========================================
    const reloadBtn = document.getElementById('reloadBtn');

    if (reloadBtn && gameIframe) {
        reloadBtn.addEventListener('click', function () {
            if (loadingOverlay) {
                loadingOverlay.classList.remove('hidden');
            }

            const src = gameIframe.src;
            gameIframe.src = '';
            setTimeout(function () {
                gameIframe.src = src;
            }, 100);
        });
    }

    // ========================================
    // Share game functionality
    // ========================================
    const shareBtn = document.getElementById('shareBtn');

    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            const gameTitle = document.querySelector('.game-header h1')?.textContent || 'Check out this game!';
            const gameUrl = window.location.href;

            if (navigator.share) {
                navigator.share({
                    title: gameTitle,
                    text: 'Play ' + gameTitle,
                    url: gameUrl
                }).catch(function (error) {
                    console.log('Error sharing:', error);
                });
            } else {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(gameUrl).then(function () {
                        const originalText = shareBtn.querySelector('span').textContent;
                        shareBtn.querySelector('span').textContent = 'Link Copied!';
                        shareBtn.classList.add('success');

                        setTimeout(function () {
                            shareBtn.querySelector('span').textContent = originalText;
                            shareBtn.classList.remove('success');
                        }, 2000);
                    }).catch(function (error) {
                        console.log('Error copying:', error);
                        alert('Share URL: ' + gameUrl);
                    });
                } else {
                    prompt('Copy this link to share:', gameUrl);
                }
            }
        });
    }

    // ========================================
    // QR Code functionality
    // ========================================
    const qrcodeBtn = document.getElementById('qrcodeBtn');

    if (qrcodeBtn) {
        qrcodeBtn.addEventListener('click', function () {
            const gameUrl = window.location.href;
            const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(gameUrl)}`;

            const modal = document.createElement('div');
            modal.className = 'qr-modal-overlay';

            const content = document.createElement('div');
            content.className = 'qr-modal-content';

            const iconContainer = document.createElement('div');
            iconContainer.className = 'qr-modal-icon-container';
            iconContainer.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                </svg>
            `;

            const title = document.createElement('h3');
            title.className = 'qr-modal-title';
            title.textContent = 'Scan to Play on Mobile';

            const subtitle = document.createElement('p');
            subtitle.className = 'qr-modal-subtitle';
            subtitle.innerHTML = 'Point your phone camera at the QR code<br>to open this game instantly';

            const qrContainer = document.createElement('div');
            qrContainer.className = 'qr-modal-qr-container';

            const qrImg = document.createElement('img');
            qrImg.src = qrApiUrl;
            qrImg.alt = 'QR Code';

            qrContainer.appendChild(qrImg);

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'qr-modal-buttons';

            const copyBtn = document.createElement('button');
            copyBtn.className = 'qr-modal-copy-btn';
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy Link
            `;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'qr-modal-close-btn';
            closeBtn.textContent = 'Close';

            copyBtn.addEventListener('click', function () {
                navigator.clipboard.writeText(gameUrl).then(function () {
                    copyBtn.classList.add('copied');
                    copyBtn.innerHTML = `
                        <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Copied!
                    `;
                    setTimeout(function () {
                        copyBtn.classList.remove('copied');
                        copyBtn.innerHTML = `
                            <svg viewBox="0 0 24 24">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy Link
                        `;
                    }, 2000);
                });
            });

            buttonContainer.appendChild(copyBtn);
            buttonContainer.appendChild(closeBtn);

            content.appendChild(iconContainer);
            content.appendChild(title);
            content.appendChild(subtitle);
            content.appendChild(qrContainer);
            content.appendChild(buttonContainer);

            modal.appendChild(content);
            document.body.appendChild(modal);

            requestAnimationFrame(function () {
                modal.classList.add('active');
            });

            function closeModal() {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }

            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', function (e) {
                if (e.target === modal) closeModal();
            });

            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    }

    // ========================================
    // Play Now Overlay functionality
    // ========================================
    const playNowOverlay = document.getElementById('playNowOverlay');
    if (playNowOverlay) {
        // Main play button click
        const playNowBtn = playNowOverlay.querySelector('.play-now-btn');
        if (playNowBtn) {
            playNowBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                startGame();
            });
        }

        // Expand arrow click
        const expandArrow = playNowOverlay.querySelector('.play-now-expand');
        if (expandArrow) {
            expandArrow.addEventListener('click', function (e) {
                e.stopPropagation();
                startGame();
            });
        }

        // Action buttons (prevent starting game)
        const actionBtns = playNowOverlay.querySelectorAll('.play-now-action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();

                // Like button
                if (btn.classList.contains('play-now-like')) {
                    btn.classList.toggle('active');
                    if (btn.classList.contains('active')) {
                        btn.style.background = 'rgba(99, 102, 241, 0.3)';
                        btn.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                    } else {
                        btn.style.background = '';
                        btn.style.borderColor = '';
                    }
                }

                // Dislike button
                if (btn.classList.contains('play-now-dislike')) {
                    btn.classList.toggle('active');
                }

                // Favorite button
                if (btn.classList.contains('play-now-favorite')) {
                    btn.classList.toggle('active');
                    const svg = btn.querySelector('svg');
                    if (btn.classList.contains('active')) {
                        svg.style.fill = '#ef4444';
                        svg.style.stroke = '#ef4444';
                    } else {
                        svg.style.fill = '';
                        svg.style.stroke = '';
                    }
                }

                // Share button
                if (btn.classList.contains('play-now-share')) {
                    if (navigator.share) {
                        navigator.share({
                            title: document.title,
                            url: window.location.href
                        });
                    } else {
                        // Fallback: copy to clipboard
                        navigator.clipboard.writeText(window.location.href);
                        btn.style.background = 'rgba(34, 197, 94, 0.3)';
                        setTimeout(() => {
                            btn.style.background = '';
                        }, 1000);
                    }
                }
            });
        });

        function startGame() {
            const gameIframe = document.getElementById('gameIframe');
            const loadingOverlay = document.getElementById('loadingOverlay');

            if (gameIframe && gameIframe.dataset.src) {
                playNowOverlay.classList.add('hidden');

                // CRITICAL: Remove overlay from flow to prevent blocking interactions
                setTimeout(() => {
                    playNowOverlay.style.display = 'none';
                }, 300);

                if (loadingOverlay) {
                    loadingOverlay.classList.remove('hidden');
                }

                gameIframe.src = gameIframe.dataset.src;

                // Auto-fullscreen on mobile
                if (FullscreenManager.detectMobile()) {
                    console.log('Mobile detected, forcing fullscreen');
                    // Small delay to ensure iframe src is set
                    setTimeout(() => {
                        FullscreenManager.enterFullscreen(true);
                    }, 100);
                }

                setTimeout(() => {
                    playNowOverlay.remove();
                }, 1000); // Increased timeout to be safe
            }
        }
    }

    // ========================================
    // Sort select functionality
    // ========================================
    const sortSelect = document.querySelector('.sort-select');
    const gamesGrid = document.querySelector('.games-grid');

    if (sortSelect && gamesGrid) {
        // Restore saved sort preference
        const savedSort = localStorage.getItem('gamesSort');
        if (savedSort) {
            sortSelect.value = savedSort;
        }

        sortSelect.addEventListener('change', function () {
            const sortBy = this.value;
            const gameCards = Array.from(gamesGrid.querySelectorAll('.game-card'));

            if (gameCards.length === 0) return;

            // Save preference
            localStorage.setItem('gamesSort', sortBy);

            // Add loading state
            gamesGrid.style.opacity = '0.5';
            gamesGrid.style.pointerEvents = 'none';

            // Sort the cards
            gameCards.sort((a, b) => {
                switch (sortBy) {
                    case 'date':
                        // Sort by data-date attribute or order in DOM (newest first)
                        const dateA = a.dataset.date || a.dataset.timestamp || 0;
                        const dateB = b.dataset.date || b.dataset.timestamp || 0;
                        return dateB - dateA;

                    case 'popular':
                        // Sort by play count (most played first)
                        const playsA = parseInt(a.dataset.plays || a.querySelector('.game-plays')?.textContent?.replace(/[^0-9]/g, '') || 0);
                        const playsB = parseInt(b.dataset.plays || b.querySelector('.game-plays')?.textContent?.replace(/[^0-9]/g, '') || 0);
                        return playsB - playsA;

                    case 'rating':
                        // Sort by rating (highest first)
                        const ratingA = parseFloat(a.dataset.rating || 0);
                        const ratingB = parseFloat(b.dataset.rating || 0);
                        return ratingB - ratingA;

                    case 'title':
                        // Sort alphabetically A-Z
                        const titleA = (a.dataset.title || a.querySelector('.game-title, .game-card-title, h3, h4')?.textContent || '').toLowerCase().trim();
                        const titleB = (b.dataset.title || b.querySelector('.game-title, .game-card-title, h3, h4')?.textContent || '').toLowerCase().trim();
                        return titleA.localeCompare(titleB);

                    default:
                        return 0;
                }
            });

            // Re-append sorted cards with animation
            requestAnimationFrame(() => {
                gameCards.forEach((card, index) => {
                    card.style.order = index;
                    gamesGrid.appendChild(card);
                });

                // Remove loading state
                setTimeout(() => {
                    gamesGrid.style.opacity = '1';
                    gamesGrid.style.pointerEvents = '';
                }, 100);
            });
        });

        // Apply initial sort if saved preference exists
        if (savedSort && savedSort !== 'date') {
            sortSelect.dispatchEvent(new Event('change'));
        }
    }

    // ========================================
    // Increment play count via AJAX
    // ========================================
    const gameContainer = document.getElementById('gameContainer');
    if (gameContainer && typeof gamehubData !== 'undefined') {
        const postId = gameContainer.dataset.postId;
        if (postId) {
            setTimeout(function () {
                if (typeof jQuery !== 'undefined') {
                    jQuery.ajax({
                        url: gamehubData.ajaxUrl,
                        type: 'POST',
                        data: {
                            action: 'increment_play_count',
                            post_id: postId,
                            nonce: gamehubData.nonce
                        }
                    });
                }
            }, 2000);
        }
    }

    // ========================================
    // Smooth scroll for anchor links
    // ========================================
    // Scroll to Top Button
    // ========================================
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        let lastScrollY = 0;
        let ticking = false;

        const updateScrollButton = () => {
            const scrollY = window.scrollY;

            if (scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollButton);
                ticking = true;
            }
        });

        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initial check
        updateScrollButton();
    }

    // ========================================
    // Smooth scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // Scroll animations for game cards
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.game-card, .mobile-game-card, .action-game-item, .similar-game-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
        observer.observe(card);
    });
});
