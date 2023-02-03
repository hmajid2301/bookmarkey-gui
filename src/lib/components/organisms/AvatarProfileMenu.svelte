<script lang="ts">
	import { DarkMode } from "flowbite-svelte";
	import GearSolid from "svelte-awesome-icons/GearSolid.svelte";
	import RightFromBracketSolid from "svelte-awesome-icons/RightFromBracketSolid.svelte";
	import UserSolid from "svelte-awesome-icons/UserSolid.svelte";

	import ProfileMenu from "../molecules/ProfileMenu.svelte";
	import Avatar from "~/lib/components/atoms/Avatar.svelte";
	import { clickOutside } from "~/lib/use/clickOutside";

	export let nickname: string;
	export let avatar: string;
	export let email: string;
	let showAvatarMenu = false;
	let showMenu = false;
</script>

<div
	use:clickOutside={() => {
		showMenu = false;
	}}
	class="flex h-14 flex-none items-stretch lg:hidden">
	<div
		class="flex cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400">
		<button
			on:click={() => {
				showMenu = !showMenu;
			}}
			class="inline-flex h-6 w-6 items-center justify-center">
			<UserSolid class="inline-block h-4 w-4" />
		</button>
	</div>
</div>

<div
	class="max-h-screen-menu {showMenu
		? 'absolute'
		: 'hidden'}  absolute top-14 left-0 z-20 block w-screen overflow-y-auto bg-slate-100 shadow-lg dark:bg-slate-800 lg:static lg:flex lg:w-auto lg:overflow-visible lg:shadow-none">
	<div
		class="relative block cursor-pointer items-center text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex lg:py-2 lg:px-3" />
	<div
		class="relative block cursor-pointer items-center text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex lg:py-2 lg:px-3">
		<div
			class="flex items-center bg-gray-100 p-3 dark:bg-slate-800 lg:bg-transparent lg:p-0 lg:dark:bg-transparent">
			<div
				on:keydown={() => {
					showAvatarMenu = !showAvatarMenu;
				}}
				on:click={() => {
					showAvatarMenu = !showAvatarMenu;
				}}
				class="mr-3 inline-flex h-6 w-6">
				<Avatar {avatar} {nickname} {email} />
			</div>
		</div>
		<ProfileMenu
			menuItems={[
				{
					name: "My Dashboard",
					link: "/my/dashboard",
					icon: UserSolid
				},
				{
					name: "Settings",
					link: "/my/settings",
					icon: GearSolid
				},
				{
					name: "Log Out",
					link: "/logout",
					icon: RightFromBracketSolid
				}
			]}
			{nickname}
			{email}
			showMenu={showAvatarMenu} />
	</div>

	<div
		class="relative block cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex lg:w-16 lg:justify-center">
		<div class="flex items-center">
			<DarkMode btnClass="" />
			<span class="px-2 transition-colors lg:hidden">Light/Dark</span>
		</div>
	</div>
</div>
