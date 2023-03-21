<script lang="ts">
	import Bookmark from "~/lib/components/molecules/Bookmark.svelte";
	import { draggableStore, DraggingType } from "~/lib/stores/DraggableStore";
	import type { Bookmark as Bookmark_ } from "~/lib/types/components";

	export let bookmark: Bookmark_;
</script>

<div
	class="my-4"
	draggable="true"
	on:dragstart|stopPropagation={() => {
		$draggableStore.bookmark.id = bookmark.id;
		$draggableStore.draggingType = DraggingType.Bookmark;
	}}>
	<Bookmark {bookmark} />
</div>
