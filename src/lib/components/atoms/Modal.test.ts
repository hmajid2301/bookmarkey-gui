import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Modal from "./Modal.svelte";

describe("Modal", () => {
	test("Renders modal", async () => {
		const { getByText } = render(Modal, {
			props: {
				title: "My Modal",
				show: true
			}
		});
		const text = getByText("My Modal");
		expect(text).toBeTruthy();
	});
});
