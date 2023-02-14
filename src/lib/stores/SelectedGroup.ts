import { writable } from "svelte/store";

export interface DragSelectedGroup {
	group: {
		id?: string;
	};
	addCollection: boolean;
}

export const selectedGroupStore = writable<DragSelectedGroup>({
	group: {},
	addCollection: false
});
