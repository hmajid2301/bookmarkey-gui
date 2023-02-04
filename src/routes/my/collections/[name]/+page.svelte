<script lang="ts">
	import { navigating } from "$app/stores";

	import type { PageData } from "./$types";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";

	export let data: PageData;
	$: if ($navigating) {
		$selectedGroupStore.group.id = data.collection.group || "";
	}
</script>

<svelte:head>
	<title>My Collection: {data.collection.name}</title>
</svelte:head>

<p>Hello {data.collection.name}</p>
