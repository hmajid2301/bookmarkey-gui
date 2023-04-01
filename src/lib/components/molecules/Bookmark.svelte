<script lang="ts">
	import Avatar from "@svelte-put/avatar/Avatar.svelte";
	import ContextMenu, { Item } from "svelte-contextmenu";

	import { API } from "~/lib/pocketbase/frontend";
	import type { Bookmark } from "~/lib/types/components";

	export let bookmark: Bookmark;

	let contextMenu: ContextMenu;
	const api = new API();
</script>

<a
	on:contextmenu={contextMenu.createHandler()}
	href={bookmark.url}
	target="_blank"
	rel="noreferrer"
	class="mb-6 flex flex-col rounded-2xl bg-white transition-all duration-200 last:mb-0 hover:bg-slate-300 hover:shadow-lg dark:bg-slate-900/70 dark:hover:bg-slate-700">
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

<ContextMenu bind:this={contextMenu}>
	<Item
		on:click={async () => {
			await api.deleteBookmark(bookmark.id);
		}}>
		Delete Bookmark
	</Item>
</ContextMenu>
