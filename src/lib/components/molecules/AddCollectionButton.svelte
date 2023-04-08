<script lang="ts">
	import PlusSolid from "svelte-awesome-icons/PlusSolid.svelte";
	import ContextMenu, { Item } from "svelte-contextmenu";

	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";

	let contextMenu: ContextMenu;
	export let showAddGroupForm = false;
</script>

<div class="flex flex-col pr-5 text-blue-800 dark:text-blue-200">
	<button aria-label="add" on:click={contextMenu.createHandler()}>
		<PlusSolid
			class="cursor-pointer rounded-lg p-2 hover:bg-blue-50 hover:text-opacity-100 dark:hover:bg-gray-700 dark:hover:text-opacity-100"
			size="40" />
	</button>
	<ContextMenu bind:this={contextMenu}>
		<Item
			on:click={() => {
				$selectedGroupStore.addCollection = true;
			}}>
			Create Collection
		</Item>
		<Item
			on:click={() => {
				showAddGroupForm = true;
			}}>
			Create Group
		</Item>
	</ContextMenu>
</div>
