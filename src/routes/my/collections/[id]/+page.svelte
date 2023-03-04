<script lang="ts">
	import { navigating } from "$app/stores";

	import type { PageData } from "./$types";
	import Bookmark from "~/lib/components/molecules/Bookmarks.svelte";
	import TopBar from "~/lib/components/molecules/TopBar.svelte";
	import AddBookmarkModal from "~/lib/components/organisms/AddBookmarkModal.svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";

	export let data: PageData;
	$: if ($navigating) {
		$selectedGroupStore.group.id = data.collection.group || "";
	}

	let ref: HTMLInputElement;
	let show = false;
</script>

<svelte:head>
	<title>My Collection: {data.collection.name}</title>
</svelte:head>

<TopBar collectionName={data.collection.name} nickname={data.user.nickname} bind:show bind:ref />

<Bookmark bookmarks={data.collection.bookmarks} />
<AddBookmarkModal collectionID={data.collection.id} bind:show bind:ref />
