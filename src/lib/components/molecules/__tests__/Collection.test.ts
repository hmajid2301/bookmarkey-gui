import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Collection from "../Collection.svelte";

describe("Collection", () => {
	test("Successfully link to collection page", async () => {
		const { getByRole } = render(Collection, {
			props: {
				currentPath: "/my/dashboard",
				collection: {
					id: "idabc",
					name: "My Collection"
				}
			}
		});

		const collectionLink = getByRole("link");
		expect(collectionLink.getAttribute("href")).toBe("/my/collections/idabc");
	});

	test("Successfully show context menu", async () => {
		const { getByText, getByTestId } = render(Collection, {
			props: {
				currentPath: "/my/dashboard",
				collection: {
					id: "idabc",
					name: "My Collection"
				}
			}
		});

		expect(getByTestId("idabc").className).toContain("hidden");
		const collectionName = getByText("My Collection");
		await fireEvent.contextMenu(collectionName);
		expect(getByTestId("idabc").className).toContain("block");
	});

	test("Successfully render active class", async () => {
		const { getByRole } = render(Collection, {
			props: {
				currentPath: "/my/collections/idabc",
				collection: {
					id: "idabc",
					name: "My Collection"
				}
			}
		});

		const collectionLink = getByRole("link");
		expect(collectionLink.className).toContain("active");
	});

	test("Successfully should not render active class", async () => {
		const { getByRole } = render(Collection, {
			props: {
				currentPath: "/my/collections/anotherone",
				collection: {
					id: "idabc",
					name: "My Collection"
				}
			}
		});

		const collectionLink = getByRole("link");
		expect(collectionLink.className).not.toContain("active");
	});
});
