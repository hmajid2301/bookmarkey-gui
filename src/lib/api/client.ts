import { invalidateAll } from "$app/navigation";
import { captureException } from "@sentry/svelte";
import pocketbase from "pocketbase";
import { onMount } from "svelte";
import { writable } from "svelte/store";
import toast from "svelte-french-toast";

import type {
	BookmarksMetadataResponse,
	BookmarksResponse,
	CollectionsResponse,
	GroupsResponse,
	BookmarksMetadataRecord
} from "./types";
import LoadingStore from "../stores/LoadingStore";
import type { CollectionMove, GroupSwap } from "../types/api";
import { config } from "~/config";
import type { Bookmark } from "~/lib/types/components";

type BookmarkExpand = BookmarksResponse & {
	expand: {
		bookmark_metadata: BookmarksMetadataResponse;
	};
};

function loader(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
	const original = descriptor.value;

	descriptor.value = function (...args: object[]) {
		LoadingStore.setLoading(true);
		const result = original.call(this, ...args);
		LoadingStore.setLoading(false);
		return result;
	};
}

export class API {
	pb: pocketbase;
	constructor(url: string = config.PocketBaseURL, pb?: pocketbase) {
		if (pb) {
			this.pb = pb;
		} else {
			this.pb = new pocketbase(url);
			const currentUser = writable(this.pb.authStore.model);

			onMount(() => {
				this.pb.authStore.loadFromCookie(document.cookie);
				this.pb.authStore.onChange((auth) => {
					console.log("authStore changed", auth);
					currentUser.set(this.pb.authStore.model);
					document.cookie = this.pb.authStore.exportToCookie({ sameSite: "Lax", httpOnly: false });
				});
			});
		}
	}

	loadAuthFromCookie(cookie: string) {
		this.pb.authStore.loadFromCookie(cookie);
	}

	isAuthValid() {
		return this.pb.authStore.isValid;
	}

	async refreshAuth() {
		await this.pb.collection("users").authRefresh();
	}

	getAuthModel() {
		return structuredClone(this.pb.authStore.model);
	}

	logout() {
		this.pb.authStore.clear();
	}

	exportToCookie(isProd: boolean) {
		return this.pb.authStore.exportToCookie({ secure: isProd, sameSite: "Lax", httpOnly: false });
	}

	@loader
	async createGroup(groupName: string) {
		try {
			await this.pb.collection("groups").create<GroupsResponse>({
				user: this.pb.authStore?.model?.id,
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

	@loader
	async deleteGroup(groupID: string) {
		try {
			await this.pb.collection("groups").delete(groupID);
			toast.success("Deleted group");
			await invalidateAll();
		} catch (err) {
			captureException(err);
			toast.error("Failed to delete group");
		}
	}

	@loader
	async updateGroup(groupID: string, updatedGroup: Partial<GroupsResponse>) {
		try {
			await this.pb.collection("groups").update(groupID, {
				...updatedGroup
			});
			toast.success("Renamed group");
			await invalidateAll();
		} catch (err) {
			captureException(err);
			toast.error("Failed to rename group");
		}
	}

	@loader
	async swapGroup(groups: GroupSwap[]) {
		try {
			groups.forEach(async (group) => {
				await this.pb.collection("groups").update(group.group_id, {
					custom_order: group.new_order
				});
			});

			toast.success("Moved group");
		} catch (err) {
			captureException(err);
			toast.error("Failed to move group");
		}
	}

	@loader
	async deleteBookmark(bookmarkID: string) {
		try {
			await this.pb.collection("groups").delete(bookmarkID);
			toast.success("Deleted bookmark");
			await invalidateAll();
		} catch (err) {
			captureException(err);
			toast.error("Failed to delete bookmark");
		}
	}

	@loader
	async addCollection(name: string) {
		try {
			await this.pb.collection("collections").create({
				name: name,
				user: this.pb.authStore.model?.id,
				parent: null,
				group: null
			});
			toast.success("Created collection");
			await invalidateAll();
		} catch (err) {
			captureException(err);
			toast.error("Failed to create collection");
		}
	}

	@loader
	async deleteCollection(collectionID: string) {
		try {
			await this.pb.collection("collections").delete(collectionID);
			toast.success("Deleted collection");
			await invalidateAll();
		} catch (err) {
			captureException(err);
			toast.error("Failed to delete collection");
		}
	}

	@loader
	async updateCollection(collectionID: string, update: Partial<CollectionsResponse>) {
		try {
			await this.pb.collection("collections").update(collectionID, {
				...update
			});
			await invalidateAll();
		} catch (err) {
			captureException(err);
			throw err;
		}
	}

	@loader
	async moveCollection(collectionID: string, CollectionMove: CollectionMove) {
		try {
			await this.pb.collection("collections").update(collectionID, {
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

	@loader
	async swapBookmark(bookmarkID: string, newCollectionID: string) {
		try {
			await this.pb.collection("bookmarks").update(bookmarkID, {
				collection: newCollectionID
			});
			toast.success("Moved bookmark");
			await invalidateAll();
		} catch (err) {
			captureException(err);
			toast.error("Failed to move bookmark");
		}
	}

	@loader
	async moveBookmark(bookmarkID: string, newCollectionID: string) {
		try {
			await this.pb.collection("bookmarks").update(bookmarkID, {
				collection: newCollectionID
			});
			toast.success("Moved bookmark");
			await invalidateAll();
		} catch (err) {
			captureException(err);
			toast.error("Failed to move bookmark");
		}
	}

	@loader
	async getBookmarks(collectionId: string, page: number) {
		try {
			const batchSize = 30;

			let collection: { id: string; name: string; group?: string };
			if (collectionId === "0") {
				collection = {
					id: "0",
					name: "All Bookmarks"
				};
			} else {
				collection = await this.pb
					?.collection("collections")
					.getOne<CollectionsResponse>(collectionId);
			}

			// TODO: fix autocancel
			const bookmarkRecords = await this.pb
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

	@loader
	async createBookmark(collectionID: string, url: string) {
		// if current collection is all bookmarks, add new bookmark to unsorted bookmark collection
		if (collectionID === "0") {
			collectionID = "-1";
		}

		try {
			await this.pb.send(`/collections/${collectionID}/bookmark`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ url })
			});
			toast.success("Added bookmark");
			await invalidateAll();
		} catch (err) {
			captureException(err);
			toast.error("Failed to add bookmark");
		}
	}

	@loader
	async getURLMetadata(url: string) {
		let a: BookmarksMetadataRecord = {
			url: "",
			image: "",
			description: "",
			title: ""
		};

		try {
			a = await this.pb.send<BookmarksMetadataRecord>(
				`/bookmark/metadata` +
					new URLSearchParams({
						url: url
					}),
				{
					method: "GET"
				}
			);
		} catch (err) {
			captureException(err);
		}
		return a;
	}
}
