import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import AvatarProfileMenu from "./AvatarProfileMenu.svelte";

// Unable to test hidden children elements; https://github.com/testing-library/dom-testing-library/issues/846
describe("AvatarProfileMenu", () => {
	test("Successfully render avatar profile menu", async () => {
		const { getByText } = render(AvatarProfileMenu, {
			props: {
				nickname: "haseeb",
				avatar: "/user.png",
				email: "hello@haseebmajid.dev"
			}
		});

		["My Dashboard", "Settings", "Log Out"].forEach((element) => {
			const e = getByText(element);
			expect(e).toBeTruthy();
		});
	});
});
