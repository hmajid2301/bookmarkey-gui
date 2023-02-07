<script lang="ts">
	import { tick } from "svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";
	import Collections from "../molecules/Collections.svelte";
	import AddCollectionForm from "./AddCollectionForm.svelte";
	import AddGroupForm from "./AddGroupForm.svelte";

	let showAddCollectionForm = false;

	let collectionRef: HTMLInputElement;
	let groupRef: HTMLInputElement;

	export let showAddGroupForm = false;
	export let currentPath: string;
	export let collections: CollectionGroups;

	$: $selectedGroupStore, showAddCollectionOnStore();
	// TODO: refactor
	async function showAddCollectionOnStore() {
		console.log("HEELLO", $selectedGroupStore);
		if ($selectedGroupStore.group.id) {
			return;
		}
		if (!$selectedGroupStore.addCollection) {
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
