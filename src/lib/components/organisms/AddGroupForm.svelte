<script lang="ts">
	import type pocketbase from "pocketbase";
	import { onMount } from "svelte";
	import LayerGroupSolid from "svelte-awesome-icons/LayerGroupSolid.svelte";

	import Modal from "../atoms/Modal.svelte";
	import FormField from "../molecules/FormField.svelte";
	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import { createGroup, getPB } from "~/lib/pocketbase/frontend";

	export let ref: HTMLInputElement;
	export let show = false;

	let groupName: string;
	let loading = false;
	let pb: pocketbase;

	onMount(() => {
		pb = getPB();
	});

	async function addGroup() {
		loading = true;
		await createGroup(pb, groupName);
		loading = false;
		show = false;
	}
</script>

<Modal title="Create a new group" bind:show>
	<div class="h-min space-y-4 md:space-y-6">
		<FormField
			bind:ref
			bind:value={groupName}
			disabled={loading}
			type="text"
			labelName=""
			placeholder="Group Name"
			name="group">
			<span
				class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-slate-500 dark:text-slate-400">
				<LayerGroupSolid class="inline-block h-4 w-4" />
			</span>
		</FormField>
		<FullWidthButton on:click={addGroup}>Add Group</FullWidthButton>
	</div>
</Modal>
