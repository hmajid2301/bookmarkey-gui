import { redirect, type Actions } from '@sveltejs/kit';
export const actions: Actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb?.collection('users').create({ username: '', ...body });
			await locals.pb?.collection('users').requestVerification(body['email'] as string);
		} catch (err) {
			console.log('Error creating user', err);
		}

		try {
			await locals.pb
				?.collection('users')
				.authWithPassword(body['email'] as string, body['password'] as string);
		} catch (err) {
			console.log('Error logging in user', err);
		}

		throw redirect(303, '/');
	}
};
