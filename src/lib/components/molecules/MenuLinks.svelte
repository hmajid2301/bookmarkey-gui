<script lang="ts">
	import { NavBrand } from "flowbite-svelte";

	import Logo from "~/lib/components/atoms/Logo.svelte";
	export let currentPath: string;
</script>

<div class="flex-1 py-4">
	<NavBrand href="/my/dashboard">
		<Logo />
	</NavBrand>
	<nav class="-mx-2 md:mt-8">
		<ul class="space-y-3 pt-2 text-base">
			<li>
				<a
					class:active={currentPath === "/my/dashboard"}
					href="/my/dashboard"
					class="flex items-end space-x-2 rounded-lg bg-white px-4 py-3 font-bold text-blue-800 text-opacity-100 transition-colors duration-100  hover:bg-blue-50 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-700">
					<svg
						class="h-6 w-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
					</svg>
					<span class="flex-1">Dashboard</span>
				</a>
			</li>
			<li>
				<a
					class:active={currentPath === "/my/settings"}
					href="/my/settings"
					class="flex items-end space-x-2 rounded-lg bg-white px-4 py-3 font-bold text-blue-800 text-opacity-70 transition-colors duration-100 hover:bg-blue-50 hover:text-opacity-100 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-700 dark:hover:text-opacity-100">
					<svg
						class="h-6 w-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
							clip-rule="evenodd" />
					</svg>
					<span class="flex-1">Settings</span>
				</a>
			</li>
		</ul>
	</nav>
</div>
