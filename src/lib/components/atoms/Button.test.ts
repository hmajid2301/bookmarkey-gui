import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import html from "svelte-htm";
import { describe, expect, test, vi } from "vitest";

import Button from "./Button.svelte";

describe("Button", () => {
	test("Renders button with anchor", async () => {
		render(html`
		<${Button} href="/test">
        button
		</${Button}>
	`);
		const button = screen.getByText("button");
		const href = button.closest("a")?.getAttribute("href");
		expect(href).toBe("/test");
	});

	test("on:click button calls function", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(html`
		<${Button} onClick=${mock}>
        button
		</${Button}>
	`);

		const button = screen.getByRole("button");
		await user.click(button);
		expect(mock).toHaveBeenCalled();
	});
});
