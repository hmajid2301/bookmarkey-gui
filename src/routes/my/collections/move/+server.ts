import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import type { RequestEvent, RequestHandler } from "./$types";

export interface CollectionSwap {
	new_order: number;
	collection_id: string;
	group_id?: string;
}

export const POST: RequestHandler = async ({ locals, request }: RequestEvent) => {
	try {
		const collection: CollectionSwap = await request.json();
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
