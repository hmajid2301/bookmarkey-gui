import { render } from "@testing-library/svelte";
import EnvelopeSolid from "svelte-awesome-icons/EnvelopeSolid.svelte";
import GearSolid from "svelte-awesome-icons/GearSolid.svelte";
import { describe, test } from "vitest";

import ProfileMenu from "./ProfileMenu.svelte";

describe("ProfileMenu", () => {
	test("Successfully render ProfileMenu", async () => {
		const { getByText } = render(ProfileMenu, {
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
				email: "haseeb@haseebmajid.dev",
				nickname: "haseeb",
				showMenu: false
			}
		});
		getByText("Settings");
		getByText("Dashboard");
	});
});
