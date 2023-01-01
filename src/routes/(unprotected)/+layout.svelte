<script lang="ts">
	import Footer from "~/routes/(unprotected)/components/Footer.svelte";
	import Navbar from "~/routes/(unprotected)/components/NavBar.svelte";
</script>

<div>
	<Navbar />
	<div class="h-full">
		<slot />
	</div>
	<Footer />
</div>
