<script lang="ts">
	import { flip } from "svelte/animate";
	import toast from "svelte-french-toast";

	import Group from "./Group.svelte";
	import type { Dragging } from "~/lib/stores/DraggableStore";
	import { DraggingType } from "~/lib/stores/DraggableStore";
	import type { DragSelectedGroup } from "~/lib/stores/SelectedGroup";
	import type { GroupSwap } from "~/lib/types/api";
	import type { Group as Group_ } from "~/lib/types/components";

	export let groups: Group_[] = [];
	export let selectedDrag: DragSelectedGroup;
	export let dragging: Dragging;
	export let currentPath: string;

	const dragDuration = 300;
	let hiddenGroups = new Set<string>();
	let animatingCards = new Set();
	let swapFromindex: number | undefined;
	const collectionIdOpenMenuMap: { [key: string]: boolean } = {};

	async function changeGroupOrder(swapToIndex: number) {
		if (swapFromindex === swapToIndex || animatingCards.has(swapToIndex)) return;
		animatingCards.add(swapToIndex);
		setTimeout(() => animatingCards.delete(swapToIndex), dragDuration);
		if (swapFromindex === undefined) return;

		const groupSwap: GroupSwap[] = [
			{
				new_order: swapToIndex,
				group_id: groups[swapFromindex]?.id || ""
			},
			{
				new_order: swapFromindex,
				group_id: groups[swapToIndex]?.id || ""
			}
		];

		const response = await fetch(`/my/groups/swap`, {
			method: "POST",
			body: JSON.stringify(groupSwap)
		});
		if (response.ok) {
			const swappingFrom = groups[swapFromindex];
			const swappingTo = groups[swapToIndex];
			if (swappingTo && swappingFrom) {
				groups[swapFromindex] = swappingTo;
				groups[swapToIndex] = swappingFrom;
				toast.success("Moved group");
			}
		} else {
			toast.error("Failed to move group");
		}
	}
</script>

{#each groups as group, index (group)}
	<div
		class="flex w-full grow flex-col"
		animate:flip={{ duration: dragDuration }}
		on:contextmenu={() => {
			collectionIdOpenMenuMap[group.id] = true;
		}}
		draggable={dragging.draggingType === DraggingType.Collection ? "false" : "true"}
		on:dragstart={() => {
			if (dragging.draggingType !== DraggingType.Collection) {
				dragging.draggingType = DraggingType.Group;
				dragging.group.id = group.id || "";
				swapFromindex = index;
			}
		}}
		on:dragend={() => {
			swapFromindex = undefined;
		}}
		on:dragenter={() => {
			if (dragging.draggingType !== DraggingType.Collection) {
				changeGroupOrder(index);
				dragging.draggingType = null;
				dragging.group = {};
			}
		}}
		on:dragover|preventDefault>
		<Group
			{dragging}
			{selectedDrag}
			{group}
			bind:showMenu={collectionIdOpenMenuMap[group.id]}
			bind:hiddenGroups
			{currentPath} />
	</div>
{/each}
