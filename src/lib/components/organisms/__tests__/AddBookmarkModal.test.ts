import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import AddBookmarkModal from "../AddBookmarkModal.svelte";
import { API } from "~/lib/pocketbase/frontend";

describe("AddBookmarkModal", () => {
	test("Successfully render add bookmark modal", async () => {
		const user = userEvent.setup();
		const mock = vi.spyOn(API.prototype, "createBookmark");
		const ref = document.createElement("change") as HTMLInputElement;

		const { getByRole, getByLabelText } = render(AddBookmarkModal, {
			props: {
				ref,
				collectionID: "ID"
			}
		});

		const input = getByLabelText("");
		await user.clear(input);
		await user.type(input, "https://haseebmajid.dev");

		const button = getByRole("button", { name: "Add Bookmark" });
		await user.click(button);

		expect(mock).toHaveBeenCalledWith("ID", "https://haseebmajid.dev");
	});
});
