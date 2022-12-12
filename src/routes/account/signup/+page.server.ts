import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const signupSchema = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email.' }),
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
	register: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());
		const result = signupSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb
				?.collection('users')
				.create({ username: '', email: result.data.email, password: result.data.password });
			await locals.pb?.collection('users').requestVerification(result.data.email);
		} catch (err) {
			return {
				signupError: 'Failed to sign up, please try again later.'
			};
		}

		try {
			await locals.pb
				?.collection('users')
				.authWithPassword(result.data.email, result.data.password);
		} catch (err) {
			return {
				signupError: 'Failed to login, please try again later.'
			};
		}

		throw redirect(303, '/');
	}
};
