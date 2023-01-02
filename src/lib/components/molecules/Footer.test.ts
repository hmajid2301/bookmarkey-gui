import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Footer from "./Footer.svelte";

describe("Footer", () => {
	test("Successfully renders footer", async () => {
		const { getByText } = render(Footer, {
			props: {}
		});

		const footerText = getByText("Bookmarkey™");
		expect(footerText).toBeTruthy();
	});
});
