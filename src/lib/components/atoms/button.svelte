<script lang="ts">
	export let onClick: (() => void) | null = null;
	export let type = 'button';
	export let href: string | undefined = undefined;
	export let extraClasses = '';
</script>

<button
	class="mr-3 mb-3 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded border border-blue-600 bg-blue-600 px-2 py-2 font-semibold text-white ring-blue-300 transition-colors duration-150 last:mr-0 hover:border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring dark:border-blue-500 dark:bg-blue-500 dark:ring-blue-700 hover:dark:border-blue-600 hover:dark:bg-blue-600 {extraClasses}"
	{type}
	{href}
	on:click={onClick}>
	{#if href}
		<a {href}>
			<slot />
		</a>
	{:else}
		<slot />
	{/if}
</button>
