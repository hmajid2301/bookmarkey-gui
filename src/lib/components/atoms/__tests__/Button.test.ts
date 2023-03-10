import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import html from "svelte-htm";
import { describe, expect, test, vi } from "vitest";

import Button from "../Button.svelte";

describe("Button", () => {
	test("Successfully calls on:click function when button is pressed", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(html`
		<${Button} on:click=${mock}>
        button
		</${Button}>
	`);

		const button = screen.getByRole("button");
		await user.click(button);
		expect(mock).toHaveBeenCalled();
	});
});
