import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Label from "./Label.svelte";

describe("Label", () => {
	test("Successfully renders label", async () => {
		const { getByText } = render(Label, {
			props: {
				name: "password",
				labelName: "Password"
			}
		});
		const input = getByText("Password");
		expect(input.className).toContain("font-bold");
	});
});
