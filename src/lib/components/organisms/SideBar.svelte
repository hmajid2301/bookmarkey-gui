<script lang="ts">
	import { NavBrand } from "flowbite-svelte";

	import AvatarProfileMenu from "./AvatarProfileMenu.svelte";
	import CollectionSideBar from "./CollectionSideBar.svelte";
	import Logo from "../atoms/Logo.svelte";
	import AddCollectionButton from "../molecules/AddCollectionButton.svelte";
	import type { CollectionGroups, User } from "~/lib/types/components";

	export let user: User;
	export let currentPath: string;
	export let collections: CollectionGroups;

	let showAddGroupForm = false;
</script>

<div class="min-h-screen flex-1 bg-white px-1 py-4 pl-2 font-bold dark:bg-gray-900">
	<NavBrand href="/my/dashboard">
		<Logo />
	</NavBrand>
	<div class="flex flex-row">
		<AvatarProfileMenu
			avatar={user.avatar || ""}
			nickname={user.nickname || ""}
			email={user.email || ""} />
		<AddCollectionButton bind:showAddGroupForm />
	</div>

	<CollectionSideBar bind:showAddGroupForm {currentPath} {collections} />
</div>
