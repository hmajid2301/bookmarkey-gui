<script lang="ts">
	export let nickname: string;
	export let avatar: string;
</script>

<button
	class="absolute left-0 bottom-6 hidden w-full flex-col items-center justify-center space-y-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 md:flex xl:left-8 xl:-mr-8 xl:w-auto xl:flex-row xl:justify-start xl:space-y-0 xl:space-x-4">
	<img src={avatar} alt={nickname} class="h-14 w-14 rounded-full" />
	<div class="flex flex-col items-center text-sm xl:items-start">
		<span class="font-bold text-blue-900 dark:text-blue-100 ">{nickname}</span>
		<span class="text-sm font-bold text-blue-800 opacity-50 dark:text-blue-200">View profile</span>
	</div>
</button>
