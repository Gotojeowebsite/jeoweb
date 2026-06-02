// shared-page-utils.js
(function(global) {
    global.JeoPageUtils = {
        initTheme: function(themeToggleEl) {
            const saved = localStorage.getItem('site-theme');
            const prefersLight = !saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
            if (saved === 'light' || prefersLight) {
                document.body.classList.add('theme-light');
                document.body.classList.remove('theme-dark');
                if (themeToggleEl) themeToggleEl.textContent = '☀️';
            } else {
                document.body.classList.add('theme-dark');
                document.body.classList.remove('theme-light');
                if (themeToggleEl) themeToggleEl.textContent = '🌙';
            }
        },
        toggleTheme: function(themeToggleEl) {
            if (document.body.classList.contains('theme-light')) {
                document.body.classList.remove('theme-light');
                document.body.classList.add('theme-dark');
                localStorage.setItem('site-theme', 'dark');
                if (themeToggleEl) themeToggleEl.textContent = '🌙';
            } else {
                document.body.classList.remove('theme-dark');
                document.body.classList.add('theme-light');
                localStorage.setItem('site-theme', 'light');
                if (themeToggleEl) themeToggleEl.textContent = '☀️';
            }
        },
        initAccent: function() {
            const accent = localStorage.getItem('jeo-accent');
            if (accent) {
                document.documentElement.style.setProperty('--accent-color', accent);
                const rgb = this.hexToRgb(accent);
                if (rgb) {
                    document.documentElement.style.setProperty('--accent-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
                }
            }
        },
        initBackground: function() {
            const bg = localStorage.getItem('jeo-bg-image');
            const blur = localStorage.getItem('jeo-bg-blur') || '0';
            if (bg) {
                document.body.style.backgroundImage = `url('${bg}')`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundAttachment = 'fixed';
                if (blur !== '0') {
                    const pseudo = document.createElement('style');
                    pseudo.textContent = `body::before { content: ""; position: fixed; inset: -100px; z-index: -1; backdrop-filter: blur(${blur}px); pointer-events: none; }`;
                    document.head.appendChild(pseudo);
                }
            } else {
                document.body.style.backgroundImage = '';
            }
        },
        initCloaker: function() {
            const savedTitle = localStorage.getItem('jeo-cloaker-title');
            const savedIcon = localStorage.getItem('jeo-cloaker-icon');
            if (savedTitle) document.title = savedTitle;
            if (savedIcon) {
                let link = document.querySelector("link[rel~='icon']");
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.getElementsByTagName('head')[0].appendChild(link);
                }
                link.href = savedIcon;
            }
            
            const key = localStorage.getItem('jeo-cloaker-key') || '`';
            const url = localStorage.getItem('jeo-cloaker-url') || 'https://classroom.google.com';
            
            document.addEventListener('keydown', (e) => {
                if (e.key === key && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                    window.location.replace(url);
                }
            });
        },
        hexToRgb: function(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
    };
})(window);
