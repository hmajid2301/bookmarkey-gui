import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Rules from "../Rules.svelte";

describe("Rules", () => {
	test("Successfully renders successful rules", async () => {
		const { getByText } = render(Rules, {
			props: {
				rules: [
					{
						check: true,
						errorText: "This is an error",
						successText: "This is a success"
					}
				]
			}
		});
		const item = getByText("This is a success");
		expect(item).toBeTruthy;
	});

	test("Successfully renders error rule", async () => {
		const { getByText } = render(Rules, {
			props: {
				rules: [
					{
						check: false,
						errorText: "This is an error",
						successText: "This is a success"
					}
				]
			}
		});
		const item = getByText("This is an error");
		expect(item).toBeTruthy;
	});

	test("Successfully renders one error rule and one success rule", async () => {
		const { getByText } = render(Rules, {
			props: {
				rules: [
					{
						check: true,
						errorText: "Password is wrong",
						successText: "Password is correct"
					},
					{
						check: false,
						errorText: "Email is wrong",
						successText: "Email is correct"
					}
				]
			}
		});
		const success = getByText("Password is correct");
		const error = getByText("Email is wrong");
		expect(success).toBeTruthy;
		expect(error).toBeTruthy;
	});
});
