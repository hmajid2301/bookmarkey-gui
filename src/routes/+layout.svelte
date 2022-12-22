<script lang="ts">
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';

	import '~/app.css';

	let style = 'background: #fff; color: #333;';
	onMount(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			style = 'background: #333; color: #fff;';
		}
	});
</script>

<Toaster toastOptions={{ style: style }} />
<main class="bg-blue-100 font-sans font-medium text-gray-800 dark:bg-slate-700 dark:text-white">
	<slot />
</main>
