<script lang="ts">
	import Icon from "@iconify/svelte";
	import ContextMenu, { Item } from "svelte-contextmenu";

	import Avatar from "~/lib/components/atoms/Avatar.svelte";

	let contextMenu: ContextMenu;
	export let nickname: string;
	export let avatar: string;
	export let email: string;
</script>

<button
	aria-label="avatar"
	on:click={contextMenu.createHandler()}
	class="max-h-screen-menu static my-1 flex w-full bg-slate-100 dark:bg-slate-800 lg:overflow-y-visible">
	<div
		class="relative flex cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400">
		<div
			class="flex items-center bg-gray-100 bg-transparent dark:bg-slate-800 dark:bg-transparent">
			<div class="mr-3 inline-flex h-6 w-6">
				<Avatar {avatar} {nickname} {email} />
			</div>
		</div>
		<p class="flex w-32 flex-row truncate text-xs">
			{nickname}
		</p>
		<Icon icon="fa6-solid:caret-down" />
		<ContextMenu bind:this={contextMenu}>
			<Item href="/my/collections/0">
				<Icon icon="fa6-solid:bookmark" />
				Bookmarks
			</Item>
			<Item href="/my/settings">
				<Icon icon="fa6-solid:gear" />
				Settings
			</Item>
			<Item href="/logout">
				<Icon icon="fa6-solid:arrow-right-from-bracket" />
				Log Out
			</Item>
		</ContextMenu>
	</div>
</button>
