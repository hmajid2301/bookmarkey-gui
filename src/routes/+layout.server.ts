import type { LayoutServerLoad } from './$types';

import type { User } from '~/lib/types/logged_in';

export type OutputType = { user: User };

export const load: LayoutServerLoad<OutputType> = async ({ locals }) => {
	return {
		user: {
			isLoggedIn: locals.pb?.authStore.isValid ? true : false,
			email: locals.user?.email,
			nickname: locals.user?.name || locals.user?.email,
			avatar: locals.user?.avatar
		}
	};
};
