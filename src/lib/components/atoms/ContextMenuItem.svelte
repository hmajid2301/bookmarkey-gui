<script lang="ts">
	import type { SvelteComponent } from "svelte";

	export let link: string | undefined = undefined;
	export let name: string;
	export let iconComponent: typeof SvelteComponent | undefined = undefined;

	// TODO: better way to simplify this?
</script>

{#if link}
	<a
		href={link}
		class="relative flex cursor-pointer items-center rounded-md py-2 px-3 text-black hover:bg-blue-500 hover:text-slate-100 dark:text-white dark:hover:text-slate-900">
		<div class="flex items-center">
			{#if iconComponent}
				<span class="inline-flex h-6 w-6 items-center justify-center transition-colors">
					<svelte:component this={iconComponent} class="inline-block h-4 w-4" />
				</span>
			{/if}
			<p class="px-2 transition-colors">{name}</p>
		</div>
	</a>
{:else}
	<button
		on:click
		class="relative flex cursor-pointer items-center rounded-md py-2 px-3 text-black hover:bg-blue-500 hover:text-slate-100 dark:text-white dark:hover:text-slate-900">
		<div class="flex items-center">
			{#if iconComponent}
				<span class="inline-flex h-6 w-6 items-center justify-center transition-colors">
					<svelte:component this={iconComponent} class="inline-block h-4 w-4" />
				</span>
			{/if}
			<p class="px-2 transition-colors">{name}</p>
		</div>
	</button>
{/if}
