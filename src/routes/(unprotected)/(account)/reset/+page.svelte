<script lang="ts">
	import type { ActionData } from "./$types";

	import ResetPasswordForm from "~/lib/components/organisms/ResetPasswordForm.svelte";

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
	<ResetPasswordForm email={form?.data.email} errors={form?.errors?.email} />
</div>
