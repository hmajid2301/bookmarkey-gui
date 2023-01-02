<script lang="ts" context="module">
	import type { AuthProviderInfo } from "pocketbase";

	export interface AuthProviderWithRedirect extends AuthProviderInfo {
		redirect: string;
	}
</script>

<script lang="ts">
	import { browser } from "$app/environment";
	import { GithubBrand, GitlabBrand } from "svelte-awesome-icons";

	import IconButton from "./IconButton.svelte";

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

<div>
	<IconButton
		iconComponent={GithubBrand}
		on:click={() => gotoAuthProvider("github")}
		name="Sign in with GitHub" />
</div>

<div>
	<IconButton
		iconComponent={GitlabBrand}
		on:click={() => gotoAuthProvider("github")}
		name="Sign in with GitLab" />
</div>
