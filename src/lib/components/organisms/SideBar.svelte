<script lang="ts">
	import { NavBrand } from "flowbite-svelte";
	import ChartSimpleSolid from "svelte-awesome-icons/ChartSimpleSolid.svelte";
	import FolderClosedSolid from "svelte-awesome-icons/FolderClosedSolid.svelte";
	import FolderOpenSolid from "svelte-awesome-icons/FolderOpenSolid.svelte";
	import GearSolid from "svelte-awesome-icons/GearSolid.svelte";

	import AvatarProfileMenu from "./AvatarProfileMenu.svelte";
	import CollectionSideBar from "./CollectionSideBar.svelte";
	import LinkItem from "../atoms/LinkItem.svelte";
	import Logo from "../atoms/Logo.svelte";
	import AddCollectionButton from "../molecules/AddCollectionButton.svelte";
	import type { Drag } from "~/lib/stores/SelectedGroup";
	import type { CollectionGroups } from "~/lib/types/components";

	// TODO: simplify
	export let nickname: string;
	export let email: string;
	export let avatar: string;
	export let mainPageLink: string;
	export let currentPath: string;
	export let collections: CollectionGroups;
	export let showCollections = true;
	export let showAddGroupForm = false;
	export let drag: Drag;
</script>

<div class="min-h-screen flex-col bg-white px-4 py-4 font-bold dark:bg-gray-900">
	<div class="flex-1 py-4">
		<NavBrand href={mainPageLink}>
			<Logo />
		</NavBrand>
		<div class="flex flex-row">
			<AvatarProfileMenu {avatar} {nickname} {email} />
			<AddCollectionButton bind:showAddGroupForm />
		</div>
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
					}}
					name="Collections"
					iconComponent={showCollections ? FolderOpenSolid : FolderClosedSolid} />

				{#if showCollections}
					<div class="ml-7">
						<CollectionSideBar
							{drag}
							bind:showAddGroupForm
							{currentPath}
							{collections} />
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
