<script lang="ts">
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';

	import '~/app.css';
	let style: string;
	onMount(() => {
		style =
			window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'background: #334155; color: #fff;'
				: 'background: #fff; color: #000;';
	});
</script>

<Toaster toastOptions={{ style: style }} />
<main class="bg-blue-100 font-sans font-medium text-gray-800 dark:bg-slate-800 dark:text-white">
	<slot />
</main>
