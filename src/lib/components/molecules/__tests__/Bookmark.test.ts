import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Bookmark from "../Bookmark.svelte";

describe("Bookmark", () => {
	test("Successfully renders a single bookmark", async () => {
		const { getByText, getByRole } = render(Bookmark, {
			props: {
				bookmark: {
					id: "bookmark",
					url: "https://gitlab.com/groups/bookmarkey/-/boards",
					image: "",
					description: "Hello this is a description",
					title: "Development",
					createdAt: "18/03/2022"
				}
			}
		});

		["Development", "18/03/2022", "Hello this is a description"].forEach((item) => {
			getByText(item);
		});
		const link = getByRole("link");
		expect(link.getAttribute("href")).toBe("https://gitlab.com/groups/bookmarkey/-/boards");
	});

	test("Successfully show context menu", async () => {
		const { getByTestId, getByRole } = render(Bookmark, {
			props: {
				bookmark: {
					id: "bookmark",
					url: "https://gitlab.com/groups/bookmarkey/-/boards",
					image: "",
					description: "Hello this is a description",
					title: "Development",
					createdAt: "18/03/2022"
				}
			}
		});

		expect(getByTestId("ContextMenu").className).toContain("hidden");
		const bookmark = getByRole("link");
		fireEvent.contextMenu(bookmark);
		expect(getByTestId("ContextMenu").className).toContain("block");
	});
});
