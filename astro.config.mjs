// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Sprint 0 scaffold. Builds alongside the legacy root files — does NOT yet
// replace index.html / app.js / styles.css. Cutover lands in Sprint 7.
export default defineConfig({
	site: 'https://jeoweb.app/',
	output: 'static',
	outDir: './dist',
	publicDir: './public',
	integrations: [preact(), sitemap(), mdx()],
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
