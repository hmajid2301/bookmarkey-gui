<script lang="ts">
	import { LockSolid } from "svelte-awesome-icons";

	import FormField from "./FormField.svelte";

	export let autocomplete = "current-password";
	export let name = "password";
	export let value: string | undefined;
	export let labelName = "Password";
	export let errors: string[] | undefined;
	export let note = "Required. Your password";
	export let placeholder = "Your password";
	export let disabled = false;
	let show = false;
</script>

<div class="relative mb-6 w-full last:mb-0">
	<FormField
		{placeholder}
		type={show ? "text" : "password"}
		{autocomplete}
		{name}
		{value}
		on:input
		{disabled}
		{labelName}
		{errors}
		{note}>
		<span
			class=" pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center {errors
				? 'text-red-500'
				: 'text-slate-500 dark:text-slate-400'}">
			<LockSolid class="inline-block h-4 w-4" />
		</span>
		<div class="absolute inset-y-0 right-0 flex items-center px-2">
			<input class="hidden" type="checkbox" tabindex="-1" />
			<button
				type="button"
				tabindex="-1"
				class="cursor-pointer rounded bg-gray-300 px-2 py-1 font-mono text-sm text-gray-600 hover:bg-gray-400 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-gray-700"
				on:click={() => {
					show = !show;
				}}>
				{show ? "hide" : "show"}
			</button>
		</div>
	</FormField>
</div>
