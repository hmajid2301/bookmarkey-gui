<script lang="ts">
	import { API } from "~/lib/api/client";
	import type { BookmarksMetadataRecord } from "~/lib/api/types";
	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import FormField from "~/lib/components/molecules/FormField.svelte";
	import type { Collection } from "~/lib/types/components";

	export let url: string;
	export let collections: Collection[];
	export let metadata: BookmarksMetadataRecord | undefined = undefined;

	let collectionID: string;
	let loading = false;
	const api = new API();

	async function addBookmark() {
		loading = true;
		await api.createBookmark(collectionID, url);
		loading = false;
		window.close();
	}
</script>

<div class="h-min space-y-4 p-4 md:space-y-6">
	{#if metadata?.image}
		<img src={metadata?.image} alt="URL opengraph" />
	{/if}

	{#if metadata?.title}
		<FormField
			disabled={true}
			value={metadata?.title}
			type="text"
			labelName=""
			placeholder="Title"
			name="title" />
	{/if}

	{#if metadata?.description}
		<FormField
			disabled={true}
			value={metadata?.description}
			type="text"
			labelName=""
			name="description" />
	{/if}

	<label for="collection" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
		Select Collection
	</label>
	<select
		name="collection"
		bind:value={collectionID}
		class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
		<option selected value="-1">Unsorted Bookmarks</option>
		{#each collections as collection}
			<option value={collection.id}>{collection.name}</option>
		{/each}
	</select>
	<FormField disabled={loading} bind:value={url} type="text" labelName="URL" name="url" />
	<FormField disabled={true} type="tags" labelName="" name="tags" />
	<FullWidthButton on:click={addBookmark}>Add Bookmark</FullWidthButton>
</div>
