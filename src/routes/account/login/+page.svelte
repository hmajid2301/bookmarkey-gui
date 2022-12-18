<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import Button from '$lib/components/atoms/button.svelte';
	import DangerAlert from '$lib/components/atoms/fail_alert.svelte';
	import Input from '$lib/components/atoms/input.svelte';
	import SignInGroup from '$lib/components/molecules/sign_in_group.svelte';

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
			value={form?.data.email}
			errors={form?.errors?.email} />
		<Input
			type="password"
			name="password"
			labelName="Password"
			required={true}
			placeholder="••••••••"
			value={form?.data.password}
			errors={form?.errors?.password} />
		<div class="flex items-center justify-between">
			<a href="/account/reset" class="link">Forgot password?</a>
		</div>
		<Button>Login</Button>
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
		Don't have an account? <a href="/account/signup" class="link">Sign up</a>
	</p>
</div>
