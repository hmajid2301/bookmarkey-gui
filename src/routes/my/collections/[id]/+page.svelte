<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { navigating } from "$app/stores";
	import toast from "svelte-french-toast";
	import { inview } from "svelte-inview";

	import type { CollectionBookmarks } from "./+page.server";
	import { API } from "~/lib/api/client";
	import TopBar from "~/lib/components/molecules/TopBar.svelte";
	import AddSimpleBookmarkModal from "~/lib/components/organisms/AddSimpleBookmarkModal.svelte";
	import DraggableBookmark from "~/lib/components/organisms/DraggableBookmark.svelte";
	import { draggableStore } from "~/lib/stores/DraggableStore";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";

	export let data;

	let ref: HTMLInputElement;
	let show = false;
	let page = 1;
	let collection = data.collection;
	let newCollection: CollectionBookmarks;
	let dragging = false;
	const api = new API();

	async function createBookmark_(e: DragEvent) {
		const url = e.dataTransfer?.getData("URL");
		if (!url) {
			return;
		}

		await api.createBookmark(collection.id, url);
		dragging = false;
		await invalidateAll();
		toast.success("Added bookmark");
	}

	$: {
		if ($navigating) {
			$selectedGroupStore.group.id = collection.group || "";
		}
		collection = { ...data.collection, ...newCollection };
	}
</script>

<svelte:head>
	<title>My Collection: {collection.name}</title>
</svelte:head>

<div
	class="{dragging ? 'bg-blue-500 transition-all duration-100' : ''} p-4 lg:p-8"
	on:dragenter|preventDefault|stopPropagation={() => {
		if ($draggableStore.draggingType !== null) {
			return;
		}
		dragging = true;
	}}
	on:dragend|preventDefault|stopPropagation={() => {
		dragging = false;
	}}
	on:dragover|preventDefault|stopPropagation
	on:dragstart|preventDefault|stopPropagation
	on:drop|preventDefault|stopPropagation={async (e) => {
		if ($draggableStore.draggingType !== null) {
			return;
		}

		await createBookmark_(e);
	}}>
	<TopBar collectionName={collection.name} nickname={data.user.nickname} bind:show bind:ref />

	{#each collection.bookmarks as bookmark}
		<DraggableBookmark {bookmark} />
	{/each}

	<div
		use:inview={{}}
		on:inview_enter={async () => {
			if (collection.moreBookmarks) {
				page += 1;
				await api.getBookmarks(collection.id, page);
			}
		}} />

	<AddSimpleBookmarkModal collectionID={collection.id} bind:show bind:ref />
</div>
