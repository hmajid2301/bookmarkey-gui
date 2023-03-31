import { invalidateAll } from "$app/navigation";
import { captureException } from "@sentry/svelte";
import pocketbase from "pocketbase";
import { writable } from "svelte/store";
import toast from "svelte-french-toast";

import type {
	BookmarksMetadataResponse,
	BookmarksResponse,
	CollectionsResponse,
	GroupsResponse
} from "./types";
import type { CollectionMove, GroupSwap } from "../types/api";
import { config } from "~/config";
import type { Bookmark } from "~/lib/types/components";

export function getPB() {
	const pb = new pocketbase(config.PocketBaseURL);
	const currentUser = writable(pb.authStore.model);

	pb.authStore.loadFromCookie(document.cookie);

	pb.authStore.onChange((auth) => {
		console.log("authStore changed", auth);
		currentUser.set(pb.authStore.model);
		document.cookie = pb.authStore.exportToCookie({ sameSite: "Lax", httpOnly: false });
	});
	return pb;
}

export async function createGroup(pb: pocketbase, groupName: string) {
	try {
		await pb.collection("groups").create<GroupsResponse>({
			user: pb.authStore?.model?.id,
			name: groupName,
			custom_order: Number.MAX_SAFE_INTEGER
		});
		toast.success("Created group");
		await invalidateAll();
	} catch (err) {
		captureException(err);
		toast.error("Failed to create group");
	}
}

export async function deleteGroup(pb: pocketbase, groupID: string) {
	try {
		await pb.collection("groups").delete(groupID);
		toast.success("Deleted group");
		await invalidateAll();
	} catch (err) {
		captureException(err);
		toast.error("Failed to delete group");
	}
}

export async function updateGroup(
	pb: pocketbase,
	groupID: string,
	updatedGroup: Partial<GroupsResponse>
) {
	try {
		await pb.collection("groups").update(groupID, {
			...updatedGroup
		});
		toast.success("Renamed group");
		await invalidateAll();
	} catch (err) {
		captureException(err);
		toast.error("Failed to rename group");
	}
}

export async function swapGroup(pb: pocketbase, groups: GroupSwap[]) {
	try {
		groups.forEach(async (group) => {
			await pb.collection("groups").update(group.group_id, {
				custom_order: group.new_order
			});
		});

		toast.success("Moved group");
	} catch (err) {
		captureException(err);
		toast.error("Failed to move group");
	}
}

export async function deleteBookmark(pb: pocketbase, bookmarkID: string) {
	try {
		await pb.collection("groups").delete(bookmarkID);
		toast.success("Deleted bookmark");
		await invalidateAll();
	} catch (err) {
		captureException(err);
		toast.error("Failed to delete bookmark");
	}
}

export async function deleteCollection(pb: pocketbase, collectionID: string) {
	try {
		await pb.collection("collections").delete(collectionID);
		toast.success("Deleted collection");
		await invalidateAll();
	} catch (err) {
		captureException(err);
		toast.error("Failed to delete collection");
	}
}

export async function updateCollection(
	pb: pocketbase,
	collectionID: string,
	update: Partial<CollectionsResponse>
) {
	try {
		await pb.collection("collections").update(collectionID, {
			...update
		});
		await invalidateAll();
	} catch (err) {
		captureException(err);
		throw err;
	}
}

export async function moveCollection(
	pb: pocketbase,
	collectionID: string,
	CollectionMove: CollectionMove
) {
	try {
		await pb.collection("collections").update(collectionID, {
			custom_order: CollectionMove.newOrder,
			group: [CollectionMove?.groupId]
		});
		toast.success("Moved collection");
		await invalidateAll();
	} catch (err) {
		captureException(err);
		toast.error("Failed to move collection");
	}
}

export async function swapBookmark(pb: pocketbase, bookmarkID: string, newCollectionID: string) {
	try {
		await pb.collection("bookmarks").update(bookmarkID, {
			collection: newCollectionID
		});
		toast.success("Moved bookmark");
		await invalidateAll();
	} catch (err) {
		captureException(err);
		toast.error("Failed to move bookmark");
	}
}

export async function moveBookmark(pb: pocketbase, bookmarkID: string, newCollectionID: string) {
	try {
		await pb.collection("bookmarks").update(bookmarkID, {
			collection: newCollectionID
		});
		toast.success("Moved bookmark");
		await invalidateAll();
	} catch (err) {
		captureException(err);
		toast.error("Failed to move bookmark");
	}
}

type BookmarkExpand = BookmarksResponse & {
	expand: {
		bookmark_metadata: BookmarksMetadataResponse;
	};
};

export async function getBookmarks(pb: pocketbase, collectionId: string, page: number) {
	try {
		const batchSize = 30;

		let collection: { id: string; name: string; group?: string };
		if (collectionId === "0") {
			collection = {
				id: "0",
				name: "All Bookmarks"
			};
		} else {
			collection = await pb?.collection("collections").getOne<CollectionsResponse>(collectionId);
		}

		// TODO: fix autocancel
		const bookmarkRecords = await pb
			.collection("bookmarks")
			.getList<BookmarkExpand>(page, batchSize, {
				filter: collectionId !== "0" ? `collection = "${collectionId}"` : "",
				sort: "custom_order,-created",
				expand: "bookmark_metadata",
				$autoCancel: false
			});

		if (!collection) {
			throw Error("failed to get collection");
		}

		const bookmarks: Bookmark[] = [];
		bookmarkRecords.items.forEach((bookmarkRecord) => {
			const createdAt = new Date(bookmarkRecord.created);
			const formattedCreatedAt = createdAt.toLocaleDateString(undefined, {
				year: "numeric",
				month: "2-digit",
				day: "2-digit"
			});
			const bookmark: Bookmark = {
				id: bookmarkRecord.id,
				url: bookmarkRecord.expand.bookmark_metadata.url,
				image: bookmarkRecord.expand.bookmark_metadata.image,
				title: bookmarkRecord.expand.bookmark_metadata.title,
				description: bookmarkRecord.expand.bookmark_metadata.description,
				createdAt: formattedCreatedAt
			};
			bookmarks.push(bookmark);
		});
		return {
			collection: {
				id: collection.id,
				name: collection.name,
				group: collection.group || "",
				bookmarks: bookmarks,
				moreBookmarks: bookmarks.length !== bookmarkRecords.totalItems
			}
		};
	} catch (err) {
		captureException(err);
		toast.error("Failed to get bookmark");
		throw err;
	}
}

export async function createBookmark(pb: pocketbase, collectionID: string, url: string) {
	// if current collection is all bookmarks, add new bookmark to unsorted bookmark collection
	if (collectionID === "0") {
		collectionID = "-1";
	}

	try {
		await pb.send(`/collections/${collectionID}/bookmark`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			timeout: 5000,
			body: JSON.stringify({ url })
		});
		toast.success("Added bookmark");
		await invalidateAll();
	} catch (err) {
		captureException(err);
		toast.error("Failed to add bookmark");
	}
}
