<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';

	import { enhance } from '$app/forms';
	import Button from '~/lib/components/atoms/Button.svelte';
	import PasswordInput from '~/lib/components/molecules/PasswordInput.svelte';
	import type { PasswordErrors, PasswordValues } from '~/routes/(protected)/settings/+page.svelte';

	export let loading: boolean;
	export let values: PasswordValues;
	export let errors: PasswordErrors;
	export let action: string;
	export let useEnhanceFunc: () => ({
		result,
		update
	}: {
		result: ActionResult;
		update: () => Promise<void>;
	}) => Promise<void>;
</script>

<form class="flex h-full flex-col" {action} method="post" use:enhance={useEnhanceFunc}>
	<div class="flex-1 p-6">
		<PasswordInput
			disabled={loading}
			name="currentPassword"
			labelName="Current Password"
			value={values.currentPassword}
			errors={errors.currentPassword} />
		<hr class="my-6 -mx-6 border-t border-gray-100 dark:border-slate-800" />
		<PasswordInput
			disabled={loading}
			name="password"
			labelName="Password"
			placeholder="Your new password"
			note="Required. Your new password"
			value={values.password}
			errors={errors.password} />
		<PasswordInput
			disabled={loading}
			name="passwordConfirm"
			labelName="Confirm Password"
			placeholder="Your new password"
			note="Required. Your new password again"
			value={values.passwordConfirm}
			errors={errors.passwordConfirm} />
	</div>

	<div class="p-6">
		<div class="-mb-3 flex flex-wrap items-center justify-start">
			<Button type="submit">Change Password</Button>
		</div>
	</div>
</form>
