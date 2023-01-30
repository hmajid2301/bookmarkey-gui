<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { EllipsisSolid } from "svelte-awesome-icons";
	import toast from "svelte-french-toast";

	import CollectionItem from "./CollectionItem.svelte";
	import ContextMenu from "./ContextMenu.svelte";
	import { clickOutside } from "~/lib/use/clickOutside";
	import type { Group } from "~/routes/my/+layout.server";

	export let currentPath: string;
	export let hideGroups: Set<string>;
	export let group: Group;

	let showMenu = false;

	async function openMenu() {
		showMenu = true;
	}

	function closeMenu() {
		showMenu = false;
	}

	async function deleteGroup() {
		showMenu = false;
		const response = await fetch(`/my/groups/${group.id}`, {
			method: "DELETE"
		});
		if (response.ok) {
			toast.success("Deleted group");
			await invalidateAll();
		} else {
			toast.error("Failed to delete collection");
		}
	}
	// TODO: REFACTOR this file
</script>

<button
	class="flex w-full grow justify-between"
	on:click={() => {
		if (hideGroups.has(group.id)) {
			hideGroups.delete(group.id);
			/* eslint no-self-assign: "off" */
			hideGroups = hideGroups; //
		} else {
			hideGroups.add(group.id);
			/* eslint no-self-assign: "off" */
			hideGroups = hideGroups;
		}
	}}>
	<button id={group.id} class="mb-1 text-sm">
		{group.name}
	</button>
	<div on:click={openMenu} on:keyup={openMenu} use:clickOutside={closeMenu}>
		<EllipsisSolid />
		<div class="relative block w-full">
			<ContextMenu
				menuItems={[
					{
						name: "Delete Group",
						divider: true,
						onClick: async function () {
							await deleteGroup();
						}
					}
				]}
				{showMenu} />
		</div>
	</div>
</button>
{#if !hideGroups.has(group.id)}
	<div>
		{#each group.collections as collection}
			<CollectionItem {collection} {currentPath} />
		{/each}
	</div>
{/if}
