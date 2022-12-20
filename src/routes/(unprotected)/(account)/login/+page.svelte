<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import AccountButton from '~/lib/components/atoms/account_button.svelte';
	import DangerAlert from '~/lib/components/atoms/fail_alert.svelte';
	import Input from '~/lib/components/atoms/input.svelte';
	import SignInGroup from '~/lib/components/molecules/sign_in_group.svelte';
	import PasswordInput from '~/lib/components/molecules/password_input.svelte';

	export let form: ActionData;
	export let data: PageData;
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Login to your account
	</h1>
	<form class="space-y-4 md:space-y-6" action="?/login" method="post">
		<Input
			type="email"
			name="email"
			labelName="Email"
			required={true}
			placeholder="your@email.com"
			note="Required. Your email"
			value={form?.data.email}
			errors={form?.errors?.email}>
			<span
				class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-gray-500 dark:text-slate-400">
				<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
					<path
						fill="currentColor"
						d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M17,17H7V15H17M17,13H7V11H17M20,9H17V6H20" />
				</svg>
			</span>
		</Input>
		<PasswordInput
			name="password"
			labelName="Password"
			value={form?.data.password}
			errors={form?.errors?.password} />
		<div class="flex items-center justify-between">
			<a href="/reset" class="link">Forgot password?</a>
		</div>
		<AccountButton>Login</AccountButton>
	</form>
	{#if form?.loginError}
		<DangerAlert text={form?.loginError} />
	{/if}
	<div class="my-5 flex items-center justify-center space-x-2">
		<span class="h-px w-16 bg-gray-100" />
		<span class="font-normal text-gray-300">or</span>
		<span class="h-px w-16 bg-gray-100" />
	</div>

	<SignInGroup authProviders={data.authProviders} />
	<p class="text-sm font-light text-gray-800 dark:text-gray-100">
		Don't have an account? <a href="/signup" class="link">Sign up</a>
	</p>
</div>
