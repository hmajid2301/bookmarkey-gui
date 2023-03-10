<script lang="ts">
	import * as Sentry from "@sentry/svelte";
	import { Replay } from "@sentry/svelte";
	import { BrowserTracing } from "@sentry/tracing";
	import { DarkMode } from "flowbite-svelte";
	import { onMount } from "svelte";
	import { Toaster } from "svelte-french-toast";
	import { pwaInfo } from "virtual:pwa-info";

	import "~/app.css";
	import { config } from "~/config";
	import type ReloadPrompt from "~/lib/components/organisms/ReloadPrompt.svelte";

	let reloadPrompt: typeof ReloadPrompt;
	onMount(async () => {
		pwaInfo &&
			(reloadPrompt = (await import("~/lib/components/organisms/ReloadPrompt.svelte"))
				.default);
	});

	Sentry.init({
		dsn: config.SentryDNS,
		environment: config.PROD ? "production" : "development",
		integrations: [new BrowserTracing(), new Replay()],
		// tweak these numbers
		replaysSessionSampleRate: 1.0,
		replaysOnErrorSampleRate: 1.0,
		tracesSampleRate: 1.0
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
