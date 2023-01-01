<script lang="ts">
	import AvatarProfileMenu from "./AvatarProfileMenu.svelte";

	export let nickname: string;
	export let avatar: string;
	export let email: string;
</script>

<div class="mx-auto flex w-full max-w-screen-2xl justify-between">
	<div class="md:block">
		<h1 class="mb-1 text-2xl font-bold text-blue-800 dark:text-blue-100">
			Hello 👋 {nickname}
		</h1>
	</div>
	<AvatarProfileMenu {avatar} {nickname} {email} />
</div>
