<script lang="ts">
	import { browser } from "$app/environment";
	import GithubBrand from "svelte-awesome-icons/GithubBrand.svelte";
	import GitlabBrand from "svelte-awesome-icons/GitlabBrand.svelte";

	import IconButton from "./IconButton.svelte";
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

<IconButton
	iconComponent={GithubBrand}
	on:click={() => gotoAuthProvider("github")}
	name="Sign in with GitHub" />

<IconButton
	iconComponent={GitlabBrand}
	on:click={() => gotoAuthProvider("github")}
	name="Sign in with GitLab" />
