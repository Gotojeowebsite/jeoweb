/**
 * Jeoweb Analytics Helper
 * Provides a centralized way to track custom events in Google Analytics.
 */

window.JeoAnalytics = (function() {
    const GA_ID = 'G-DQM8XXB9GC';

    /**
     * Internal helper to send events to gtag
     */
    function sendEvent(name, params = {}) {
        if (typeof window.gtag === 'function') {
            try {
                window.gtag('event', name, params);
            } catch (e) {
                console.warn('Analytics error:', e);
            }
        }
    }

    return {
        trackGameStart: function(gameName, gameType) {
            sendEvent('game_start', {
                game_name: gameName,
                game_type: gameType || 'unknown',
                method: 'play_button'
            });
        },

        trackGamePlayTime: function(gameName, seconds) {
            sendEvent('game_play_time', {
                game_name: gameName,
                value: Math.floor(seconds),
                seconds: Math.floor(seconds)
            });
        },

        trackSearch: function(term) {
            if (!term || term.length < 2) return;
            sendEvent('search', {
                search_term: term
            });
        },

        trackThemeToggle: function(newTheme) {
            sendEvent('theme_toggle', {
                theme: newTheme
            });
        },

        trackCloakerChange: function(presetName) {
            sendEvent('cloaker_change', {
                preset: presetName || 'custom'
            });
        },

        trackCustomization: function(type, value) {
            sendEvent('customization_change', {
                type: type, // 'accent', 'bg_color', 'bg_image'
                value: value
            });
        },

        trackFavorite: function(gameName, isAdded) {
            sendEvent(isAdded ? 'favorite_add' : 'favorite_remove', {
                game_name: gameName
            });
        },

        trackRating: function(gameName, stars) {
            sendEvent('game_rate', {
                game_name: gameName,
                value: stars,
                rating: stars
            });
        },

        trackError: function(message, source) {
            sendEvent('app_error', {
                error_msg: message,
                error_source: source || 'window'
            });
        },

        trackExternalLink: function(url, label) {
            sendEvent('external_link_click', {
                url: url,
                link_label: label
            });
        },

        setUserInfo: function(name) {
            if (typeof window.gtag === 'function') {
                window.gtag('set', 'user_properties', {
                    'user_name': name,
                    'signed_in': 'true'
                });
            }
        }
    };
})();

// Automatic Account Tracking
function initAccountTracking() {
    if (window.JeoAccount) {
        const updateUserInfo = () => {
            if (typeof window.JeoAccount.isSignedIn === 'function' && window.JeoAccount.isSignedIn()) {
                const state = window.JeoAccount.getState();
                if (state && state.profile && state.profile.name) {
                    window.JeoAnalytics.setUserInfo(state.profile.name);
                }
            }
        };
        if (typeof window.JeoAccount.onChange === 'function') {
            window.JeoAccount.onChange(updateUserInfo);
        }
        updateUserInfo();
    } else {
        // If not loaded yet, wait for DOMContentLoaded or retry
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAccountTracking);
        } else {
            setTimeout(initAccountTracking, 2000);
        }
    }
}
initAccountTracking();

// Automatic Rating Tracking
function initRatingTracking() {
    if (window.JeoRatings && typeof window.JeoRatings.onChange === 'function') {
        window.JeoRatings.onChange((slug, stars) => {
            if (stars > 0) {
                window.JeoAnalytics.trackRating(slug, stars);
            }
        });
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initRatingTracking);
        } else {
            setTimeout(initRatingTracking, 2000);
        }
    }
}
initRatingTracking();

// Automatic Link Tracking
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href) {
        const url = new URL(link.href, window.location.origin);
        if (url.origin !== window.location.origin || link.target === '_blank') {
            window.JeoAnalytics.trackExternalLink(link.href, link.textContent.trim());
        }
    }
});
