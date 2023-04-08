<script lang="ts">
	import Draggable from "./Draggable.svelte";
	import Collection from "../organisms/Collection.svelte";
	import { API } from "~/lib/api/client";
	import { draggableStore, DraggingType } from "~/lib/stores/DraggableStore";
	import type { CollectionMove } from "~/lib/types/api";
	import type { Collection as Collection_ } from "~/lib/types/components";

	export let currentPath: string;
	export let collections: Collection_[];
	export let groupId: string | undefined = undefined;

	const api = new API();

	async function moveCollection(swapToIndex: number) {
		const collectionMove: CollectionMove = {
			newOrder: swapToIndex + 1,
			groupId: $draggableStore.collection.newGroupId || ""
		};
		await api.moveCollection($draggableStore.collection.id || "", collectionMove);
	}
</script>

{#if collections.length === 0}
	<Draggable
		classes="flex grow"
		on:dragend={async () => {
			await moveCollection(0);
		}}
		on:dragenter={() => {
			$draggableStore.collection.newGroupId = groupId || "";
		}}>
		<p class="text-xs text-gray-800 dark:text-gray-200">Empty Collection</p>
	</Draggable>
{/if}

{#each collections as collection, index (collection)}
	<Draggable
		classes="flex w-full grow px-1 transition-all duration-100 hover:bg-slate-200 dark:hover:bg-slate-700"
		on:dragstart={() => {
			$draggableStore.collection.id = collection.id;
			$draggableStore.draggingType = DraggingType.Collection;
		}}
		on:dragend={async () => {
			await moveCollection(index);
			$draggableStore.draggingType = null;
			$draggableStore.collection = {};
		}}
		on:dragenter={() => {
			$draggableStore.collection.newGroupId = groupId || "";
		}}
		on:drop={async () => {
			if ($draggableStore.draggingType === DraggingType.Bookmark) {
				await api.moveBookmark($draggableStore.bookmark.id || "", collection.id);
				$draggableStore.draggingType = null;
				$draggableStore.collection = {};
			}
		}}>
		<div
			data-testid={`DraggableCollection-${collection.id}`}
			class:activeCollection={currentPath === `/my/collections/${collection.id}`}>
			<Collection {collection} />
		</div>
	</Draggable>
{/each}
