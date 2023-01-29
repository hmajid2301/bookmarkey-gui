<script lang="ts">
	import toast from "svelte-french-toast";
	import { flip } from "svelte/animate";

	import type { Group as GroupC } from "~/routes/my/+layout.server";
	import Group from "./Group.svelte";

	export let groups: GroupC[] = [];
	export let currentPath: string;
	export let hideGroups = new Set<string>();

	const dragDuration = 300;
	let animatingCards = new Set();
	let swapFromindex: number | undefined;

	async function changeGroupOrder(swapToIndex: number) {
		if (swapFromindex === swapToIndex || animatingCards.has(swapToIndex)) return;
		animatingCards.add(swapToIndex);
		setTimeout(() => animatingCards.delete(swapToIndex), dragDuration);
		if (swapFromindex === undefined) return;

		const response = await fetch(`/my/groups/swap`, {
			method: "POST",
			body: JSON.stringify([
				{
					new_order: swapToIndex,
					group_id: groups[swapFromindex]?.id
				},
				{
					new_order: swapFromindex,
					group_id: groups[swapToIndex]?.id
				}
			])
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
		class="flex w-full grow"
		animate:flip={{ duration: dragDuration }}
		draggable="true"
		on:dragstart={() => {
			console.log("DRAGGING ME");
			swapFromindex = index;
		}}
		on:dragend={() => {
			console.log("DRAGGING END");
			swapFromindex = undefined;
		}}
		on:dragenter={() => {
			console.log("DRAGGING ENTGER");
			changeGroupOrder(index);
		}}
		on:dragover|preventDefault>
		<Group {group} bind:hideGroups {currentPath} />
	</div>
{/each}
