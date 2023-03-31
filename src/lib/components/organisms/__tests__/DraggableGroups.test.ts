import { render } from "@testing-library/svelte";
import { describe, test } from "vitest";

import DraggableGroups from "../DraggableGroups.svelte";

// TODO: fix
describe("DraggableGroup", () => {
	test("Successfully render draggable group", async () => {
		const { getByText } = render(DraggableGroups, {
			props: {
				groups: [],
				currentPath: "/my/collection/0"
			}
		});
	});
});
