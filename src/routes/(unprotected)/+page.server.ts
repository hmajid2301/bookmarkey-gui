import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad<void> = async ({ locals }) => {
	if (locals.pb?.authStore.isValid) {
		throw redirect(303, '/dashboard');
	}
};
