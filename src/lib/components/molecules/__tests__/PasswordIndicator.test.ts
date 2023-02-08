import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import PasswordIndicator from "../PasswordIndicator.svelte";

describe("PasswordIndicator", () => {
	test("Successfully renders indicator", async () => {
		const { getByText } = render(PasswordIndicator, {
			props: {
				passwordScore: 3
			}
		});

		const text = getByText("Strong Password");
		expect(text).toBeTruthy();
	});
});
