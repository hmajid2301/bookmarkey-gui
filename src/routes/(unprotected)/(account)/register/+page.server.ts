import * as Sentry from "@sentry/node";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { pwnedPassword } from "hibp";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const isSafePassword = async (ph: string) => {
	try {
		const pwned = await pwnedPassword(ph);
		return pwned <= 3;
	} catch (err) {
		console.log(err);
		return true;
	}
};

const registerSchema = z.object({
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

export const load = async (event) => {
	const form = await superValidate(event, registerSchema);
	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, registerSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await event.locals.pb?.collection("users").create({
				username: "",
				email: form.data.email,
				password: form.data.password,
				passwordConfirm: form.data.password
			});
		} catch (err) {
			console.log("Failed to create account", err);
			Sentry.captureException(err);
			throw error(500, "Failed to create account.");
		}

		try {
			await event.locals.pb?.collection("users").requestVerification(form.data.email);
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to send verification email.");
		}

		try {
			await event.locals.pb
				?.collection("users")
				.authWithPassword(form.data.email, form.data.password);
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to automatically log you in.");
		}

		throw redirect(303, "/my/collections/0");
	}
};
