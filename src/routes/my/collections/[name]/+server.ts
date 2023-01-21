import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import type { RequestEvent, RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ locals, params }: RequestEvent) => {
	try {
		const response = await locals.pb?.send(`/collections/${params.name}`, {
			method: "DELETE"
		});
		return new Response(null, { status: response.status });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to delete collection.");
	}
};
