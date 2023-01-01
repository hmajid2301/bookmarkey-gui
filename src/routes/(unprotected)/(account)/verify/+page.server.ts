import * as Sentry from "@sentry/browser";
import { error, fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";

import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from "~/lib/constants/http";

interface EmailVerification {
	email: string;
}

const verificationLinkSchema: z.ZodType<EmailVerification> = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email must be a valid email." })
});

export const actions: Actions = {
	resetPassword: async ({ locals, request }) => {
		const data = Object.fromEntries(
			(await request.formData()) as Iterable<[EmailVerification]>
		);
		const result = verificationLinkSchema.safeParse(data);

		if (!result.success) {
			return fail(HTTP_BAD_REQUEST, {
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
			throw error(HTTP_SERVER_ERROR, "Failed to send verification email.");
		}
	}
};
