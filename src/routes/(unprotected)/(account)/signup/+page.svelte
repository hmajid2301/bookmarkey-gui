<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';

	import type { ActionData, PageData } from './$types';

	import { enhance } from '$app/forms';
	import EmailInput from '~/lib/components/molecules/EmailInput.svelte';
	import FullWidthButton from '~/lib/components/molecules/FullWidthInput.svelte';
	import PasswordInput from '~/lib/components/molecules/PasswordInput.svelte';
	import OAuthLoginGroup from '~/routes/(unprotected)/components/OAuthLoginButtons.svelte';

	export let form: ActionData;
	export let data: PageData;

	let loading = false;

	const submitSignup = () => {
		loading = true;
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'failure':
					toast.error('Invalid credentials');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Create an account
	</h1>
	<form class="space-y-4 md:space-y-6" action="?/register" method="post" use:enhance={submitSignup}>
		<EmailInput disabled={loading} value={form?.data?.email} errors={form?.errors?.email} />
		<PasswordInput
			disabled={loading}
			name="password"
			labelName="Password"
			value={form?.data?.password}
			errors={form?.errors?.password} />
		<PasswordInput
			disabled={loading}
			name="passwordConfirm"
			labelName="Confirm Password"
			note="Required. Your password again"
			value={form?.data?.passwordConfirm}
			errors={form?.errors?.passwordConfirm} />
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
