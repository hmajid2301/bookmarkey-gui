<script lang="ts">
	import { page } from "$app/stores";
	import { EnvelopeSolid, GearSolid } from "svelte-awesome-icons";
	import { swipe } from "svelte-gestures";

	import type { LayoutData } from "./$types";

	import Header from "~/lib/components/molecules/Header.svelte";
	import HelloBar from "~/lib/components/organisms/HelloBar.svelte";
	import SideBar from "~/lib/components/organisms/SideBar.svelte";

	export let data: LayoutData;
	let showMenu = false;

	function handler(
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
</script>

<div
	class="flex h-screen overflow-x-hidden"
	use:swipe={{ timeframe: 300, minSwipeDistance: 60, touchAction: "pan-y" }}
	on:swipe={handler}>
	<aside
		class="{showMenu
			? ''
			: '-ml-64'} flex w-64 flex-shrink-0 flex-col transition-all duration-300 lg:ml-0">
		<nav class="flex flex-1 flex-col bg-white ">
			<SideBar
				menuItems={[
					{
						link: "/my/dashboard",
						name: "Dashboard",
						icon: EnvelopeSolid
					},
					{
						link: "/my/settings",
						name: "Settings",
						icon: GearSolid
					}
				]}
				currentPath={$page.url.pathname}
				mainPageLink="/my/dashboard" />
		</nav>
	</aside>
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
			<HelloBar
				avatar={data.user.avatar}
				email={data.user.email}
				nickname={data.user.nickname} />
			<slot />
		</div>
	</div>
</div>
