import type { LayoutServerLoad } from './$types';
import type { AuthProviderWithRedirect } from './types';

export type OutputType = { authProviders: Record<string, AuthProviderWithRedirect> };

export const load: LayoutServerLoad<OutputType> = async ({ locals, url }) => {
	const authMethods = await locals.pb?.collection('users').listAuthMethods();
	if (!authMethods) {
		return {
			authProviders: {},
			user: undefined
		};
	}

	const authProviders: Record<string, AuthProviderWithRedirect> = {};

	authMethods.authProviders.forEach((authProvider) => {
		const redirectURL = `${url.origin}/account/callback`;
		authProviders[authProvider.name] = {
			redirect: `${authProvider.authUrl}${redirectURL}`,
			...authProvider
		};
	});

	return {
		user: !locals.user ? undefined : locals.user,
		authProviders: authProviders
	};
};
