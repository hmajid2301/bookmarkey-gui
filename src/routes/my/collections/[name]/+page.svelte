<script lang="ts">
	import type { PageServerLoad } from "./$types";

	export let data: PageServerLoad;
</script>

<p>Hello {data.name}</p>
