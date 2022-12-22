<script lang="ts">
	import toast from 'svelte-french-toast';

	import type { ActionData } from './$types';

	import EmailInput from '~/lib/components/molecules/email_input.svelte';
	import FullWidthButton from '~/lib/components/molecules/full_width_button.svelte';

	export let form: ActionData;

	if (form?.success) {
		toast.success('Successfully resent email');
	}

	if (form?.resetErr) {
		toast.error(form.resetErr);
	}
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
		<EmailInput value={form?.data.email} errors={form?.errors?.email} />
		<FullWidthButton>Resend Email Verification</FullWidthButton>
	</form>
</div>
