<script lang="ts">
	import { NavBrand } from "flowbite-svelte";

	import AvatarProfileMenu from "./AvatarProfileMenu.svelte";
	import Groups from "./Groups.svelte";
	import Logo from "../atoms/Logo.svelte";
	import AddCollectionButton from "../molecules/AddCollectionButton.svelte";
	import InstallPrompt from "../molecules/InstallPrompt.svelte";
	import type { CollectionGroups, User } from "~/lib/types/components";

	interface BeforeInstallPromptEvent extends Event {
		prompt: () => Promise<void>;
		readonly userChoice: Promise<{
			outcome: "accepted" | "dismissed";
			platform: string;
		}>;
	}

	async function showInstallPrompt(e: Event) {
		deferredPrompt = e as BeforeInstallPromptEvent;
		showInstall = true;
	}

	export let user: User;
	export let currentPath: string;
	export let collections: CollectionGroups;
	export let width = 16;
	const initialWidth = 16;
	const maxWidth = 50;

	let showAddGroupForm = false;
	let deferredPrompt: BeforeInstallPromptEvent | null;
	let showInstall = false;
</script>

<svelte:window on:beforeinstallprompt|preventDefault={showInstallPrompt} />

<div
	style={`width: ${width}px !important; min-width: ${initialWidth}rem; max-width: ${maxWidth}rem`}
	class="fixed min-h-screen flex-1 bg-white px-1 py-4 pl-2 font-bold dark:bg-gray-900">
	<NavBrand href="/my/collections/0">
		<Logo />
	</NavBrand>
	<div class="flex flex-row">
		<AvatarProfileMenu
			avatar={user.avatar || ""}
			nickname={user.nickname || ""}
			email={user.email || ""} />
		<AddCollectionButton bind:showAddGroupForm />
	</div>

	<Groups bind:showAddGroupForm {currentPath} {collections} />
	<InstallPrompt
		bind:showInstall
		on:click={async () => {
			showInstall = false;
			await deferredPrompt?.prompt();
			await deferredPrompt?.userChoice;
			deferredPrompt = null;
		}} />
</div>
