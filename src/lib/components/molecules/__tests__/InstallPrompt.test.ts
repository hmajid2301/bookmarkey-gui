import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import html from "svelte-htm";
import { get, writable } from "svelte/store";
import { describe, expect, test, vi } from "vitest";

import InstallPrompt from "../InstallPrompt.svelte";

describe("InstallPrompt", () => {
	test("Successfully renders InstallPrompt", async () => {
		const { getByText } = render(InstallPrompt, {
			props: {
				showInstall: true
			}
		});

		getByText("Make managing your bookmarks easier with our free app!");
	});

	test("Successfully renders nothing", async () => {
		const { queryByText } = render(InstallPrompt, {
			props: {}
		});

		const text = queryByText("Make managing your bookmarks easier with our free app!");
		expect(text).toBe(null);
	});

	test("Successfully calls on:click", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(html`
			<${InstallPrompt} showInstall=${true} on:click=${mock} />
		`);

		const button = screen.getByRole("button", { name: "Install" });
		await user.click(button);
		expect(mock).toHaveBeenCalled();
	});

	test("Successfully sets show install to true", async () => {
		const value = writable(true);
		const user = userEvent.setup();
		render(html`
			<${InstallPrompt} bind:showInstall=${value} />
		`);

		const button = screen.getByRole("button", { name: "Not now" });
		await user.click(button);
		expect(get(value)).toBe(false);
	});
});
