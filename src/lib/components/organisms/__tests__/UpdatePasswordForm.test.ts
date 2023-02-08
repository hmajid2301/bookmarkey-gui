import { render } from "@testing-library/svelte";
import { describe, test } from "vitest";

import UpdatePasswordForm from "../UpdatePasswordForm.svelte";

describe("UpdatePasswordForm", () => {
	test.each([["Current Password"], ["Password"]])("Renders all password fields", async (field) => {
		const { getByLabelText } = render(UpdatePasswordForm, {
			props: {
				values: {
					currentPassword: "",
					password: ""
				},
				errors: {
					currentPassword: [],
					password: []
				}
			}
		});
		getByLabelText(field, { selector: "input" });
	});
});
