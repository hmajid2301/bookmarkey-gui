import { fail, type Actions } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { z } from 'zod';

import { config } from '~/config';

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

const updateProfileSchema: z.ZodType<updateProfile> = z.object({
	nickname: z.string().max(64, { message: 'Name must be 64 characters or less' }).trim(),
	avatar: z.any(),
	// .instanceof(Blob)
	// .optional()
	// .superRefine((val, ctx) => {
	// 	if (val) {
	// 		if (val.size > 500000) {
	// 			ctx.addIssue({
	// 				code: z.ZodIssueCode.custom,
	// 				message: 'Avatar must be less than 500KB'
	// 			});
	// 		}

	// 		if (!imageTypes.includes(val.type)) {
	// 			ctx.addIssue({
	// 				code: z.ZodIssueCode.custom,
	// 				message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
	// 			});
	// 		}
	// 	}
	// }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' })
});

export const actions: Actions = {
	updatePassword: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[updatePassword]>);
		const result = updatePasswordSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
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
			console.log('Err', err);
			return {
				updatePasswordErr: 'Failed to update password, please try again later.'
			};
		}
	},
	updateProfile: async ({ locals, request }) => {
		const d = await request.formData();
		const data = Object.fromEntries(d as Iterable<[updateProfile]>);
		const result = updateProfileSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}
		try {
			const record = await locals.pb
				?.collection('users')
				.update(
					locals?.user?.id as string,
					serialize({ name: result.data.nickname, avatar: result.data.avatar })
				);

			console.log('a', record);

			if (locals.user?.email !== result.data.email) {
				await locals.pb?.collection('users').requestEmailChange(result.data.email);
			}

			if (locals.user) {
				locals.user.name = result.data.nickname;
				locals.user.email = result.data.email;

				if (record) {
					locals.user.avatar = `${config.PocketBaseURL}/api/files/${record['collectionId']}/${record['id']}/${record['avatar']}`;
				}
			}
			return {
				updateProfileSuccess: true
			};
		} catch (err) {
			console.log('Err', err);
			return {
				updateProfileErr: 'Failed to update password, please try again later.'
			};
		}
	}
};
