import { captureException, init, Replay, setTag } from "@sentry/svelte";
import { BrowserTracing } from "@sentry/tracing";
import type { HandleClientError } from "@sveltejs/kit";

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

export const handleError: HandleClientError = ({ error, event }) => {
	captureException(error, { contexts: { sveltekit: { event } } });

	return {
		message: "An unknown error occurred"
	};
};
