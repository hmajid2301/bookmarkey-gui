<script lang="ts" context="module">
	import { Navbar, NavBrand, NavUl, NavHamburger, Button, DarkMode } from 'flowbite-svelte';

	import LogoLink from '~/lib/components/molecules/logo_link.svelte';
</script>

<header>
	<Navbar let:hidden let:toggle navClass="bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
		<NavBrand href="/">
			<LogoLink />
		</NavBrand>
		<div class="flex items-center md:order-2">
			<Button href="/login">Login</Button>
			<DarkMode />
		</div>

		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<a
				href="/"
				class="rounded-md bg-gray-300 px-3 py-2 text-sm font-bold text-black dark:bg-gray-900 dark:text-white"
				aria-current="page">
				Home
			</a>
		</NavUl>
	</Navbar>
</header>
