import { render, screen } from "@testing-library/svelte";
import html from "svelte-htm";
import { describe, expect, test } from "vitest";

import FullWidthButton from "./FullWidthButton.svelte";

describe("FullWidthButton", () => {
	test("Successfully renders button with anchor", async () => {
		render(html`
		<${FullWidthButton}>
        button
		</${FullWidthButton}>
	`);
		const button = screen.getByText("button");
		expect(button).toBeTruthy();
	});
});
