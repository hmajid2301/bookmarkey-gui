import * as Sentry from '@sentry/browser';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

import { HTTP_BAD_REQUEST, HTTP_SEE_OTHER, HTTP_SERVER_ERROR } from '~/lib/constants/http';

interface Login {
	email: string;
	password: string;
}

const loginSchema: z.ZodType<Login> = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' }),
	password: z.string({ required_error: 'Password is required' })
});

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[Login]>);
		const result = loginSchema.safeParse(data);

		if (!result.success) {
			return fail(HTTP_BAD_REQUEST, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb
				?.collection('users')
				.authWithPassword(result.data.email, result.data.password);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb?.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			if (err instanceof ClientResponseError) {
				if (err.status === HTTP_BAD_REQUEST) {
					throw error(err.status, 'Wrong email and password combination.');
				}
			}
			Sentry.captureException(err);
			throw error(HTTP_SERVER_ERROR, 'Failed to login, please try again later.');
		}

		throw redirect(HTTP_SEE_OTHER, '/my/dashboard');
	}
};
