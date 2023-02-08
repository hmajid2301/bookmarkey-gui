<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import FolderClosedSolid from "svelte-awesome-icons/FolderClosedSolid.svelte";
	import toast from "svelte-french-toast";

	import ContextMenu from "./ContextMenu.svelte";
	import type { Collection } from "~/lib/types/components";
	import { clickOutside } from "~/lib/use/clickOutside";

	export let currentPath: string;
	export let collection: Collection;

	let showMenu = false;

	async function openMenu() {
		showMenu = true;
	}

	function closeMenu() {
		showMenu = false;
	}

	async function deleteCollection() {
		showMenu = false;
		const response = await fetch(`/my/collections/${collection.id}`, {
			method: "DELETE"
		});
		if (response.ok) {
			toast.success("Deleted collection");
			await invalidateAll();
		} else {
			toast.error("Failed to delete collection");
		}
	}
</script>

<a
	class=" flex grow flex-row space-x-4 rounded-lg py-2 px-2"
	class:active={currentPath === `/my/collections/${collection.id}`}
	href={`/my/collections/${collection.id}`}
	on:contextmenu|preventDefault={openMenu}
	use:clickOutside={closeMenu}>
	<div>
		<FolderClosedSolid />
	</div>
	<div class="flex grow">
		{collection.name}
	</div>
</a>

<div data-testid={collection.id} class="relative z-10 {showMenu ? 'block' : 'hidden'}">
	<ContextMenu
		menuItems={[
			{
				name: "Delete Collection",
				onClick: async function () {
					await deleteCollection();
				}
			}
		]}
		{showMenu} />
</div>
