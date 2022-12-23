<script lang="ts">
	import type { LayoutData } from './$types';
	import Header from './components/header.svelte';
	import HelloBar from './components/hello_bar.svelte';
	import SideBar from './components/side_bar.svelte';

	export let data: LayoutData;
	let showMenu = false;
</script>

<div class="flex h-screen overflow-x-hidden">
	<aside
		class="{showMenu
			? ''
			: '-ml-64'} flex w-64 flex-shrink-0 flex-col transition-all duration-300 md:ml-0">
		<nav class="flex flex-1 flex-col bg-white ">
			<SideBar />
		</nav>
	</aside>
	<div class="flex-1">
		<Header bind:showMenu />

		<div
			class="flex flex-1 flex-col overflow-hidden bg-blue-50  px-4 py-4 dark:bg-gray-800 lg:py-8 lg:px-6 xl:px-8">
			<HelloBar nickname={data.user.nickname} />
			<slot />
		</div>
	</div>
</div>
