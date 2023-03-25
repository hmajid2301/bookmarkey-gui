<script lang="ts">
	// TODO: fix this dynamic
	export let type = "text";
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

	let inputEl: HTMLInputElement;
	function setType(el: HTMLInputElement) {
		el.type = type;
		inputEl = el;
	}

	$: {
		if (inputEl && type != inputEl.type) {
			setType(inputEl);
		}
	}
</script>

<input
	use:setType
	bind:this={ref}
	on:input
	on:change
	on:blur
	id={name}
	{accept}
	{autocomplete}
	{name}
	{required}
	{placeholder}
	bind:value
	{disabled}
	class={`${inputClass} ${extraClasses}`} />
