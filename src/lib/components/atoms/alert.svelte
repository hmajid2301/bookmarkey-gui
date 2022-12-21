<script lang="ts">
	import { Alert } from 'flowbite-svelte';

	export let color: string;
</script>

<Alert {color} accent>
	<slot />
</Alert>
