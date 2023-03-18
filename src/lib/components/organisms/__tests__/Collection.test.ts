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

	// test("Successfully show context menu", async () => {
	// 	const { getByText, getByRole } = render(Collection, {
	// 		props: {
	// 			collection: {
	// 				id: "idabc",
	// 				name: "My Collection",
	// 				bookmarkCount: 0
	// 			}
	// 		}
	// 	});

	// 	const collection = getByText("My Collection");
	// 	fireEvent.contextMenu(collection);
	// 	const button = getByRole("button", { name: "Delete Collection" });
	// 	expect(button.className).toContain("context-menu-item context-menu-default");
	// });
});
