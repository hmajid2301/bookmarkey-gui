import sentryVitePlugin from '@sentry/vite-plugin';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

/** @type {import('vite').UserConfig} */
const config = {
	build: {
		sourcemap: true
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({}),
		sentryVitePlugin({
			org: 'majiy',
			project: 'bookmarkey',
			include: './dist',
			authToken: process.env.SENTRY_AUTH_TOKEN
		})
	],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['setupTest.ts']
	}
};

export default config;
