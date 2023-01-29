import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

import type { RequestEvent, RequestHandler } from "./$types";

export interface GroupSwap {
	new_order: number;
	group_id: string;
}

export const POST: RequestHandler = async ({ locals, request }: RequestEvent) => {
	try {
		const groups: GroupSwap[] = await request.json();
		groups.forEach(async (group) => {
			await locals.pb?.collection("groups").update(group.group_id, {
				custom_order: group.new_order
			});
		});
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to update group order.");
	}
};
