import type { LoggedIn } from '~/components/organisms/navbar.svelte';
import type { LayoutServerLoad } from './$types';

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
