import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import SoapSolid from "svelte-awesome-icons/SoapSolid.svelte";
import html from "svelte-htm";
import { describe, expect, test, vi } from "vitest";

import LinkItem from "./LinkItem.svelte";

describe("LinkItems", () => {
	test("Successfully renders side bar item", async () => {
		const { getByText } = render(LinkItem, {
			props: {
				link: "/example",
				name: "Example",
				iconComponent: SoapSolid
			}
		});
		const item = getByText("Example");
		expect(item.parentElement?.getAttribute("href")).toBe("/example");
	});

	test("Successfully calls on:click function when clicked", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(html`
			<${LinkItem} name="example" on:click=${mock} iconComponent=${SoapSolid} />
		`);

		const item = screen.getByText("example");
		await user.click(item);
		expect(mock).toHaveBeenCalled();
	});
});
