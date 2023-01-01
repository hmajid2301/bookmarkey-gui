<script lang="ts" context="module">
	import { DarkMode, Navbar, NavBrand, NavHamburger, NavUl } from "flowbite-svelte";

	import Button from "~/lib/components/atoms/Button.svelte";
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
			<Button extraClasses="mr-0 mb-0" href="/login">Login</Button>
		</NavUl>
		<div>
			<NavHamburger on:click={toggle} />
			<DarkMode />
		</div>
	</Navbar>
</header>
