<script lang="ts" context="module">
	export interface LinkItemsA {
		icon: typeof SvelteComponent;
		link: string;
		name: string;
	}
</script>

<script lang="ts">
	import type { SvelteComponent } from "svelte";

	import SideBarItem from "../atoms/LinkItem.svelte";

	export let currentPath: string;
	export let links: LinkItemsA[];
</script>

<nav class="-mx-2 md:mt-8">
	<ul class="space-y-3 pt-2 text-base">
		{#each links as item}
			<li>
				<SideBarItem
					isActive={currentPath === item.link}
					name={item.name}
					iconComponent={item.icon}
					link={item.link} />
			</li>
		{/each}
	</ul>
</nav>
