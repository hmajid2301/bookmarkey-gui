<script lang="ts">
	import type { ActionResult } from "@sveltejs/kit";
	import { passwordStrength } from "check-password-strength";
	import toast from "svelte-french-toast";

	import type { ActionData, PageData } from "../register/$types";

	import { enhance } from "$app/forms";
	import FullWidthButton from "~/lib/components/molecules/FullWidthInput.svelte";
	import EmailInput from "~/lib/components/organisms/EmailInput.svelte";
	import PasswordInput from "~/lib/components/organisms/PasswordInput.svelte";
	import OAuthLoginGroup from "~/routes/(unprotected)/components/OAuthLoginButtons.svelte";

	export let form: ActionData;
	export let data: PageData;

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

	interface Item {
		color: string;
		note: string;
	}

	let passwordScoreMap: Record<number, Item> = {
		0: { color: "bg-gray-200", note: "Very Weak Password" },
		1: { color: "bg-red-500", note: "Weak Password" },
		2: { color: "bg-orange-500", note: "Average Password" },
		3: { color: "bg-green-500", note: "Strong Password" }
	};

	let passwordScore = 0;
	let passwordScoreItem = passwordScoreMap[0];
	function onChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		passwordScore = passwordStrength(value).id;
		passwordScoreItem = passwordScoreMap[passwordScore] || passwordScoreMap[0];
	}
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Create an account
	</h1>
	<form
		class="space-y-4 md:space-y-6"
		action="?/register"
		method="post"
		use:enhance={submitRegister}>
		<EmailInput
			autocomplete="username"
			disabled={loading}
			value={form?.data?.email}
			errors={form?.errors?.email} />
		<PasswordInput
			autocomplete="new-password"
			note="Required. Your password"
			{onChange}
			disabled={loading}
			name="password"
			labelName="Password"
			value={form?.data?.password}
			errors={form?.errors?.password} />
		<div class="flex w-full">
			<span
				class="h-1 w-1/3 rounded {passwordScore >= 0
					? passwordScoreItem?.color
					: 'bg-gray-200'}" />
			<span
				class="mx-3 h-1 w-1/3 rounded {passwordScore >= 1
					? passwordScoreItem?.color
					: 'bg-gray-200'}" />
			<span
				class="h-1 w-1/3 rounded {passwordScore >= 2
					? passwordScoreItem?.color
					: 'bg-gray-200'}" />
			<span
				class="mx-3 h-1 w-1/3 rounded {passwordScore >= 3
					? passwordScoreItem?.color
					: 'bg-gray-200'}" />
		</div>
		<div class="my-2 text-sm">
			{passwordScoreItem?.note}
		</div>
		<FullWidthButton>Create Account</FullWidthButton>
	</form>

	<div class="my-5 flex items-center justify-center space-x-2">
		<span class="h-px w-16 bg-gray-100" />
		<span class="font-normal text-gray-300">or</span>
		<span class="h-px w-16 bg-gray-100" />
	</div>
	<OAuthLoginGroup authProviders={data.authProviders} />

	<div class="mt-4 text-center text-sm text-gray-500">
		By signing up, you agree to the
		<a class="border-grey-dark text-grey-dark border-b no-underline" href="/terms-of-service">
			Terms of Service
		</a>
		and
		<a class="border-grey-dark text-grey-dark border-b no-underline" href="/privacy-policy">
			Privacy Policy
		</a>
	</div>
	<p class="text-sm font-light text-gray-500 dark:text-gray-400">
		Already have an account? <a
			href="/login"
			class="text-primary-600 dark:text-primary-500 font-medium hover:underline">
			Login here
		</a>
	</p>
</div>
