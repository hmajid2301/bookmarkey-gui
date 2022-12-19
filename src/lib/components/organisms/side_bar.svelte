<script lang="ts">
	import { NavBrand } from 'flowbite-svelte';
	import LogoLink from '../molecules/logo_link.svelte';

	export let nickname: string;
	export let avatar: string;
</script>

<div
	id="menu"
	class="w-54 sticky top-0 z-10 hidden h-screen flex-col px-4 py-4 shadow-inner dark:bg-gray-900 lg:flex lg:px-6 lg:py-6 xl:w-64 xl:px-8 2xl:w-80">
	<!-- menu and logo-->
	<div class="hidden flex-1 py-4 md:block">
		<NavBrand href="/dashboard">
			<LogoLink />
		</NavBrand>
		<nav class="-mx-2 md:mt-8">
			<ul class="space-y-3 pt-2 text-base">
				<li>
					<a
						href="/dashboard"
						class="flex items-end space-x-2 rounded-lg bg-white px-4 py-3 font-bold text-blue-800 transition-colors duration-100 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-200">
						<svg
							class="h-6 w-6 text-blue-600"
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
						href="/settings"
						class="flex items-end space-x-2 rounded-lg bg-white px-4 py-3 font-bold text-blue-800 text-opacity-70 transition-colors duration-100 hover:bg-gray-700 hover:text-opacity-100 dark:bg-gray-900 dark:text-blue-200">
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
	<!--/ menu and logo -->

	<!-- profile link -->
	<button
		class="absolute left-0 bottom-6 hidden w-full flex-col items-center justify-center space-y-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 md:flex xl:left-8 xl:-mr-8 xl:w-auto xl:flex-row xl:justify-start xl:space-y-0 xl:space-x-4">
		<img src={avatar} alt={nickname} class="h-14 w-14 rounded-full" />
		<div class="flex flex-col items-center text-sm xl:items-start">
			<span class="font-bold text-blue-900 dark:text-blue-100 ">{nickname}</span>
			<span class="text-sm font-bold text-blue-800 opacity-50 dark:text-blue-200">
				View profile
			</span>
		</div>
	</button>
	<!--/ profile link -->
</div>
