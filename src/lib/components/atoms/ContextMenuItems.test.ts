import { render } from "@testing-library/svelte";
import { SoapSolid } from "svelte-awesome-icons";
import { describe, expect, test } from "vitest";

import ContextMenuItems from "./ContextMenuItems.svelte";

describe("ContextMenuItems", () => {
	test("Successfully renders context menu item", async () => {
		const { getByText } = render(ContextMenuItems, {
			props: {
				link: "/example",
				name: "Example",
				iconComponent: SoapSolid
			}
		});
		const item = getByText("Example");
		expect(item.getAttribute("href")).toBe("/example");
	});
});
