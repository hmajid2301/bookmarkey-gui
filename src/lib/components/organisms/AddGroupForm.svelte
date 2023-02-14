<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionResult } from "@sveltejs/kit";
	import LayerGroupSolid from "svelte-awesome-icons/LayerGroupSolid.svelte";
	import toast from "svelte-french-toast";

	import Modal from "../atoms/Modal.svelte";
	import FormField from "../molecules/FormField.svelte";
	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";

	let loading = false;
	export let ref: HTMLInputElement;

	export let show = false;
	const submitAddGroupForm = () => {
		loading = true;
		return async ({
			result,
			update
		}: {
			result: ActionResult;
			update: () => Promise<void>;
		}) => {
			switch (result.type) {
				case "success":
					await update();
					toast.success("Created group");
					break;
				case "error":
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
			show = false;
		};
	};
</script>

<Modal title="Create a new group" bind:show>
	<form
		class="h-min space-y-4 md:space-y-6"
		action="/my/groups?/addGroup"
		method="post"
		use:enhance={submitAddGroupForm}>
		<FormField
			bind:ref
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
		<FullWidthButton>Add Group</FullWidthButton>
	</form>
</Modal>
