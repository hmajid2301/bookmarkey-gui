import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import EmailVerificationForm from "../EmailVerificationForm.svelte";

describe("EmailVerificationForm", () => {
	test("Successfully render email verification form", async () => {
		const user = userEvent.setup();
		const { getByRole, getByLabelText, container } = render(EmailVerificationForm, {
			props: {
				email: "hello@haseebmajid.dev"
			}
		});

		const mock = vi.fn();
		const form = container.querySelector("form");
		if (form === null) {
			throw Error("expected form to be present in email verification");
		}
		form.addEventListener("submit", mock);

		const email = getByLabelText("Email");
		await user.clear(email);
		await user.type(email, "test@haseebmajid.dev");

		const button = getByRole("button");
		await user.click(button);
		expect(mock).toHaveBeenCalled();
	});
});
