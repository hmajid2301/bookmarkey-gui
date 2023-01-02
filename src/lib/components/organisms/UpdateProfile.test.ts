import { render } from "@testing-library/svelte";
import { describe, test } from "vitest";

import UpdateProfile from "./UpdateProfileForm.svelte";

describe("UpdateProfile", () => {
	test("Renders update profile component", async () => {
		const { getByLabelText } = render(UpdateProfile, {
			props: {
				values: {
					nickname: "haseeb",
					email: "hello@haseebmajid.dev"
				},
				errors: {
					nickname: [],
					email: []
				},
				avatar: "user.png"
			}
		});
		getByLabelText("Nickname");
		getByLabelText("Email");
	});
});
