import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb
				?.collection('users')
				.authWithPassword(body['email'] as string, body['password'] as string);

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb?.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log('Error logging in user', err);
			return;
		}

		throw redirect(303, '/');
	}
};
