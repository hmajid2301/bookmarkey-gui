import * as Sentry from "@sentry/node";
import { error, fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";

interface Reset {
	email: string;
}

const resetSchema: z.ZodType<Reset> = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email must be a valid email." })
});

export const actions: Actions = {
	resetPassword: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[Reset]>);
		const result = resetSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb?.collection("users").requestPasswordReset(result.data.email);
			return {
				success: true
			};
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to send password reset email");
		}
	}
};
