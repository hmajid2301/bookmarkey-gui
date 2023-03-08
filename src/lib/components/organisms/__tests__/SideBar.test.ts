import { render } from "@testing-library/svelte";
import { describe, test } from "vitest";

import SideBar from "../SideBar.svelte";

describe("SideBar", () => {
	test("Successfully render SideBar", async () => {
		const { getByText } = render(SideBar, {
			props: {
				user: {
					isLoggedIn: false,
					nickname: "test",
					email: "test@bookmarkey.app",
					avatar: ""
				},
				collections: {
					unsortedBookmarkCount: 5,
					collections: [
						{
							id: "id",
							name: "my collection",
							bookmarkCount: 10
						}
					]
				},
				currentPath: "/my/settings"
			}
		});

		const c = getByText("my collection").parentElement;
		if (!c) {
			throw Error("collections not found");
		}

		getByText("10");
		getByText("my collection");

		getByText("Unsorted");
		getByText("5");
	});

	test("Successfully render groups and collections", async () => {
		const { getByText } = render(SideBar, {
			props: {
				user: {
					isLoggedIn: false,
					nickname: "test",
					email: "test@bookmarkey.app",
					avatar: ""
				},
				collections: {
					unsortedBookmarkCount: 0,
					groups: [
						{
							name: "My Group",
							id: "abcde",
							collections: [
								{
									id: "id1",
									name: "My Group Collection",
									bookmarkCount: 0
								},
								{
									id: "id2",
									name: "My Other Group Collection",
									bookmarkCount: 5
								}
							]
						}
					],
					collections: [
						{
							id: "a id",
							name: "my collection",
							bookmarkCount: 10
						}
					]
				},
				currentPath: "/my/settings"
			}
		});

		["My Group", "my collection", "My Group Collection", "My Other Group Collection"].forEach(
			(elem) => {
				getByText(elem);
			}
		);
	});
});
