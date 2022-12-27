import { withSentryConfig } from '@sentry/svelte';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors

	compilerOptions: {
		enableSourcemap: true
	},
	kit: {
		adapter: adapter(),
		alias: {
			'~': './src/'
		}
	},
	preprocess: [
		preprocess({
			postcss: true,
			sourceMap: true
		})
	]
};

const sentryOptions = {
	componentTracking: {
		trackComponents: true,
		trackInit: true,
		trackUpdates: false
	}
};

export default withSentryConfig(config, sentryOptions);
