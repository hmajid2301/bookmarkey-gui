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

		throw redirect(303, '/account/login');
	}
};
