<script lang="ts">
	import type { ActionData } from './$types';

	import Button from '$lib/components/atoms/button.svelte';
	import FailAlert from '$lib/components/atoms/fail_alert.svelte';
	import Input from '$lib/components/atoms/input.svelte';
	import SuccessAlert from '$lib/components/atoms/success_alert.svelte';

	export let form: ActionData;
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Forgot your password?
	</h1>
	<p class="font-light text-gray-500 dark:text-gray-400">
		Don't fret! Just type in your email and we will send you a code to reset your password!
	</p>
	<form class="space-y-4 md:space-y-6" action="?/resetPassword" method="post">
		<Input
			type="email"
			name="email"
			labelName="Email"
			required={true}
			placeholder="your@email.com"
			value={form?.data?.email}
			errors={form?.errors?.email} />
		<Button>Reset Password</Button>
	</form>
	{#if form?.success}
		<SuccessAlert text="Successfully sent password reset" />
	{/if}
	{#if form?.resetErr}
		<FailAlert text={form.resetErr} />
	{/if}
</div>
