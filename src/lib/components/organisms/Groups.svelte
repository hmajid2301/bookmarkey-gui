<script lang="ts">
	import { tick } from "svelte";

	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";
	import Collection from "../molecules/Collection.svelte";
	import AddCollectionForm from "./AddCollectionForm.svelte";
	import AddGroupForm from "./AddGroupForm.svelte";
	import DraggableCollections from "./DraggableCollections.svelte";
	import DraggableGroups from "./DraggableGroups.svelte";

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

<Collection
	collection={{
		id: "0",
		name: "All Bookmarks",
		bookmarkCount: collections.bookmarks.bookmarkCount
	}}
	showMenu={false} />
<Collection
	collection={{
		id: "-1",
		name: "Unsorted",
		bookmarkCount: collections.bookmarks.unsortedBookmarkCount
	}}
	showMenu={false} />
<div class="my-2 flex flex-col items-start space-y-1">
	<DraggableGroups {currentPath} groups={collections.groups || []} />
	<DraggableCollections collections={collections.collections} {currentPath} />
</div>
