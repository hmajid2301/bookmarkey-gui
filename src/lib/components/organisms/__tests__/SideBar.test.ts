import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import SideBar from "../SideBar.svelte";

describe("SideBar", () => {
	test("Successfully render SideBar", async () => {
		const { getByText, getByRole } = render(SideBar, {
			props: {
				nickname: "test",
				email: "test@bookmarkey.app",
				avatar: "",
				collections: {
					collections: [
						{
							id: "id",
							name: "my collection"
						}
					]
				},
				currentPath: "/my/settings",
				mainPageLink: "/my/dashboard"
			}
		});

		const s = getByRole("link", { name: "Settings" });
		expect(s.getAttribute("href")).toBe("/my/settings");
		const d = getByRole("link", { name: "Dashboard" });
		expect(d.getAttribute("href")).toBe("/my/dashboard");
		const c = getByText("my collection").parentElement;
		if (!c) {
			throw Error("collections not found");
		}
		expect(c.getAttribute("href")).toBe("/my/collections/id");
	});

	test("Successfully render groups and collections", async () => {
		const { getByText } = render(SideBar, {
			props: {
				nickname: "test",
				email: "test@bookmarkey.app",
				avatar: "",
				collections: {
					groups: [
						{
							name: "My Group",
							id: "abcde",
							collections: [
								{ id: "id1", name: "My Group Collection" },
								{ id: "id2", name: "My Other Group Collection" }
							]
						}
					],
					collections: [
						{
							id: "a id",
							name: "my collection"
						}
					]
				},
				currentPath: "/my/settings",
				mainPageLink: "/my/dashboard"
			}
		});

		["My Group", "my collection", "My Group Collection", "My Other Group Collection"].forEach(
			(elem) => {
				getByText(elem);
			}
		);
	});
});
