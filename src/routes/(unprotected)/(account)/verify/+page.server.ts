import * as Sentry from "@sentry/node";
import { error, fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";

interface EmailVerification {
	email: string;
}

const verificationLinkSchema: z.ZodType<EmailVerification> = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email must be a valid email." })
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[EmailVerification]>);
		const result = verificationLinkSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb?.collection("users").requestVerification(result.data.email);
			return {
				success: true
			};
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to send verification email.");
		}
	}
};
