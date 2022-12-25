<script lang="ts">
	import Input from '~/lib/components/atoms/Input.svelte';

	export let name = 'password';
	export let value: string | undefined;
	export let labelName = 'Password';
	export let errors: string[] | undefined;
	export let note = 'Required. Your password';
	export let placeholder = 'Your password';
	export let disabled = false;
	let show = false;
</script>

<div class="relative mb-6 w-full last:mb-0">
	<Input
		{placeholder}
		type={show ? 'text' : 'password'}
		{name}
		{value}
		{disabled}
		{labelName}
		{errors}
		{note}>
		<span
			class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-gray-500 dark:text-slate-400">
			<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
				<path
					fill="currentColor"
					d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z" />
			</svg>
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
				{show ? 'hide' : 'show'}
			</button>
		</div>
	</Input>
</div>
