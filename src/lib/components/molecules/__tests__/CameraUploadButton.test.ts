import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import CameraUploadButton from "../CameraUploadButton.svelte";

describe("CameraUploadButton", () => {
	test("Successfully render upload button", async () => {
		const { getByRole } = render(CameraUploadButton, {
			props: {}
		});

		const button = getByRole("button");
		expect(button).toBeTruthy();
	});
});
