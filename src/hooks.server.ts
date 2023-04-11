import * as SentryNode from "@sentry/node";
import { redirect } from "@sveltejs/kit";
import PocketBase from "pocketbase";
import toast from "svelte-french-toast";

import { config } from "./config";
import { API } from "./lib/api/client";

SentryNode.init({
	dsn: config.SentryDNS,
	environment: config.MY_ENV,
	tracesSampleRate: config.MY_ENV == "production" ? 0.8 : 0,
	integrations: [new SentryNode.Integrations.Http()]
});

SentryNode.setTag("svelteKit", "server");

export const handleError = ({ error, event }) => {
	SentryNode.captureException(error, { contexts: { sveltekit: { event } } });

	console.error(error);
	return {
		message: "Internal Error"
	};
};

export const handle = async ({ event, resolve }) => {
	event.locals.client = new API(config.PocketBaseURL);
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
		const fromURL = event.url.pathname;
		toast.error("You must be logged in to view that page!");
		throw redirect(303, `/login?redirect_to=${fromURL}`);
	} else if (event.url.pathname.startsWith("/login") && event.locals.pb.authStore.isValid) {
		throw redirect(303, "/my/collections/0");
	}

	const response = await resolve(event);
	const isProd = process.env.NODE_ENV === "production" ? true : false;
	response.headers.set("set-cookie", event.locals.client.exportToCookie(isProd));
	response.headers.set(
		"set-cookie",
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: "Lax", httpOnly: false })
	);
	return response;
};
