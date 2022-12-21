<script lang="ts">
	export let type: string;
	export let name: string;
	export let placeholder: string | null = null;
	export let labelName: string;
	export let required = true;
	export let value: string | undefined;
	export let note: string | null = null;

	if (value === undefined) {
		value = '';
	}

	export let errors: string[] | undefined;
</script>

<div class="mb-6 last:mb-0">
	<label for={name} class="mb-2 block font-bold {errors && 'text-red-600'}">{labelName}</label>
	<div class="">
		<div class="relative">
			<input
				{name}
				{required}
				{type}
				{placeholder}
				{value}
				class="h-12 w-full max-w-full rounded border border-gray-700 bg-white px-3 py-2 pl-10 focus:outline-none focus:ring dark:bg-slate-800 dark:placeholder-gray-400 {errors &&
					'text-red-600'}" />
			<slot />
		</div>
	</div>

	{#if note}
		<div class="mt-1 text-xs font-semibold text-gray-500 dark:text-slate-400">
			{note}
		</div>
	{/if}

	{#if errors}
		<p class="mt-1 text-sm text-red-500 dark:text-gray-300" id="file_input_help">{errors[0]}</p>
	{/if}
</div>
