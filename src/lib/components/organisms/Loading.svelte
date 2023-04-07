<script lang="ts">
	import { Circle } from "svelte-loading-spinners";

	import LoadingStore from "~/lib/stores/LoadingStore";
</script>

{#if $LoadingStore.status != "IDLE"}
	<div
		class="fixed top-0 left-0 right-0 bottom-0 z-50 flex h-screen w-full flex-col content-center items-center justify-center overflow-hidden bg-gray-700 text-white opacity-75">
		<Circle size="60" color="#FACC14" unit="px" duration="1s" />
		<h2 class="my-4 text-center text-xl font-semibold text-white">Loading...</h2>
	</div>
{/if}
