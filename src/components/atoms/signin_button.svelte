<script lang="ts">
	export let onClick: (() => void) | null = null;
</script>

<button
	type="button"
	class="text-whitehover:bg-gray-100 hover:orange-600 mr-2 mb-2 inline-flex w-full items-center justify-center rounded-lg border bg-white px-1 py-3 text-center text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
	on:click={onClick}
>
	<slot />
</button>
