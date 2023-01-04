<script lang="ts">
	import { CircleCheckSolid, CircleXmarkSolid } from "svelte-awesome-icons";

	export let check: boolean;
	export let errorText: string;
	export let successText: string;
</script>

<li class="flex">
	<div class="rounded-full fill-current text-sm font-medium">
		{#if check}
			<span class="text-green-700 dark:text-green-500">
				<CircleCheckSolid class="mr-2 inline-flex" />
				{successText}
			</span>
		{:else}
			<span class="text-red-700 dark:text-red-500">
				<CircleXmarkSolid class="mr-2 inline-flex" />
				{errorText}
			</span>
		{/if}
	</div>
</li>
