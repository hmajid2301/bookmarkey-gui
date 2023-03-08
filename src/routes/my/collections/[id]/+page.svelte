<script lang="ts">
	import { navigating } from "$app/stores";
	import { inview } from "svelte-inview";
	import { Circle } from "svelte-loading-spinners";

	import type { PageData } from "./$types";
	import type { Collection } from "./+page.server";
	import Bookmark from "~/lib/components/molecules/Bookmarks.svelte";
	import TopBar from "~/lib/components/molecules/TopBar.svelte";
	import AddBookmarkModal from "~/lib/components/organisms/AddBookmarkModal.svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";

	export let data: PageData;

	let ref: HTMLInputElement;
	let show = false;
	let page = 1;
	let collection = data.collection;
	let newCollection: Collection;
	let loading = false;

	async function getBookmarks() {
		console.log("HELLO");
		loading = true;
		const resp = await fetch(`/my/collections/${data.collection.id}?page=${page}`, {
			method: "GET"
		});
		newCollection = (await resp.json()) as Collection;
		loading = false;
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

<TopBar collectionName={collection.name} nickname={data.user.nickname} bind:show bind:ref />

<Bookmark bookmarks={collection.bookmarks} />
<div
	use:inview={{}}
	on:enter={async () => {
		console.log("HELLO");
		if (collection.moreBookmarks) {
			console.log("HELLO");
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
