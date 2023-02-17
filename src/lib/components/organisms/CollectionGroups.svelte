<script lang="ts">
	import DraggableCollections from "./DraggableCollections.svelte";
	import DraggableGroups from "./DraggableGroups.svelte";
	import type { CollectionGroups } from "~/lib/types/components";

	export let currentPath: string;
	export let collections: CollectionGroups;
</script>

<div class="my-2 flex flex-col items-start space-y-1">
	<DraggableGroups {currentPath} groups={collections.groups || []} />
	<DraggableCollections collections={collections.collections} {currentPath} />
</div>
