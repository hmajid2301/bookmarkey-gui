<script lang="ts">
	import Input from '~/lib/components/atoms/input.svelte';

	export let name = 'email';
	export let labelName = 'Email';
	export let placeholder = 'your@email.com';
	export let note = 'Required. Your email';
	export let value: string | undefined;
	export let errors: string[] | undefined;
	export let disabled = false;
</script>

<Input
	type="email"
	{name}
	{disabled}
	{labelName}
	required={true}
	{placeholder}
	{note}
	{value}
	{errors}>
	<span
		class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-gray-500 dark:text-slate-400">
		<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
			<path
				fill="currentColor"
				d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M17,17H7V15H17M17,13H7V11H17M20,9H17V6H20" />
		</svg>
	</span>
</Input>
