// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Canonical deploy artifact: `./dist`, staged with /Assets, /emulatorjs,
// /cdn-cgi via scripts/link-assets-into-dist.mjs --copy in CI.
export default defineConfig({
	site: 'https://jeoweb.app/',
	output: 'static',
	outDir: './dist',
	publicDir: './public',
	integrations: [
		preact(),
		// Sitemap excludes the player routes (robots disallows them — they're not
		// canonical landing pages) and the internal /preview design-system page.
		sitemap({
			filter: page =>
				!page.startsWith('https://jeoweb.app/play/') &&
				!page.startsWith('https://jeoweb.app/preview/'),
		}),
		mdx(),
	],
	experimental: {
		clientPrerender: true,
	},
	build: {
		assets: '_astro',
		inlineStylesheets: 'auto',
	},
	vite: {
		ssr: {
			noExternal: ['lucide-preact'],
		},
	},
});
