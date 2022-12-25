import type { LayoutServerLoad } from './$types';

import type { User } from '~/lib/types/logged_in';

export type OutputType = { user: User };

export const load: LayoutServerLoad<OutputType> = async ({ locals }) => {
	let avatar: string | undefined;
	if (locals.user?.avatar) {
		avatar = `${locals.pb?.baseUrl}/api/files/${locals.user?.collectionId}/${locals.user?.id}/${locals.user?.avatar}`;
	}
	return {
		user: {
			isLoggedIn: locals.pb?.authStore.isValid ? true : false,
			email: locals.user?.email,
			nickname: locals.user?.name || locals.user?.email,
			avatar: avatar || ''
		}
	};
};
