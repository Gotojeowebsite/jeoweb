/**
 * migration-banner.js
 * Shows a persistent site-wide migration notice directing users to jeoweb.app,
 * with a countdown that auto-redirects after REDIRECT_DELAY seconds.
 *
 * Safe to include in any page — guards against duplicate insertion.
 * Uses window.top so clicking "Go now" exits any game iframe as well.
 */
(function () {
    'use strict';

    // Already injected (e.g. SW injected it and the page also has a <script> tag).
    if (document.getElementById('jeo-migration-banner')) return;

    var NEW_SITE = 'https://jeoweb.app';
    var REDIRECT_DELAY = 15; // seconds before auto-redirect

    /* ── Styles ─────────────────────────────────────────────────── */
    var css = [
        '#jeo-migration-banner{',
        '  position:fixed;top:0;left:0;right:0;',
        '  z-index:2147483647;',
        '  background:linear-gradient(135deg,#7c3aed 0%,#ec4899 100%);',
        '  color:#fff;',
        '  font-family:-apple-system,"Segoe UI",system-ui,Roboto,sans-serif;',
        '  font-size:14px;line-height:1.4;',
        '  padding:10px 16px;',
        '  display:flex;align-items:center;justify-content:center;',
        '  flex-wrap:wrap;gap:10px;text-align:center;',
        '  box-shadow:0 2px 16px rgba(0,0,0,.5);',
        '}',
        '#jeo-migration-banner strong{font-weight:700;}',
        '#jeo-migration-banner a{color:#fff;font-weight:700;text-decoration:underline;}',
        '#jeo-migration-banner a:hover{opacity:.85;}',
        '.jeo-migrate-cta{',
        '  background:#fff;color:#7c3aed;border:none;border-radius:20px;',
        '  padding:6px 18px;font-size:13px;font-weight:700;cursor:pointer;',
        '  white-space:nowrap;transition:opacity .2s;',
        '}',
        '.jeo-migrate-cta:hover{opacity:.9;}',
        '.jeo-stay-btn{',
        '  background:transparent;color:#fff;',
        '  border:1px solid rgba(255,255,255,.55);border-radius:20px;',
        '  padding:5px 14px;font-size:12px;cursor:pointer;',
        '  white-space:nowrap;transition:opacity .2s;',
        '}',
        '.jeo-stay-btn:hover{opacity:.75;}',
    ].join('');

    var styleEl = document.createElement('style');
    styleEl.textContent = css;

    /* ── Banner HTML ────────────────────────────────────────────── */
    var banner = document.createElement('div');
    banner.id = 'jeo-migration-banner';
    banner.setAttribute('role', 'alert');
    banner.innerHTML =
        '<span>🚀 <strong>We\'ve moved!</strong> ' +
        'This site is retiring — all games are now at ' +
        '<a href="' + NEW_SITE + '" target="_top" rel="noopener noreferrer">' +
        'jeoweb.app</a>. ' +
        'Redirecting in <strong id="jeo-banner-countdown">' + REDIRECT_DELAY + '</strong>s&nbsp;</span>' +
        '<button class="jeo-migrate-cta" id="jeo-go-now-btn">Go to jeoweb.app &rarr;</button>' +
        '<button class="jeo-stay-btn" id="jeo-stay-btn">Stay on this page</button>';

    /* ── Insert into DOM ────────────────────────────────────────── */
    function mount() {
        if (document.getElementById('jeo-migration-banner')) return; // race guard
        if (document.head) document.head.appendChild(styleEl);
        if (document.body) {
            document.body.insertBefore(banner, document.body.firstChild);
            // Nudge body down so the banner doesn't overlap page content.
            var cur = parseInt(document.body.style.paddingTop, 10) || 0;
            document.body.style.paddingTop = (cur + 48) + 'px';
        }
        attachListeners();
        startCountdown();
    }

    if (document.body) {
        mount();
    } else {
        document.addEventListener('DOMContentLoaded', mount);
    }

    /* ── Countdown & redirect ───────────────────────────────────── */
    var timer = null;

    function startCountdown() {
        var remaining = REDIRECT_DELAY;
        timer = setInterval(function () {
            remaining -= 1;
            var el = document.getElementById('jeo-banner-countdown');
            if (el) el.textContent = remaining;
            if (remaining <= 0) {
                clearInterval(timer);
                try { window.top.location.href = NEW_SITE; } catch (e) { window.location.href = NEW_SITE; }
            }
        }, 1000);
    }

    /* ── Button listeners ───────────────────────────────────────── */
    function attachListeners() {
        var goBtn = document.getElementById('jeo-go-now-btn');
        if (goBtn) {
            goBtn.addEventListener('click', function () {
                clearInterval(timer);
                try { window.top.location.href = NEW_SITE; } catch (e) { window.location.href = NEW_SITE; }
            });
        }

        var stayBtn = document.getElementById('jeo-stay-btn');
        if (stayBtn) {
            stayBtn.addEventListener('click', function () {
                clearInterval(timer);
                var b = document.getElementById('jeo-migration-banner');
                if (b) {
                    b.remove();
                    // Undo the padding we added.
                    var cur = parseInt(document.body.style.paddingTop, 10) || 0;
                    document.body.style.paddingTop = Math.max(0, cur - 48) + 'px';
                }
            });
        }
    }
})();
