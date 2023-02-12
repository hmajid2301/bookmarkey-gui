import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import AddCollectionButton from "../AddCollectionButton.svelte";

describe("AddCollectionButton", () => {
	test("Successfully show context menu on button click", async () => {
		const user = userEvent.setup();
		const { getByRole, getByTestId } = render(AddCollectionButton, {
			props: {}
		});

		const contextMenu = getByTestId("ContextMenu");
		expect(contextMenu.className).toContain("hidden");
		const addButton = getByRole("button", { name: "add" });
		user.click(addButton);
		expect(contextMenu.className).toContain("block");
	});

	test("Successfully click on create collection button", async () => {
		const user = userEvent.setup();
		const { getByRole, getByText, getByTestId } = render(AddCollectionButton, {
			props: {}
		});

		const addButton = getByRole("button", { name: "add" });
		user.click(addButton);
		const createCollection = getByText("Create Collection");
		user.click(createCollection);
		const contextMenu = getByTestId("ContextMenu");
		expect(contextMenu.className).toContain("hidden");
	});
});
