<script lang="ts">
	import Input from '../atoms/Input.svelte';

	export let type: string;
	export let name: string;
	export let placeholder: string | null = null;
	export let labelName: string;
	export let required = true;
	export let value: string | undefined = '';
	export let note: string | null = null;
	export let disabled = false;

	export let errors: string[] | undefined = [];
</script>

<div class="mb-6 last:mb-0">
	<div class="relative">
		<Input {name} {required} {type} {placeholder} {value} {disabled} {labelName} />
		<slot />
	</div>
	{#if note}
		<div class="mt-1 text-xs font-semibold text-gray-500 dark:text-slate-400">
			{note}
		</div>
	{/if}

	{#if errors}
		<p class="mt-1 text-sm text-red-500 dark:text-gray-300">{errors[0]}</p>
	{/if}
</div>
