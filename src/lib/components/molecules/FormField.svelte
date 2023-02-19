<script lang="ts">
	import ErrorText from "../atoms/ErrorText.svelte";
	import Input from "../atoms/Input.svelte";
	import Label from "../atoms/Label.svelte";
	import Note from "../atoms/Note.svelte";

	export let type: string;
	export let name: string;
	export let placeholder: string | null = null;
	export let autocomplete: string | null = null;
	export let labelName: string;
	export let required = true;
	export let value: string | undefined = "";
	export let note: string | null = null;
	export let disabled = false;
	export let errors: string[] | undefined = [];
	export let ref: HTMLInputElement | undefined = undefined;

	// TODO: remove this logic
	if (errors?.length === 0) {
		errors = undefined;
	}
</script>

<div class="mb-6 last:mb-0">
	<Label {labelName} {name} extraClasses={errors ? "text-red-600" : ""} />

	<div class="relative">
		<Input
			bind:ref
			on:change
			on:change
			on:blur
			{autocomplete}
			{name}
			{required}
			{type}
			{placeholder}
			{value}
			{disabled}
			extraClasses={errors
				? "border-red-500 text-red-500 focus:ring-red-900"
				: "border-gray-300"} />
		<slot />
	</div>

	{#if note}
		<Note>{note}</Note>
	{/if}

	{#if errors}
		<ErrorText>{errors[0]}</ErrorText>
	{/if}
</div>
