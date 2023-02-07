import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import html from "svelte-htm";
import { describe, expect, test, vi } from "vitest";

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
		await user.clear(input);
		await user.type(input, "MyNewPassword");
		const value = getByDisplayValue("MyNewPassword");
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

	test("Successfully calls on:input function", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(html`
			<${Input} name="password" type="password" value="MyPassword" on:input=${mock} />
		`);
		const newPassword = "MyNewPassword";
		const input = screen.getByDisplayValue("MyPassword");
		await user.clear(input);
		await user.type(input, newPassword);
		expect(mock).toHaveBeenCalledTimes(newPassword.length + 1);
	});

	test("Successfully calls on:blur function", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(html`
			<${Input} name="password" type="password" value="MyPassword" on:blur=${mock} />
		`);
		const newPassword = "MyNewPassword";
		const input = screen.getByDisplayValue("MyPassword");
		await user.clear(input);
		await user.type(input, newPassword);
		input.blur();
		expect(mock).toHaveBeenCalled();
	});

	test("Successfully calls on:change function", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(html`
			<${Input} name="password" type="password" value="MyPassword" on:change=${mock} />
		`);
		const newPassword = "MyNewPassword";
		const input = screen.getByDisplayValue("MyPassword");
		await user.clear(input);
		await user.type(input, newPassword);
		input.blur();
		expect(mock).toHaveBeenCalled();
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
