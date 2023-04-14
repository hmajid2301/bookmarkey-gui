<script lang="ts">
	import Avatar from "@svelte-put/avatar/Avatar.svelte";
	import { clickoutside } from "@svelte-put/clickoutside";
	import FolderPlus from "svelte-awesome-icons/FolderPlusSolid.svelte";
	import ShareSolid from "svelte-awesome-icons/ShareSolid.svelte";
	import TrashSolid from "svelte-awesome-icons/TrashSolid.svelte";
	import ContextMenu, { Item } from "svelte-contextmenu";
	import Device from "svelte-device-info";
	import { swipe } from "svelte-gestures";

	import Button from "../atoms/Button.svelte";
	import { API } from "~/lib/api/client";
	import type { Bookmark } from "~/lib/types/components";

	export let bookmark: Bookmark;

	let contextMenu: ContextMenu;
	const api = new API();
	let showButtons = false;

	function onSwipe(
		event: CustomEvent<{
			direction: "top" | "right" | "bottom" | "left";
			target: EventTarget;
		}>
	) {
		if (!Device.isMobile) {
			return;
		}

		const direction = event.detail.direction;
		if (direction === "left") {
			showButtons = true;
		} else if (direction === "right") {
			showButtons = false;
		}
	}

	async function deleteBookmark() {
		await api.deleteBookmark(bookmark.id);
	}
</script>

<div
	class="flex flex-grow"
	use:swipe={{ timeframe: 300, minSwipeDistance: 10, touchAction: "pan-y" }}
	on:swipe|stopPropagation|preventDefault={onSwipe}
	use:clickoutside
	on:clickoutside={() => {
		showButtons = false;
	}}>
	<a
		on:contextmenu={showButtons ? contextMenu.createHandler() : undefined}
		href={bookmark.url}
		target="_blank"
		rel="noreferrer"
		class="mb-6 flex w-full flex-grow flex-col rounded-2xl bg-white transition-all duration-200 last:mb-0 hover:bg-slate-300 hover:shadow-lg dark:bg-slate-900/70 dark:hover:bg-slate-700">
		<div class="flex-1 p-6">
			<div class="block items-center justify-between md:flex">
				<div class="mb-6 flex items-center justify-center md:mb-0">
					<div class="block items-center justify-start md:flex">
						<div class="mb-6 flex items-center justify-center md:mb-0">
							<div class="w-40 md:mr-6">
								<Avatar
									src={bookmark.image}
									uiAvatar={bookmark.url}
									alt="Bookmark Image {bookmark.url}"
									class="block h-auto w-full max-w-xs rounded-md bg-gray-100 dark:bg-slate-800" />
							</div>
						</div>
						<div class="flex items-center justify-center">
							<div class="text-center md:text-left">
								<h4 class="text-xl">{bookmark.title}</h4>
								<p class="my-2 text-sm text-gray-300">{bookmark.description}</p>
								<p class="text-gray-500">{bookmark.createdAt}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</a>
	{#if showButtons}
		<Button extraClasses="mr-0 bg-gray-500"><ShareSolid /></Button>
		<Button extraClasses="mr-0 bg-green-600"><FolderPlus /></Button>
		<Button extraClasses="mr-0 bg-red-700" on:click={deleteBookmark}>
			<TrashSolid />
		</Button>
	{/if}
	<ContextMenu bind:this={contextMenu}>
		<Item on:click={deleteBookmark}>Delete Bookmark</Item>
	</ContextMenu>
</div>
