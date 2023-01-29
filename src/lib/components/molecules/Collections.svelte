<script lang="ts">
	import CollectionItem from "./CollectionItem.svelte";
	import DraggableGroups from "./DraggableGroups.svelte";
	import type { CollectionGroups } from "~/routes/my/+layout.server";

	export let currentPath: string;
	export let collections: CollectionGroups;
</script>

<div class="my-2 flex flex-col items-start space-y-1">
	{#if collections.groups}
		<DraggableGroups {currentPath} groups={collections.groups} />
	{/if}
	{#each collections.collections as collection}
		<CollectionItem {collection} {currentPath} />
	{/each}
</div>
