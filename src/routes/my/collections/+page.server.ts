import * as Sentry from "@sentry/browser";
import { error, fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";

interface AddCollection {
	collection: string;
}

export type OutputType = { collections: string[] };

const addCollectionSchema: z.ZodType<AddCollection> = z.object({
	collection: z.string({ required_error: "Collection name is a required field" })
});

export const actions: Actions = {
	addCollection: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[AddCollection]>);
		const result = await addCollectionSchema.safeParseAsync(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}
		try {
			await locals.pb?.collection("collections").create({
				name: result.data.collection,
				user: locals.user?.id,
				parent: null
			});
			return {
				addCollection: true
			};
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to create collection.");
		}
	}
};
