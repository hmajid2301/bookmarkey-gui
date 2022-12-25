import { error, fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from '~/lib/constants/http';

interface Reset {
	email: string;
}

const resetSchema: z.ZodType<Reset> = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' })
});

export const actions: Actions = {
	resetPassword: async ({ locals, request }) => {
		const data = Object.fromEntries((await request.formData()) as Iterable<[Reset]>);
		const result = resetSchema.safeParse(data);

		if (!result.success) {
			return fail(HTTP_BAD_REQUEST, {
				data: data,
				errors: result.error.flatten().fieldErrors
			});
		}

		try {
			await locals.pb?.collection('users').requestPasswordReset(result.data.email);
			return {
				success: true
			};
		} catch (err) {
			throw error(HTTP_SERVER_ERROR, 'Failed to send password reset email');
		}
	}
};
