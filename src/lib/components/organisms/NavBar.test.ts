import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import NavBar from "./NavBar.svelte";

describe("NavBar", () => {
	test("Successfully render NavBar", async () => {
		const { getByText } = render(NavBar, {});
		const login = getByText("Login");
		expect(login.getAttribute("href")).toBe("/login");
	});
});
