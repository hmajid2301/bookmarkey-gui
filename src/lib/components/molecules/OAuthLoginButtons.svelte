<script lang="ts">
	import { browser } from "$app/environment";
	import { GithubBrand, GitlabBrand } from "svelte-awesome-icons";

	import BrandButton from "./BrandButton.svelte";

	import type { AuthProviderWithRedirect } from "~/routes/(unprotected)/(account)/types";

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
	<BrandButton
		iconComponent={GithubBrand}
		on:click={() => gotoAuthProvider("github")}
		name="Sign in with GitHub" />
</div>

<div>
	<BrandButton
		iconComponent={GitlabBrand}
		on:click={() => gotoAuthProvider("github")}
		name="Sign in with GitLab" />
</div>
