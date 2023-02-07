import { render } from "@testing-library/svelte";
import { describe, test } from "vitest";

import SideBar from "./SideBar.svelte";

describe("SideBar", () => {
	test("Successfully render SideBar", async () => {
		const { getByText, getAllByText } = render(SideBar, {
			props: {
				nickname: "test",
				email: "test@bookmarkey.app",
				avatar: "",
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
		getAllByText("Settings");
		getByText("Dashboard");
		getByText("my collection");
	});
});
