<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { clickoutside } from "@svelte-put/clickoutside";
	import { tick } from "svelte";
	import FolderClosedSolid from "svelte-awesome-icons/FolderClosedSolid.svelte";
	import FolderPlus from "svelte-awesome-icons/FolderPlusSolid.svelte";
	import ShareSolid from "svelte-awesome-icons/ShareSolid.svelte";
	import TrashSolid from "svelte-awesome-icons/TrashSolid.svelte";
	import ContextMenu, { Item } from "svelte-contextmenu";
	import Device from "svelte-device-info";
	import toast from "svelte-french-toast";
	import { swipe } from "svelte-gestures";

	import Button from "../atoms/Button.svelte";
	import Input from "../atoms/Input.svelte";
	import { API } from "~/lib/api/client";
	import type { Collection } from "~/lib/types/components";

	export let collection: Collection;

	let edittingName = false;
	let contextMenu: ContextMenu;
	let ref: HTMLInputElement;
	let showButtons = false;
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

	function onSwipe(
		event: CustomEvent<{
			direction: "top" | "right" | "bottom" | "left";
			target: EventTarget;
		}>
	) {
		if (!Device.isMobile) {
			return;
		}

		const direction = event.detail.direction;
		if (direction === "left") {
			showButtons = true;
		} else if (direction === "right") {
			showButtons = false;
		}
	}

	async function renameCollection(event: Event) {
		const target = event.target as HTMLInputElement;
		const newCollectionName = target.value;
		await patchCollectionName(newCollectionName);
	}

	async function deleteCollection() {
		await api.deleteCollection(collection.id);
	}
</script>

<div
	class="flex flex-grow"
	use:swipe={{ timeframe: 300, minSwipeDistance: 10, touchAction: "pan-y" }}
	on:swipe|stopPropagation|preventDefault={onSwipe}
	use:clickoutside
	on:clickoutside={() => {
		showButtons = false;
	}}>
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
	{#if showButtons}
		<Button extraClasses="mr-0 bg-gray-500"><ShareSolid /></Button>
		<Button extraClasses="mr-0 bg-green-600"><FolderPlus /></Button>
		<Button extraClasses="mr-0 bg-red-700" on:click={deleteCollection}>
			<TrashSolid />
		</Button>
	{/if}
</div>

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
	<Item on:click={deleteCollection}>Delete Collection</Item>
</ContextMenu>
