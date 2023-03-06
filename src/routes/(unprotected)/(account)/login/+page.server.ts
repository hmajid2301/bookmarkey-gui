import * as Sentry from "@sentry/node";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";
import { z } from "zod";

interface Login {
	email: string;
	password: string;
}

const loginSchema: z.ZodType<Login> = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email must be a valid email." }),
	password: z.string({ required_error: "Password is required" })
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[Login]>);
		const result = loginSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb
				?.collection("users")
				.authWithPassword(result.data.email, result.data.password);
			// TODO: what to do with unverified users
			// if (!locals.pb?.authStore?.model?.verified) {
			// 	locals.pb?.authStore.clear();
			// 	return {
			// 		notVerified: true
			// 	};
			// }
		} catch (err) {
			if (err instanceof ClientResponseError) {
				if (err.status === 400) {
					throw error(err.status, "Wrong email and password combination.");
				}
			}
			Sentry.captureException(err);
			throw error(500, "Failed to login, please try again later.");
		}

		throw redirect(303, "/my/dashboard");
	}
};
