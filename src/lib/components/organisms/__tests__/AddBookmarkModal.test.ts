import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import AddBookmarkModal from "../AddBookmarkModal.svelte";
import { API } from "~/lib/api/client";

describe("AddBookmarkModal", () => {
	test("Successfully render add bookmark modal", async () => {
		const user = userEvent.setup();
		const mock = vi.spyOn(API.prototype, "createBookmark");
		vi.spyOn(window, "close");
		window.close = vi.fn();

		const { getByRole } = render(AddBookmarkModal, {
			props: {
				url: "https://example.com",
				collections: [],
				metadata: {
					url: "",
					image: "",
					title: "",
					description: ""
				}
			}
		});

		const button = getByRole("button", { name: "Add Bookmark" });
		await user.click(button);

		expect(mock).toHaveBeenCalledWith("-1", "https://example.com");
	});
});
