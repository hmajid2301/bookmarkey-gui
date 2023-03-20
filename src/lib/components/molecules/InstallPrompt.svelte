<script lang="ts">
	import { NavBrand } from "flowbite-svelte";

	import Button from "../atoms/Button.svelte";
	import Logo from "../atoms/Logo.svelte";

	export let showInstall = false;
</script>

{#if showInstall}
	<div class="my-8 flex flex-col rounded-2xl bg-white dark:bg-slate-800">
		<div class="flex-1 p-6">
			<NavBrand>
				<Logo />
			</NavBrand>

			<p class="my-4 font-semibold leading-tight">
				Make managing your bookmarks easier with our free app!
			</p>
			<div class="flex flex-row justify-between">
				<button
					on:click={() => {
						showInstall = false;
					}}
					class="text-blue-300 opacity-80 hover:text-blue-500">
					Not now
				</button>
				<Button on:click>Install</Button>
			</div>
		</div>
	</div>
{/if}
