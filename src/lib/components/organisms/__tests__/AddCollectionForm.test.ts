import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import AddCollectionForm from "../AddCollectionForm.svelte";
import { API } from "~/lib/pocketbase/frontend";

describe("AddCollectionForm", () => {
	test("Successfully render add collection form", async () => {
		const user = userEvent.setup();
		const mock = vi.spyOn(API.prototype, "addCollection");
		const ref = document.createElement("change") as HTMLInputElement;

		const { getByLabelText } = render(AddCollectionForm, {
			props: {
				ref
			}
		});

		const input = getByLabelText("");
		await user.clear(input);
		await user.type(input, "collection{enter}");

		expect(mock).toHaveBeenCalledWith("collection");
	});
});
