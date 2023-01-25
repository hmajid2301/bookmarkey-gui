import * as Sentry from "@sentry/node";
import { error, fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";

import type { GroupsResponse } from "~/lib/pocketbase-types";

interface AddGroup {
	group: string;
}

export type OutputType = { collections: string[] };

const addGroupSchema: z.ZodType<AddGroup> = z.object({
	group: z.string({ required_error: "Group name is a required field" })
});

export const actions: Actions = {
	addGroup: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[AddGroup]>);
		const result = await addGroupSchema.safeParseAsync(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}
		try {
			await locals.pb?.collection("groups").create<GroupsResponse>({
				user: locals.user?.id,
				name: result.data.group
			});
			return {
				addCollection: true
			};
		} catch (err) {
			Sentry.captureException(err);
			console.error("Failed to create group", err);
			throw error(500, "Failed to create group.");
		}
	}
};
