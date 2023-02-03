import { render } from "@testing-library/svelte";
import EnvelopeSolid from "svelte-awesome-icons/EnvelopeSolid.svelte";
import GearSolid from "svelte-awesome-icons/GearSolid.svelte";
import { describe, test } from "vitest";

import SideBarItems from "./SideBarItems.svelte";

describe("SideBarItems", () => {
	test("Successfully render SideBarItems", async () => {
		const { getByText } = render(SideBarItems, {
			props: {
				menuItems: [
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
