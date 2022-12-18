<script lang="ts" context="module">
	import {
		Navbar,
		NavBrand,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		Button,
		DarkMode
	} from 'flowbite-svelte';

	import LogoLink from '$lib/components/molecules/logo_link.svelte';

	export interface LoggedIn {
		isLoggedIn: boolean;
		email: string;
		avatar: string;
	}
</script>

<script lang="ts">
	export let loggedIn: LoggedIn;
</script>

<header>
	<Navbar let:hidden let:toggle navClass="bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
		<NavBrand href="/">
			<LogoLink />
		</NavBrand>
		<div class="flex items-center md:order-2">
			{#if !loggedIn.isLoggedIn}
				<Button href="/account/login">Login</Button>
			{/if}
			<DarkMode />
		</div>

		<NavHamburger on:click={toggle} />
		{#if loggedIn.isLoggedIn}
			<div class="flex items-center md:order-2">
				<Avatar id="avatar-menu" src={loggedIn.avatar} />
			</div>
			<Dropdown placement="bottom" triggeredBy="#avatar-menu">
				<DropdownHeader>
					<span class="block truncate text-sm font-medium">{loggedIn.email}</span>
				</DropdownHeader>
				<DropdownItem>Dashboard</DropdownItem>
				<DropdownItem>Settings</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/account/logout">Sign out</DropdownItem>
			</Dropdown>
		{/if}
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
