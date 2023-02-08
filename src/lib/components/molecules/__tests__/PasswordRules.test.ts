import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import PasswordRules from "../PasswordRules.svelte";

describe("PasswordRules", () => {
	test("Successfully renders error rule", async () => {
		const { getByText } = render(PasswordRules, {
			props: {
				password: ""
			}
		});
		const item = getByText("Passwords need to be at least 8 characters long");
		expect(item).toBeTruthy;
	});

	test("Successfully renders success rule", async () => {
		const { getByText } = render(PasswordRules, {
			props: {
				password: "securePassword"
			}
		});
		const item = getByText("Password meets minimum length criteria");
		expect(item).toBeTruthy;
	});
});
