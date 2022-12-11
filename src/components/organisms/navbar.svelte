<script lang="ts" context="module">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider
	} from 'flowbite-svelte';

	import LogoLink from '~/components/molecules/logo_link.svelte';
	import Theme from './theme.svelte';

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
			<NavUl {hidden}>
				<NavLi href="/account/login">Login</NavLi>
				<NavLi href="/account/signup">Sign Up</NavLi>
			</NavUl>
			<Theme />
		</div>

		{#if loggedIn.isLoggedIn}
			<div class="flex items-center md:order-2">
				<Avatar id="avatar-menu" src={loggedIn.avatar} />
				<NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
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
			<NavLi href="/" active={true}>Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>
