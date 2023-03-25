<script lang="ts">
	import toast from "svelte-french-toast";
	import { superForm } from "sveltekit-superforms/client";

	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import EmailInput from "~/lib/components/molecules/EmailInput.svelte";
	import OAuthLoginGroup from "~/lib/components/molecules/OAuthLoginButton.svelte";
	import PasswordInput from "~/lib/components/molecules/PasswordInput.svelte";

	export let data;

	const { form, capture, restore, errors, enhance, constraints } = superForm(data.form, {
		onResult: async ({ result }) => {
			if (result.type === "failure") {
				toast.error("Invalid credentials");
			}
		},
		onError: async ({ result }) => {
			toast.error(result.error.message);
		}
	});

	export const snapshot = {
		capture,
		restore
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Login to your account
	</h1>
	<form class="space-y-4 md:space-y-6" method="post" use:enhance>
		<EmailInput
			autocomplete="username"
			bind:value={$form.email}
			errors={$errors.email}
			{...$constraints.email} />
		<PasswordInput
			name="password"
			labelName="Password"
			bind:value={$form.password}
			errors={$errors.password}
			{...$constraints.password} />
		<div class="flex items-center justify-between">
			<a href="/reset" class="link">Forgot password?</a>
		</div>
		<FullWidthButton>Login</FullWidthButton>
	</form>

	<div class="my-5 flex items-center justify-center space-x-2">
		<span class="h-px w-16 bg-gray-100" />
		<span class="font-normal text-gray-300">or</span>
		<span class="h-px w-16 bg-gray-100" />
	</div>

	<OAuthLoginGroup authProviders={data.authProviders} />
	<p class="text-sm font-light text-gray-800 dark:text-gray-100">
		Don't have an account? <a href="/register" class="link">Sign up</a>
	</p>
</div>
