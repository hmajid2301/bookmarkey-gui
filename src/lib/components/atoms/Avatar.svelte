<script lang="ts">
	import Avatar from '@svelte-put/avatar/Avatar.svelte';

	export let avatar = '';
	export let email = '';
	export let nickname = '';
</script>

<Avatar
	class="block h-auto w-full max-w-full rounded-full bg-gray-100 dark:bg-slate-800"
	src={avatar}
	gravatar={email}
	uiAvatar={nickname} />
