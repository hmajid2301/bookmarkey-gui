<script lang="ts">
	import { NavBrand } from "flowbite-svelte";

	import Logo from "../atoms/Logo.svelte";
	import SideBarItems, { type MenuItem } from "~/lib/components/molecules/SideBarItems.svelte";

	export let mainPageLink: string;
	export let currentPath: string;
	export let menuItems: MenuItem[];
</script>

<div class="min-h-screen flex-col bg-white px-4 py-4 dark:bg-gray-900">
	<div class="flex-1 py-4">
		<NavBrand href={mainPageLink}>
			<Logo />
		</NavBrand>
		<SideBarItems {menuItems} {currentPath} />
	</div>
</div>
