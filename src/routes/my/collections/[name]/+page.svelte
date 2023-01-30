<script lang="ts">
	import type { PageServerLoad } from "./$types";

	export let data: PageServerLoad;
</script>

<svelte:head>
	<title>My Collection: {data.name}</title>
</svelte:head>

<p>Hello {data.name}</p>
