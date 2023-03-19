import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

export const DELETE = async ({ locals, params }) => {
	try {
		await locals.pb?.collection("bookmarks").delete(params.id);
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to delete bookmarks.");
	}
};
