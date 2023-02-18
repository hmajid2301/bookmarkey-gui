import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
import type { CollectionsResponse, GroupsResponse } from "~/lib/pocketbase/types.generated";
import type { Collection, CollectionGroups, Group } from "~/lib/types/components";

export type OutputType = { collections: CollectionGroups };

export const load: LayoutServerLoad<OutputType> = async ({ locals }) => {
	if (!locals.pb?.authStore.isValid) {
		throw redirect(303, "/login");
	}

	const collectionsWithoutGroup = await locals.pb
		?.collection("collections")
		.getList<CollectionsResponse>(1, 30, { sort: "-created", filter: "group = NULL" });

	const groups = await locals.pb?.collection("groups").getList<GroupsResponse>(1, 30, {
		sort: "custom_order,-created",
		expand: "collections(group)"
	});

	const groupWithCollections: Group[] = [];
	groups.items.forEach((group) => {
		const collectionInGroup: Collection[] = [];
		const item: Group = {
			id: group.id,
			name: group.name || "",
			collections: collectionInGroup
		};

		if (group.expand && "collections(group)" in group.expand) {
			group.expand["collections(group)"].forEach((coll: Collection) => {
				collectionInGroup.push({
					name: coll["name"],
					id: coll["id"]
				});
			});
		}
		groupWithCollections.push(item);
	});

	const collections: Collection[] = [];
	collectionsWithoutGroup.items.forEach((collection) => {
		collections.push({
			id: collection.id,
			name: collection.name
		});
	});

	return {
		collections: {
			collections,
			groups: groupWithCollections
		}
	};
};
