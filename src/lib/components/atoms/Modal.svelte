<script lang="ts">
	import { clickoutside } from "@svelte-put/clickoutside";
	import XmarkSolid from "svelte-awesome-icons/XmarkSolid.svelte";

	export let show: boolean;
	export let title: string | undefined = undefined;

	function hideModal() {
		show = false;
	}
</script>

<div
	tabindex="-1"
	class="{show
		? 'fixed'
		: 'hidden'} top-0 right-0 left-0 z-50 flex h-modal w-full items-center justify-center overflow-hidden bg-opacity-50 dark:bg-slate-800 dark:bg-opacity-80 md:inset-0 md:h-full"
	aria-modal="true"
	role="dialog">
	<div class="flex h-auto w-full max-w-2xl p-4" use:clickoutside on:clickoutside={hideModal}>
		<div
			class="relative flex h-full w-full flex-col rounded-lg border-gray-200 bg-white text-gray-500 shadow-md dark:border-gray-700  dark:bg-slate-900 dark:text-gray-400 md:h-auto">
			<div class="flex items-center justify-between rounded-t  p-4">
				<h3 class="p-0 text-xl font-semibold text-gray-900 dark:text-white">
					{title}
				</h3>
				<button
					class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-white bg-white p-1 text-black ring-gray-200 transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus:ring dark:border-slate-900 dark:bg-slate-900 dark:text-white dark:ring-gray-500 hover:dark:bg-slate-800"
					type="button"
					on:click={hideModal}>
					<span class="inline-flex h-6 w-6 items-center justify-center">
						<XmarkSolid />
					</span>
				</button>
			</div>
			<div id="modal" class="flex-1 space-y-6 overflow-y-auto overscroll-contain p-6">
				<slot />
			</div>
		</div>
	</div>
</div>
