<script lang="ts">
	import { DarkMode } from 'flowbite-svelte';

	export let nickname: string;
</script>

<div class="mx-auto flex w-full max-w-screen-2xl justify-between">
	<div class="hidden md:block">
		<h1 class="mb-1 text-2xl font-bold text-blue-800 dark:text-blue-100">Hello 👋 {nickname}</h1>
	</div>
	<div class="flex flex-1 justify-between space-x-4 md:justify-end">
		<div class="relative w-full md:max-w-xs">
			<svg
				class="absolute top-3 left-3 h-5 w-5 text-blue-900 opacity-70 dark:text-blue-100"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
					clip-rule="evenodd" />
			</svg>
			<input
				type="text"
				class="h-10 w-full rounded-lg bg-white pr-4 pl-9 text-sm font-semibold text-blue-900 placeholder-blue-900 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 dark:bg-gray-600 dark:text-blue-100 dark:placeholder-blue-200"
				placeholder="Enter your search term..." />
		</div>
		<div class="flex space-x-4">
			<DarkMode
				btnClass="relative h-10 rounded-lg px-3 bg-white hover:bg-gray-300 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 dark:hover:bg-gray-700 dark:bg-gray-600" />
		</div>
	</div>
</div>
