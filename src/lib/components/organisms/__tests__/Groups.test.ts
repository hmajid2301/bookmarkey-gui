import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Groups from "../Groups.svelte";

describe("GroupsCollections", () => {
	// TODO: work out how to test with stores
	// test("Successfully show add collection form, with empty groups and collections", async () => {
	// 	const { getByPlaceholderText, getByRole, getByText } = render(GroupsCollections, {
	// 		props: {
	// 			currentPath: "/my/collections/0",
	// 			collections: {
	// 				groups: [],
	// 				collections: []
	// 			}
	// 		}
	// 	});

	// 	getByPlaceholderText("Collection Name");
	// 	const dialog = getByRole("dialog");
	// 	expect(dialog.className).toContain("hidden");
	// 	getByText("Empty Collection");
	// });

	test("Successfully show add group form", async () => {
		const { getByRole } = render(Groups, {
			props: {
				currentPath: "/my/collections/0",
				showAddGroupForm: true,
				collections: {
					groups: [],
					collections: [],
					bookmarks: {
						unsortedBookmarkCount: 0,
						bookmarkCount: 0
					}
				}
			}
		});

		const dialog = getByRole("dialog");
		expect(dialog.className).toContain("fixed");
	});

	test("Successfully show all collections without any groups", async () => {
		const { getByText, queryByText } = render(Groups, {
			props: {
				currentPath: "/my/collections/0",
				collections: {
					bookmarks: {
						unsortedBookmarkCount: 2,
						bookmarkCount: 0
					},
					groups: [],
					collections: [
						{
							id: "id1",
							name: "First Collection",
							bookmarkCount: 0
						},
						{
							id: "id2",
							name: "Second Collection",
							bookmarkCount: 10
						}
					]
				}
			}
		});

		getByText("First Collection");
		getByText("Second Collection");
		expect(queryByText("Empty Collection")).toBe(null);
	});

	test("Successfully show all groups without any collections", async () => {
		const { getByText, queryAllByText } = render(Groups, {
			props: {
				currentPath: "/my/collections/0",
				collections: {
					bookmarks: {
						unsortedBookmarkCount: 1,
						bookmarkCount: 0
					},
					groups: [
						{
							id: "id1",
							name: "First Collection",
							collections: []
						},
						{
							id: "id2",
							name: "Second Collection",
							collections: []
						}
					],
					collections: []
				}
			}
		});

		getByText("First Collection");
		getByText("Second Collection");
		expect(queryAllByText("Empty Collection")).toHaveLength(3);
	});
});
