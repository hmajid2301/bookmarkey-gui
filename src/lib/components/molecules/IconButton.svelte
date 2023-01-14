<script lang="ts">
	import type { SvelteComponent } from "svelte";

	import TransparentButton from "~/lib/components/atoms/TransparentButton.svelte";

	export let name: string;
	export let iconComponent: typeof SvelteComponent;
</script>

<div class="my-2 w-full py-4">
	<TransparentButton on:click>
		<svelte:component this={iconComponent} class="mr-2 -ml-1 h-4 w-4" />
		{name}
	</TransparentButton>
</div>
