<script lang="ts">
	import { tick } from "svelte";

	import AddCollectionForm from "./AddCollectionForm.svelte";
	import AddGroupForm from "./AddGroupForm.svelte";
	import Collections from "./CollectionGroups.svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";

	let collectionRef: HTMLInputElement;
	let groupRef: HTMLInputElement;
	let showAddCollectionForm = false;

	export let showAddGroupForm = false;
	export let currentPath: string;
	export let collections: CollectionGroups;

	$: $selectedGroupStore, showAddCollectionOnStore();
	async function showAddCollectionOnStore() {
		if ($selectedGroupStore.group.id || !$selectedGroupStore.addCollection) {
			return;
		}

		showAddCollectionForm = true;
		await tick();
		collectionRef?.focus();
		$selectedGroupStore.addCollection = false;
	}
</script>

{#if showAddCollectionForm}
	<AddCollectionForm bind:ref={collectionRef} bind:showInput={showAddCollectionForm} />
{/if}
<AddGroupForm bind:ref={groupRef} bind:show={showAddGroupForm} />
<Collections {collections} {currentPath} />
