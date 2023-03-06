<script lang="ts">
	import { passwordStrength } from "check-password-strength";

	import PasswordIndicator from "./PasswordIndicator.svelte";
	import PasswordRules from "./PasswordRules.svelte";
	import PasswordInput from "~/lib/components/molecules/PasswordInput.svelte";

	export let loading = false;
	export let value = "";
	export let errors: string[];

	let passwordScore = 0;
	function updatePassword(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		passwordScore = passwordStrength(value).id;
	}
</script>

<PasswordInput
	autocomplete="new-password"
	note="Required. Your password"
	on:input={updatePassword}
	disabled={loading}
	name="password"
	labelName="Password"
	{value}
	{errors} />

{#if value.length > 0}
	<PasswordRules password={value} />
	<PasswordIndicator {passwordScore} />
{/if}
