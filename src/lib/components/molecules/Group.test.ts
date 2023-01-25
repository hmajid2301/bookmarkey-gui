import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Group from "./Group.svelte";

describe("Group", () => {
	test("Should show group with collections", async () => {
		const hideGroups = new Set<string>();
		const { getByText } = render(Group, {
			props: {
				currentPath: "/my/dashboard",
				hideGroups: hideGroups,
				group: {
					id: "abcd",
					name: "Test",
					collections: []
				}
			}
		});
		const group = getByText("Test");
		expect(group).toBeTruthy();
	});
});
