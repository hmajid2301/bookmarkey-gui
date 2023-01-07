<script lang="ts" context="module">
	import { DarkMode, Navbar, NavBrand, NavHamburger, NavUl } from "flowbite-svelte";
	import { UserSolid } from "svelte-awesome-icons";

	import Logo from "~/lib/components/atoms/Logo.svelte";
</script>

<header>
	<Navbar
		let:hidden
		let:toggle
		navClass="bg-slate-100 dark:border-slate-700 dark:bg-slate-900 py-2 px-2">
		<NavBrand href="/">
			<Logo />
		</NavBrand>
		<NavUl {hidden}>
			<a
				href="/"
				class="rounded-md bg-gray-300 px-3 py-2 text-sm font-bold text-black dark:bg-gray-900 dark:text-white"
				aria-current="page">
				Home
			</a>
			<a
				href="/login"
				class="rounded-md bg-gray-300 px-3 py-2 text-sm font-bold text-black dark:bg-gray-900 dark:text-white"
				aria-current="page">
				<UserSolid class="mr-2 inline-flex" size="15" />
				Login
			</a>
		</NavUl>
		<div>
			<NavHamburger on:click={toggle} />
			<DarkMode />
		</div>
	</Navbar>
</header>
