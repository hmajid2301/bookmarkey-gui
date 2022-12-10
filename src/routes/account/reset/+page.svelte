<script lang="ts">
	import { Alert } from 'flowbite-svelte';

	import Button from '~/components/atoms/button.svelte';
	import Inputs from '~/components/atoms/inputs.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Reset your password
	</h1>
	<form class="space-y-4 md:space-y-6" action="?/resetPassword" method="post">
		<Inputs
			type="email"
			name="email"
			labelName="Email"
			required={true}
			placeholder="your@email.com" />
		<Button>Reset Password</Button>
	</form>
	{#if form?.success}
		<Alert color="green" accent>
			<span slot="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 flex-shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</span>
			<span class="font-medium">Successfully sent password reset.</span>
		</Alert>
	{/if}
	<div class="my-5 flex items-center justify-center space-x-2">
		<span class="h-px w-16 bg-gray-100" />
		<span class="font-normal text-gray-300">or</span>
		<span class="h-px w-16 bg-gray-100" />
	</div>

	<p class="text-sm font-light text-gray-500 dark:text-gray-400">
		Already have an account? <a
			href="/account/login"
			class="text-primary-600 dark:text-primary-500 font-medium hover:underline">
			Login here
		</a>
	</p>
</div>
