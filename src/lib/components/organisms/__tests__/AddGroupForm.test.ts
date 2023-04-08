import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import AddGroupForm from "../AddGroupForm.svelte";
import { API } from "~/lib/api/client";

describe("AddGroupForm", () => {
	test("Successfully render add group form", async () => {
		const user = userEvent.setup();
		const mock = vi.spyOn(API.prototype, "createGroup");
		const ref = document.createElement("change") as HTMLInputElement;

		const { getByRole, getByLabelText } = render(AddGroupForm, {
			props: {
				ref,
				show: true
			}
		});

		const input = getByLabelText("");
		await user.clear(input);
		await user.type(input, "collection");

		const button = getByRole("button", { name: "Add Group" });
		await user.click(button);

		expect(mock).toHaveBeenCalledWith("collection");
	});
});
