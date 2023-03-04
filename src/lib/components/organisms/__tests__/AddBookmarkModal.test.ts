import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import html from "svelte-htm";
import { describe, expect, test, vi } from "vitest";

import AddBookmarkModal from "../AddBookmarkModal.svelte";

describe("AddBookmarkModal", () => {
	test("Successfully render add bookmark modal", async () => {
		const user = userEvent.setup();
		const ref = document.createElement("change") as HTMLInputElement;

		const { container } = render(html`
			<${AddBookmarkModal} collectionID="id" bind:${ref} />
		`);

		const mock = vi.fn();
		const form = container.querySelector("form");
		if (form === null) {
			throw Error("expected form to be present in bookmark modal");
		}
		form.addEventListener("submit", mock);

		const input = screen.getByLabelText("");
		await user.clear(input);
		await user.type(input, "collection");
		const button = screen.getByRole("button", { name: "Add Bookmark" });
		await user.click(button);

		expect(mock).toHaveBeenCalled();
	});
});
