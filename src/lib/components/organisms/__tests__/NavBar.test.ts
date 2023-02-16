import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import NavBar from "../NavBar.svelte";

describe("NavBar", () => {
	test("Successfully render NavBar on login page", async () => {
		const { queryAllByText } = render(NavBar, {
			props: {
				currentPath: "/login"
			}
		});
		const login = queryAllByText("Login")[0];
		if (!login) {
			throw Error("Login not found");
		}
		expect(login.getAttribute("href")).toBe("/login");
		expect(login.className).toContain("active");
	});
});
