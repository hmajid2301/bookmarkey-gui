<script lang="ts">
	import Footer from "~/lib/components/molecules/Footer.svelte";
	import NavBar from "~/lib/components/organisms/NavBar.svelte";
</script>

<div>
	<NavBar />
	<div class="h-full">
		<slot />
	</div>
	<Footer />
</div>
