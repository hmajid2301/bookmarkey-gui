<script lang="ts">
	import { onMount } from "svelte";
	import Device from "svelte-device-info";

	export let classes: string;
	export let draggable: boolean | undefined = undefined;
	let isMobile = false;
	onMount(() => {
		isMobile = Device.isMobile;
	});
</script>

<div
	class={classes}
	draggable={!isMobile && draggable}
	on:dragstart|stopPropagation
	on:dragend
	on:dragenter
	on:drop|preventDefault
	on:dragover|preventDefault>
	<slot />
</div>
