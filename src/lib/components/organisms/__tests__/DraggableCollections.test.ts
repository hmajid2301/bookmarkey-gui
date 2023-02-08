import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import DraggableCollections from "../DraggableCollections.svelte";

describe("DraggableCollections", () => {
	test("Successfully render draggable collections", async () => {
		const { getByText } = render(DraggableCollections, {
			props: {
				currentPath: "/my/dashboard",
				collections: [
					{
						id: "collection",
						name: "My Collection"
					},
					{
						id: "collection2",
						name: "My Other Collection"
					}
				]
			}
		});

		getByText("My Collection");
		getByText("My Other Collection");
	});

	test("Successfully drags and drops collections then makes API request", async () => {
		const { getByText } = render(DraggableCollections, {
			props: {
				currentPath: "/my/dashboard",
				collections: [
					{
						id: "collection",
						name: "My Collection"
					},
					{
						id: "collection2",
						name: "My Other Collection"
					}
				]
			}
		});
		const fetchMock = createFetchMock(vi);
		fetchMock.enableMocks();
		fetchMock.once(JSON.stringify({}));

		const firstCollection = getByText("My Collection");
		const secondCollection = getByText("My Other Collection");
		await fireEvent.dragStart(firstCollection);
		await fireEvent.dragEnter(secondCollection);
		await fireEvent.dragOver(secondCollection);
		await fireEvent.dragEnd(secondCollection);
		expect(fetchMock.mock.calls.length).toBe(1);
		expect(fetchMock.mock.lastCall).toStrictEqual([
			"/my/collections/move",
			{
				body: JSON.stringify({ new_order: 2, collection_id: "collection", group_id: "" }),
				method: "POST"
			}
		]);
	});

	test("Successfully render empty collections", async () => {
		const { getByText } = render(DraggableCollections, {
			props: {
				currentPath: "/my/dashboard",
				collections: []
			}
		});

		getByText("Empty Collection");
	});
});
