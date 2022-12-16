<script lang="ts">
	import type { ActionData } from './$types';

	import Button from '~/components/atoms/button.svelte';
	import FailAlert from '~/components/atoms/fail_alert.svelte';
	import Input from '~/components/atoms/input.svelte';
	import SuccessAlert from '~/components/atoms/success_alert.svelte';

	export let form: ActionData;
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
		Check your inbox
	</h1>
	<p class="font-light text-gray-500 dark:text-gray-400">
		We are glad, that you're with us. We've sent you a verification link to the email address.
	</p>
	<p class="font-light text-gray-500 dark:text-gray-400">
		If you haven't received the email, try to send it again.
	</p>
	<form class="space-y-4 md:space-y-6" action="?/sendEmailVerification" method="post">
		<Input
			type="email"
			name="email"
			labelName="Email"
			required={true}
			placeholder="your@email.com"
			value={form?.data?.email}
			errors={form?.errors?.email} />
		<Button>Resend Email Verification</Button>
	</form>
	{#if form?.success}
		<SuccessAlert text="Successfully sent verification link" />
	{/if}
	{#if form?.resetErr}
		<FailAlert text={form.resetErr} />
	{/if}
</div>
