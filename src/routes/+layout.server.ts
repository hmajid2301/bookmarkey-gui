import type { LayoutServerLoad } from './$types';

import type { LoggedIn } from '$lib/components/organisms/navbar.svelte';

export type OutputType = { loggedIn: LoggedIn };

export const load: LayoutServerLoad<OutputType> = async ({ locals }) => {
	return {
		loggedIn: {
			isLoggedIn: locals.pb?.authStore.isValid ? true : false,
			avatar: locals.user?.avatar,
			email: locals.user?.email
		}
	};
};
