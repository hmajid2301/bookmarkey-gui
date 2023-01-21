import * as SentryNode from "@sentry/node";
import "@sentry/tracing";
import { redirect, type Handle, type HandleServerError } from "@sveltejs/kit";
import PocketBase from "pocketbase";

import { config } from "./config";

SentryNode.init({
	dsn: config.SentryDNS,
	tracesSampleRate: 1.0,
	integrations: [new SentryNode.Integrations.Http()]
});

SentryNode.setTag("svelteKit", "server");

export const handleError: HandleServerError = ({ error, event }) => {
	SentryNode.captureException(error, { contexts: { sveltekit: { event } } });

	return {
		message: "Internal Error"
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(config.PocketBaseURL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection("users").authRefresh();
			event.locals.user = structuredClone(event.locals.pb?.authStore.model);
		}
	} catch (err) {
		console.log("failed to refresh auth", err);
		SentryNode.captureException(err);
		event.locals.user = undefined;
		event.locals.pb.authStore.clear();
	}

	if (event.url.pathname.startsWith("/my") && !event.locals.pb.authStore.isValid) {
		throw redirect(303, "/");
	} else if (event.url.pathname.startsWith("/login") && event.locals.pb.authStore.isValid) {
		throw redirect(303, "/my/dashboard");
	}

	const response = await resolve(event);
	const isProd = process.env.NODE_ENV === "production" ? true : false;
	response.headers.set(
		"set-cookie",
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: "Lax" })
	);
	return response;
};
