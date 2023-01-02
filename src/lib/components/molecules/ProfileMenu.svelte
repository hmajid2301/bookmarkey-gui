<script lang="ts">
	import ProfileMenuItem from "../atoms/ProfileMenuItem.svelte";

	import type { MenuItem } from "./SideBarItems.svelte";

	export let nickname: string;
	export let email: string;
	export let showMenu = false;
	export let menuItems: MenuItem[];
</script>

<div
	class="block border-b {showMenu
		? 'lg:block'
		: 'lg:hidden'}  border-gray-100 text-sm dark:border-slate-700 lg:absolute lg:top-full lg:left-0 lg:z-20 lg:min-w-full lg:rounded-lg lg:border lg:bg-white lg:shadow-lg lg:dark:bg-slate-800">
	<div class="relative block flex-col items-start py-2 px-3  text-black  dark:text-white lg:flex">
		<div class="flex">
			<span class="px-2 transition-colors">{nickname}</span>
		</div>
		<div class="flex">
			<span class="px-2 text-gray-500 transition-colors dark:text-gray-400">
				{email}
			</span>
		</div>
	</div>
	<hr class="hidden border-t border-gray-100 dark:border-slate-700 lg:my-0.5 lg:block" />
	{#each menuItems as item}
		<ProfileMenuItem link={item.link} name={item.name} iconComponent={item.icon} />
	{/each}
</div>
