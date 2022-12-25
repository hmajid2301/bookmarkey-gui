<script lang="ts">
	import { DarkMode } from 'flowbite-svelte';

	export let nickname: string;
</script>

<div class="mx-auto flex w-full max-w-screen-2xl justify-between">
	<div class="md:block">
		<h1 class="mb-1 text-2xl font-bold text-blue-800 dark:text-blue-100">Hello 👋 {nickname}</h1>
	</div>
	<div class="flex flex-1 justify-end space-x-4">
		<div class="flex">
			<DarkMode
				btnClass="h-10 rounded-lg px-3 bg-white hover:bg-gray-300 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 dark:hover:bg-gray-700 dark:bg-gray-600" />
		</div>
	</div>
</div>
