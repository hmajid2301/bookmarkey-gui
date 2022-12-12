import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' }),
	password: z.string({ required_error: 'Password is required' })
});

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());
		const result = loginSchema.safeParse(data);

		if (!result.success) {
			return invalid(400, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb
				?.collection('users')
				.authWithPassword(result.data.email, result.data.password);
		} catch (err) {
			if (err instanceof ClientResponseError) {
				if (err.status == 400) {
					return {
						loginError: 'Wrong email and password combination.'
					};
				}
			}
			return {
				loginError: 'Failed to login, please try again later.'
			};
		}

		throw redirect(303, '/');
	}
};
