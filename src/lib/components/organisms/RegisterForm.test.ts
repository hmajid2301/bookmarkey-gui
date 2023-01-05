import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import RegisterForm from "./RegisterForm.svelte";

describe("RegisterForm", () => {
	test("Successfully render register form", async () => {
		const user = userEvent.setup();
		const { getByRole, getByLabelText, container } = render(RegisterForm, {
			props: {
				register: {
					email: "hello@haseebmajid.dev",
					password: "MyPassword11"
				},
				errors: []
			}
		});

		const mock = vi.fn();
		const form = container.querySelector("form");
		if (form === null) {
			throw Error("expected form to be present in password reset");
		}
		form.addEventListener("submit", mock);

		const email = getByLabelText("Email");
		const password = getByLabelText("Password");
		await user.clear(email);
		await user.type(email, "test@haseebmajid.dev");
		await user.type(password, "MySec%re@Password@112");

		const button = getByRole("button", { name: /create account/i });
		await user.click(button);
		expect(mock).toHaveBeenCalled();
	});
});
