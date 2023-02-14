<script lang="ts">
	import { tick } from "svelte";

	import AddCollectionForm from "./AddCollectionForm.svelte";
	import AddGroupForm from "./AddGroupForm.svelte";
	import Collections from "../molecules/CollectionGroups.svelte";
	import type { Drag } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";

	let showAddCollectionForm = false;
	let collectionRef: HTMLInputElement;
	let groupRef: HTMLInputElement;

	export let showAddGroupForm = false;
	export let currentPath: string;
	export let collections: CollectionGroups;
	export let drag: Drag;

	$: {
		console.log("CollectionSidebar", showAddGroupForm);
	}

	$: showAddCollectionOnStore();
	async function showAddCollectionOnStore() {
		if (drag.group.id || !drag.addCollection) {
			return;
		}

		showAddCollectionForm = true;
		await tick();
		collectionRef?.focus();
		drag.addCollection = false;
	}
</script>

{#if showAddCollectionForm}
	<AddCollectionForm bind:ref={collectionRef} bind:showInput={showAddCollectionForm} />
{/if}
<AddGroupForm bind:ref={groupRef} bind:show={showAddGroupForm} />
<Collections {collections} {currentPath} {drag} />
