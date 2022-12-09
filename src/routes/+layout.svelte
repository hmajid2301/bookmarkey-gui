<script>
	import Navbar from '~/components/organisms/navbar.svelte';
	import '../app.css';
</script>

<div>
	<main class="bg-blue-100 font-sans font-medium text-gray-800 dark:bg-slate-700 dark:text-white">
		<Navbar />
		<slot />
	</main>
</div>
