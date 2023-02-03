import { render } from "@testing-library/svelte";
import SoapSolid from "svelte-awesome-icons/SoapSolid.svelte";
import { describe, expect, test } from "vitest";

import SideBarItem from "./SideBarItem.svelte";

describe("SideBarItem", () => {
	test("Successfully renders side bar item", async () => {
		const { getByText } = render(SideBarItem, {
			props: {
				link: "/example",
				name: "Example",
				iconComponent: SoapSolid
			}
		});
		const item = getByText("Example");
		expect(item.parentElement?.getAttribute("href")).toBe("/example");
	});
});
