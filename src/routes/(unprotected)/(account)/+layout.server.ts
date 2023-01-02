import type { LayoutServerLoad } from "./$types";

import type { AuthProviderWithRedirect } from "~/lib/components/molecules/OAuthLoginButton.svelte";

export type OutputType = { authProviders: Record<string, AuthProviderWithRedirect> };

export const load: LayoutServerLoad<OutputType> = async ({ locals, url }) => {
	let authMethods;
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
