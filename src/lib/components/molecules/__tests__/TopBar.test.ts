import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { get, writable } from "svelte/store";
import html from "svelte-htm";
import { describe, expect, test } from "vitest";

import TopBar from "../TopBar.svelte";

describe("TopBar", () => {
	test("Successfully renders TopBar", async () => {
		const ref = document.createElement("change") as HTMLInputElement;
		const user = userEvent.setup();
		const show = writable(false);
		const { getByText } = render(
			html`
				<${TopBar} collectionName="Collection" nickname="Nickname" ref=${ref} bind:show=${show} />
			`,
			{}
		);

		getByText("Nickname", { exact: false });
		getByText("Collection");
		const button = getByText("Add");
		await user.click(button);

		expect(get(show)).toBe(true);
	});
});
