<script lang="ts">
	import CollectionItem from "./CollectionItem.svelte";
	import Group from "./Group.svelte";
	import type { CollectionGroups } from "~/routes/my/+layout.server";

	export let currentPath: string;
	export let collections: CollectionGroups;
	export let hideGroups = new Set<string>();
</script>

<div class="my-2 flex flex-col items-start space-y-1">
	{#if collections.groups}
		{#each collections.groups as group}
			<Group {group} bind:hideGroups {currentPath} />
		{/each}
	{/if}
	{#each collections.collections as collection}
		<CollectionItem {collection} {currentPath} />
	{/each}
</div>
