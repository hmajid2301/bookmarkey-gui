<script lang="ts">
	export let type: string;
	export let name: string;
	export let placeholder: string | null = null;
	export let autocomplete: string | null = null;
	export let accept: string | null = null;
	export let required = true;
	export let value: string | undefined = "";
	export let disabled = false;
	export let extraClasses = "";
	export let ref: HTMLInputElement | undefined = undefined;
	export let inputClass =
		"h-12 w-full max-w-full rounded border bg-white px-3 py-2 pl-10 focus:ring dark:border-gray-700 dark:bg-slate-800 dark:placeholder-gray-400 {extraClasses}";
</script>

<input
	bind:this={ref}
	on:input
	on:change
	on:blur
	id={name}
	{accept}
	{autocomplete}
	{name}
	{required}
	{type}
	{placeholder}
	{value}
	{disabled}
	class={`${inputClass} ${extraClasses}`} />
