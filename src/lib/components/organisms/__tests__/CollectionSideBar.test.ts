import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import GroupsCollections from "../CollectionSideBar.svelte";

describe("GroupsCollections", () => {
	test("Successfully show add collection form, with empty groups and collections", async () => {
		const { getByPlaceholderText, getByRole, getByText } = render(GroupsCollections, {
			props: {
				currentPath: "/my/dashboard",
				selectedDrag: {
					group: {},
					addCollection: true
				},
				collections: {
					groups: [],
					collections: []
				},
				dragging: {
					collection: {},
					group: {}
				}
			}
		});

		getByPlaceholderText("Collection Name");
		const dialog = getByRole("dialog");
		expect(dialog.className).toContain("hidden");
		getByText("Empty Collection");
	});

	test("Successfully show add group form", async () => {
		const { getByRole } = render(GroupsCollections, {
			props: {
				currentPath: "/my/dashboard",
				showAddGroupForm: true,
				selectedDrag: {
					group: {},
					addCollection: false
				},
				collections: {
					groups: [],
					collections: []
				},
				dragging: {
					collection: {},
					group: {}
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
				selectedDrag: {
					group: {},
					addCollection: false
				},
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
				},
				dragging: {
					collection: {},
					group: {}
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
				selectedDrag: {
					group: {},
					addCollection: false
				},
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
				},
				dragging: {
					collection: {},
					group: {}
				}
			}
		});

		getByText("First Collection");
		getByText("Second Collection");
		expect(queryAllByText("Empty Collection")).toHaveLength(3);
	});
});
