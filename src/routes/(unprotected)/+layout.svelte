<script lang="ts">
	import Footer from '~/routes/(unprotected)/components/footer.svelte';
	import Navbar from '~/routes/(unprotected)/components/navbar.svelte';
</script>

<div>
	<Navbar />
	<div class="h-screen">
		<slot />
	</div>
	<Footer />
</div>
