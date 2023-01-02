import { render } from "@testing-library/svelte";
import type { ComponentProps } from "svelte";
import { describe, test } from "vitest";

import UpdatePassword from "./UpdatePasswordForm.svelte";

const defaultProps: ComponentProps<UpdatePassword> = {
	values: {
		currentPassword: "",
		password: "",
		passwordConfirm: ""
	},
	errors: {
		currentPassword: [],
		password: [],
		passwordConfirm: []
	}
};

describe("UpdatePassword", () => {
	test.each([["Current Password"], ["Password"], ["Confirm Password"]])(
		"Renders all password fields",
		async (field) => {
			const { getByLabelText } = render(UpdatePassword, defaultProps);
			getByLabelText(field, { selector: "input" });
		}
	);
});
