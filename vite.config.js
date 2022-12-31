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
			authToken: process.env.SENTRY_AUTH_TOKEN,
			dryRun: process.env.NODE_ENV === 'production' ? false : true
		})
	],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		outputFile: 'test-results/junit.xml',
		setupFiles: ['setupTest.ts'],
		reporters: ['default', 'junit'],
		coverage: {
			all: true,
			reporter: ['text', 'json', 'html', 'cobertura']
		}
	}
};

export default config;
