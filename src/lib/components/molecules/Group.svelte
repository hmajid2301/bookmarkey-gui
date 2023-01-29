<script lang="ts">
	import { EllipsisSolid } from "svelte-awesome-icons";

	import type { Group } from "~/routes/my/+layout.server";
	import CollectionItem from "./CollectionItem.svelte";

	export let currentPath: string;
	export let hideGroups: Set<string>;
	export let group: Group;
</script>

<button
	class="flex w-full grow justify-between"
	on:click={() => {
		if (hideGroups.has(group.id)) {
			hideGroups.delete(group.id);
			/* eslint no-self-assign: "off" */
			hideGroups = hideGroups; //
		} else {
			hideGroups.add(group.id);
			/* eslint no-self-assign: "off" */
			hideGroups = hideGroups;
		}
	}}>
	<button id={group.id} class="mb-1 text-lg">
		{group.name}
	</button>
	<EllipsisSolid />
</button>
{#if !hideGroups.has(group.id)}
	<div>
		{#each group.collections as collection}
			<CollectionItem {collection} {currentPath} />
		{/each}
	</div>
{/if}
