<script lang="ts">
	import { page } from '$app/stores';
	import MenuLinks from '~/lib/components/molecules/MenuLinks.svelte';
</script>

<div class="min-h-screen flex-col bg-white px-4 py-4 dark:bg-gray-900">
	<MenuLinks currentPath={$page.url.pathname} />
</div>
