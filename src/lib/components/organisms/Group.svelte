<script lang="ts">
	import { tick } from "svelte";
	import CaretDownSolid from "svelte-awesome-icons/CaretDownSolid.svelte";
	import EllipsisSolid from "svelte-awesome-icons/EllipsisSolid.svelte";
	import ContextMenu, { Item } from "svelte-contextmenu";

	import AddCollectionForm from "./AddCollectionForm.svelte";
	import DraggableCollection from "./DraggableCollections.svelte";
	import Input from "../atoms/Input.svelte";
	import { API } from "~/lib/api/client";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";
	import type { Group } from "~/lib/types/components";

	export let currentPath: string;
	export let hiddenGroups: Set<string>;
	export let group: Group;
	export let showAddCollectionForm = false;

	let contextMenu: ContextMenu;
	let collectionRef: HTMLInputElement;
	let edittingName = false;
	let groupRef: HTMLInputElement;

	$: $selectedGroupStore, void showAddCollectionOnStore();

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
		showAddCollectionForm = true;
		await tick();
		collectionRef?.focus();
	}

	const api = new API();

	async function renameGroup(event: Event) {
		const target = event.target as HTMLInputElement;
		const newGroupName = target.value;
		await api.updateGroup(group.id, { name: newGroupName });
	}
</script>

<button
	on:contextmenu={(e) => {
		contextMenu.show(e);
	}}
	class="flex w-full grow justify-between">
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
				on:change={renameGroup}
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

	<button on:click={contextMenu.createHandler()}>
		<div class="my-2 flex flex-col items-start space-y-1">
			{#if !hiddenGroups.has(group.id)}
				<EllipsisSolid />
			{:else}
				<CaretDownSolid />
			{/if}
		</div>

		<ContextMenu bind:this={contextMenu}>
			<Item
				on:click={async () => {
					await showAddCollection();
				}}>
				Create Collection
			</Item>
			<Item
				on:click={async function () {
					await api.deleteGroup(group.id);
				}}>
				Delete Group
			</Item>
			<Item
				on:click={async () => {
					edittingName = true;
					await tick();
					groupRef?.focus();
					groupRef?.select();
				}}>
				Rename Group
			</Item>
		</ContextMenu>
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
