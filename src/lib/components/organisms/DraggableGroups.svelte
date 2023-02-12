<script lang="ts">
	import toast from "svelte-french-toast";
	import { flip } from "svelte/animate";

	import { draggableStore, DraggingType } from "~/lib/stores/DraggableStore";
	import type { Drag } from "~/lib/stores/SelectedGroup";
	import type { GroupSwap } from "~/lib/types/api";
	import type { Group as Group_ } from "~/lib/types/components";
	import Group from "./Group.svelte";

	export let groups: Group_[] = [];
	export let drag: Drag;
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
		draggable={$draggableStore.draggingType === DraggingType.Collection ? "false" : "true"}
		on:dragstart={() => {
			if ($draggableStore.draggingType !== DraggingType.Collection) {
				$draggableStore.draggingType = DraggingType.Group;
				$draggableStore.group.id = group.id || "";
				swapFromindex = index;
			}
		}}
		on:dragend={() => {
			swapFromindex = undefined;
		}}
		on:dragenter={() => {
			if ($draggableStore.draggingType !== DraggingType.Collection) {
				changeGroupOrder(index);
				$draggableStore.draggingType = null;
				$draggableStore.group = {};
			}
		}}
		on:dragover|preventDefault>
		<Group
			{drag}
			{group}
			bind:showMenu={collectionIdOpenMenuMap[group.id]}
			bind:hiddenGroups
			{currentPath} />
	</div>
{/each}
