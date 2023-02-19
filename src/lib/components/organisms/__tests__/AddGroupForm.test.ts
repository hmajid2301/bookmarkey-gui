import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import html from "svelte-htm";
import { describe, expect, test, vi } from "vitest";

import AddGroupForm from "../AddGroupForm.svelte";

describe("AddGroupForm", () => {
	test("Successfully render add group form", async () => {
		const user = userEvent.setup();
		const ref = document.createElement("change") as HTMLInputElement;

		const { container } = render(html`
			<${AddGroupForm} bind:${ref} />
		`);

		const mock = vi.fn();
		const form = container.querySelector("form");
		if (form === null) {
			throw Error("expected form to be present in add group");
		}
		form.addEventListener("submit", mock);

		const input = screen.getByLabelText("");
		await user.clear(input);
		await user.type(input, "collection{enter}");

		expect(mock).toHaveBeenCalled();
	});
});
