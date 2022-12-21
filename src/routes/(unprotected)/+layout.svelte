<script lang="ts">
	import Footer from '~/routes/(unprotected)/components/organisms/footer.svelte';
	import Navbar from '~/routes/(unprotected)/components/organisms/navbar.svelte';
</script>

<div>
	<Navbar />
	<div class="h-screen">
		<slot />
	</div>
	<Footer />
</div>
