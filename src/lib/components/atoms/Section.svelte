<script lang="ts">
	export let extraClasses = "";
</script>

<div
	class="flex flex-col rounded-2xl border-slate-100 bg-white  dark:bg-slate-900/70 {extraClasses}">
	<slot />
</div>
