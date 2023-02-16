<script lang="ts">
	import BarsSolid from "svelte-awesome-icons/BarsSolid.svelte";
	import HouseSolid from "svelte-awesome-icons/HouseSolid.svelte";
	import UserPlusSolid from "svelte-awesome-icons/UserPlusSolid.svelte";
	import UserSolid from "svelte-awesome-icons/UserSolid.svelte";

	import Logo from "../atoms/Logo.svelte";

	let showMobileBar = false;
	export let currentPath: string;
</script>

<header>
	<nav class="bg-slate-100 font-bold shadow-lg dark:bg-slate-900">
		<div class="mx-auto max-w-6xl px-4">
			<div class="flex justify-between">
				<div class="flex space-x-7">
					<div>
						<a href="/" class="flex items-center py-4 px-2">
							<Logo />
						</a>
					</div>

					<div class="hidden items-center space-x-1 md:flex">
						<a
							class:active={currentPath === `/`}
							href="/"
							class="border-b-4 border-blue-500 py-4 px-2 font-semibold text-blue-500">
							Home
						</a>
					</div>
				</div>

				<div class="hidden items-center space-x-3 font-bold md:flex">
					<a
						class:activel={currentPath === `/login`}
						href="/login"
						class="rounded py-2 px-2 transition duration-300 hover:bg-slate-800 hover:text-white">
						Login
					</a>
					<a
						class:activel={currentPath === `/register`}
						href="/register"
						class="rounded py-2 px-2 text-white transition duration-300 hover:bg-slate-800">
						Register
					</a>
				</div>

				<div class="flex items-center md:hidden">
					<button
						class="outline-none"
						on:click={() => {
							showMobileBar = !showMobileBar;
						}}>
						<BarsSolid />
					</button>
				</div>
			</div>
		</div>

		<div class="{showMobileBar ? 'block' : 'hidden'} z-20 transition-all duration-200">
			<div
				class="relative block cursor-pointer items-center text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400">
				<a class:active={currentPath === `/`} href="/" class="flex items-center p-3">
					<span class="inline-flex h-3 w-3 items-center justify-center transition-colors">
						<HouseSolid />
					</span>
					<span class="px-2 transition-colors">Home</span>
				</a>

				<a
					class:active={currentPath === `/login`}
					href="/login"
					class="flex items-center p-3">
					<span class="inline-flex h-3 w-3 items-center justify-center transition-colors">
						<UserSolid />
					</span>
					<span class="px-2 transition-colors">Login</span>
				</a>

				<a
					class:active={currentPath === `/register`}
					href="/register"
					class="flex items-center p-3">
					<span class="inline-flex h-4 w-4 items-center justify-center transition-colors">
						<UserPlusSolid />
					</span>
					<span class="px-2 transition-colors">Register</span>
				</a>
			</div>
		</div>
	</nav>
</header>
