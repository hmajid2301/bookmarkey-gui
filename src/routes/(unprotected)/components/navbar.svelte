<script lang="ts" context="module">
	import { DarkMode, Navbar, NavBrand, NavHamburger, NavUl } from 'flowbite-svelte';

	import Button from '~/lib/components/atoms/button.svelte';
	import Logo from '~/lib/components/atoms/logo.svelte';
</script>

<header>
	<Navbar let:hidden let:toggle navClass="bg-slate-100 dark:border-slate-700 dark:bg-slate-900">
		<NavBrand href="/">
			<Logo />
		</NavBrand>
		<div class="flex items-center space-x-4 md:order-2">
			<Button extraClasses="mr-0 mb-0" href="/login">Login</Button>
			<Button extraClasses="mr-0 mb-0" href="/signup">Sign Up</Button>
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
