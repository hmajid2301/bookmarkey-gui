<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';

	import type { ActionData, PageData } from './$types';

	import { enhance } from '$app/forms';
	import EmailInput from '~/lib/components/molecules/email_input.svelte';
	import FullWidthButton from '~/lib/components/molecules/full_width_button.svelte';
	import PasswordInput from '~/lib/components/molecules/password_input.svelte';
	import OAuthLoginGroup from '~/routes/(unprotected)/components/oauth_login_buttons.svelte';

	export let form: ActionData;
	export let data: PageData;

	let loading = false;

	const submitLogin = () => {
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
		Login to your account
	</h1>
	<form class="space-y-4 md:space-y-6" action="?/login" method="post" use:enhance={submitLogin}>
		<EmailInput disabled={loading} value={form?.data.email} errors={form?.errors?.email} />
		<PasswordInput
			name="password"
			labelName="Password"
			value={form?.data.password}
			disabled={loading}
			errors={form?.errors?.password} />
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
		Don't have an account? <a href="/signup" class="link">Sign up</a>
	</p>
</div>
