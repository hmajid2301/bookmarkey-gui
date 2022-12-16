<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import Button from '~/components/atoms/button.svelte';
	import DangerAlert from '~/components/atoms/fail_alert.svelte';
	import Input from '~/components/atoms/input.svelte';
	import PasswordInput from '~/components/molecules/password_input.svelte';
	import SignInGroup from '~/components/molecules/sign_in_group.svelte';

	export let form: ActionData;
	export let data: PageData;
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Create an account
	</h1>
	<form class="space-y-4 md:space-y-6" action="?/register" method="post">
		<Input
			type="email"
			name="email"
			labelName="Email"
			required={true}
			placeholder="your@email.com"
			value={form?.data?.email}
			errors={form?.errors?.email} />
		<PasswordInput
			name="password"
			labelName="Password"
			value={form?.data?.password}
			errors={form?.errors?.password} />
		<PasswordInput
			name="passwordConfirm"
			labelName="Confirm Password"
			value={form?.data?.passwordConfirm}
			errors={form?.errors?.passwordConfirm} />
		<Button>Create Account</Button>
	</form>
	{#if form?.signupError}
		<DangerAlert text={form?.signupError} />
	{/if}
	<div class="my-5 flex items-center justify-center space-x-2">
		<span class="h-px w-16 bg-gray-100" />
		<span class="font-normal text-gray-300">or</span>
		<span class="h-px w-16 bg-gray-100" />
	</div>
	<SignInGroup authProviders={data.authProviders} />

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
			href="/account/login"
			class="text-primary-600 dark:text-primary-500 font-medium hover:underline">
			Login here
		</a>
	</p>
</div>
