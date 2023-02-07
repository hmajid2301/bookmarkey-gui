import { render, screen } from "@testing-library/svelte";
import html from "svelte-htm";
import { describe, test } from "vitest";

import FullWidthButton from "./FullWidthButton.svelte";

describe("FullWidthButton", () => {
	test("Successfully renders button", async () => {
		render(html`
		<${FullWidthButton}>
        Submit
		</${FullWidthButton}>
	`);
		screen.getByText("Submit");
		screen.getByRole("button");
	});
});
