import { writable } from "svelte/store";

interface Drag {
	group: {
		id?: string;
	};
	addCollection: boolean;
}

export const selectedGroupStore = writable<Drag>({
	group: {},
	addCollection: false
});
