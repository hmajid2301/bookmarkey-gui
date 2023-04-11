import { BrowserTracing, Replay, captureException, init, setTag } from "@sentry/svelte";

import { config } from "./config";

init({
	dsn: config.SentryDNS,
	environment: config.MY_ENV,
	integrations: [
		new BrowserTracing({
			tracePropagationTargets: [
				"localhost",
				"preview.pocketbase.bookmarkey.app",
				"pocketbase.bookmarkey.app",
				/^\//
			]
		}),
		new Replay()
	],
	replaysSessionSampleRate: config.MY_ENV == "production" ? 0.1 : 0,
	replaysOnErrorSampleRate: config.MY_ENV == "production" ? 0.5 : 0,
	tracesSampleRate: config.MY_ENV == "production" ? 0.8 : 0
});

setTag("svelteKit", "browser");

export const handleError = ({ error, event }) => {
	captureException(error, { contexts: { sveltekit: { event } } });

	return {
		message: "An unknown error occurred"
	};
};
