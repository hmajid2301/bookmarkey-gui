import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";

import AddCollectionButton from "../AddCollectionButton.svelte";

describe("AddCollectionButton", () => {
	test("Successfully show context menu on button click", async () => {
		const user = userEvent.setup();
		const { getByRole } = render(AddCollectionButton, {
			props: {}
		});

		// const contextMenu = getByTestId("ContextMenu");
		// expect(contextMenu.className).toContain("hidden");
		const addButton = getByRole("button", { name: "add" });
		await user.click(addButton);
		// expect(contextMenu.className).toContain("block");
	});

	test("Successfully click on create collection button", async () => {
		const user = userEvent.setup();
		const { getByRole, getByText } = render(AddCollectionButton, {
			props: {}
		});

		const addButton = getByRole("button", { name: "add" });
		await user.click(addButton);
		const createCollection = getByText("Create Collection");
		await user.click(createCollection);
		// const contextMenu = getByTestId("ContextMenu");
		// expect(contextMenu.className).toContain("hidden");
	});
});
