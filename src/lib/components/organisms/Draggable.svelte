<script lang="ts">
	import { onMount } from "svelte";

	export let classes: string;
	export let draggable: boolean | undefined = undefined;
	let isMobile: boolean;
	onMount(() => {
		isMobile = /Android|iPhone/i.test(navigator.userAgent);
	});
</script>

<div
	class={classes}
	draggable={(!isMobile ? "true" : "false") && draggable}
	on:dragstart|stopPropagation
	on:dragend
	on:dragenter
	on:drop|preventDefault
	on:dragover|preventDefault>
	<slot />
</div>
