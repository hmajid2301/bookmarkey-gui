import { render, screen } from "@testing-library/svelte";
import html from "svelte-htm";
import { describe, test } from "vitest";

import Modal from "./Modal.svelte";

describe("Modal", () => {
	test("Successfully render modal", async () => {
		const { getByText } = render(Modal, {
			props: {
				title: "My Modal",
				show: true
			}
		});
		getByText("My Modal");
	});

	test("Successfully renders childs", async () => {
		render(html`
		<${Modal} title="Modal" show={true}>
      <div>Content</div>
		</${Modal}>
	`);

		screen.getByText("Content");
	});
});
