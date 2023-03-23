import * as Sentry from "@sentry/node";
import { error, fail, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const verificationLinkSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email must be a valid email." })
});

export const load = async (event) => {
	const form = await superValidate(event, verificationLinkSchema);
	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, verificationLinkSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await event.locals.pb?.collection("users").requestVerification(form.data.email);
			return {
				success: true
			};
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to send verification email.");
		}
	}
};
