<script lang="ts">
	import LayerGroupSolid from "svelte-awesome-icons/LayerGroupSolid.svelte";

	import Modal from "../atoms/Modal.svelte";
	import FormField from "../molecules/FormField.svelte";
	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import { API } from "~/lib/pocketbase/frontend";

	export let ref: HTMLInputElement;
	export let show = false;

	let groupName: string;
	let loading = false;
	const api = new API();

	async function addGroup() {
		loading = true;
		await api.createGroup(groupName);
		loading = false;
		show = false;
	}
</script>

<Modal title="Create a new group" bind:show>
	<div class="h-min space-y-4 md:space-y-6">
		<FormField
			bind:ref
			bind:value={groupName}
			on:keydown={(e) => {
				if (e.key === "Enter") addGroup;
			}}
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
