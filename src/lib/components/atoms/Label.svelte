<script lang="ts">
	export let name: string;
	export let labelName: string;
	export let extraClasses = "";
</script>

<label for={name} class="mb-2 block font-bold {extraClasses}">
	{labelName}
</label>
