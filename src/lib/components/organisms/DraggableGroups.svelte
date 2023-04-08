<script lang="ts">
	import { flip } from "svelte/animate";
	import toast from "svelte-french-toast";

	import Group from "./Group.svelte";
	import { API } from "~/lib/api/client";
	import { draggableStore, DraggingType } from "~/lib/stores/DraggableStore";
	import type { GroupSwap } from "~/lib/types/api";
	import type { Group as Group_ } from "~/lib/types/components";

	export let groups: Group_[] = [];
	export let currentPath: string;

	const dragDuration = 300;
	let hiddenGroups = new Set<string>();
	let animatingCards = new Set();
	let swapFromindex: number | undefined;

	const api = new API();
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

		await api.swapGroup(groupSwap);
		const swappingFrom = groups[swapFromindex];
		const swappingTo = groups[swapToIndex];
		if (swappingTo && swappingFrom) {
			groups[swapFromindex] = swappingTo;
			groups[swapToIndex] = swappingFrom;
			toast.success("Moved group");
		}
	}
</script>

{#each groups as group, index (group)}
	<div
		class="flex w-full grow flex-col"
		animate:flip={{ duration: dragDuration }}
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
		on:dragenter={async () => {
			if ($draggableStore.draggingType !== DraggingType.Collection) {
				await changeGroupOrder(index);
				$draggableStore.draggingType = null;
				$draggableStore.group = {};
			}
		}}
		on:dragover|preventDefault>
		<Group {group} bind:hiddenGroups {currentPath} />
	</div>
{/each}
