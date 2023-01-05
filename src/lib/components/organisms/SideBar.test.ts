import { render } from "@testing-library/svelte";
import { EnvelopeSolid, GearSolid } from "svelte-awesome-icons";
import { describe, test } from "vitest";

import SideBar from "./SideBar.svelte";

describe("SideBar", () => {
	test("Successfully render SideBar", async () => {
		const { getByText } = render(SideBar, {
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
				currentPath: "/my/settings",
				mainPageLink: "/my/dashboard"
			}
		});
		getByText("Settings");
		getByText("Dashboard");
	});
});
