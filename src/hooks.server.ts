import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { config } from './config';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(config.PocketBaseURL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = event.locals.pb?.authStore.model;
		}
	} catch (err) {
		event.locals.user = undefined;
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);
	const isProd = process.env.NODE_ENV === 'production' ? true : false;
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax' })
	);
	return response;
};
