import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import OAuthLoginButton from "../OAuthLoginButton.svelte";

describe("OAuthLoginButton", () => {
	test("Successfully renders buttons", async () => {
		const { getAllByRole } = render(OAuthLoginButton, {
			props: {
				authProviders: {
					gitlab: {
						redirect: "https://gitlab.com",
						name: "gitlab",
						state: "state",
						codeVerifier: "verifier",
						codeChallenge: "code",
						codeChallengeMethod: "method",
						authUrl: "auth"
					}
				}
			}
		});

		const buttons = getAllByRole("button");
		expect(buttons).toBeTruthy();
	});
});
