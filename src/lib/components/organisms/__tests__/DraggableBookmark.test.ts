import { render } from "@testing-library/svelte";
import { describe, test } from "vitest";

import DraggableBookmark from "../DraggableBookmark.svelte";

// TODO: fix
describe("DraggableBookmark", () => {
	test("Successfully render draggable bookmark", async () => {
		const { getByText } = render(DraggableBookmark, {
			props: {
				bookmark: {
					id: "bookmark",
					image: "",
					url: "http://haseebmajid.dev",
					description: "haseeb's site",
					createdAt: "23/01/2023",
					title: "My Bookmark"
				}
			}
		});
	});
});
