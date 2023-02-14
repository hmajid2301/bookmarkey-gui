<script lang="ts">
	import DraggableCollections from "../organisms/DraggableCollections.svelte";
	import DraggableGroups from "../organisms/DraggableGroups.svelte";
	import type { Dragging } from "~/lib/stores/DraggableStore";
	import type { DragSelectedGroup } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";

	export let currentPath: string;
	export let collections: CollectionGroups;
	export let selectedDrag: DragSelectedGroup;
	export let dragging: Dragging;
</script>

<div class="my-2 flex flex-col items-start space-y-1">
	<DraggableGroups {dragging} {selectedDrag} {currentPath} groups={collections.groups || []} />
	<DraggableCollections {dragging} collections={collections.collections} {currentPath} />
</div>
