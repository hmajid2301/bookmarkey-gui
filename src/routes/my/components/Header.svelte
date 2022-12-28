<script lang="ts">
	export let showMenu = false;
</script>

<header class="text-semibold flex items-center bg-gray-900 p-4 text-gray-100 lg:hidden">
	<button
		class="mr-4 p-1"
		on:click={() => {
			showMenu = !showMenu;
		}}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="h-6 w-6">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>
</header>
