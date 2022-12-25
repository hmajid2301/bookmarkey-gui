<script>
	import Section from '~/lib/components/atoms/Section.svelte';
</script>

<section class="">
	<div
		class="mx-auto flex w-full flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
		<Section extraClasses="md:w-2/3 lg:w-1/3 w-full">
			<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
				<slot />
			</div>
		</Section>
	</div>
</section>
