<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { clickoutside } from "@svelte-put/clickoutside";
	import { tick } from "svelte";
	import FolderClosedSolid from "svelte-awesome-icons/FolderClosedSolid.svelte";
	import toast from "svelte-french-toast";

	import ContextMenu from "./ContextMenu.svelte";
	import Input from "../atoms/Input.svelte";
	import type { Collection } from "~/lib/types/components";

	export let collection: Collection;
	export let showMenu: boolean | undefined = false;

	let edittingName = false;
	let ref: HTMLInputElement;

	function closeMenu() {
		showMenu = false;
	}

	async function patchCollectionName(newCollectionName: string) {
		showMenu = false;
		edittingName = false;

		const response = await fetch(`/my/collections/${collection.id}`, {
			method: "PATCH",
			body: JSON.stringify({ name: newCollectionName })
		});
		if (response.ok) {
			toast.success("Renamed collection");
			await invalidateAll();
		} else {
			toast.error("Failed to rename collection");
		}
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

	async function renameCollection(event: Event) {
		const target = event.target as HTMLInputElement;
		const newCollectionName = target.value;
		await patchCollectionName(newCollectionName);
	}
</script>

<a
	class="flex grow flex-row space-x-4 rounded-lg py-1 transition-all duration-100 hover:bg-slate-200 dark:hover:bg-slate-700"
	href={`/my/collections/${collection.id}`}
	use:clickoutside
	on:clickoutside={closeMenu}>
	<div>
		<FolderClosedSolid />
	</div>
	<div class="flex grow">
		{#if edittingName}
			<Input
				bind:ref
				on:change={async (event) => {
					await renameCollection(event);
				}}
				on:blur={() => {
					edittingName = false;
				}}
				placeholder="New Collection Name"
				type="text"
				name="collection" />
		{:else}
			<div class="flex grow justify-between">
				<div>
					{collection.name}
				</div>
				<div class="text-sm font-bold text-black dark:text-gray-200">
					{collection.bookmarkCount}
				</div>
			</div>
		{/if}
	</div>
</a>

<ContextMenu
	menuItems={[
		{
			name: "Rename Collection",
			onClick: async function () {
				edittingName = true;
				await tick();
				ref?.focus();
				ref?.select();
			}
		},
		{
			name: "Delete Collection",
			onClick: async function () {
				await deleteCollection();
			}
		}
	]}
	showMenu={showMenu ?? false} />
