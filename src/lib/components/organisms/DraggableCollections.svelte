<script lang="ts">
	import type pocketbase from "pocketbase";
	import { onMount } from "svelte";

	import Collection from "../organisms/Collection.svelte";
	import { getPB, moveBookmark, moveCollection } from "~/lib/pocketbase/frontend";
	import { draggableStore, DraggingType } from "~/lib/stores/DraggableStore";
	import type { CollectionMove } from "~/lib/types/api";
	import type { Collection as Collection_ } from "~/lib/types/components";

	export let currentPath: string;
	export let collections: Collection_[];
	export let groupId: string | undefined = undefined;

	let pb: pocketbase;

	onMount(() => {
		pb = getPB();
	});

	async function mCollection(swapToIndex: number) {
		const collectionMove: CollectionMove = {
			newOrder: swapToIndex + 1,
			groupId: $draggableStore.collection.newGroupId || ""
		};
		await moveCollection(pb, $draggableStore.collection.id || "", collectionMove);
	}

	async function mBookmark(bookmarkID: string, newCollectionID: string) {
		await moveBookmark(pb, bookmarkID, newCollectionID);
	}
</script>

{#if collections.length === 0}
	<div
		class="flex grow"
		draggable="true"
		on:dragend={() => {
			mCollection(0);
		}}
		on:dragenter={() => {
			$draggableStore.collection.newGroupId = groupId || "";
		}}
		on:drop|preventDefault
		on:dragover|preventDefault>
		<p class="text-xs text-gray-800 dark:text-gray-200">Empty Collection</p>
	</div>
{/if}

{#each collections as collection, index (collection)}
	<div
		data-testid={`DraggableCollection-${collection.id}`}
		class="flex w-full grow px-1 transition-all duration-100 hover:bg-slate-200 dark:hover:bg-slate-700"
		class:activeCollection={currentPath === `/my/collections/${collection.id}`}
		draggable="true"
		on:dragstart={() => {
			$draggableStore.collection.id = collection.id;
			$draggableStore.draggingType = DraggingType.Collection;
		}}
		on:dragend={async () => {
			await mCollection(index);
			$draggableStore.draggingType = null;
			$draggableStore.collection = {};
		}}
		on:dragenter={() => {
			$draggableStore.collection.newGroupId = groupId || "";
		}}
		on:drop|preventDefault={async () => {
			if ($draggableStore.draggingType === DraggingType.Bookmark) {
				await mBookmark($draggableStore.bookmark.id || "", collection.id);
				$draggableStore.draggingType = null;
				$draggableStore.collection = {};
			}
		}}
		on:dragover|preventDefault>
		<Collection {collection} />
	</div>
{/each}
