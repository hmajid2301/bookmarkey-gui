<script lang="ts">
	import { tick } from "svelte";

	import AddCollectionForm from "./AddCollectionForm.svelte";
	import AddGroupForm from "./AddGroupForm.svelte";
	import Collections from "../molecules/CollectionGroups.svelte";
	import type { Dragging } from "~/lib/stores/DraggableStore";
	import type { DragSelectedGroup } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";

	let showAddCollectionForm = false;
	let collectionRef: HTMLInputElement;
	let groupRef: HTMLInputElement;

	export let showAddGroupForm = false;
	export let currentPath: string;
	export let collections: CollectionGroups;
	export let selectedDrag: DragSelectedGroup;
	export let dragging: Dragging;

	$: showAddCollectionOnStore();
	async function showAddCollectionOnStore() {
		if (selectedDrag.group.id || !selectedDrag.addCollection) {
			return;
		}

		showAddCollectionForm = true;
		await tick();
		collectionRef?.focus();
		selectedDrag.addCollection = false;
	}
</script>

{#if showAddCollectionForm}
	<AddCollectionForm bind:ref={collectionRef} bind:showInput={showAddCollectionForm} />
{/if}
<AddGroupForm bind:ref={groupRef} bind:show={showAddGroupForm} />
<Collections {collections} {dragging} {currentPath} {selectedDrag} />
