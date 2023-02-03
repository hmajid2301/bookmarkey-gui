<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { EllipsisSolid } from "svelte-awesome-icons";
	import toast from "svelte-french-toast";

	import ContextMenu from "./ContextMenu.svelte";
	import DraggableCollections from "./DraggableCollections.svelte";
	import type { Group } from "~/lib/types/components";
	import { clickOutside } from "~/lib/use/clickOutside";

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
			toast.error("Failed to delete group");
		}
	}
</script>

<button class="flex w-full grow justify-between">
	<button
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
		}}
		id={group.id}
		class="mb-1 text-sm">
		{group.name}
	</button>
	<button on:click={openMenu} on:keyup={openMenu} use:clickOutside={closeMenu}>
		<EllipsisSolid />
		<div class="relative block w-full">
			<ContextMenu
				menuItems={[
					{
						name: "Delete Group",
						onClick: async function () {
							await deleteGroup();
						}
					}
				]}
				{showMenu} />
		</div>
	</button>
</button>

{#if !hideGroups.has(group.id)}
	<div class="my-2 flex flex-col items-start space-y-1">
		<DraggableCollections groupId={group.id} collections={group.collections} {currentPath} />
	</div>
{/if}
