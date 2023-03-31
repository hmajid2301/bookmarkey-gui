import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, test, vi } from "vitest";

import DraggableCollections from "../DraggableCollections.svelte";
import * as frontend from "~/lib/pocketbase/frontend";

describe("DraggableCollections", () => {
	// TODO: add new tests for bookmark
	test("Successfully render draggable collections", async () => {
		const { getByText } = render(DraggableCollections, {
			props: {
				currentPath: "/my/collections/0",
				collections: [
					{
						id: "collection",
						name: "My Collection",
						bookmarkCount: 0
					},
					{
						id: "collection2",
						name: "My Other Collection",
						bookmarkCount: 0
					}
				]
			}
		});

		getByText("My Collection");
		getByText("My Other Collection");
	});

	test("Successfully drags and drops collections then makes API request", async () => {
		const mock = vi.spyOn(frontend, "moveCollection");
		const { getByText } = render(DraggableCollections, {
			props: {
				currentPath: "/my/collections/0",
				collections: [
					{
						id: "collection",
						name: "My Collection",
						bookmarkCount: 0
					},
					{
						id: "collection2",
						name: "My Other Collection",
						bookmarkCount: 10
					}
				]
			}
		});

		const firstCollection = getByText("My Collection");
		const secondCollection = getByText("My Other Collection");
		await fireEvent.dragStart(firstCollection);
		await fireEvent.dragEnter(secondCollection);
		await fireEvent.dragOver(secondCollection);
		await fireEvent.dragEnd(secondCollection);
		expect(mock).toHaveBeenCalledWith(undefined, "collection", {
			groupId: "",
			newOrder: 2
		});
	});

	test("Successfully render empty collections", async () => {
		const { getByText } = render(DraggableCollections, {
			props: {
				currentPath: "/my/collections/0",
				collections: []
			}
		});

		getByText("Empty Collection");
	});

	test("Successfully render active class", async () => {
		const { getByTestId } = render(DraggableCollections, {
			props: {
				currentPath: "/my/collections/collection",
				collections: [
					{
						id: "collection",
						name: "My Collection",
						bookmarkCount: 0
					}
				]
			}
		});

		const collectionLink = getByTestId("DraggableCollection-collection");
		expect(collectionLink.className).toContain("active");
	});

	test("Successfully should not render active class", async () => {
		const { getByTestId } = render(DraggableCollections, {
			props: {
				currentPath: "/my/collections/collection123",
				collections: [
					{
						id: "collection",
						name: "My Collection",
						bookmarkCount: 0
					}
				]
			}
		});

		const collectionLink = getByTestId("DraggableCollection-collection");
		expect(collectionLink.className).not.toContain("active");
	});
});
