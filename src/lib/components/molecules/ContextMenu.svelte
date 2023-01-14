<script lang="ts" context="module">
	import type { SvelteComponent } from "svelte";

	import ContextMenuItems from "../atoms/ContextMenuItems.svelte";

	export interface ContextMenuItemsA {
		icon?: typeof SvelteComponent;
		link?: string;
		name: string;
		onClick?: () => void;
		divider?: boolean;
	}
</script>

<script lang="ts">
	export let showMenu = false;
	export let menuItems: ContextMenuItemsA[];
</script>

<div
	class="block border-b {showMenu
		? 'lg:block'
		: 'lg:hidden'}  border-gray-100 text-sm dark:border-slate-700 lg:absolute lg:top-full lg:left-0 lg:z-20 lg:min-w-full lg:rounded-lg lg:border lg:bg-white lg:shadow-lg lg:dark:bg-slate-800">
	<slot />
	{#each menuItems as item}
		<ContextMenuItems
			on:click={(event) => {
				if (item.onClick) {
					item.onClick();
				}
				event.stopPropagation();
			}}
			link={item.link}
			name={item.name}
			iconComponent={item.icon} />
		{#if item.divider}
			<hr class="border-t border-gray-100 dark:border-slate-700 lg:my-0.5 lg:block" />
		{/if}
	{/each}
</div>
