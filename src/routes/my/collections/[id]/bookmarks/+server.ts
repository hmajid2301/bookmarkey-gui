import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import { _createBookmark } from "../+page.server";

export const POST = async ({ locals, params, request }) => {
	try {
		const json_ = await request.json();
		await _createBookmark(locals.pb, params.id, json_.url);
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to create bookmark.");
	}
};
