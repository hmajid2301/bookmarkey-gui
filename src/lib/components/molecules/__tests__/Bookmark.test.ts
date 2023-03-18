import { render } from "@testing-library/svelte";
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

	// TODO: work out how to test
	// test("Successfully show context menu", async () => {
	// 	const { getByText, getByRole } = render(Bookmark, {
	// 		props: {
	// 			bookmark: {
	// 				id: "bookmark",
	// 				url: "https://gitlab.com/groups/bookmarkey/-/boards",
	// 				image: "",
	// 				description: "Hello this is a description",
	// 				title: "Development",
	// 				createdAt: "18/03/2022"
	// 			}
	// 		}
	// 	});

	// 	const bookmark = getByRole("link");
	// 	fireEvent.contextMenu(bookmark);
	// 	const collection = getByText("Delete Bookmark").parentElement?.parentElement;
	// 	expect(collection?.className).toContain("absolute");
	// });
});
