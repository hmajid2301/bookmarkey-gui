import { render, screen } from "@testing-library/svelte";
import html from "svelte-htm";
import { describe, expect, test } from "vitest";

import Section from "./Section.svelte";

describe("Section", () => {
	test("Renders section and slot", async () => {
		render(html`
		<${Section}> 
        <p>This is some data</p>
		</${Section}>
	`);
		const text = screen.getByText("This is some data");
		expect(text).toBeTruthy();
	});
});
