<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-nocheck caused by https://github.com/maciekgrzybek/svelte-inview/issues/37
	export let type: string;
	export let name: string;
	export let value: string | undefined = "";
	export let extraClasses = "";
	export let placeholder: string | null = null;
	export let autocomplete: string | null = null;
	export let accept: string | null = null;
	export let ref: HTMLInputElement | undefined = undefined;
	export let required = true;
	export let disabled = false;
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
