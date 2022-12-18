import type { LayoutServerLoad } from './$types';
import type { AuthProviderWithRedirect } from './types';

export type OutputType = { authProviders: Record<string, AuthProviderWithRedirect> };

export const load: LayoutServerLoad<OutputType> = async ({ locals, url }) => {
	console.log('123214');
	let authMethods;
	try {
		authMethods = await locals.pb?.collection('users').listAuthMethods();
	} catch (err) {
		console.error('ERROR', err);
	}
	console.log('hjhkahkda');
	if (!authMethods) {
		return {
			authProviders: {},
			user: undefined
		};
	}
	console.log('abcd');

	const authProviders: Record<string, AuthProviderWithRedirect> = {};

	authMethods.authProviders.forEach((authProvider) => {
		const redirectURL = `${url.origin}/account/callback`;
		authProviders[authProvider.name] = {
			redirect: `${authProvider.authUrl}${redirectURL}`,
			...authProvider
		};
	});

	console.log('1237891791791');
	return {
		user: !locals.user ? undefined : locals.user,
		authProviders: authProviders
	};
};
