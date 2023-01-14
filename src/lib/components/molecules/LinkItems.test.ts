import { render } from "@testing-library/svelte";
import { EnvelopeSolid, GearSolid } from "svelte-awesome-icons";
import { describe, test } from "vitest";

import LinkItems from "./LinkItems.svelte";

describe("LinkItems", () => {
	test("Successfully render LinkItems", async () => {
		const { getByText } = render(LinkItems, {
			props: {
				links: [
					{
						link: "/my/dashboard",
						name: "Dashboard",
						icon: EnvelopeSolid
					},
					{
						link: "/my/settings",
						name: "Settings",
						icon: GearSolid
					}
				],
				currentPath: "/my/settings"
			}
		});
		getByText("Settings");
		getByText("Dashboard");
	});
});
