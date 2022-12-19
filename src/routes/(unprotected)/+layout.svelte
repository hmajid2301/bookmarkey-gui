<script lang="ts">
	import Navbar from '~/lib/components/organisms/navbar.svelte';
	import Footer from '~/lib/components/organisms/footer.svelte';
</script>

<div>
	<Navbar />
	<div class="h-screen">
		<slot />
	</div>
	<Footer />
</div>
