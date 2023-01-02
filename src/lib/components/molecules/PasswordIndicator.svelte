<script lang="ts" context="module">
	export interface PasswordIndicatorItem {
		color: string;
		note: string;
	}
</script>

<script lang="ts">
	export let passwordScore: number;
	export let passwordScoreItem: PasswordIndicatorItem | undefined;
</script>

<div class="flex w-full">
	<span
		class="h-1 w-1/3 rounded {passwordScore >= 0 ? passwordScoreItem?.color : 'bg-gray-200'}" />
	<span
		class="mx-3 h-1 w-1/3 rounded {passwordScore >= 1
			? passwordScoreItem?.color
			: 'bg-gray-200'}" />
	<span
		class="h-1 w-1/3 rounded {passwordScore >= 2 ? passwordScoreItem?.color : 'bg-gray-200'}" />
	<span
		class="mx-3 h-1 w-1/3 rounded {passwordScore >= 3
			? passwordScoreItem?.color
			: 'bg-gray-200'}" />
</div>
<div class="my-2 text-sm">
	{passwordScoreItem?.note}
</div>
