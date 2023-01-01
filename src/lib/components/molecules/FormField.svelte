<script lang="ts">
	export let type: string;
	export let name: string;
	export let onChange: ((event: Event) => void) | null = null;
	export let placeholder: string | null = null;
	export let autocomplete: string | null = null;
	export let labelName: string;
	export let required = true;
	export let value: string | undefined = "";
	export let note: string | null = null;
	export let disabled = false;
	export let errors: string[] | undefined;
	if (errors?.length === 0) {
		errors = undefined;
	}
</script>

<div class="mb-6 last:mb-0">
	<label for={name} class="mb-2 block font-bold {errors ? 'text-red-600' : ''}">
		{labelName}
	</label>

	<div class="">
		<div class="relative">
			<input
				on:input={onChange}
				id={name}
				{autocomplete}
				{name}
				{required}
				{type}
				{placeholder}
				{value}
				{disabled}
				class="h-12 w-full max-w-full rounded border {errors
					? 'border-red-500 focus:ring-red-900'
					: 'border-gray-300'} bg-white px-3 py-2 pl-10  focus:ring dark:border-gray-700 dark:bg-slate-800 dark:placeholder-gray-400 {errors
					? 'text-red-600'
					: ''}" />
			<slot />
		</div>
	</div>

	{#if note}
		<div class="mt-1 py-1 text-xs font-semibold text-gray-500 dark:text-slate-400">
			{note}
		</div>
	{/if}

	{#if errors}
		<p class="mt-1 py-2 text-sm text-red-500">{errors[0]}</p>
	{/if}
</div>
