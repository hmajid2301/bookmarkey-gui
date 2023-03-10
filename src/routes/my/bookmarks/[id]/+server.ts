import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import type { RequestEvent, RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ locals, params }: RequestEvent) => {
	try {
		await locals.pb?.collection("bookmarks").delete(params.id);
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to delete bookmarks.");
	}
};
