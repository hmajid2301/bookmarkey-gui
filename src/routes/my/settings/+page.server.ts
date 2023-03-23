import * as Sentry from "@sentry/node";
import { error, fail, type Actions } from "@sveltejs/kit";
import { pwnedPassword } from "hibp";
import { serialize } from "object-to-formdata";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const imageTypes = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"image/svg+xml",
	"image/gif"
];

// Max limit for avatars 5KB
const MAX_AVATAR_FILE_LIMIT = 500_000;

const isSafePassword = async (ph: string) => {
	try {
		const pwned = await pwnedPassword(ph);
		return pwned <= 3;
	} catch (err) {
		console.log(err);
		return true;
	}
};

const updatePasswordSchema = z.object({
	currentPassword: z.string({ required_error: "Current password is required" }),
	password: z
		.string({ required_error: "Password is required" })
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:
				"Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character."
		})
		.refine(isSafePassword, () => ({
			message: `Password has been compromised, please try again`
		}))
});

const updateProfileSchema = z.object({
	nickname: z.string().max(64, { message: "Name must be 64 characters or less" }).trim(),
	avatar:
		typeof window === "undefined"
			? z.any()
			: z
					.instanceof(Blob)
					.optional()
					.superRefine((val, ctx) => {
						if (val) {
							if (val.size > MAX_AVATAR_FILE_LIMIT) {
								ctx.addIssue({
									code: z.ZodIssueCode.custom,
									message: "Avatar must be less than 500KB"
								});
							}

							if (!imageTypes.includes(val.type)) {
								ctx.addIssue({
									code: z.ZodIssueCode.custom,
									message:
										"Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif"
								});
							}
						}
					}),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email must be a valid email." })
});

export const load = async (event) => {
	const passwordForm = await superValidate(event, updatePasswordSchema, {
		id: "update-password-form"
	});
	const profileForm = await superValidate(event, updateProfileSchema, {
		id: "update-profile-form"
	});
	return {
		passwordForm,
		profileForm
	};
};

export const actions: Actions = {
	updatePassword: async (event) => {
		const form = await superValidate(event, updatePasswordSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await event.locals.pb?.collection("users").update(event.locals?.user?.id as string, {
				oldPassword: form.data.currentPassword,
				password: form.data.password,
				passwordConfirm: form.data.password
			});
			return {
				updatePasswordSuccess: true
			};
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to update password.");
		}
	},
	updateProfile: async (event) => {
		const form = await superValidate(event, updateProfileSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const updatedProfile: Record<string, string | Blob> = { name: form.data.nickname };
		if (form?.data?.avatar && form.data.avatar.size > 0) {
			updatedProfile["avatar"] = form.data.avatar;
		}
		try {
			const record = await event.locals.pb
				?.collection("users")
				.update(event.locals?.user?.id as string, serialize(updatedProfile));

			if (event.locals.user?.email !== form.data.email) {
				await event.locals.pb?.collection("users").requestEmailChange(form.data.email);
			}

			if (event.locals.user) {
				event.locals.user.name = form.data.nickname;
				event.locals.user.email = form.data.email;

				if (record) {
					event.locals.user.avatar = `${event.locals.pb?.baseUrl}/api/files/${event.locals.user?.collectionId}/${event.locals.user?.id}/${record["avatar"]}`;
				}
			}
			return {
				updateProfileSuccess: true
			};
		} catch (err) {
			Sentry.captureException(err);
			throw error(500, "Failed to update profile information.");
		}
	}
};
