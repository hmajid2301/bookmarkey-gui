<script lang="ts">
	import type { SvelteComponent } from "svelte";

	import ContextMenuItems from "../atoms/ContextMenuItems.svelte";

	export let showMenu = false;
	export let menuItems: ContextMenuItem[];

	interface ContextMenuItem {
		icon?: typeof SvelteComponent;
		link?: string;
		name: string;
		onClick?: () => void;
		divider?: boolean;
	}
</script>

<div
	class="block border-b {showMenu
		? 'block'
		: 'hidden'}  absolute top-full left-0 z-20 rounded-lg border border-gray-100 bg-white text-sm shadow-lg dark:border-slate-700 dark:bg-slate-800 lg:min-w-full">
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
		{#if item.divider === true}
			<hr class="border-t border-gray-100 dark:border-slate-700 lg:my-0.5 lg:block" />
		{/if}
	{/each}
</div>
