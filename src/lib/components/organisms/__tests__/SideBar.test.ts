import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import SideBar from "../SideBar.svelte";

describe("SideBar", () => {
	test("Successfully render SideBar", async () => {
		const { getByText } = render(SideBar, {
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
				mainPageLink: "/my/dashboard",
				selectedDrag: {
					group: {},
					addCollection: false
				},
				dragging: {
					collection: {},
					group: {}
				}
			}
		});

		const s = getByText("Settings").parentElement;
		if (!s) {
			throw Error("settings not found");
		}
		expect(s.getAttribute("href")).toBe("/my/settings");
		const d = getByText("Dashboard").parentElement;
		if (!d) {
			throw Error("dashboard not found");
		}
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
				mainPageLink: "/my/dashboard",
				selectedDrag: {
					group: {},
					addCollection: false
				},
				dragging: {
					collection: {},
					group: {}
				}
			}
		});

		["My Group", "my collection", "My Group Collection", "My Other Group Collection"].forEach(
			(elem) => {
				getByText(elem);
			}
		);
	});
});
