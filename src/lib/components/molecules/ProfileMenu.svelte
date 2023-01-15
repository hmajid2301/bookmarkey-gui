<script lang="ts" context="module">
	import type { SvelteComponent } from "svelte";

	export interface ProfileMenuItem {
		icon: typeof SvelteComponent;
		link: string;
		name: string;
	}
</script>

<script lang="ts">
	import ContextMenu from "./ContextMenu.svelte";

	export let nickname: string;
	export let email: string;
	export let showMenu = false;
	export let menuItems: ProfileMenuItem[];
</script>

<ContextMenu {menuItems} {showMenu}>
	<div class="relative block flex-col items-start py-2 px-3  text-black  dark:text-white lg:flex">
		<div class="flex">
			<span class="px-2 transition-colors">{nickname}</span>
		</div>
		<div class="flex">
			<span class="px-2 text-gray-500 transition-colors dark:text-gray-400">
				{email}
			</span>
		</div>
	</div>
	<hr class="hidden border-t border-gray-100 dark:border-slate-700 lg:my-0.5 lg:block" />
</ContextMenu>
