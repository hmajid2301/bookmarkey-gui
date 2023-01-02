<script lang="ts">
	import type { SvelteComponent } from "svelte";

	export let link: string;
	export let name: string;
	export let iconComponent: typeof SvelteComponent;
</script>

<div
	class="relative block cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex">
	<div class="flex items-center">
		<span class="inline-flex h-6 w-6 items-center justify-center transition-colors">
			<svelte:component this={iconComponent} class="inline-block h-4 w-4" />
		</span>
		<a href={link} class="px-2 transition-colors">{name}</a>
	</div>
</div>
