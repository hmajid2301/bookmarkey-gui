import { writable } from "svelte/store";

export enum DraggingType {
	Collection = "collection",
	Group = "group",
	Bookmark = "bookmark"
}

export interface Dragging {
	collection: {
		newGroupId?: string;
		id?: string;
	};
	group: {
		id?: string;
	};
	bookmark: {
		id?: string;
	};
	draggingType?: DraggingType | null;
}

export const draggableStore = writable<Dragging>({
	collection: {},
	group: {},
	bookmark: {}
});
