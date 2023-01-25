<script lang="ts" context="module">
	export interface Collection {
		id: string;
		name: string;
	}
</script>

<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { FolderClosedSolid } from "svelte-awesome-icons";
	import toast from "svelte-french-toast";

	import ContextMenu from "./ContextMenu.svelte";
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
	class=" flex w-full flex-row space-x-4 rounded-lg py-2 px-2"
	class:active={currentPath === `/my/collections/${collection.id}`}
	href={`/my/collections/${collection.id}`}
	on:contextmenu|preventDefault={openMenu}
	use:clickOutside={closeMenu}>
	<div>
		<FolderClosedSolid />
	</div>
	<div>
		{collection.name}
	</div>
</a>

<div class="relative block w-full">
	<ContextMenu
		menuItems={[
			{
				name: "Delete Collection",
				divider: true,
				onClick: async function () {
					await deleteCollection();
				}
			}
		]}
		{showMenu} />
</div>
