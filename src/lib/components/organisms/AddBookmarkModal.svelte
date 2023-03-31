<script lang="ts">
	import type pocketbase from "pocketbase";
	import { onMount } from "svelte";
	import LinkSolid from "svelte-awesome-icons/LinkSolid.svelte";

	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import Modal from "~/lib/components/atoms/Modal.svelte";
	import FormField from "~/lib/components/molecules/FormField.svelte";
	import { createBookmark, getPB } from "~/lib/pocketbase/frontend";

	export let collectionID: string;
	export let ref: HTMLInputElement;
	export let show = false;

	let url: string;
	let loading = false;
	let pb: pocketbase;

	onMount(() => {
		pb = getPB();
	});

	async function addBookmark() {
		loading = true;
		await createBookmark(pb, collectionID, url);
		loading = false;
		show = false;
	}
</script>

<Modal title="Add a new bookmark" bind:show>
	<div class="h-min space-y-4 md:space-y-6">
		<FormField
			bind:ref
			disabled={loading}
			bind:value={url}
			type="text"
			labelName=""
			placeholder="Copy URL Here"
			name="url">
			<span
				class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-slate-500 dark:text-slate-400">
				<LinkSolid class="inline-block h-4 w-4" />
			</span>
		</FormField>
		<FullWidthButton on:click={addBookmark}>Add Bookmark</FullWidthButton>
	</div>
</Modal>
