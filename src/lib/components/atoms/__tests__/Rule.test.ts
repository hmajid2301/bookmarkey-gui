import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Rule from "../Rule.svelte";

describe("Rule", () => {
	test("Successfully renders successful rule", async () => {
		const { getByText } = render(Rule, {
			props: {
				check: true,
				errorText: "This is an error",
				successText: "This is a success"
			}
		});
		const success = getByText("This is a success");
		expect(success.className).toContain("text-green-700");
	});

	test("Successfully renders error rule", async () => {
		const { getByText } = render(Rule, {
			props: {
				check: false,
				errorText: "This is an error",
				successText: "This is a success"
			}
		});
		const error = getByText("This is an error");
		expect(error.className).toContain("text-red-700");
	});

	test("Does not renders error rule", async () => {
		const { queryByText } = render(Rule, {
			props: {
				check: true,
				errorText: "This is an error",
				successText: "This is a success"
			}
		});
		const error = queryByText("This is an error");
		expect(error).toBeFalsy();
	});
});
