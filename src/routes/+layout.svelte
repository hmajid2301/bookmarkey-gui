<script lang="ts">
	import { navigating } from "$app/stores";
	import { DarkMode } from "flowbite-svelte";
	import { onMount } from "svelte";
	import { Toaster } from "svelte-french-toast";
	import { pwaInfo } from "virtual:pwa-info";

	import "~/app.css";
	import Loading from "~/lib/components/organisms/Loading.svelte";
	import type ReloadPrompt from "~/lib/ReloadPrompt.svelte";
	import LoadingStore from "~/lib/stores/LoadingStore";

	let reloadPrompt: typeof ReloadPrompt;
	onMount(async () => {
		pwaInfo && (reloadPrompt = (await import("$lib/ReloadPrompt.svelte")).default);
	});

	let webManifest: string;
	$: {
		webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : "";
		LoadingStore.setNavigate(!!$navigating);
	}
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html webManifest}
</svelte:head>

<Loading />
<Toaster toastOptions={{ style: "background: #334155; color: #fff" }} />
<DarkMode btnClass="hidden" />
<main
	class="min-h-screen bg-blue-100 font-sans font-medium text-gray-800 dark:bg-slate-800 dark:text-white">
	<slot />
</main>

{#if reloadPrompt}
	<svelte:component this={reloadPrompt} />
{/if}
