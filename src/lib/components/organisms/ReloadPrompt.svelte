<script lang="ts">
	import { useRegisterSW } from "virtual:pwa-register/svelte";
	const { needRefresh, updateServiceWorker, offlineReady } = useRegisterSW({
		onRegistered(r) {
			console.log(`SW Registered: ${r}`);
		},
		onRegisterError(error) {
			console.log("SW registration error", error);
		}
	});
	const close = () => {
		offlineReady.set(false);
		needRefresh.set(false);
	};
	$: toast = $offlineReady || $needRefresh;
</script>

{#if toast}
	<div class="pwa-toast" role="alert">
		<div class="toast">
			{#if $offlineReady}
				<span>App ready to work offline</span>
			{:else}
				<span>New content available, click on reload button to update.</span>
			{/if}
		</div>
		{#if $needRefresh}
			<button on:click={() => updateServiceWorker(true)}>Reload</button>
		{/if}
		<button on:click={close}>Close</button>
	</div>
{/if}
