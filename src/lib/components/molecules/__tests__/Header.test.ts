import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { writable } from "svelte/store";
import html from "svelte-htm";
import { describe, expect, test } from "vitest";

import Header from "../Header.svelte";

describe("Header", () => {
	test("Successfully renders header", async () => {
		const value = writable(false);
		const user = userEvent.setup();
		render(html`
			<${Header} bind:showMenu=${value} />
		`);

		const button = screen.getByRole("button");
		expect(button).toBeTruthy();
		user.click(button);
	});

	// TODO: work out how to test
	// test("Successfully updates showMenu value when user clicks button", async () => {
	// 	const value = writable(false);
	// 	const user = userEvent.setup();
	// 	render(html`
	// 		<${Header} bind:showMenu=${value} />
	// 	`);

	// 	const button = screen.getByRole("button");
	// 	expect(button).toBeTruthy()
	// 	user.click(button);
	// 	expect(get(value)).toBe(true);
	// });
});
