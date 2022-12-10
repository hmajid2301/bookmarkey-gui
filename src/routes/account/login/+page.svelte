<script lang="ts">
	import { Alert } from 'flowbite-svelte';

	import Button from '~/components/atoms/button.svelte';
	import Inputs from '~/components/atoms/inputs.svelte';
	import SignInGroup from '~/components/molecules/sign_in_group.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Login to your account
	</h1>
	<form class="space-y-4 md:space-y-6" action="?/login" method="post">
		<Inputs
			type="email"
			name="email"
			labelName="Email"
			required={true}
			placeholder="your@email.com" />
		<Inputs
			type="password"
			name="password"
			labelName="Password"
			required={true}
			placeholder="••••••••" />
		<div class="flex items-center justify-between">
			<a href="/account/reset" class="link">Forgot password?</a>
		</div>
		<Button>Login</Button>
	</form>
	{#if form?.notVerified}
		<Alert color="red" accent>
			<span slot="icon">
				<svg
					aria-hidden="true"
					class="h-5 w-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd" />
				</svg>
			</span>
			<span>You must verify your email before you can login.</span>
		</Alert>
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
