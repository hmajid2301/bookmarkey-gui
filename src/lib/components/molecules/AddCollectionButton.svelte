<script lang="ts">
	import { clickoutside } from "@svelte-put/clickoutside";
	import PlusSolid from "svelte-awesome-icons/PlusSolid.svelte";

	import ContextMenu from "./ContextMenu.svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";

	let showMenu = false;
	export let showAddGroupForm = false;

	function closeMenu() {
		showMenu = false;
	}
</script>

<div
	use:clickoutside
	on:clickoutside={closeMenu}
	class="flex flex-col pr-5 text-blue-800 dark:text-blue-200">
	<button
		aria-label="add"
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
						closeMenu();
						$selectedGroupStore.addCollection = true;
					}
				},
				{
					name: "Create Group",
					onClick: async () => {
						closeMenu();
						showAddGroupForm = true;
					}
				}
			]}
			{showMenu} />
	</div>
</div>
