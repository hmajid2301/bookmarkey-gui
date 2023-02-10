<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { tick } from "svelte";
	import CaretDownSolid from "svelte-awesome-icons/CaretDownSolid.svelte";
	import EllipsisSolid from "svelte-awesome-icons/EllipsisSolid.svelte";
	import toast from "svelte-french-toast";

	import AddCollectionForm from "./AddCollectionForm.svelte";
	import DraggableCollection from "./DraggableCollections.svelte";
	import ContextMenu from "../molecules/ContextMenu.svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";
	import type { Group } from "~/lib/types/components";
	import { clickOutside } from "~/lib/use/clickOutside";

	export let currentPath: string;
	export let hideGroups: Set<string>;
	export let group: Group;
	export let showAddCollectionForm = false;
	export let showMenu: boolean | undefined = false;
	let collectionRef: HTMLInputElement;

	$: $selectedGroupStore, showAddCollectionOnStore();
	// TODO: refactor
	async function showAddCollectionOnStore() {
		if ($selectedGroupStore.group.id !== group.id && $selectedGroupStore.addCollection) {
			return;
		}
		if (!$selectedGroupStore.addCollection) {
			return;
		}
		await showAddCollection();
		$selectedGroupStore.addCollection = false;
	}

	async function showAddCollection() {
		showMenu = false;
		showAddCollectionForm = true;
		await tick();
		collectionRef?.focus();
	}

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

<button on:contextmenu|preventDefault={openMenu} class="flex w-full grow justify-between">
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
		<div class="my-2 flex flex-col items-start space-y-1">
			{#if !hideGroups.has(group.id)}
				<EllipsisSolid />
			{:else}
				<CaretDownSolid />
			{/if}
		</div>

		<div class="relative block w-full">
			<ContextMenu
				menuItems={[
					{
						name: "Delete Group",
						onClick: async function () {
							await deleteGroup();
						},
						divider: true
					},
					{
						name: "Create Collection",
						onClick: async () => {
							await showAddCollection();
						}
					}
				]}
				showMenu={showMenu ?? false} />
		</div>
	</button>
</button>

{#if showAddCollectionForm}
	<AddCollectionForm bind:ref={collectionRef} bind:showInput={showAddCollectionForm} />
{/if}

{#if !hideGroups.has(group.id)}
	<div class="my-2 flex flex-col items-start space-y-1">
		<DraggableCollection groupId={group.id} collections={group.collections} {currentPath} />
	</div>
{/if}
