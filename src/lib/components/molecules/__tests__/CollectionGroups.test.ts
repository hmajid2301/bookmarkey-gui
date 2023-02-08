import { render } from "@testing-library/svelte";
import { describe, test } from "vitest";

import CollectionGroups from "../CollectionGroups.svelte";

describe("CollectionGroups", () => {
	test("Successfully render collections and groups", async () => {
		const { getByText } = render(CollectionGroups, {
			props: {
				currentPath: "/my/dashboard",
				collections: {
					groups: [
						{
							id: "group",
							name: "My Group",
							collections: []
						}
					],
					collections: [{ id: "collection", name: "No Group Collection" }]
				}
			}
		});

		getByText("My Group");
		getByText("No Group Collection");
	});
});
