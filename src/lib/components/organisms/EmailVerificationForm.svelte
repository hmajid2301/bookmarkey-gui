<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionResult } from "@sveltejs/kit";
	import toast from "svelte-french-toast";

	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import EmailInput from "~/lib/components/molecules/EmailInput.svelte";

	export let email: string;
	export let errors: string[] | undefined = undefined;

	let loading = false;
	const submitVerifyEmail = () => {
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

<form class="space-y-4 md:space-y-6" method="post" use:enhance={submitVerifyEmail}>
	<EmailInput disabled={loading} value={email} {errors} />
	<FullWidthButton>Resend Email Verification</FullWidthButton>
</form>
