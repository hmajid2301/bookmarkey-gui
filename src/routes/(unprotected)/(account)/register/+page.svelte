<script lang="ts">
	import toast from "svelte-french-toast";
	import { superForm } from "sveltekit-superforms/client";

	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import EmailInput from "~/lib/components/molecules/EmailInput.svelte";
	import OAuthLoginGroup from "~/lib/components/molecules/OAuthLoginButton.svelte";
	import Password from "~/lib/components/molecules/Password.svelte";
	import LoadingStore from "~/lib/stores/LoadingStore";

	export let data;

	const { form, capture, restore, errors, enhance } = superForm(data.form, {
		onSubmit: async () => {
			LoadingStore.setLoading(true);
		},
		onResult: async () => {
			LoadingStore.setLoading(false);
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
	<title>Register</title>
</svelte:head>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Create an account
	</h1>
	<form class="space-y-4 md:space-y-6" method="post" use:enhance>
		<EmailInput autocomplete="username" bind:value={$form.email} errors={$errors.email} />
		<Password bind:value={$form.password} errors={$errors.password || []} />
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
