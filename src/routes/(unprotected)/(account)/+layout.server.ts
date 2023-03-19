import type { AuthMethodsList } from "pocketbase";

import type { AuthProviderWithRedirect } from "~/lib/types/api";

export const load = async ({ locals, url }) => {
	let authMethods: AuthMethodsList | undefined;
	try {
		authMethods = await locals.pb?.collection("users").listAuthMethods();
	} catch (err) {
		console.error("ERROR", err);
	}
	if (!authMethods) {
		return {
			authProviders: {},
			user: undefined
		};
	}
	const authProviders: Record<string, AuthProviderWithRedirect> = {};

	authMethods.authProviders.forEach((authProvider) => {
		const redirectURL = `${url.origin}/callback`;
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
