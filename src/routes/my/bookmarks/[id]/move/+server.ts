import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import type { BookmarkMove } from "~/lib/types/api";

export const POST = async ({ locals, params, request }) => {
	try {
		const bookmark: BookmarkMove = await request.json();
		await locals.pb?.collection("bookmarks").update(params.id, {
			collection: bookmark.new_collection_id
		});
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to move bookmark.");
	}
};
