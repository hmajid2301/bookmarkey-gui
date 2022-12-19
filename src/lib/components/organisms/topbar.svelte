<script lang="ts">
	export let nickname: string;
</script>

<div class="mx-auto flex w-full max-w-screen-2xl justify-between">
	<div class="hidden md:block">
		<h1 class="mb-1 text-2xl font-bold text-blue-800 dark:text-blue-100">Hello 👋 {nickname}</h1>
		<p class="hidden text-lg text-blue-900 dark:text-blue-200 lg:block">Dashboard overview</p>
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
			<button
				type="button"
				class="h-10 rounded-lg bg-white px-3 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 dark:bg-gray-600">
				<svg
					class="h-6 w-6  text-blue-900 opacity-80 dark:text-blue-100"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
					<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
				</svg>
			</button>
			<button
				type="button"
				class="relative h-10 rounded-lg bg-white px-3 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 dark:bg-gray-600">
				<svg
					class="h-6 w-6  text-blue-900 opacity-80 dark:text-blue-100"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
				</svg>
				<div
					class="absolute top-3 right-4 h-2 w-2 rounded-full bg-red-500 ring-2 ring-red-400 ring-opacity-60">
					&nbsp;
				</div>
			</button>
		</div>
	</div>
</div>
