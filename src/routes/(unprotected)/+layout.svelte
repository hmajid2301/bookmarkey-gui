<script lang="ts">
	import { page } from "$app/stores";

	import Footer from "~/lib/components/molecules/Footer.svelte";
	import NavBar from "~/lib/components/organisms/NavBar.svelte";
</script>

<div>
	<NavBar currentPath={$page.url.pathname} />
	<div class="h-full">
		<slot />
	</div>
	<Footer />
</div>
