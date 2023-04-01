<script lang="ts">
	import { Circle } from "svelte-loading-spinners";

	import LoadingStore from "~/lib/stores/LoadingStore";
</script>

{#if $LoadingStore.status != "IDLE"}
	<div class="z-20 flex content-center justify-center text-white">
		<Circle size="60" color="#FACC14" unit="px" duration="1s" />
	</div>
{/if}
