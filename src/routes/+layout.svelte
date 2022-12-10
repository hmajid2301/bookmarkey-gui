<script lang="ts">
	import Navbar, { type LoggedIn } from '~/components/organisms/navbar.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const loggedIn: LoggedIn = {
		isLoggedIn: data.user ? true : false,
		avatar: data.user?.avatar,
		email: data.user?.email
	};
</script>

<div>
	<main class="bg-blue-100 font-sans font-medium text-gray-800 dark:bg-slate-700 dark:text-white">
		<Navbar {loggedIn} />
		<slot />
	</main>
</div>
