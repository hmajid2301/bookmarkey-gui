import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import HelloBar from "./HelloBar.svelte";

describe("HelloBar", () => {
	test("Successfully render hello bar ", async () => {
		const { getByText } = render(HelloBar, {
			props: {
				nickname: "haseeb",
				avatar: "/user.png",
				email: "hello@haseebmajid.dev"
			}
		});
		const hello = getByText("Hello 👋 haseeb");
		expect(hello).toBeTruthy();
	});
});
