<script lang="ts">
	import CollectionItem from "./CollectionItem.svelte";
	import type { Collection } from "~/routes/my/+layout.server";

	export let currentPath: string;
	export let collections: Collection[];
</script>

<div class="my-2 flex flex-col items-start">
	{#each collections as collection}
		<CollectionItem {collection} {currentPath} />
	{/each}
</div>
