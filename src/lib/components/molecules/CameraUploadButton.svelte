<script lang="ts">
	import { CameraSolid } from "svelte-awesome-icons";

	import Input from "../atoms/Input.svelte";
	export let loading = false;
</script>

<div class="absolute right-0 bottom-0">
	<div class="relative flex items-stretch justify-start">
		<label for="avatar" class="inline-flex">
			<span
				class="inline-flex h-12 w-12 cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-blue-600 bg-blue-600 p-1 text-white ring-blue-300 transition-colors duration-150 hover:border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring dark:border-blue-500 dark:bg-blue-500 dark:ring-blue-700 hover:dark:border-blue-600 hover:dark:bg-blue-600">
				<span class="inline-flex h-6 w-6 items-center justify-center">
					<CameraSolid class="inline-block h-4 w-4" />
				</span>
			</span>
			<Input
				disabled={loading}
				name="avatar"
				accept="image/*"
				on:change
				type="file"
				inputClass="-z-1 absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 outline-none" />
		</label>
	</div>
</div>
