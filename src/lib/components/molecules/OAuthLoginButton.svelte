<script lang="ts">
	import { browser } from "$app/environment";
	import Icon from "@iconify/svelte";

	import TransparentButton from "../atoms/TransparentButton.svelte";
	import type { AuthProviderWithRedirect } from "~/lib/types/api";

	export let authProviders: Record<string, AuthProviderWithRedirect>;

	function gotoAuthProvider(providerName: string) {
		const provider = authProviders[providerName];
		if (browser) {
			document.cookie = `state=${provider?.state}`;
			document.cookie = `provider=${provider?.name}`;
		}

		window.location.href = provider?.redirect || "";
	}
</script>

<TransparentButton on:click={() => gotoAuthProvider("github")}>
	<span class="mr-2 -ml-1 h-4 w-4">
		<Icon icon="fa-brands:github" />
	</span>
	Sign in with GitHub
</TransparentButton>

<TransparentButton on:click={() => gotoAuthProvider("gitlab")}>
	<span class="mr-2 -ml-1 h-4 w-4">
		<Icon icon="fa-brands:gitlab" />
	</span>
	Sign in with GitHub
</TransparentButton>
