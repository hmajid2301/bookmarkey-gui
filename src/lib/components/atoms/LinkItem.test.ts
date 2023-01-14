import { render } from "@testing-library/svelte";
import { SoapSolid } from "svelte-awesome-icons";
import { describe, expect, test } from "vitest";

import LinkItem from "./LinkItem.svelte";

describe("SideBarItem", () => {
	test("Successfully renders side bar item", async () => {
		const { getByText } = render(LinkItem, {
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
