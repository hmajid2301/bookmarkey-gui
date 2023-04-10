<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	import { API } from "~/lib/api/client.js";
	import type { BookmarksMetadataRecord } from "~/lib/api/types.js";
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

	const api = new API();
	let url: string;
	let metadata: BookmarksMetadataRecord;

	onMount(async () => {
		for (var query of ["url", "text", "title"]) {
			const value = $page.url.searchParams.get(query) || "";
			if (!isValidHttpUrl(value)) {
				continue;
			}

			url = value;
			break;
		}
		metadata = await api.getURLMetadata(url);
	});
</script>

<AddBookmarkModal {metadata} bind:url collections={data.collections.collections} />
