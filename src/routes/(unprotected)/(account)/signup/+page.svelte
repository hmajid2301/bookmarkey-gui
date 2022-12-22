<script lang="ts">
	import toast from 'svelte-french-toast';

	import type { ActionData, PageData } from './$types';

	import EmailInput from '~/lib/components/molecules/email_input.svelte';
	import FullWidthButton from '~/lib/components/molecules/full_width_button.svelte';
	import PasswordInput from '~/lib/components/molecules/password_input.svelte';
	import OAuthLoginGroup from '~/routes/(unprotected)/_components/oauth_login_buttons.svelte';

	export let form: ActionData;
	export let data: PageData;

	if (form?.signupErr) {
		toast.error(form.signupErr);
	}
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Create an account
	</h1>
	<form class="space-y-4 md:space-y-6" action="?/register" method="post">
		<EmailInput value={form?.data?.email} errors={form?.errors?.email} />
		<PasswordInput
			name="password"
			labelName="Password"
			value={form?.data?.password}
			errors={form?.errors?.password} />
		<PasswordInput
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
