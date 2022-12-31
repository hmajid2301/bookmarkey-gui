import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

import { HTTP_SEE_OTHER } from '~/lib/constants/http';

export const GET: RequestHandler = () => {
	throw redirect(HTTP_SEE_OTHER, '/my/settings');
};
