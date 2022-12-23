import { error, fail, type Actions } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { z } from 'zod';

import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from '~/lib/http';

interface updatePassword {
	currentPassword: string;
	password: string;
	passwordConfirm: string;
}

interface updateProfile {
	nickname: string;
	email: string;
	avatar?: Blob | undefined;
}

const updatePasswordSchema: z.ZodType<updatePassword> = z
	.object({
		currentPassword: z.string({ required_error: 'Current password is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

const imageTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/svg+xml',
	'image/gif'
];

// Max limit for avatars 5KB
const MAX_AVATAR_FILE_LIMIT = 500_000;

const updateProfileSchema: z.ZodType<updateProfile> = z.object({
	nickname: z.string().max(64, { message: 'Name must be 64 characters or less' }).trim(),
	avatar:
		typeof window === 'undefined'
			? z.any()
			: z
					.instanceof(Blob)
					.optional()
					.superRefine((val, ctx) => {
						if (val) {
							if (val.size > MAX_AVATAR_FILE_LIMIT) {
								ctx.addIssue({
									code: z.ZodIssueCode.custom,
									message: 'Avatar must be less than 500KB'
								});
							}

							if (!imageTypes.includes(val.type)) {
								ctx.addIssue({
									code: z.ZodIssueCode.custom,
									message:
										'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
								});
							}
						}
					}),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' })
});

export const actions: Actions = {
	updatePassword: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[updatePassword]>);
		const result = updatePasswordSchema.safeParse(data);

		if (!result.success) {
			return fail(HTTP_BAD_REQUEST, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}
		try {
			await locals.pb?.collection('users').update(locals?.user?.id as string, {
				oldPassword: result.data.currentPassword,
				password: result.data.password,
				passwordConfirm: result.data.passwordConfirm
			});
			return {
				updatePasswordSuccess: true
			};
		} catch (err) {
			throw error(HTTP_SERVER_ERROR, 'Failed to update password.');
		}
	},
	updateProfile: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[updateProfile]>);
		const result = updateProfileSchema.safeParse(data);

		if (!result.success) {
			return fail(HTTP_BAD_REQUEST, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		const updatedProfile: Record<string, string | Blob> = { name: result.data.nickname };
		if (result?.data?.avatar && result.data.avatar.size > 0) {
			updatedProfile['avatar'] = result.data.avatar;
		}
		try {
			const record = await locals.pb
				?.collection('users')
				.update(locals?.user?.id as string, serialize(updatedProfile));

			if (locals.user?.email !== result.data.email) {
				await locals.pb?.collection('users').requestEmailChange(result.data.email);
			}

			if (locals.user) {
				locals.user.name = result.data.nickname;
				locals.user.email = result.data.email;

				if (record) {
					locals.user.avatar = `${locals.pb?.baseUrl}/api/files/${locals.user?.collectionId}/${locals.user?.id}/${record['avatar']}`;
				}
			}
			return {
				updateProfileSuccess: true
			};
		} catch (err) {
			throw error(HTTP_SERVER_ERROR, 'Failed to update profile information.');
		}
	}
};
