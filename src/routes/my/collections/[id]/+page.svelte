<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { navigating } from "$app/stores";
	import toast from "svelte-french-toast";
	import { inview } from "svelte-inview";
	import { Circle } from "svelte-loading-spinners";
	import { superForm } from "sveltekit-superforms/client";

	import type { CollectionBookmarks } from "./+page.server";
	import TopBar from "~/lib/components/molecules/TopBar.svelte";
	import AddBookmarkModal from "~/lib/components/organisms/AddBookmarkModal.svelte";
	import DraggableBookmark from "~/lib/components/organisms/DraggableBookmark.svelte";
	import { draggableStore } from "~/lib/stores/DraggableStore";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";

	export let data;

	let ref: HTMLInputElement;
	let show = false;
	let page = 1;
	let collection = data.collection;
	let newCollection: CollectionBookmarks;
	let loading = false;
	let dragging = false;

	async function getBookmarks() {
		loading = true;
		const resp = await fetch(`/my/collections/${data.collection.id}?page=${page}`, {
			method: "GET"
		});
		newCollection = (await resp.json()) as CollectionBookmarks;
		loading = false;
	}

	async function createBookmark(e: DragEvent) {
		const url = e.dataTransfer?.getData("URL");
		if (!url) {
			return;
		}

		await fetch(`/my/collections/${data.collection.id}/bookmarks`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ url: url })
		});
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

		await createBookmark(e);
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
				await getBookmarks();
			}
		}} />

	{#if loading}
		<div class="flex content-center justify-center text-white">
			<Circle size="60" color="#FACC14" unit="px" duration="1s" />
		</div>
	{/if}
	<AddBookmarkModal collectionID={collection.id} bind:show bind:ref />
</div>
