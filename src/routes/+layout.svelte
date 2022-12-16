<script lang="ts">
	import type { LayoutData } from './$types';

	import Navbar from '~/components/organisms/navbar.svelte';

	import '../app.css';

	export let data: LayoutData;
</script>

<div>
	<main class="bg-blue-100 font-sans font-medium text-gray-800 dark:bg-slate-700 dark:text-white">
		<Navbar loggedIn={data.loggedIn} />
		<slot />
	</main>
</div>
