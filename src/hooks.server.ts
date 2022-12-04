import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { config } from './config';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(config.PocketBaseURL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (!event.locals.pb.authStore.isValid) {
		event.locals.user = undefined;
	}
	event.locals.user = event.locals.pb.authStore.model;

	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
	return response;
};
