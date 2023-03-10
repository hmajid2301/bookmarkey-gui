import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import AvatarProfileMenu from "../AvatarProfileMenu.svelte";

describe("AvatarProfileMenu", () => {
	test("Successfully render avatar profile menu", async () => {
		const { getByText } = render(AvatarProfileMenu, {
			props: {
				nickname: "haseeb",
				avatar: "/user.png",
				email: "hello@haseebmajid.dev"
			}
		});

		["Bookmarks", "Settings", "Log Out"].forEach((element) => {
			getByText(element);
		});
	});

	test("Successfully show context menu", async () => {
		const user = userEvent.setup();
		const { getByTestId, getByRole } = render(AvatarProfileMenu, {
			props: {
				nickname: "haseeb",
				avatar: "/user.png",
				email: "hello@haseebmajid.dev"
			}
		});

		let contextMenu = getByTestId("ContextMenu");
		expect(contextMenu.className).toContain("hidden");

		const button = getByRole("button", { name: "avatar" });
		user.click(button);

		contextMenu = getByTestId("ContextMenu");
		expect(contextMenu.className).toContain("block");
	});
});
