import { createEvent, fireEvent, render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

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
					bookmarks: {
						unsortedBookmarkCount: 5,
						bookmarkCount: 15
					},
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

		getByText("All Bookmarks");
		getByText("15");
		getByText("Unsorted Bookmarks");
		getByText("5");

		// TODO: check it adds up all bookmark
		getByText("All Bookmarks");
		getByText("15");
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
					bookmarks: {
						unsortedBookmarkCount: 5,
						bookmarkCount: 15
					},
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

	test("Successfully show install prompt on event fire", async () => {
		const event = createEvent("beforeinstallprompt", window, {
			userChoice: new Promise((res) => res({ outcome: "accepted", platform: "" })),
			prompt: () => new Promise((res) => res(undefined))
		});
		const { getByText, queryByText } = render(SideBar, {
			props: {
				user: {
					isLoggedIn: false,
					nickname: "test",
					email: "test@bookmarkey.app",
					avatar: ""
				},
				collections: {
					bookmarks: {
						unsortedBookmarkCount: 5,
						bookmarkCount: 15
					},
					groups: [],
					collections: []
				},
				currentPath: "/my/settings"
			}
		});

		const promptText = queryByText("Make managing your bookmarks easier with our free app!");
		expect(promptText).toBe(null);
		await fireEvent(window, event);
		getByText("Make managing your bookmarks easier with our free app!");
	});
});
