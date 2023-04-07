<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	import AddBookmarkModal from "~/lib/components/organisms/AddBookmarkModal.svelte";

	function isValidHttpUrl(str: string) {
		let url;
		try {
			url = new URL(str);
		} catch (_) {
			return false;
		}
		return url.protocol === "http:" || url.protocol === "https:";
	}

	export let data;

	let title: string = $page.url.searchParams.get("title") || "";
	let url: string;
	onMount(() => {
		for (var query of ["url", "text", "title"]) {
			const value = $page.url.searchParams.get(query) || "";
			if (!isValidHttpUrl(value)) {
				continue;
			}

			url = value;
			break;
		}
	});
</script>

<AddBookmarkModal {title} bind:url collections={data.collections.collections} />
