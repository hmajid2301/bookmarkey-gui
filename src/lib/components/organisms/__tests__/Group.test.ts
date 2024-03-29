import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import Group from "../Group.svelte";
import { API } from "~/lib/api/client";

describe("Group", () => {
	test("Should delete group without any collections", async () => {
		const mock = vi.spyOn(API.prototype, "deleteGroup");
		const user = userEvent.setup();

		const { getByText } = render(Group, {
			props: {
				currentPath: "/my/collections/0",
				hiddenGroups: new Set<string>(),
				group: {
					id: "abcd",
					name: "Test",
					collections: []
				}
			}
		});

		const group = getByText("Test").parentElement;
		if (!group) {
			throw Error("failed to find text parent element");
		}

		await user.click(group);
		// expect(getByTestId("ContextMenu").className).toContain("block");
		const deleteGroup = getByText("Delete Group");
		await user.click(deleteGroup);
		expect(mock).toHaveBeenCalledWith("abcd");
	});

	test("Successfully show add collection form", async () => {
		const user = userEvent.setup();
		const { getByPlaceholderText, getByText } = render(Group, {
			props: {
				currentPath: "/my/collections/0",
				hiddenGroups: new Set<string>(),
				group: {
					id: "abcd",
					name: "Test",
					collections: []
				}
			}
		});

		const group = getByText("Test").parentElement;
		if (!group) {
			throw Error("failed to find text parent element");
		}

		await user.click(group);
		const createCollection = getByText("Create Collection");
		await user.click(createCollection);

		getByPlaceholderText("Collection Name");
	});

	test("Successfully hide group collection in hideGroups prop ", async () => {
		const hiddenGroups = new Set<string>(["abcd"]);
		const { queryByText } = render(Group, {
			props: {
				currentPath: "/my/collections/0",
				hiddenGroups: hiddenGroups,
				group: {
					id: "abcd",
					name: "Test",
					collections: [
						{
							id: "zxy",
							name: "My Collection",
							bookmarkCount: 10
						}
					]
				}
			}
		});

		expect(queryByText("My Collection")).toBe(null);
	});

	// TODO: fix this test
	// test("Successfully hide group when group is clicked", async () => {
	// 	const user = userEvent.setup();
	// 	const { queryByText, getByText } = render(Group, {
	// 		props: {
	// 			currentPath: "/my/collections/0",
	// 			hiddenGroups: new Set<string>(),
	// 			group: {
	// 				id: "abcd",
	// 				name: "Test",
	// 				collections: [
	// 					{
	// 						id: "zxy",
	// 						name: "My Collection"
	// 					}
	// 				]
	// 			},
	// 			drag: {
	// 				group: {},
	// 				addCollection: false
	// 			}
	// 		}
	// 	});

	// 	const group = getByText("Test");
	// 	user.click(group);
	// 	screen.debug();
	// 	expect(queryByText("My Collection")).toBe(null);
	// });
});
