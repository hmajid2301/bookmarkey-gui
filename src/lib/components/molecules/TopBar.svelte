<script lang="ts">
	import { tick } from "svelte";
	import FolderClosedSolid from "svelte-awesome-icons/FolderClosedSolid.svelte";
	import MagnifyingGlassSolid from "svelte-awesome-icons/MagnifyingGlassSolid.svelte";

	import Button from "~/lib/components/atoms/Button.svelte";
	import HelloBar from "~/lib/components/atoms/HelloBar.svelte";
	import FormField from "~/lib/components/molecules/FormField.svelte";

	export let collectionName: string;
	export let nickname: string;
	export let ref: HTMLInputElement;
	export let show = false;
</script>

<div class="flex flex-row">
	<HelloBar {nickname} />

	<FormField type="text" labelName="" placeholder="Search" name="search">
		<span
			class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-slate-500 dark:text-slate-400">
			<MagnifyingGlassSolid class="inline-block h-4 w-4" />
		</span>
	</FormField>
</div>

<div class="my-2 mt-5 flex justify-between">
	<div class="flex space-x-5 text-blue-800 dark:text-blue-100">
		<FolderClosedSolid class="text-blue-800 dark:text-blue-100" />
		<p class="font-bold">{collectionName}</p>
	</div>

	<div>
		<Button
			on:click={async () => {
				show = true;
				await tick();
				ref?.focus();
			}}>
			Add
		</Button>
	</div>
</div>
