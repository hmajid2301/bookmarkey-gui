<script lang="ts">
	import Rules from "./Rules.svelte";

	export let password: string;
</script>

<Rules
	rules={[
		{
			check: password.length >= 8,
			successText: "Password meets minimum length criteria",
			errorText: "Passwords need to be at least 8 characters long"
		}
	]} />
