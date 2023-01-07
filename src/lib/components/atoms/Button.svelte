<script lang="ts">
	export let type: "button" | "submit" | "reset" | null | undefined = "button";
	export let extraClasses = "";
	export let btnClass =
		"inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded border border-blue-600 bg-blue-600 px-1 py-1 font-semibold text-white ring-blue-300 transition-colors duration-150 last:mr-0 hover:border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring dark:border-blue-500 dark:bg-blue-500 dark:ring-blue-700 hover:dark:border-blue-600 hover:dark:bg-blue-600 lg:px-2 lg:py-2";
</script>

<button class={`${btnClass} ${extraClasses}`} {type} on:click>
	<slot />
</button>
