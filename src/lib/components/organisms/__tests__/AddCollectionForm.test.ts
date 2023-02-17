import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import html from "svelte-htm";
import { describe, expect, test, vi } from "vitest";

import AddCollectionForm from "../AddCollectionForm.svelte";

describe("AddCollectionForm", () => {
	test("Successfully render add collection form", async () => {
		const user = userEvent.setup();
		const ref: HTMLInputElement = document.createElement("input");

		const { container } = render(html`
		<${AddCollectionForm} bind:${ref}>
        button
		</${AddCollectionForm}>
	`);

		const mock = vi.fn();
		const form = container.querySelector("form");
		if (form === null) {
			throw Error("expected form to be present in add collection");
		}
		form.addEventListener("submit", mock);

		const input = screen.getByLabelText("");
		await user.clear(input);
		await user.type(input, "collection{enter}");

		expect(mock).toHaveBeenCalled();
	});
});
