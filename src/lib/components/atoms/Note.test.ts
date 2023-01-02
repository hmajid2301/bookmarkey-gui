import { render, screen } from "@testing-library/svelte";
import html from "svelte-htm";
import { describe, expect, test } from "vitest";

import Note from "./Note.svelte";

describe("Note", () => {
	test("Successfully renders note", async () => {
		render(html`
		<${Note}>
        This is a note
		</${Note}>
	`);
		const errorText = screen.getByText("This is a note");
		expect(errorText.className).toContain("text-xs");
	});
});
