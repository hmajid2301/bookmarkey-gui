<script lang="ts">
	import toast from 'svelte-french-toast';

	import Button from '~/lib/components/atoms/button.svelte';
	import PasswordInput from '~/lib/components/molecules/password_input.svelte';
	import type { PasswordErrors, PasswordValues } from '~/routes/(protected)/settings/+page.svelte';

	export let values: PasswordValues;
	export let errors: PasswordErrors;
	export let action: string;
	export let success: boolean | undefined = undefined;
	export let error: string | undefined = undefined;

	if (success) {
		toast.success('Updated password successfully');
	}

	if (error) {
		toast.error('Failed to update password');
	}
</script>

<form class="flex h-full flex-col" {action} method="post">
	<div class="flex-1 p-6">
		<PasswordInput
			name="currentPassword"
			labelName="Current Password"
			value={values.currentPassword}
			errors={errors.currentPassword} />
		<hr class="my-6 -mx-6 border-t border-gray-100 dark:border-slate-800" />
		<PasswordInput
			name="password"
			labelName="Password"
			placeholder="Your new password"
			note="Required. Your new password"
			value={values.password}
			errors={errors.password} />
		<PasswordInput
			name="passwordConfirm"
			labelName="Confirm Password"
			placeholder="Your new password"
			note="Required. Your new password again"
			value={values.passwordConfirm}
			errors={errors.passwordConfirm} />
	</div>

	<div class="mt-auto p-6">
		<div class="-mb-3 flex flex-wrap items-center justify-start">
			<Button type="submit">Change Password</Button>
		</div>
	</div>
</form>
