import { render } from "@testing-library/svelte";
import { describe, test } from "vitest";

import SideBar from "./SideBar.svelte";

describe("SideBar", () => {
	test("Successfully render SideBar", async () => {
		const { getByText } = render(SideBar, {
			props: {
				collections: {
					collections: [
						{
							id: "a id",
							name: "my collection"
						}
					]
				},
				currentPath: "/my/settings",
				mainPageLink: "/my/dashboard"
			}
		});
		getByText("Settings");
		getByText("Dashboard");
		getByText("my collection");
	});
});
