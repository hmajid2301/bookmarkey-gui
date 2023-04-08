<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { tick } from "svelte";
	import FolderClosedSolid from "svelte-awesome-icons/FolderClosedSolid.svelte";
	import ContextMenu, { Item } from "svelte-contextmenu";
	import toast from "svelte-french-toast";

	import Input from "../atoms/Input.svelte";
	import { API } from "~/lib/api/client";
	import type { Collection } from "~/lib/types/components";

	export let collection: Collection;

	let edittingName = false;
	let contextMenu: ContextMenu;
	let ref: HTMLInputElement;
	const api = new API();

	async function patchCollectionName(newCollectionName: string) {
		edittingName = false;
		try {
			await api.updateCollection(collection.id, { collectionId: newCollectionName });
			toast.success("Renamed collection");
			await invalidateAll();
		} catch (err) {
			toast.error("Failed to rename collection");
		}
	}

	async function renameCollection(event: Event) {
		const target = event.target as HTMLInputElement;
		const newCollectionName = target.value;
		await patchCollectionName(newCollectionName);
	}
</script>

<a
	on:contextmenu={(e) => {
		contextMenu.show(e);
	}}
	class="flex grow flex-row space-x-4 rounded-lg py-1 transition-all duration-100 hover:bg-slate-200 dark:hover:bg-slate-700"
	href={`/my/collections/${collection.id}`}>
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

<ContextMenu bind:this={contextMenu}>
	<Item
		on:click={async function () {
			edittingName = true;
			await tick();
			ref?.focus();
			ref?.select();
		}}>
		Rename Collection
	</Item>
	<Item
		on:click={async function () {
			await api.deleteCollection(collection.id);
		}}>
		Delete Collection
	</Item>
</ContextMenu>
