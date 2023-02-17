<script lang="ts">
	import { page } from "$app/stores";
	import { swipe } from "svelte-gestures";

	import type { LayoutData } from "./$types";
	import Header from "~/lib/components/molecules/Header.svelte";
	import HelloBar from "~/lib/components/organisms/HelloBar.svelte";
	import SideBar from "~/lib/components/organisms/SideBar.svelte";

	export let data: LayoutData;
	let showMenu = false;

	function onSwipe(
		event: CustomEvent<{
			direction: "top" | "right" | "bottom" | "left";
			target: EventTarget;
		}>
	) {
		const direction = event.detail.direction;
		if (direction === "left") {
			showMenu = false;
		} else if (direction === "right") {
			showMenu = true;
		}
	}

	let width = 16;
	const initialWidth = 16;
	const maxWidth = 50;

	let expanding: MouseEvent | null = null;
</script>

<svelte:window
	on:mouseup={() => {
		expanding = null;
	}} />

<div
	class="flex h-screen overflow-x-hidden"
	on:mousemove={(e) => {
		if (!expanding) return;
		width = e.pageX;
	}}
	use:swipe={{ timeframe: 300, minSwipeDistance: 60, touchAction: "pan-y" }}
	on:swipe={onSwipe}>
	<aside
		style={`width: ${width}px !important; min-width: ${initialWidth}rem; max-width: ${maxWidth}rem`}
		class="{showMenu
			? ''
			: '-ml-64'} min-w-64 translate-all flex w-64 flex-shrink-0 flex-col duration-200 lg:ml-0 lg:transition-none">
		<SideBar
			avatar={data.user.avatar}
			email={data.user.email}
			nickname={data.user.nickname}
			collections={data.collections}
			currentPath={$page.url.pathname}
			mainPageLink="/my/dashboard" />
	</aside>
	<div
		class="cursor-ew-resize bg-blue-50 transition-all duration-300 hover:bg-yellow-400 dark:bg-slate-800 hover:dark:bg-yellow-400 lg:w-2"
		on:mousedown={(e) => {
			expanding = e;
		}} />
	<div class="flex-1">
		<Header bind:showMenu />

		<div
			on:click={() => {
				showMenu = false;
			}}
			on:keydown={() => {
				showMenu = false;
			}}
			class="flex flex-1 flex-col overflow-hidden bg-blue-50  px-4 py-4 dark:bg-slate-800 lg:py-8 lg:px-6 xl:px-8">
			<HelloBar nickname={data.user.nickname} />
			<slot />
		</div>
	</div>
</div>
