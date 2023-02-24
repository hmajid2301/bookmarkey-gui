import * as Sentry from "@sentry/node";
import { error, fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";

import type { BookmarksResponse, CollectionsResponse } from "~/lib/pocketbase/types.generated";
import type { PageServerLoad } from "./$types";

interface OutputType {
	collection: CollectionsResponse;
	bookmarks: BookmarksResponse[];
}

export const load: PageServerLoad<OutputType> = async ({ locals, params }) => {
	const collection = await locals.pb
		?.collection("collections")
		.getOne<CollectionsResponse>(params.id);
	const bookmarks = await locals.pb?.collection("bookmarks").getList<BookmarksResponse>(1, 30, {
		sort: "custom_order,-created"
	});
	if (!collection) {
		throw Error("failed to get collection");
	}
	if (!bookmarks) {
		throw Error("failed to get bookmarks");
	}
	return { collection: structuredClone(collection), bookmarks: structuredClone(bookmarks.items) };
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
			await locals.pb?.collection("bookmarks").create({
				collection: params.id,
				user: locals.user?.id,
				url: result.data.url,
				favourite: false,
				custom_order: Number.MAX_SAFE_INTEGER
			});
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to add bookmark, please try again later.");
		}

		return;
	}
};
