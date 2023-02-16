<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionResult } from "@sveltejs/kit";
	import toast from "svelte-french-toast";

	import Password from "../molecules/Password.svelte";
	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import EmailInput from "~/lib/components/molecules/EmailInput.svelte";
	import type { Register } from "~/lib/types/form";

	export let register: Register | undefined;
	export let errors:
		| {
				email?: string[];
				password?: string[];
		  }
		| undefined;

	let loading = false;

	const submitRegister = () => {
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

<h1
	class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
	Create an account
</h1>
<form class="space-y-4 md:space-y-6" action="?/register" method="post" use:enhance={submitRegister}>
	<EmailInput
		autocomplete="username"
		disabled={loading}
		value={register?.email}
		errors={errors?.email} />
	<Password {loading} value={register?.password || ""} errors={errors?.password || []} />
	<FullWidthButton>Create Account</FullWidthButton>
</form>
