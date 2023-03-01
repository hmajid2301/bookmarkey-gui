import MultiAdapter from "@macfja/svelte-multi-adapter";
import { withSentryConfig } from "@sentry/svelte";
import Netlifyadapter from "@sveltejs/adapter-netlify";
import preprocess from "svelte-preprocess";
import ChromeExtensionAdapter from "sveltekit-adapter-chrome-extension";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors

	compilerOptions: {
		enableSourcemap: true
	},
	kit: {
		adapter: MultiAdapter([
			Netlifyadapter({
				edge: false,
				split: true
			}),
			ChromeExtensionAdapter({
				pages: "build",
				assets: "build",
				fallback: null,
				precompress: false,
				manifest: "manifest.json",
				emptyOutDir: true
			})
		]),
		alias: {
			"~": "./src/"
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
