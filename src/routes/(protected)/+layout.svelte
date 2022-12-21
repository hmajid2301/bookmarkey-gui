<script lang="ts">
	import type { LayoutData } from './$types';

	import MobileBar from '~/routes/(protected)/components/molecules/mobile_bar.svelte';
	import SideBar from '~/routes/(protected)/components/organisms/side_bar.svelte';
	import Topbar from '~/routes/(protected)/components/organisms/topbar.svelte';

	export let data: LayoutData;
</script>

<div
	class="flex min-h-screen flex-col text-base font-semibold text-blue-900 subpixel-antialiased dark:text-blue-100 lg:flex-row">
	<MobileBar nickname={data.user.nickname} avatar={data.user.avatar} />
	<SideBar nickname={data.user.nickname} avatar={data.user.avatar} />

	<div
		class="flex flex-1 flex-col overflow-hidden bg-blue-50  px-4 py-4 dark:bg-gray-800 lg:py-8 lg:px-6 xl:px-8">
		<Topbar nickname={data.user.nickname} />
		<slot />
	</div>
</div>
