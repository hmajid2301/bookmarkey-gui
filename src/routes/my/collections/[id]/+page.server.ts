import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import { getBookmarks } from "~/lib/pocketbase/frontend";
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
		return await getBookmarks(locals.pb, collectionId, pageNumber);
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to get bookmarks");
	}
};
