import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

interface ChangePassword {
	currentPassword: string;
	password: string;
	passwordConfirm: string;
}

const changePasswordSchema: z.ZodType<ChangePassword> = z
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

export const actions: Actions = {
	changePassword: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[ChangePassword]>);
		const result = changePasswordSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb
				?.collection('users')
				.authWithPassword(locals.user?.email, result.data.currentPassword);
			await locals.pb?.collection('users').update(locals?.user?.id as string, {
				password: result.data.password,
				passwordConfig: result.data.passwordConfirm
			});
			return {
				success: true
			};
		} catch (err) {
			return {
				changePasswordErr: 'Failed to update password, please try again later.'
			};
		}
	}
};
