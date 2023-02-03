import { render } from "@testing-library/svelte";
import SoapSolid from "svelte-awesome-icons/SoapSolid.svelte";
import { describe, expect, test } from "vitest";

import ProfileMenuItem from "./ProfileMenuItem.svelte";

describe("ProfileMenuItem", () => {
	test("Successfully renders profile menu item", async () => {
		const { getByText } = render(ProfileMenuItem, {
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
