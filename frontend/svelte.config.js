import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [vitePreprocess()],

	vitePlugin: {
		inspector: true
	},

	kit: {
		adapter: adapterStatic({ fallback: 'index.html' }),
		prerender: { entries: ['*'] }
	}
};

export default config;
