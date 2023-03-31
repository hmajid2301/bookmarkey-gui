import { BrowserTracing, Replay, captureException, init, setTag } from "@sentry/svelte";

import { config } from "./config";

init({
	dsn: config.SentryDNS,
	environment: config.MY_ENV,
	integrations: [new BrowserTracing(), new Replay()],
	replaysSessionSampleRate: 1.0,
	replaysOnErrorSampleRate: 1.0,
	tracesSampleRate: 1.0
});

setTag("svelteKit", "browser");

export const handleError = ({ error, event }) => {
	captureException(error, { contexts: { sveltekit: { event } } });

	return {
		message: "An unknown error occurred"
	};
};
