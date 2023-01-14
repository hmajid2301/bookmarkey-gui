import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";

export interface Collection {
	id: string;
	name: string;
}

export type OutputType = { collections: Collection[] };

export const load: LayoutServerLoad<OutputType> = async ({ locals }) => {
	if (!locals.pb?.authStore.isValid) {
		throw redirect(303, "/login");
	}

	const collections = await locals.pb
		?.collection("collections")
		.getList<Collection>(1, 30, { user: locals.user?.id, sort: "-created" });

	return {
		collections: collections.items.map((collection) => {
			return { name: collection.name, id: collection.id };
		})
	};
};
