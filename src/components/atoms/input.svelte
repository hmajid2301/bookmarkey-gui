<script lang="ts">
	import { Helper } from 'flowbite-svelte';

	export let type: string;
	export let name: string;
	export let placeholder: string;
	export let labelName: string;
	export let required = false;

	export let errors: string[] | undefined;
</script>

<div>
	<label for={name} class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
		{labelName}
	</label>
	<input
		{type}
		{name}
		class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
		{placeholder}
		{required} />

	{#if errors}
		{#each errors as error}
			<Helper class="mt-2" color="red">
				{error}
			</Helper>
		{/each}
	{/if}
</div>
