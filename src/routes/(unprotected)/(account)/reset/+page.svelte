<script lang="ts">
	import type { ActionData } from './$types';

	import FailAlert from '~/lib/components/molecules/danger_alert.svelte';
	import EmailInput from '~/lib/components/molecules/email_input.svelte';
	import FullWidthButton from '~/lib/components/molecules/full_width_button.svelte';
	import SuccessAlert from '~/lib/components/molecules/success_alert.svelte';

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
		<EmailInput value={form?.data.email} errors={form?.errors?.email} />
		<FullWidthButton>Reset Password</FullWidthButton>
	</form>
	{#if form?.success}
		<SuccessAlert text="Successfully sent password reset" />
	{/if}
	{#if form?.resetErr}
		<FailAlert text={form.resetErr} />
	{/if}
</div>
