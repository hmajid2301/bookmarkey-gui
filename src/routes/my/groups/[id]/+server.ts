import * as Sentry from "@sentry/node";
import { error } from "@sveltejs/kit";

export const DELETE = async ({ locals, params }) => {
	try {
		await locals.pb?.collection("groups").delete(params.id);
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to delete group.");
	}
};

export const PATCH = async ({ locals, params, request }) => {
	try {
		const updatedGroup = await request.json();
		await locals.pb?.collection("groups").update(params.id, {
			...updatedGroup
		});
		return new Response(null, { status: 200 });
	} catch (err) {
		Sentry.captureException(err);
		throw error(500, "Failed to update group.");
	}
};
