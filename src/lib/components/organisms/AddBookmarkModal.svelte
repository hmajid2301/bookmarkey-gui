<script lang="ts">
	import { enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import type { ActionResult } from "@sveltejs/kit";
	import LinkSolid from "svelte-awesome-icons/LinkSolid.svelte";
	import toast from "svelte-french-toast";

	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import Modal from "~/lib/components/atoms/Modal.svelte";
	import FormField from "~/lib/components/molecules/FormField.svelte";

	export let collectionID: string;
	export let ref: HTMLInputElement;
	export let show = false;

	let loading = false;

	const submitAddBookmarkForm = () => {
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
					toast.success("Added bookmark");
					await invalidateAll();
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

<Modal title="Add a new bookmark" bind:show>
	<form
		class="h-min space-y-4 md:space-y-6"
		action={`/my/collections/${collectionID}?/addBookmark`}
		method="post"
		use:enhance={submitAddBookmarkForm}>
		<FormField
			bind:ref
			disabled={loading}
			type="text"
			labelName=""
			placeholder="Copy URL Here"
			name="url">
			<span
				class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-slate-500 dark:text-slate-400">
				<LinkSolid class="inline-block h-4 w-4" />
			</span>
		</FormField>
		<FullWidthButton>Add Bookmark</FullWidthButton>
	</form>
</Modal>
