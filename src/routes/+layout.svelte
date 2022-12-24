<script lang="ts">
	import { Toaster } from 'svelte-french-toast';

	import '~/app.css';
</script>

<Toaster toastOptions={{ style: 'background: #334155; color: #fff' }} />
<main class="bg-blue-100 font-sans font-medium text-gray-800 dark:bg-slate-800 dark:text-white">
	<slot />
</main>
