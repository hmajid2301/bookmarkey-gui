import { render } from "@testing-library/svelte";
import { describe, test } from "vitest";

import Logo from "../Logo.svelte";

describe("Logo", () => {
	test("Renders logo", async () => {
		const { getByText } = render(Logo, {});
		getByText("Bookmarkey");
	});
});
