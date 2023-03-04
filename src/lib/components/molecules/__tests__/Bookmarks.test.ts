import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Bookmarks from "../Bookmarks.svelte";

describe("Bookmarks", () => {
	test("Successfully renders a single bookmark", async () => {
		const { getByText, getByRole } = render(Bookmarks, {
			props: {
				bookmarks: [
					{
						id: "bookmark",
						url: "https://gitlab.com/groups/bookmarkey/-/boards",
						image: "",
						description: "Hello this is a description",
						title: "Development",
						createdAt: "18/03/2022"
					}
				]
			}
		});

		["Development", "18/03/2022", "Hello this is a description"].forEach((item) => {
			getByText(item);
		});
		const link = getByRole("link");
		expect(link.getAttribute("href")).toBe("https://gitlab.com/groups/bookmarkey/-/boards");
	});

	test("Successfully renders a multiple bookmark", async () => {
		const { getAllByRole } = render(Bookmarks, {
			props: {
				bookmarks: [
					{
						id: "bookmark",
						url: "https://gitlab.com/groups/bookmarkey/-/boards",
						image: "",
						description: "Hello this is a description",
						title: "Development",
						createdAt: "18/03/2022"
					},
					{
						id: "bookmark2",
						url: "http://localhost:5173/my/collections/309wpull09j8ejt",
						image: "",
						description: "Hello this is a description",
						title: "My Collection:",
						createdAt: "18/04/2023"
					}
				]
			}
		});

		const links = getAllByRole("link");
		expect(links.length).toBe(2);
	});
});
