import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ContextMenu from "../ContextMenu.svelte";

describe("ContextMenu", () => {
	test("Successfully render context menu", async () => {
		const { getByText, getByTestId, queryByTestId } = render(ContextMenu, {
			props: {
				showMenu: true,
				menuItems: [
					{
						name: "link"
					}
				]
			}
		});

		const menu = getByTestId("ContextMenu");
		expect(menu.className).not.toContain("hidden");
		getByText("link");

		const divider = queryByTestId("ContextMenuDivider");
		expect(divider).toBe(null);
	});

	test("Successfully on:click function is called", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		const { getByText } = render(ContextMenu, {
			props: {
				showMenu: true,
				menuItems: [
					{
						name: "link",
						onClick: mock
					}
				]
			}
		});

		const item = getByText("link");
		await user.click(item);
		expect(mock).toHaveBeenCalled();
	});

	test("Successfully links to correct location", async () => {
		const { getByRole } = render(ContextMenu, {
			props: {
				showMenu: true,
				menuItems: [
					{
						name: "link",
						link: "/example"
					}
				]
			}
		});

		const item = getByRole("link");
		expect(item.getAttribute("href")).toBe("/example");
	});

	test("Successfully renders divider", async () => {
		const { getByTestId } = render(ContextMenu, {
			props: {
				showMenu: true,
				menuItems: [
					{
						name: "link",
						divider: true
					}
				]
			}
		});

		getByTestId("ContextMenuDivider");
	});
});
