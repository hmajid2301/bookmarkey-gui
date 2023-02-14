import { writable } from "svelte/store";

export enum DraggingType {
	Collection = "collection",
	Group = "group"
}

export interface Dragging {
	collection: {
		newGroupId?: string;
		id?: string;
	};
	group: {
		id?: string;
	};
	draggingType?: DraggingType | null;
}

export const draggableStore = writable<Dragging>({
	collection: {},
	group: {}
});
