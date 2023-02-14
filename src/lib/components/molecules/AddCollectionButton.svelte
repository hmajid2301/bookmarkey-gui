<script lang="ts">
	import PlusSolid from "svelte-awesome-icons/PlusSolid.svelte";

	import ContextMenu from "./ContextMenu.svelte";
	import { clickOutside } from "~/lib/use/clickOutside";

	let showMenu = false;
	export let showAddGroupForm = false;
	export let isAddingCollection = false;
</script>

<div
	use:clickOutside={() => {
		showMenu = false;
	}}
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
						showMenu = false;
						isAddingCollection = true;
					}
				},
				{
					name: "Create Group",
					onClick: async () => {
						showMenu = false;
						showAddGroupForm = true;
						console.log("SHOW COL ogL", showAddGroupForm);
					}
				}
			]}
			{showMenu} />
	</div>
</div>
