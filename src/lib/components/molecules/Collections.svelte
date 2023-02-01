<script lang="ts">
	import type { CollectionGroups } from "~/routes/my/+layout.server";
	import DraggableCollections from "./DraggableCollections.svelte";
	import DraggableGroups from "./DraggableGroups.svelte";

	export let currentPath: string;
	export let collections: CollectionGroups;
</script>

<div class="my-2 flex flex-col items-start space-y-1">
	{#if collections.groups}
		<DraggableGroups {currentPath} groups={collections.groups} />
	{/if}
	<DraggableCollections collections={collections.collections} {currentPath} />
</div>
