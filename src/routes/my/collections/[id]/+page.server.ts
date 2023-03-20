import * as Sentry from "@sentry/node";
import { error, fail, type Actions } from "@sveltejs/kit";
import type pocketbase from "pocketbase";
import { z } from "zod";

import type {
	BookmarksMetadataResponse,
	BookmarksResponse,
	CollectionsResponse
} from "~/lib/pocketbase/types";
import type { Bookmark } from "~/lib/types/components";

export interface CollectionBookmarks {
	id: string;
	name: string;
	group: string;
	bookmarks: Bookmark[];
	moreBookmarks: boolean;
}

type BookmarkExpand = BookmarksResponse & {
	expand: {
		bookmark_metadata: BookmarksMetadataResponse;
	};
};

export const load = async ({ locals, params }) => {
	const collectionId = params.id;
	const pageNumber = 0;
	try {
		return await _getBookmarks(locals.pb, collectionId, pageNumber);
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to get bookmarks");
	}
};

interface Addbookmark {
	url: string;
}

const bookmarkSchema: z.ZodType<Addbookmark> = z.object({
	url: z.string({ required_error: "bookmark URL is required" })
});

export const actions: Actions = {
	addBookmark: async ({ locals, request, params }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[Addbookmark]>);
		const result = bookmarkSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		await _createBookmark(locals.pb, params.id || "", result.data.url);
		return;
	}
};

export async function _createBookmark(pb: pocketbase, collectionID: string, url: string) {
	// if current collection is all bookmarks, add new bookmark to unsorted bookmark collection
	if (collectionID === "0") {
		collectionID = "-1";
	}
	try {
		await pb.send(`/collections/${collectionID}/bookmark`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			timeout: 5000,
			body: JSON.stringify({ url })
		});
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to add bookmark, please try again later.");
	}
}

export async function _getBookmarks(pb: pocketbase, collectionId: string, page: number) {
	const batchSize = 30;

	let collection: { id: string; name: string; group?: string };
	if (collectionId === "0") {
		collection = {
			id: "0",
			name: "All Bookmarks"
		};
	} else {
		collection = await pb?.collection("collections").getOne<CollectionsResponse>(collectionId);
	}

	// TODO: fix autocancel
	const bookmarkRecords = await pb
		.collection("bookmarks")
		.getList<BookmarkExpand>(page, batchSize, {
			filter: collectionId !== "0" ? `collection = "${collectionId}"` : "",
			sort: "custom_order,-created",
			expand: "bookmark_metadata",
			$autoCancel: false
		});

	if (!collection) {
		throw Error("failed to get collection");
	}

	const bookmarks: Bookmark[] = [];
	bookmarkRecords.items.forEach((bookmarkRecord) => {
		const createdAt = new Date(bookmarkRecord.created);
		const formattedCreatedAt = createdAt.toLocaleDateString(undefined, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		});
		const bookmark: Bookmark = {
			id: bookmarkRecord.id,
			url: bookmarkRecord.expand.bookmark_metadata.url,
			image: bookmarkRecord.expand.bookmark_metadata.image,
			title: bookmarkRecord.expand.bookmark_metadata.title,
			description: bookmarkRecord.expand.bookmark_metadata.description,
			createdAt: formattedCreatedAt
		};
		bookmarks.push(bookmark);
	});
	return {
		collection: {
			id: collection.id,
			name: collection.name,
			group: collection.group || "",
			bookmarks: bookmarks,
			moreBookmarks: bookmarks.length !== bookmarkRecords.totalItems
		}
	};
}
