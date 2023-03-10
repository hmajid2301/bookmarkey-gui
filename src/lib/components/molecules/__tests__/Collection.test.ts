import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Collection from "../Collection.svelte";

describe("Collection", () => {
	test("Successfully link to collection page", async () => {
		const { getByRole } = render(Collection, {
			props: {
				collection: {
					id: "idabc",
					name: "My Collection",
					bookmarkCount: 0
				}
			}
		});

		const collectionLink = getByRole("link");
		expect(collectionLink.getAttribute("href")).toBe("/my/collections/idabc");
	});

	test("Successfully show context menu", async () => {
		const { getByTestId } = render(Collection, {
			props: {
				collection: {
					id: "idabc",
					name: "My Collection",
					bookmarkCount: 0
				},
				showMenu: true
			}
		});

		expect(getByTestId("ContextMenu").className).toContain("block");
	});

	test("Successfully does not show context menu", async () => {
		const { getByTestId } = render(Collection, {
			props: {
				collection: {
					id: "idabc",
					name: "My Collection",
					bookmarkCount: 0
				},
				showMenu: false
			}
		});

		expect(getByTestId("ContextMenu").className).toContain("hidden");
	});
});
