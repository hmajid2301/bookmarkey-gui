import { redirect } from "@sveltejs/kit";

export const GET = async ({ locals, url, cookies }) => {
	const redirectURL = `${url.origin}/callback`;
	const providerName = cookies.get("provider");
	const expectedState = cookies.get("state");

	const query = new URLSearchParams(url.search);
	const state = query.get("state");
	const code = query.get("code");

	const authMethods = await locals.pb?.collection("users").listAuthMethods();
	if (!authMethods?.authProviders) {
		console.log("authy providers");
		throw redirect(303, "/login");
	}
	const provider = authMethods.authProviders.find((element) => element.name === providerName);
	if (!provider) {
		console.log("Provider not found");
		throw redirect(303, "/login");
	}

	if (expectedState !== state) {
		console.log("state does not match expected", expectedState, state);
		throw redirect(303, "/login");
	}

	try {
		await locals.pb
			?.collection("users")
			.authWithOAuth2(provider.name, code || "", provider.codeVerifier, redirectURL);
	} catch (err) {
		console.log("Error logging in with 0Auth user", err);
	}

	throw redirect(303, "/");
};
