import { render } from "@testing-library/svelte";
import { GitlabBrand } from "svelte-awesome-icons";
import { describe, expect, test } from "vitest";

import IconButton from "./IconButton.svelte";

describe("IconButton", () => {
	test("Successfully renders icon button", async () => {
		const { getByText } = render(IconButton, {
			props: {
				name: "GitLab",
				iconComponent: GitlabBrand
			}
		});

		const button = getByText("GitLab");
		expect(button).toBeTruthy();
	});
});
