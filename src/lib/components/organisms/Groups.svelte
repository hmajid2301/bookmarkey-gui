<script lang="ts">
	import { tick } from "svelte";

	import AddCollectionForm from "./AddCollectionForm.svelte";
	import AddGroupForm from "./AddGroupForm.svelte";
	import DraggableCollections from "./DraggableCollections.svelte";
	import DraggableGroups from "./DraggableGroups.svelte";
	import Collection from "../organisms/Collection.svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";

	let collectionRef: HTMLInputElement;
	let groupRef: HTMLInputElement;
	let showAddCollectionForm = false;

	export let showAddGroupForm = false;
	export let currentPath: string;
	export let collections: CollectionGroups;

	$: (async () => {
		if (showAddGroupForm) {
			await tick();
			groupRef?.focus();
		}
	})();
	$: $selectedGroupStore, void showAddCollectionOnStore();

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

<Collection
	collection={{
		id: "0",
		name: "All Bookmarks",
		bookmarkCount: collections.bookmarks.bookmarkCount
	}} />
<Collection
	collection={{
		id: "-1",
		name: "Unsorted Bookmarks",
		bookmarkCount: collections.bookmarks.unsortedBookmarkCount
	}} />
<div class="my-2 flex flex-col items-start space-y-1">
	<DraggableGroups {currentPath} groups={collections.groups || []} />
	<DraggableCollections collections={collections.collections} {currentPath} />
</div>
