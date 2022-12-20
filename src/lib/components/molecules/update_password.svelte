<script lang="ts">
	import Input from '~/lib/components/atoms/input.svelte';
	import type { PasswordValues, PasswordErrors } from '~/routes/(protected)/settings/+page.svelte';

	export let values: PasswordValues;
	export let errors: PasswordErrors;
</script>

<div class="flex-1 p-6">
	<Input
		type="password"
		name="currentPassword"
		labelName="Current Password"
		required={true}
		note="Required. Your current password"
		value={values.currentPassword}
		errors={errors.currentPassword}>
		<span
			class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-gray-500 dark:text-slate-400">
			<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
				<path
					fill="currentColor"
					d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z" />
			</svg>
		</span>
	</Input>
	<hr class="my-6 -mx-6 border-t border-gray-100 dark:border-slate-800" />
	<Input
		type="password"
		name="password"
		labelName="Password"
		required={true}
		note="Required. Your new password"
		value={values.password}
		errors={errors.password}>
		<span
			class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-gray-500 dark:text-slate-400">
			<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
				<path
					fill="currentColor"
					d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z" />
			</svg>
		</span>
	</Input>
	<Input
		type="password"
		name="passwordConfirm"
		labelName="Confirm Password"
		required={true}
		note="Required. Your new password one more time"
		value={values.password}
		errors={errors.password}>
		<span
			class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-gray-500 dark:text-slate-400">
			<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
				<path
					fill="currentColor"
					d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z" />
			</svg>
		</span>
	</Input>
</div>

<div class="p-6">
	<div class="-mb-3 flex flex-wrap items-center justify-start">
		<button
			class="mr-3 mb-3 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded border border-blue-600 bg-blue-600 py-2 px-3 text-white ring-blue-300 transition-colors duration-150 last:mr-0 hover:border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring dark:border-blue-500 dark:bg-blue-500 dark:ring-blue-700 hover:dark:border-blue-600 hover:dark:bg-blue-600"
			type="submit">
			<span class="px-2">Change Password</span>
		</button>
	</div>
</div>
