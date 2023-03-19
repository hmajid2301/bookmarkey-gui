<script lang="ts">
	import { page } from "$app/stores";
	import { swipe } from "svelte-gestures";

	import Header from "~/lib/components/molecules/Header.svelte";
	import SideBar from "~/lib/components/organisms/SideBar.svelte";

	export let data;
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
			{width}
			user={data.user}
			collections={data.collections}
			currentPath={$page.url.pathname} />
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
			class="flex flex-1 flex-col overflow-hidden bg-blue-50 dark:bg-slate-800">
			<slot />
		</div>
	</div>
</div>
