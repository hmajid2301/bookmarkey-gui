<script lang="ts">
	import DraggableCollections from "../organisms/DraggableCollections.svelte";
	import DraggableGroups from "../organisms/DraggableGroups.svelte";
	import type { Drag } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";

	export let currentPath: string;
	export let collections: CollectionGroups;
	export let drag: Drag;
</script>

<div class="my-2 flex flex-col items-start space-y-1">
	<DraggableGroups {drag} {currentPath} groups={collections.groups || []} />
	<DraggableCollections collections={collections.collections} {currentPath} />
</div>
