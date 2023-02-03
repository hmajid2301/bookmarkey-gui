<script lang="ts">
	import EnvelopeSolid from "svelte-awesome-icons/EnvelopeSolid.svelte";

	import FormField from "../molecules/FormField.svelte";

	export let name = "email";
	export let autocomplete = "email";
	export let labelName = "Email";
	export let placeholder = "your@email.com";
	export let note = "Required. Your email";
	export let value: string | undefined;
	export let errors: string[] | undefined;
	export let disabled = false;
</script>

<FormField
	type="email"
	{autocomplete}
	{name}
	{disabled}
	{labelName}
	required={true}
	{placeholder}
	{note}
	{value}
	{errors}>
	<span
		class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center {errors
			? 'text-red-500'
			: 'text-slate-500 dark:text-slate-400'}">
		<EnvelopeSolid class="inline-block h-4 w-4" />
	</span>
</FormField>
