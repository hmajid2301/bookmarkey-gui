<script lang="ts">
	import Icon from "@iconify/svelte";

	export let check: boolean;
	export let errorText: string;
	export let successText: string;
</script>

<li class="flex">
	<div class="rounded-full fill-current text-sm font-medium">
		{#if check}
			<span class="mr-2 inline-flex text-green-700 dark:text-green-500">
				<Icon icon="fa-solid:check-circle" />
				{successText}
			</span>
		{:else}
			<span class="mr-2 inline-flex text-red-700 dark:text-red-500">
				<Icon icon="fa6-solid:circle-xmark" />
				{errorText}
			</span>
		{/if}
	</div>
</li>
