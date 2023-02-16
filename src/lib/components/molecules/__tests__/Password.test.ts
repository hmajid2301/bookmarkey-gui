import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Password from "../Password.svelte";

describe("Password", () => {
	test("Successfully render without any password", async () => {
		const { queryByText } = render(Password, {
			props: {
				value: "",
				errors: []
			}
		});
		const rule = queryByText("Passwords need to be at least 8 characters long");
		expect(rule).toBe(null);

		const indicator = queryByText("Very Weak Password");
		expect(indicator).toBe(null);
	});

	test("Successfully render with password", async () => {
		const { getByText } = render(Password, {
			props: {
				value: "hello",
				errors: []
			}
		});

		getByText("Passwords need to be at least 8 characters long");
		getByText("Very Weak Password");
	});
});
