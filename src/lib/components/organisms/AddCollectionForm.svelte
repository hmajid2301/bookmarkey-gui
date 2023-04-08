<script lang="ts">
	import Icon from "@iconify/svelte";

	import FormField from "../molecules/FormField.svelte";
	import { API } from "~/lib/api/client";

	export let showInput = false;
	export let ref: HTMLInputElement;

	let loading = false;
	let collectionName: string;
	const api = new API();

	async function addCollection() {
		showInput = false;
		loading = true;
		await api.addCollection(collectionName);
		loading = false;
	}
</script>

<FormField
	disabled={loading}
	bind:ref
	bind:value={collectionName}
	on:keydown={async (e) => {
		if (e.key === "Enter") {
			await addCollection();
		}
	}}
	on:blur={addCollection}
	type="text"
	labelName=""
	placeholder="Collection Name"
	name="collection">
	<span
		class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-slate-500 dark:text-slate-400">
		<span class="inline-block h-4 w-4">
			<Icon icon="fa6-solid:folder" />
		</span>
	</span>
</FormField>
