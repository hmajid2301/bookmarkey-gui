<script lang="ts">
	import { NavBrand } from "flowbite-svelte";
	import {
		ChartSimpleSolid,
		FolderClosedSolid,
		FolderOpenSolid,
		GearSolid
	} from "svelte-awesome-icons";

	import LinkItem from "../atoms/LinkItem.svelte";
	import Logo from "../atoms/Logo.svelte";
	import CollectionSideBar from "./CollectionSideBar.svelte";
	import type { CollectionGroups } from "~/routes/my/+layout.server";

	export let mainPageLink: string;
	export let currentPath: string;
	export let collections: CollectionGroups;
	export let collectionIcon = FolderOpenSolid;
	export let showCollections = true;
</script>

<div class="min-h-screen flex-col bg-white px-4 py-4 font-bold dark:bg-gray-900">
	<div class="flex-1 py-4">
		<NavBrand href={mainPageLink}>
			<Logo />
		</NavBrand>
		<ul class="space-y-3 pt-2 text-base">
			<li>
				<LinkItem
					isActive={currentPath === "/my/dashboard"}
					link="/my/dashboard"
					name="Dashboard"
					iconComponent={ChartSimpleSolid} />
			</li>
			<li>
				<LinkItem
					isActive={currentPath.startsWith("/my/collection")}
					link="#"
					on:click={() => {
						showCollections = !showCollections;
						collectionIcon = showCollections ? FolderOpenSolid : FolderClosedSolid;
					}}
					name="Collections"
					iconComponent={collectionIcon} />

				{#if showCollections}
					<div class="ml-7">
						<CollectionSideBar {currentPath} {collections} />
					</div>
				{/if}
			</li>
			<li>
				<LinkItem
					isActive={currentPath === "/my/settings"}
					link="/my/settings"
					name="Settings"
					iconComponent={GearSolid} />
			</li>
		</ul>
	</div>
</div>
