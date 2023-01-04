<script lang="ts" context="module">
	export interface PasswordIndicatorItem {
		color: string;
		note: string;
	}
</script>

<script lang="ts">
	export let passwordScore: number;

	const passwordScoreMap: Record<number, PasswordIndicatorItem> = {
		0: { color: "bg-gray-200", note: "Very Weak Password" },
		1: { color: "bg-red-500", note: "Weak Password" },
		2: { color: "bg-orange-500", note: "Average Password" },
		3: { color: "bg-green-500", note: "Strong Password" }
	};

	let passwordScoreItem = passwordScoreMap[0];
	$: if (passwordScore !== undefined) {
		passwordScoreItem = passwordScoreMap[passwordScore] || passwordScoreMap[0];
	}
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
