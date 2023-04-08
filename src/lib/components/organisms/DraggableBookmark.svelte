<script lang="ts">
	import Draggable from "./Draggable.svelte";
	import Bookmark from "~/lib/components/molecules/Bookmark.svelte";
	import { draggableStore, DraggingType } from "~/lib/stores/DraggableStore";
	import type { Bookmark as Bookmark_ } from "~/lib/types/components";

	export let bookmark: Bookmark_;
</script>

<Draggable
	classes="my-4"
	on:dragstart={() => {
		$draggableStore.bookmark.id = bookmark.id;
		$draggableStore.draggingType = DraggingType.Bookmark;
	}}>
	<Bookmark {bookmark} />
</Draggable>
