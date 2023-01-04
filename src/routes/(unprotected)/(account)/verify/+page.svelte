<script lang="ts">
	import type { ActionData } from "./$types";
	import EmailVerificationForm from "~/lib/components/organisms/EmailVerificationForm.svelte";

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
	<EmailVerificationForm email={form?.data?.email} errors={form?.errors?.email} />
</div>
