import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

import { HTTP_BAD_REQUEST, HTTP_SEE_OTHER, HTTP_SERVER_ERROR } from '~/lib/http';

interface SignUp {
	email: string;
	password: string;
	passwordConfirm: string;
}

const signupSchema: z.ZodType<SignUp> = z
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
		const data: SignUp = Object.fromEntries((await request.formData()) as Iterable<[SignUp]>);
		const result = signupSchema.safeParse(data);

		if (!result.success) {
			return fail(HTTP_BAD_REQUEST, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb?.collection('users').create({
				username: '',
				email: result.data.email,
				password: result.data.password,
				passwordConfirm: result.data.passwordConfirm
			});
		} catch (err) {
			throw error(HTTP_SERVER_ERROR, 'Failed to create account.');
		}

		try {
			await locals.pb?.collection('users').requestVerification(result.data.email);
		} catch (err) {
			throw error(HTTP_SERVER_ERROR, 'Failed to send verification email.');
		}

		try {
			await locals.pb
				?.collection('users')
				.authWithPassword(result.data.email, result.data.password);
		} catch (err) {
			throw error(HTTP_SERVER_ERROR, 'Failed to automatically log you in.');
		}

		throw redirect(HTTP_SEE_OTHER, '/');
	}
};
