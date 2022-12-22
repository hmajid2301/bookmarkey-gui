<script lang="ts">
	import { page } from '$app/stores';
	import MenuLinks from '~/lib/components/molecules/menu_links.svelte';
	import ProfileLink from '~/lib/components/molecules/profile_link.svelte';

	export let nickname: string;
	export let avatar: string;
</script>

<div
	id="menu"
	class="w-54 sticky top-0 z-10 hidden h-screen flex-col bg-white px-4 py-4 shadow-inner dark:bg-gray-900 lg:flex lg:px-6 lg:py-6 xl:w-64 xl:px-8 2xl:w-80">
	<MenuLinks currentPath={$page.url.pathname} />
	<ProfileLink {nickname} {avatar} />
</div>
