import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

interface updatePassword {
	currentPassword: string;
	password: string;
	passwordConfirm: string;
}

interface updateProfile {
	nickname: string;
	email: string;
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

const updateProfileSchema: z.ZodType<updateProfile> = z.object({
	nickname: z.string(),
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
		const data = Object.fromEntries((await request.formData()) as Iterable<[updateProfile]>);
		const result = updateProfileSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}
		try {
			await locals.pb?.collection('users').update(locals?.user?.id as string, {
				name: result.data.nickname
			});

			if (locals.user?.email !== result.data.email) {
				await locals.pb?.collection('users').requestEmailChange(result.data.email);
			}

			if (locals.user) {
				locals.user.name = result.data.nickname;
				locals.user.email = result.data.email;
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
