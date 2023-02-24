<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { tick } from "svelte";
	import CaretDownSolid from "svelte-awesome-icons/CaretDownSolid.svelte";
	import EllipsisSolid from "svelte-awesome-icons/EllipsisSolid.svelte";
	import toast from "svelte-french-toast";

	import AddCollectionForm from "./AddCollectionForm.svelte";
	import DraggableCollection from "./DraggableCollections.svelte";
	import Input from "../atoms/Input.svelte";
	import ContextMenu from "../molecules/ContextMenu.svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";
	import type { Group } from "~/lib/types/components";
	import { clickOutside } from "~/lib/use/clickOutside";

	export let currentPath: string;
	export let hiddenGroups: Set<string>;
	export let group: Group;
	export let showAddCollectionForm = false;
	export let showMenu: boolean | undefined = false;

	let collectionRef: HTMLInputElement;
	let edittingName = false;
	let groupRef: HTMLInputElement;

	$: $selectedGroupStore, showAddCollectionOnStore();

	async function showAddCollectionOnStore() {
		if (
			$selectedGroupStore.group &&
			$selectedGroupStore.group.id !== group.id &&
			$selectedGroupStore.addCollection
		) {
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

	async function patchGroupName(newGroupName: string) {
		showMenu = false;
		edittingName = false;

		const response = await fetch(`/my/groups/${group.id}`, {
			method: "PATCH",
			body: JSON.stringify({ name: newGroupName })
		});
		if (response.ok) {
			toast.success("Renamed group");
			await invalidateAll();
		} else {
			toast.error("Failed to rename group");
		}
	}

	async function renameGroup(event: Event) {
		const target = event.target as HTMLInputElement;
		const newGroupName = target.value;
		await patchGroupName(newGroupName);
	}

	function openMenu() {
		showMenu = true;
	}

	function closeMenu() {
		showMenu = false;
	}
</script>

<button on:contextmenu|preventDefault={openMenu} class="flex w-full grow justify-between">
	<button
		on:click={() => {
			if (hiddenGroups.has(group.id)) {
				hiddenGroups.delete(group.id);
				/* eslint no-self-assign: "off" */
				hiddenGroups = hiddenGroups; //
			} else {
				hiddenGroups.add(group.id);
				/* eslint no-self-assign: "off" */
				hiddenGroups = hiddenGroups;
			}
		}}
		id={group.id}
		class="mb-1 text-sm">
		{#if edittingName}
			<Input
				bind:ref={groupRef}
				on:change={async (event) => {
					await renameGroup(event);
				}}
				on:blur={() => {
					edittingName = false;
				}}
				placeholder="New Group Name"
				type="text"
				name="group" />
		{:else}
			{group.name}
		{/if}
	</button>
	<button on:click={openMenu} on:keyup={openMenu} use:clickOutside={closeMenu}>
		<div class="my-2 flex flex-col items-start space-y-1">
			{#if !hiddenGroups.has(group.id)}
				<EllipsisSolid />
			{:else}
				<CaretDownSolid />
			{/if}
		</div>

		<div class="relative block w-full">
			<ContextMenu
				menuItems={[
					{
						name: "Create Collection",
						onClick: async () => {
							await showAddCollection();
						},
						divider: true
					},
					{
						name: "Delete Group",
						onClick: async function () {
							await deleteGroup();
						}
					},
					{
						name: "Rename Group",
						onClick: async () => {
							edittingName = true;
							await tick();
							groupRef?.focus();
							groupRef?.select();
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

{#if !hiddenGroups.has(group.id)}
	<div class="my-2 flex flex-col items-start space-y-1">
		<DraggableCollection groupId={group.id} collections={group.collections} {currentPath} />
	</div>
{/if}
