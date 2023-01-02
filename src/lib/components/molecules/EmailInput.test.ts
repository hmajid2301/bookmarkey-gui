import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import EmailInput from "./EmailInput.svelte";

describe("EmailInput", () => {
	test("Successfully update email input when user types", async () => {
		const user = userEvent.setup();
		const { getByLabelText, getByDisplayValue } = render(EmailInput, {
			props: {
				value: "hello@haseebmajid.dev",
				errors: []
			}
		});
		const input = getByLabelText("Email");
		await user.clear(input);
		await user.type(input, "test@haseebmajid.dev");
		const value = getByDisplayValue("test@haseebmajid.dev");
		expect(value).toBeTruthy();
	});
});
