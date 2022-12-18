<script lang="ts">
	import { Helper, Input, Label } from 'flowbite-svelte';
	import type { InputType } from 'flowbite-svelte/types';

	export let type: InputType;
	export let name: string;
	export let placeholder: string;
	export let labelName: string;
	export let required = false;
	export let value: string | undefined;

	export let errors: string[] | undefined;
	const color = errors ? 'red' : undefined;
</script>

<div>
	<Label for={name} {color} class="mb-2 block">{labelName}</Label>
	<Input {value} {name} {type} {color} {placeholder} {required} />

	{#if errors}
		<Helper class="mt-2" color="red">
			{errors[0]}
		</Helper>
	{/if}
</div>
