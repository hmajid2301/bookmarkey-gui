<script lang="ts" context="module">
	import type { ActionResult } from "@sveltejs/kit";
	import toast from "svelte-french-toast";

	export interface PasswordValues {
		currentPassword: string;
		password: string;
	}

	export interface PasswordErrors {
		currentPassword: string[] | undefined;
		password: string[] | undefined;
	}

	let passwordScore = 0;
	let passwordValue = "";
	function updatePassword(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		passwordScore = passwordStrength(value).id;
		passwordValue = value;
	}
</script>

<script lang="ts">
	import { enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import { passwordStrength } from "check-password-strength";

	import PasswordIndicator from "../molecules/PasswordIndicator.svelte";
	import PasswordRules from "../molecules/PasswordRules.svelte";
	import Button from "~/lib/components/atoms/Button.svelte";
	import PasswordInput from "~/lib/components/molecules/PasswordInput.svelte";

	let loading = false;
	export let values: PasswordValues;
	export let errors: PasswordErrors;
	const submitUpdatePassword = () => {
		loading = true;
		return async ({
			result,
			update
		}: {
			result: ActionResult;
			update: () => Promise<void>;
		}) => {
			switch (result.type) {
				case "success":
					toast.success("Updated password");
					await invalidateAll();
					break;
				case "failure":
					toast.error("Invalid password data");
					await update();
					break;
				case "error":
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<form
	class="flex h-full flex-col"
	action="?/updatePassword"
	method="post"
	use:enhance={submitUpdatePassword}>
	<div class="flex-1 p-6">
		<PasswordInput
			disabled={loading}
			name="currentPassword"
			labelName="Current Password"
			value={values.currentPassword}
			errors={errors.currentPassword} />
		<PasswordInput
			autocomplete="new-password"
			disabled={loading}
			on:input={updatePassword}
			name="password"
			labelName="Password"
			placeholder="Your new password"
			note="Required. Your new password"
			value={values.password}
			errors={errors.password} />
		<PasswordRules password={passwordValue} />
		<PasswordIndicator {passwordScore} />
	</div>

	<div class="p-6">
		<div class="-mb-3 flex flex-wrap items-center justify-start">
			<Button type="submit">Change Password</Button>
		</div>
	</div>
</form>
