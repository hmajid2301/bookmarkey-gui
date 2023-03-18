import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
import type {
	BookmarksResponse,
	CollectionsResponse,
	GroupsResponse
} from "~/lib/pocketbase/types";
import type { Collection, CollectionGroups, Group } from "~/lib/types/components";

export type OutputType = { collections: CollectionGroups };

type CollectionExpand = CollectionsResponse & {
	expand: {
		"bookmarks(collections)": BookmarksResponse[];
	};
};

type GroupExpand = GroupsResponse & {
	expand: {
		"collections(group)": CollectionExpand[];
	};
};

export const load: LayoutServerLoad<OutputType> = async ({ locals }) => {
	if (!locals.pb?.authStore.isValid) {
		throw redirect(303, "/login");
	}

	const [bookmarks, collectionsWithoutGroup, groups] = await Promise.all([
		locals.pb.collection("bookmarks").getFullList<BookmarksResponse>(),

		locals.pb.collection("collections").getList<CollectionExpand>(1, 30, {
			filter: "group = NULL",
			sort: "-created",
			expand: "bookmarks(collection),group"
		}),
		locals.pb.collection("groups").getList<GroupExpand>(1, 30, {
			sort: "custom_order,-created",
			expand: "collections(group).bookmarks(collection)"
		})
	]);

	const groupWithCollections: Group[] = [];
	groups.items.forEach((group) => {
		const collectionInGroup: Collection[] = [];
		const item: Group = {
			id: group.id,
			name: group.name || "",
			collections: collectionInGroup
		};

		const collectionExapnd = group.expand["collections(group)"];
		if (collectionExapnd) {
			collectionExapnd.forEach((coll) => {
				let bookmarkCount = 0;
				const bookmarkExpand = coll.expand["bookmarks(collection)"];
				if (bookmarkExpand) {
					bookmarkCount = bookmarkExpand.length;
				}

				collectionInGroup.push({
					name: coll["name"],
					id: coll["id"],
					bookmarkCount: bookmarkCount
				});
			});
		}

		groupWithCollections.push(item);
	});

	const collections: Collection[] = [];
	collectionsWithoutGroup.items.forEach((collection) => {
		let bookmarkCount = 0;
		if (collection.expand["bookmarks(collection)"]) {
			bookmarkCount = collection.expand["bookmarks(collection)"].length;
		}
		collections.push({
			id: collection.id,
			name: collection.name,
			bookmarkCount: bookmarkCount
		});
	});

	const unsortedBookmarks = bookmarks.filter((bookmark) => {
		return bookmark.collectionId === "-1";
	});

	return {
		collections: {
			bookmarks: {
				unsortedBookmarkCount: unsortedBookmarks.length,
				bookmarkCount: bookmarks.length
			},
			collections,
			groups: groupWithCollections
		}
	};
};
