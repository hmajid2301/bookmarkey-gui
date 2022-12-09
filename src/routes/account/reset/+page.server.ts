import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	resetPassword: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb?.collection('users').requestPasswordReset(body['email'] as string);
			return {
				success: true
			};
		} catch (err) {
			console.log('Error resettings password', err);
			return;
		}
	}
};
