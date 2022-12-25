import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { HTTP_SEE_OTHER } from '~/lib/constants/http';

export const load: PageServerLoad<void> = async ({ locals }) => {
	if (locals.pb?.authStore.isValid) {
		throw redirect(HTTP_SEE_OTHER, '/my/dashboard');
	}
};
