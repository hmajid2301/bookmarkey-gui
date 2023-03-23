import * as Sentry from "@sentry/node";
import { error, fail, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const resetSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email must be a valid email." })
});

export const load = async (event) => {
	const form = await superValidate(event, resetSchema);
	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, resetSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await event.locals.pb?.collection("users").requestPasswordReset(form.data.email);
			return {
				success: true
			};
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to send password reset email");
		}
	}
};
