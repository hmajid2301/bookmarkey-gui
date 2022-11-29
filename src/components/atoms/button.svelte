<script lang="ts">
	export let type = 'submit';
</script>

<button
	{type}
	class="my-1 w-full rounded bg-blue-500 py-3 text-center text-white hover:bg-blue-600 focus:outline-none"
>
	<slot />
</button>
