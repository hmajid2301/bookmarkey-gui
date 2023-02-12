<script lang="ts">
	import CaretDownSolid from "svelte-awesome-icons/CaretDownSolid.svelte";
	import GearSolid from "svelte-awesome-icons/GearSolid.svelte";
	import RightFromBracketSolid from "svelte-awesome-icons/RightFromBracketSolid.svelte";
	import UserSolid from "svelte-awesome-icons/UserSolid.svelte";

	import Avatar from "~/lib/components/atoms/Avatar.svelte";
	import ContextMenu from "../molecules/ContextMenu.svelte";

	export let nickname: string;
	export let avatar: string;
	export let email: string;
	let showAvatarMenu = false;
</script>

<button
	aria-label="avatar"
	on:keydown={() => {
		showAvatarMenu = !showAvatarMenu;
	}}
	on:click={() => {
		showAvatarMenu = !showAvatarMenu;
	}}
	class="max-h-screen-menu top-14 left-0 z-20 w-screen overflow-y-auto bg-slate-100 shadow-lg dark:bg-slate-800 lg:static lg:flex lg:w-auto lg:overflow-visible lg:shadow-none">
	<div
		class="relative block cursor-pointer items-center text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex lg:py-2 lg:px-3">
		<div
			class="flex items-center bg-gray-100 p-3 dark:bg-slate-800 lg:bg-transparent lg:p-0 lg:dark:bg-transparent">
			<div class="mr-3 inline-flex h-6 w-6">
				<Avatar {avatar} {nickname} {email} />
			</div>
		</div>
		<p class="flex flex-row text-xs">
			{nickname}
			<CaretDownSolid class="h-4 w-4" />
		</p>
		<ContextMenu
			menuItems={[
				{
					name: "My Dashboard",
					link: "/my/dashboard",
					icon: UserSolid
				},
				{
					name: "My Settings",
					link: "/my/settings",
					icon: GearSolid
				},
				{
					name: "Log Out",
					link: "/logout",
					icon: RightFromBracketSolid
				}
			]}
			showMenu={showAvatarMenu} />
	</div>
</button>
