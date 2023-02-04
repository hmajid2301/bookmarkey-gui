import type { PageServerLoad } from "./$types";
import type { CollectionsResponse } from "~/lib/pocketbase-types";

interface OutputType {
	collection: CollectionsResponse;
}

export const load: PageServerLoad<OutputType> = async ({ locals, params }) => {
	const collection = await locals.pb
		?.collection("collections")
		.getOne<CollectionsResponse>(params.name);
	if (!collection) {
		throw Error("failed to get collection id");
	}
	return { collection: structuredClone(collection) };
};
