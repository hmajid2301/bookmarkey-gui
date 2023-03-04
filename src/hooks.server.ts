import * as SentryNode from "@sentry/node";
import "@sentry/tracing";
import { redirect, type Handle, type HandleServerError } from "@sveltejs/kit";
import PocketBase from "pocketbase";

import { config } from "./config";
import { PBClient } from "./lib/pocketbase/client";

SentryNode.init({
	dsn: config.SentryDNS,
	environment: config.PROD ? "production" : "development",
	tracesSampleRate: 1.0,
	integrations: [new SentryNode.Integrations.Http()]
});

SentryNode.setTag("svelteKit", "server");

export const handleError: HandleServerError = ({ error, event }) => {
	SentryNode.captureException(error, { contexts: { sveltekit: { event } } });
	console.error(error);

	return {
		message: "Internal Error"
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.client = new PBClient(config.PocketBaseURL);
	event.locals.pb = new PocketBase(config.PocketBaseURL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");
	event.locals.client.loadAuthFromCookie(event.request.headers.get("cookie") || "");

	try {
		if (event.locals.client.isAuthValid()) {
			await event.locals.client.refreshAuth();
			event.locals.user = event.locals.client.getAuthModel();
		}
	} catch (err) {
		console.log("failed to refresh auth", err);
		SentryNode.captureException(err);
		event.locals.user = undefined;
		event.locals.client.logout();
	}

	if (event.url.pathname.startsWith("/my") && !event.locals.pb.authStore.isValid) {
		throw redirect(303, "/");
	} else if (event.url.pathname.startsWith("/login") && event.locals.pb.authStore.isValid) {
		throw redirect(303, "/my/dashboard");
	}

	const response = await resolve(event);
	const isProd = process.env.NODE_ENV === "production" ? true : false;
	response.headers.set("set-cookie", event.locals.client.exportToCookie(isProd));
	response.headers.set(
		"set-cookie",
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: "Lax" })
	);
	return response;
};
