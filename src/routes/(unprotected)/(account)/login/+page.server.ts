import * as Sentry from "@sentry/node";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const loginSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email must be a valid email." }),
	password: z.string({ required_error: "Password is required" })
});

export const load = async (event) => {
	const form = await superValidate(event, loginSchema);
	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, loginSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await event.locals.pb
				?.collection("users")
				.authWithPassword(form.data.email, form.data.password);
			// TODO: what to do with unverified users
			// if (!locals.pb?.authStore?.model?.verified) {
			// 	locals.pb?.authStore.clear();
			// 	return {
			// 		notVerified: true
			// 	};
			// }
		} catch (err) {
			console.error(err);
			Sentry.captureException(err);
			if (err instanceof ClientResponseError) {
				if (err.status === 400) {
					throw error(err.status, "Wrong email and password combination.");
				}
			}
			throw error(500, "Failed to login, please try again later.");
		}

		throw redirect(303, "/my/collections/0");
	}
};
