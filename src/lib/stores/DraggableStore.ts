import { writable } from "svelte/store";

export enum DraggingType {
	Collection = "collection",
	Group = "group"
}

interface Drag {
	collection: {
		newGroupId?: string;
		collectionId?: string;
	};
	group: {
		groupId?: string;
	};
	draggingType?: DraggingType | null;
}

export const draggableStore = writable<Drag>({
	collection: {},
	group: {}
});
