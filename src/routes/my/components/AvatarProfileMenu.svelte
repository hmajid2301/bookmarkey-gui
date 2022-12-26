<script lang="ts">
	import { DarkMode } from 'flowbite-svelte';

	import Avatar from '~/lib/components/atoms/Avatar.svelte';

	export let nickname: string;
	export let avatar: string;
	export let email: string;
	let showMenu = false;
</script>

<div
	class="max-h-screen-menu absolute top-14 left-0 hidden w-screen overflow-y-auto bg-gray-50 shadow-lg dark:bg-slate-800 lg:static lg:flex lg:w-auto lg:overflow-visible lg:shadow-none">
	<div
		class="relative block cursor-pointer items-center text-slate-600 dark:text-slate-400 lg:flex lg:py-2 lg:px-3">
		<div
			class="flex items-center bg-gray-100 p-3 dark:bg-slate-800 lg:bg-transparent lg:p-0 lg:dark:bg-transparent">
			<div
				class="mr-3 inline-flex h-6 w-6"
				on:keydown={() => {
					showMenu = !showMenu;
				}}
				on:click={() => {
					showMenu = !showMenu;
				}}>
				<Avatar {avatar} {nickname} {email} />
			</div>
		</div>
		<div
			class="border-b {showMenu
				? 'block'
				: 'hidden'} border-gray-100 text-sm dark:border-slate-700 lg:absolute lg:top-full lg:left-0 lg:z-20 lg:min-w-full lg:rounded-lg lg:border lg:bg-white lg:shadow-lg lg:dark:bg-slate-800">
			<div
				class="relative block flex-col items-start py-2 px-3  text-black  dark:text-white lg:flex">
				<div class="flex">
					<span class="px-2 transition-colors">{nickname}</span>
				</div>
				<div class="flex">
					<span class="px-2 text-gray-500 transition-colors dark:text-gray-400">{email}</span>
				</div>
			</div>
			<hr class="hidden border-t border-gray-100 dark:border-slate-700 lg:my-0.5 lg:block" />
			<div
				aria-current="page"
				class="router-link-active router-link-exact-active relative block cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex">
				<div class="flex items-center">
					<span class="inline-flex h-6 w-6 items-center justify-center transition-colors">
						<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
							<path
								fill="currentColor"
								d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
						</svg>
					</span>
					<a href="/my/dashboard" class="px-2 transition-colors">My Dashboard</a>
				</div>
			</div>
			<div
				class="relative block cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex">
				<div class="flex items-center">
					<span class="inline-flex h-6 w-6 items-center justify-center transition-colors">
						<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
							<path
								fill="currentColor"
								d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />
						</svg>
					</span>
					<a href="/my/settings" class="px-2 transition-colors">Settings</a>
				</div>
			</div>
			<div
				class="relative block cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex">
				<div class="flex items-center">
					<span class="inline-flex h-6 w-6 items-center justify-center transition-colors">
						<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
							<path
								fill="currentColor"
								d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
						</svg>
					</span>
					<a href="/logout" class="px-2 transition-colors">Log Out</a>
				</div>
			</div>
		</div>
	</div>
	<div
		class="relative block cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex lg:w-16 lg:justify-center">
		<div class="flex items-center">
			<DarkMode btnClass="" />
			<span class="px-2 transition-colors lg:hidden">Light/Dark</span>
		</div>
	</div>
</div>
