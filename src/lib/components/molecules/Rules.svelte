<script lang="ts" context="module">
	export interface RuleData {
		check: boolean;
		successText: string;
		errorText: string;
	}
</script>

<script lang="ts">
	import Rule from "../atoms/Rule.svelte";

	export let rules: RuleData[];
</script>

<div class="flex justify-start py-1">
	<ul>
		{#each rules as rule}
			<Rule check={rule.check} errorText={rule.errorText} successText={rule.successText} />
		{/each}
	</ul>
</div>
