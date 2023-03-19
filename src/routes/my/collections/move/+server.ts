import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import type { CollectionMove } from "~/lib/types/api";

export const POST = async ({ locals, request }) => {
	try {
		const collection: CollectionMove = await request.json();
		await locals.pb?.collection("collections").update(collection.collection_id, {
			custom_order: collection.new_order,
			group: [collection?.group_id]
		});
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to move collection.");
	}
};
