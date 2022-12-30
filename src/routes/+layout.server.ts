import * as Sentry from '@sentry/browser';

import type { LayoutServerLoad } from './$types';

export interface User {
	isLoggedIn: boolean;
	email: string;
	avatar?: string;
	nickname: string;
}

export type OutputType = { user: User };

export const load: LayoutServerLoad<OutputType> = async ({ locals }) => {
	let avatar: string | undefined;
	if (locals.user?.avatar) {
		avatar = `${locals.pb?.baseUrl}/api/files/${locals.user?.collectionId}/${locals.user?.id}/${locals.user?.avatar}`;
	}
	Sentry.setContext('user', {
		id: locals.user?.id,
		nickname: locals.user?.name
	});
	return {
		user: {
			isLoggedIn: locals.pb?.authStore.isValid ? true : false,
			email: locals.user?.email,
			nickname: locals.user?.name || locals.user?.email,
			avatar: avatar || ''
		}
	};
};
