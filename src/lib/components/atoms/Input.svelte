<script lang="ts">
	export let onChange: ((event: Event) => void) | undefined = undefined;
	export let type: string;
	export let name: string;
	export let placeholder: string | null = null;
	export let required = true;
	export let value: string | undefined = '';
	export let disabled = false;
	export let labelName: string;
	export let error = false;
	export let accept: string | null = null;
	export let classes = `${
		error ? 'text-red-600' : ''
	} h-12 w-full max-w-full rounded border border-gray-300 bg-white px-3 py-2 pl-10 focus:outline-none focus:ring dark:border-gray-700 dark:bg-slate-800 dark:placeholder-gray-400`;
</script>

<label for={name} class="mb-2 block font-bold {error ? 'text-red-600' : ''}">{labelName}</label>
<input
	on:change={onChange}
	id={name}
	{accept}
	{name}
	{required}
	{type}
	{placeholder}
	{value}
	{disabled}
	class={classes} />
