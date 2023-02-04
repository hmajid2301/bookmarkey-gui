<script lang="ts">
	import { tick } from "svelte";
	import PlusSolid from "svelte-awesome-icons/PlusSolid.svelte";

	import AddCollectionForm from "./AddCollectionForm.svelte";
	import AddGroupForm from "./AddGroupForm.svelte";
	import Collections from "../molecules/Collections.svelte";
	import ContextMenu from "../molecules/ContextMenu.svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";
	import { clickOutside } from "~/lib/use/clickOutside";

	let showMenu = false;
	let showAddCollectionForm = false;
	let showAddGroupForm = false;

	let collectionRef: HTMLInputElement;
	let groupRef: HTMLInputElement;

	export let currentPath: string;
	export let collections: CollectionGroups;
</script>

<div
	use:clickOutside={() => {
		showMenu = false;
	}}
	class="flex flex-col pr-5 text-blue-800 dark:text-blue-200">
	<button
		on:click={() => {
			showMenu = !showMenu;
		}}>
		<PlusSolid
			class="cursor-pointer rounded-lg p-2 hover:bg-blue-50 hover:text-opacity-100 dark:hover:bg-gray-700 dark:hover:text-opacity-100"
			size="40" />
	</button>
	<div class="relative block w-full">
		<ContextMenu
			menuItems={[
				{
					name: "Create Collection",
					divider: true,
					onClick: async () => {
						if ($selectedGroupStore.group.id) {
							$selectedGroupStore.addCollection = true;
						} else {
							showMenu = false;
							showAddCollectionForm = true;
							await tick();
							collectionRef?.focus();
						}
					}
				},
				{
					name: "Create Group",
					onClick: async () => {
						showMenu = false;
						showAddGroupForm = true;
						await tick();
						groupRef?.focus();
					}
				}
			]}
			{showMenu} />
	</div>

	{#if showAddCollectionForm}
		<AddCollectionForm bind:ref={collectionRef} bind:showInput={showAddCollectionForm} />
	{/if}
	<AddGroupForm bind:ref={groupRef} bind:show={showAddGroupForm} />
	<Collections {collections} {currentPath} />
</div>
