<script lang="ts">
	import { DarkMode } from "flowbite-svelte";
	import { onMount } from "svelte";
	import { Toaster } from "svelte-french-toast";
	import { pwaInfo } from "virtual:pwa-info";

	import type ReloadPrompt from "$lib/ReloadPrompt.svelte";

	import "~/app.css";

	let reloadPrompt: typeof ReloadPrompt;
	onMount(async () => {
		pwaInfo && (reloadPrompt = (await import("$lib/ReloadPrompt.svelte")).default);
	});
	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : "";
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html webManifest}
</svelte:head>

<Toaster toastOptions={{ style: "background: #334155; color: #fff" }} />
<DarkMode btnClass="hidden" />
<main
	class="min-h-screen bg-blue-100 font-sans font-medium text-gray-800 dark:bg-slate-800 dark:text-white">
	<slot />
</main>

{#if reloadPrompt}
	<svelte:component this={reloadPrompt} />
{/if}
