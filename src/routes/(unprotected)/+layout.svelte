<script lang="ts">
	import Footer from '~/routes/(unprotected)/_components/footer.svelte';
	import Navbar from '~/routes/(unprotected)/_components/navbar.svelte';
</script>

<div>
	<Navbar />
	<div class="h-screen">
		<slot />
	</div>
	<Footer />
</div>
