<script lang="ts">
	import { tick } from "svelte";
	import { FolderClosedSolid, PlusSolid } from "svelte-awesome-icons";

	import type { Collection } from "~/routes/my/+layout.server";
	import ContextMenu from "../molecules/ContextMenu.svelte";
	import AddCollectionForm from "./AddCollectionForm.svelte";

	let showMenu = false;
	let showInput = false;
	let ref: HTMLInputElement;

	export let value: string;
	export let errors: string[] | undefined;
	export let currentPath: string;
	export let collections: Collection[];
</script>

<div class="flex flex-col pr-5 text-blue-800 dark:text-blue-200">
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
						showMenu = false;
						showInput = true;
						await tick();
						ref?.focus();
					}
				}
			]}
			{showMenu} />
	</div>

	{#if showInput}
		<AddCollectionForm bind:ref bind:showInput {value} {errors} />
	{/if}
	<div class="my-2 flex flex-col items-start">
		{#each collections as collection}
			<a
				class=" flex w-full flex-row space-x-4 rounded-lg py-2 px-2"
				class:active={currentPath === `/my/collections/${collection.id}`}
				href={`/my/collections/${collection.id}`}>
				<div>
					<FolderClosedSolid />
				</div>
				<div>
					{collection.name}
				</div>
			</a>
		{/each}
	</div>
</div>
