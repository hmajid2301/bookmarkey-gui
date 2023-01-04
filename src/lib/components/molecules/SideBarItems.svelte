<script lang="ts" context="module">
	export interface MenuItem {
		icon: typeof SvelteComponent;
		link: string;
		name: string;
	}
</script>

<script lang="ts">
	import { NavBrand } from "flowbite-svelte";
	import type { SvelteComponent } from "svelte";

	import SideBarItem from "../atoms/SideBarItem.svelte";
	import Logo from "~/lib/components/atoms/Logo.svelte";

	export let mainPageLink: string;
	export let currentPath: string;
	export let menuItems: MenuItem[];
</script>

<div class="flex-1 py-4">
	<NavBrand href={mainPageLink}>
		<Logo />
	</NavBrand>

	<nav class="-mx-2 md:mt-8">
		<ul class="space-y-3 pt-2 text-base">
			{#each menuItems as item}
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
</div>
