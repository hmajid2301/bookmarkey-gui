<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionResult } from "@sveltejs/kit";
	import { passwordStrength } from "check-password-strength";
	import toast from "svelte-french-toast";

	import PasswordIndicator from "../molecules/PasswordIndicator.svelte";
	import PasswordRules from "../molecules/PasswordRules.svelte";
	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import EmailInput from "~/lib/components/molecules/EmailInput.svelte";
	import PasswordInput from "~/lib/components/molecules/PasswordInput.svelte";
	import type { Register } from "~/routes/(unprotected)/(account)/register/+page.server";

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

	let passwordScore = 0;
	let passwordValue = "";
	function updatePassword(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		passwordScore = passwordStrength(value).id;
		passwordValue = value;
	}
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
	<PasswordInput
		autocomplete="new-password"
		note="Required. Your password"
		on:input={updatePassword}
		disabled={loading}
		name="password"
		labelName="Password"
		value={register?.password}
		errors={errors?.password} />
	<PasswordRules password={passwordValue} />
	<PasswordIndicator {passwordScore} />
	<FullWidthButton>Create Account</FullWidthButton>
</form>
