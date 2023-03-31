<script lang="ts">
	import Button from "~/lib/components/atoms/Button.svelte";
</script>

<Button on:click type="submit" extraClasses="py-2 my-2 w-full">
	<slot />
</Button>
