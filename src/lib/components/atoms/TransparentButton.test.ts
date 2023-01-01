import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import html from "svelte-htm";
import { describe, expect, test, vi } from "vitest";

import Button from "./TransparentButton.svelte";

describe("TransparentButton", () => {
	test("on:click button calls function", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(html`
		<${Button} onClick=${mock}>
        button
		</${Button}>
	`);

		const button = screen.getByText("button");
		await user.click(button);
		expect(mock).toHaveBeenCalled();
	});
});
