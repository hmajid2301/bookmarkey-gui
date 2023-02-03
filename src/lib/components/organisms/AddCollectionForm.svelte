<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionResult } from "@sveltejs/kit";
	import FolderSolid from "svelte-awesome-icons/FolderSolid.svelte";
	import toast from "svelte-french-toast";

	import FormField from "../molecules/FormField.svelte";

	export let showInput = false;
	export let ref: HTMLInputElement;

	let loading = false;
	const submitAddCollection = () => {
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
					showInput = false;
					toast.success("Created collection");
					break;
				case "error":
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<form action="/my/collections?/addCollection" method="post" use:enhance={submitAddCollection}>
	<FormField
		disabled={loading}
		bind:ref
		on:blur={() => {
			showInput = false;
		}}
		type="text"
		labelName=""
		placeholder="Collection Name"
		name="collection">
		<span
			class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-slate-500 dark:text-slate-400">
			<FolderSolid class="inline-block h-4 w-4" />
		</span>
	</FormField>
</form>
