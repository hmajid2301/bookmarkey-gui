import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import Input from "./Input.svelte";

describe("Input", () => {
	test("Successfully update password input when user types", async () => {
		const user = userEvent.setup();
		const { getByDisplayValue } = render(Input, {
			props: {
				type: "password",
				name: "password",
				value: "MyPassword"
			}
		});
		const input = getByDisplayValue("MyPassword");
		await user.type(input, "MyNewPassword");
		const value = getByDisplayValue("MyPasswordMyNewPassword");
		expect(value).toBeTruthy();
	});

	test("Successfully render input with placeholder", async () => {
		const { getByPlaceholderText } = render(Input, {
			props: {
				type: "password",
				name: "password",
				placeholder: "MyPassword"
			}
		});
		const input = getByPlaceholderText("MyPassword");
		expect(input).toBeTruthy();
	});

	test("Fail to update password input that is disabled", async () => {
		const user = userEvent.setup();
		const { getByDisplayValue } = render(Input, {
			props: {
				type: "password",
				name: "password",
				value: "MyPassword",
				disabled: true
			}
		});
		const input = getByDisplayValue("MyPassword");
		await user.type(input, "MyNewPassword");
		const value = getByDisplayValue("MyPassword");
		expect(value).toBeTruthy();
	});
});
