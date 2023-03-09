import * as Sentry from "@sentry/node";
import { error, fail, type Actions } from "@sveltejs/kit";
import type pocketbase from "pocketbase";
import { z } from "zod";

import type {
	BookmarksMetadataResponse,
	BookmarksResponse,
	CollectionsResponse
} from "~/lib/pocketbase/types";
import type { PageServerLoad } from "./$types";

export interface Bookmark {
	id: string;
	image: string;
	url: string;
	description: string;
	title: string;
	createdAt: string;
}

export interface Collection {
	id: string;
	name: string;
	group: string;
	bookmarks: Bookmark[];
	moreBookmarks: boolean;
}

interface OutputType {
	collection: Collection;
}

type BookmarkExpand = BookmarksResponse & {
	expand: {
		bookmark_metadata: BookmarksMetadataResponse;
	};
};

export const load: PageServerLoad<OutputType> = async ({ locals, params }) => {
	const collectionId = params.id;
	const pageNumber = 0;
	try {
		return await _getBookmarks(locals.pb, collectionId, pageNumber);
	} catch (err) {
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

		try {
			await locals.pb?.send(`/collections/${params.id}/bookmark`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				timeout: 5000,
				body: JSON.stringify({ url: result.data.url })
			});
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to add bookmark, please try again later.");
		}

		return;
	}
};

export async function _getBookmarks(pb: pocketbase, collectionId: string, page: number) {
	const batchSize = 30;

	// TODO: is this redundant?
	let collection: { id: string; name: string; group?: string };
	if (collectionId === "-1") {
		collection = {
			id: "-1",
			name: "Unsorted"
		};
	} else {
		collection = await pb?.collection("collections").getOne<CollectionsResponse>(collectionId);
	}

	// TODO: fix autocancel
	const bookmarkRecords = await pb
		.collection("bookmarks")
		.getList<BookmarkExpand>(page, batchSize, {
			filter: `collection = "${collectionId}"`,
			sort: "custom_order,-created",
			expand: "bookmark_metadata",
			$autoCancel: false
		});

	if (!collection) {
		throw Error("failed to get collection");
	}
	if (!bookmarkRecords) {
		throw Error("failed to get bookmarks");
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
