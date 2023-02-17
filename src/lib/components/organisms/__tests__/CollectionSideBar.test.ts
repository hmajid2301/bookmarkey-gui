import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import GroupsCollections from "../CollectionSideBar.svelte";

describe("GroupsCollections", () => {
	// TODO: work out how to test with stores
	// test("Successfully show add collection form, with empty groups and collections", async () => {
	// 	const { getByPlaceholderText, getByRole, getByText } = render(GroupsCollections, {
	// 		props: {
	// 			currentPath: "/my/dashboard",
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
		const { getByRole } = render(GroupsCollections, {
			props: {
				currentPath: "/my/dashboard",
				showAddGroupForm: true,
				collections: {
					groups: [],
					collections: []
				}
			}
		});

		const dialog = getByRole("dialog");
		expect(dialog.className).toContain("fixed");
	});

	test("Successfully show all collections without any groups", async () => {
		const { getByText, queryByText } = render(GroupsCollections, {
			props: {
				currentPath: "/my/dashboard",
				collections: {
					groups: [],
					collections: [
						{
							id: "id1",
							name: "First Collection"
						},
						{
							id: "id2",
							name: "Second Collection"
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
		const { getByText, queryAllByText } = render(GroupsCollections, {
			props: {
				currentPath: "/my/dashboard",
				collections: {
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
