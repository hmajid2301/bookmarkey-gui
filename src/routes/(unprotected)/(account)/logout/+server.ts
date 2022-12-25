import { redirect } from '@sveltejs/kit';

import type { RequestEvent, RequestHandler } from './$types';

import { HTTP_SEE_OTHER } from '~/lib/http';

export const GET: RequestHandler = ({ locals }: RequestEvent) => {
	console.log('LOGOUYT');
	locals.pb?.authStore.clear();
	locals.user = undefined;
	throw redirect(HTTP_SEE_OTHER, '/');
};
