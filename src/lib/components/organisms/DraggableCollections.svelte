<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import toast from "svelte-french-toast";

	import Collection from "../molecules/Collection.svelte";
	import { draggableStore, DraggingType } from "~/lib/stores/DraggableStore";
	import type { CollectionMove } from "~/lib/types/api";
	import type { Collection as Collection_ } from "~/lib/types/components";

	export let currentPath: string;
	export let collections: Collection_[];
	export let groupId: string | undefined = undefined;

	async function moveCollection(swapToIndex: number) {
		const collectionMove: CollectionMove = {
			new_order: swapToIndex + 1,
			collection_id: $draggableStore.collection.id || "",
			group_id: $draggableStore.collection.newGroupId || ""
		};

		const response = await fetch(`/my/collections/move`, {
			method: "POST",
			body: JSON.stringify(collectionMove)
		});
		if (response.ok) {
			toast.success("Moved collection");
			invalidateAll();
		} else {
			toast.error("Failed to move collection");
		}
	}
	const collectionIdOpenMenuMap: { [key: string]: boolean } = {};
</script>

{#if collections.length === 0}
	<div
		class="flex grow"
		draggable="true"
		on:dragend={() => {
			moveCollection(0);
		}}
		on:dragenter={() => {
			$draggableStore.collection.newGroupId = groupId || "";
		}}
		on:dragover|preventDefault>
		<p class="text-xs text-gray-800 dark:text-gray-200">Empty Collection</p>
	</div>
{/if}

{#each collections as collection, index (collection)}
	<div
		class="flex grow"
		draggable="true"
		on:contextmenu|preventDefault|stopPropagation={() => {
			collectionIdOpenMenuMap[collection.id] = true;
		}}
		on:dragstart={() => {
			$draggableStore.collection.id = collection.id;
			$draggableStore.draggingType = DraggingType.Collection;
		}}
		on:dragend={() => {
			moveCollection(index);
			$draggableStore.draggingType = null;
			$draggableStore.collection = {};
		}}
		on:dragenter={() => {
			$draggableStore.collection.newGroupId = groupId || "";
		}}
		on:dragover|preventDefault>
		<Collection
			{collection}
			{currentPath}
			bind:showMenu={collectionIdOpenMenuMap[collection.id]} />
	</div>
{/each}
