import { invalid, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

export const resetSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' })
});

export const actions: Actions = {
	resetPassword: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());
		const result = resetSchema.safeParse(data);

		if (!result.success) {
			return invalid(400, {
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
			return {
				resetErr: 'Failed to send password reset, please try again later.'
			};
		}
	}
};
