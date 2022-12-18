import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

import { config } from './config';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('HELLO', config.PocketBaseURL);
	event.locals.pb = new PocketBase(config.PocketBaseURL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	console.log('ABC', config.PocketBaseURL);

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = event.locals.pb?.authStore.model;
			console.log('def', config.PocketBaseURL);
		}
	} catch (err) {
		console.log('ERR', err);
		event.locals.user = undefined;
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);
	const isProd = process.env.NODE_ENV === 'production' ? true : false;
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax' })
	);
	console.log('cdc', config.PocketBaseURL);
	return response;
};
