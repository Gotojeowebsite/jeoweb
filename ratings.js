/* Jeoweb Ratings — local 1–5 star ratings per game, stored in localStorage. */
(function () {
	if (window.JeoRatings) return;

	const KEY = 'jeo:ratings';
	const listeners = new Set();

	function load() {
		try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; }
		catch { return {}; }
	}
	function save(data) {
		try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { console.warn('ratings save failed', e); }
	}
	function notify(slug, stars) {
		listeners.forEach(fn => { try { fn(slug, stars); } catch (e) { console.error(e); } });
	}

	function get(slug) {
		if (!slug) return 0;
		const all = load();
		return Number(all[slug]) || 0;
	}
	function set(slug, stars) {
		if (!slug) return;
		stars = Math.max(0, Math.min(5, Math.floor(Number(stars) || 0)));
		const all = load();
		const prev = all[slug] || 0;
		if (stars === 0) delete all[slug];
		else all[slug] = stars;
		save(all);
		notify(slug, stars);
		// Tell achievements about this so it can compute "rate 25" etc.
		if (window.JeoAchievements) {
			try { window.JeoAchievements.onEvent('rate', { slug, stars, prev }); } catch (e) {}
		}
	}
	function clear(slug) { set(slug, 0); }
	function all() { return load(); }
	function count() { return Object.keys(load()).length; }
	function average() {
		const data = load();
		const vals = Object.values(data).map(Number).filter(n => n > 0);
		if (!vals.length) return 0;
		return vals.reduce((a, b) => a + b, 0) / vals.length;
	}

	function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

	/* Build a star-row widget. Returns an HTMLElement. */
	function buildWidget(slug, opts) {
		opts = opts || {};
		const size = opts.size || 18;
		const interactive = opts.interactive !== false;
		const wrap = document.createElement('div');
		wrap.className = 'jeo-stars' + (interactive ? ' interactive' : '') + (opts.compact ? ' compact' : '');
		wrap.dataset.slug = slug || '';
		wrap.setAttribute('role', interactive ? 'radiogroup' : 'img');
		wrap.setAttribute('aria-label', interactive ? 'Rate this game' : 'Rating');
		wrap.style.setProperty('--star-size', size + 'px');

		const current = get(slug);
		for (let i = 1; i <= 5; i++) {
			const btn = document.createElement(interactive ? 'button' : 'span');
			btn.className = 'jeo-star';
			btn.dataset.value = String(i);
			btn.textContent = i <= current ? '★' : '☆';
			if (interactive) {
				btn.type = 'button';
				btn.setAttribute('role', 'radio');
				btn.setAttribute('aria-checked', i === current ? 'true' : 'false');
				btn.setAttribute('aria-label', i + ' star' + (i > 1 ? 's' : ''));
				btn.addEventListener('mouseenter', () => previewStars(wrap, i));
				btn.addEventListener('focus', () => previewStars(wrap, i));
				btn.addEventListener('click', (e) => {
					e.stopPropagation();
					const cur = get(wrap.dataset.slug);
					// Click the currently-selected star to clear
					const next = (cur === i) ? 0 : i;
					set(wrap.dataset.slug, next);
					renderInto(wrap);
				});
			}
			wrap.appendChild(btn);
		}
		if (interactive) {
			wrap.addEventListener('mouseleave', () => renderInto(wrap));
			wrap.addEventListener('blur', () => renderInto(wrap), true);
		}
		return wrap;
	}

	function previewStars(wrap, n) {
		const stars = wrap.querySelectorAll('.jeo-star');
		stars.forEach((el, i) => { el.textContent = (i + 1) <= n ? '★' : '☆'; });
	}
	function renderInto(wrap) {
		const slug = wrap.dataset.slug;
		const cur = get(slug);
		const stars = wrap.querySelectorAll('.jeo-star');
		stars.forEach((el, i) => {
			el.textContent = (i + 1) <= cur ? '★' : '☆';
			if (el.setAttribute) el.setAttribute('aria-checked', (i + 1) === cur ? 'true' : 'false');
		});
	}

	window.JeoRatings = { get, set, clear, all, count, average, onChange, buildWidget };
})();
