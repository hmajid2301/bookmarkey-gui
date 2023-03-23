<script lang="ts">
	import type { ActionResult } from "@sveltejs/kit";
	import toast from "svelte-french-toast";
	import { superForm } from "sveltekit-superforms/client";

	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import EmailInput from "~/lib/components/molecules/EmailInput.svelte";

	export let data;
	const { form, capture, restore, errors, enhance } = superForm(data.form, {});

	export const snapshot = {
		capture,
		restore
	};

	let loading = false;
	const submitPasswordReset = () => {
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

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Forgot your password?
	</h1>
	<p class="font-light text-gray-500 dark:text-gray-400">
		Don't fret! Just type in your email and we will send you a code to reset your password!
	</p>

	<form class="space-y-4 md:space-y-6" method="post" use:enhance on:submit={submitPasswordReset}>
		<EmailInput disabled={loading} bind:value={$form.email} errors={$errors.email} />
		<FullWidthButton>Reset Password</FullWidthButton>
	</form>
</div>
