import * as Sentry from "@sentry/node";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { pwnedPassword } from "hibp";
import { z } from "zod";

export interface Register {
	email: string;
	password: string;
}

const isSafePassword = async (ph: string) => {
	try {
		const pwned = await pwnedPassword(ph);
		return pwned <= 3;
	} catch (err) {
		console.log(err);
		return true;
	}
};

const registerSchema: z.ZodType<Register> = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email must be a valid email." }),
	password: z
		.string({ required_error: "Password is required" })
		.min(8, "Password must be a minimum of 8 characters.")
		.refine(isSafePassword, () => ({
			message: `Password has been compromised, please try again`
		}))
});

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const data: Register = Object.fromEntries((await request.formData()) as Iterable<[Register]>);
		const result = await registerSchema.safeParseAsync(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb?.collection("users").create({
				username: "",
				email: result.data.email,
				password: result.data.password,
				passwordConfirm: result.data.password
			});
		} catch (err) {
			console.log("err", err);
			Sentry.captureException(err);
			throw error(500, "Failed to create account.");
		}

		try {
			await locals.pb?.collection("users").requestVerification(result.data.email);
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to send verification email.");
		}

		try {
			await locals.pb
				?.collection("users")
				.authWithPassword(result.data.email, result.data.password);
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to automatically log you in.");
		}

		throw redirect(303, "/my/dashboard");
	}
};
