import { render, screen } from "@testing-library/svelte";
import html from "svelte-htm";
import { describe, expect, test } from "vitest";

import ErrorText from "./ErrorText.svelte";

describe("ErrorText", () => {
	test("Successfully renders error text", async () => {
		render(html`
		<${ErrorText}>
        An error has occurred
		</${ErrorText}>
	`);
		const errorText = screen.getByText("An error has occurred");
		expect(errorText.className).toContain("text-red-500");
	});
});
