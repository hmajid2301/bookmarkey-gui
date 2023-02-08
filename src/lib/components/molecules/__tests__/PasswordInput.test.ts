import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import PasswordInput from "../PasswordInput.svelte";

describe("PasswordInput", () => {
	test("Successfully update password input when user types", async () => {
		const user = userEvent.setup();
		const { getByLabelText, getByDisplayValue } = render(PasswordInput, {
			props: {
				value: "MyPassword",
				errors: []
			}
		});
		const input = getByLabelText("Password");
		await user.clear(input);
		await user.type(input, "MyNewPass");
		const value = getByDisplayValue("MyNewPass");
		expect(value).toBeTruthy();
	});

	test("Successfully show password when user clicks `show` button", async () => {
		const user = userEvent.setup();
		const { getByLabelText, getByRole } = render(PasswordInput, {
			props: {
				value: "MyPassword",
				errors: []
			}
		});
		const input = getByLabelText("Password");

		expect(input.getAttribute("type")).toBe("password");
		const button = getByRole("button");
		expect(button.textContent).toBe("show");
		await user.click(button);
		expect(button.textContent).toBe("hide");
		expect(input.getAttribute("type")).toBe("text");
	});
});
