<script lang="ts">
	import type { SvelteComponent } from "svelte";

	export let link: string;
	export let isActive = false;
	export let name: string;
	export let iconComponent: typeof SvelteComponent;
</script>

<li>
	<a
		class:active={isActive}
		href={link}
		on:click
		class="flex items-end space-x-2 rounded-lg bg-white px-4 py-3 font-bold text-blue-800 text-opacity-70 transition-colors duration-100 hover:bg-blue-50 hover:text-opacity-100 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-700 dark:hover:text-opacity-100">
		<svelte:component this={iconComponent} />
		<span class="flex-1">{name}</span>
	</a>
</li>
