import { fail, redirect, type Actions } from '@sveltejs/kit';
import { Md5 } from 'ts-md5';
import { z } from 'zod';

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
			return fail(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		const emailHash = Md5.hashStr(result.data.email);
		const gravatarResp = await fetch(`https://www.gravatar.com/avatar/${emailHash}?s=200&d=404`);
		let avatar = '/user.png';
		if (gravatarResp.status === 404) {
			avatar = `https://www.gravatar.com/avatar/${emailHash}?s=200`;
		}

		try {
			await locals.pb?.collection('users').create({
				username: '',
				email: result.data.email,
				password: result.data.password,
				passwordConfirm: result.data.passwordConfirm,
				avatar: avatar
			});
			await locals.pb?.collection('users').requestVerification(result.data.email);
		} catch (err) {
			console.log(err);
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
