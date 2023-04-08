import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import { API } from "~/lib/api/client";
import type { Bookmark } from "~/lib/types/components";

export interface CollectionBookmarks {
	id: string;
	name: string;
	group: string;
	bookmarks: Bookmark[];
	moreBookmarks: boolean;
}

export const load = async ({ locals, params }) => {
	const collectionId = params.id;
	const pageNumber = 0;
	try {
		const api = new API(undefined, locals.pb);
		return await api.getBookmarks(collectionId, pageNumber);
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to get bookmarks");
	}
};
