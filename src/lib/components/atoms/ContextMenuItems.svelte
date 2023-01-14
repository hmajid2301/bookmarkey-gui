<script lang="ts">
	import type { SvelteComponent } from "svelte";

	export let link: string | undefined = undefined;
	export let name: string;
	export let iconComponent: typeof SvelteComponent | undefined = undefined;
</script>

<div
	class="relative flex cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:bg-blue-500 dark:hover:text-slate-900">
	<div class="flex items-center">
		{#if iconComponent}
			<span class="inline-flex h-6 w-6 items-center justify-center transition-colors">
				<svelte:component this={iconComponent} class="inline-block h-4 w-4" />
			</span>
		{/if}
		{#if link}
			<a href={link} class="px-2 transition-colors">{name}</a>
		{:else}
			<button on:click class="px-2 transition-colors">{name}</button>
		{/if}
	</div>
</div>
