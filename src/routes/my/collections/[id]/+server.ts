import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import type { RequestEvent, RequestHandler } from "./$types";
import { _getBookmarks } from "./+page.server";

export const GET: RequestHandler = async ({ locals, params, url }: RequestEvent) => {
	try {
		const page = parseInt(url.searchParams.get("page") || "1");
		const bookmarks = await _getBookmarks(locals.pb, params.id, page);
		return new Response(JSON.stringify(bookmarks), { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to get bookmarks.");
	}
};

export const DELETE: RequestHandler = async ({ locals, params }: RequestEvent) => {
	try {
		await locals.pb?.collection("collections").delete(params.id);
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to delete collection.");
	}
};

export const PATCH: RequestHandler = async ({ locals, params, request }: RequestEvent) => {
	try {
		const json_ = await request.json();
		await locals.pb?.collection("collections").update(params.id, {
			...json_
		});
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to update collection.");
	}
};
