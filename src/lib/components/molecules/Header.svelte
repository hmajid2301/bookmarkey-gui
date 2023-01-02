<script lang="ts">
	import { BarsSolid } from "svelte-awesome-icons";

	import Button from "../atoms/Button.svelte";

	export let showMenu = false;
</script>

<header class="text-semibold flex items-center bg-gray-900 p-4 text-gray-100 lg:hidden">
	<Button
		btnClass="mr-4 p-1"
		on:click={() => {
			showMenu = !showMenu;
		}}>
		<BarsSolid />
	</Button>
</header>
