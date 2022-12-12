<script lang="ts">
	import Button from '~/components/atoms/button.svelte';
	import FailAlert from '~/components/atoms/fail_alert.svelte';
	import Inputs from '~/components/atoms/input.svelte';
	import SuccessAlert from '~/components/atoms/success_alert.svelte';
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
			placeholder="your@email.com"
			errors={form?.errors?.email} />
		<Button>Reset Password</Button>
	</form>
	{#if form?.success}
		<SuccessAlert text="Successfully sent password reset" />
	{/if}
	{#if form?.resetErr}
		<FailAlert text={form.resetErr} />
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
