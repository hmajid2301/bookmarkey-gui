<script lang="ts">
	import toast from 'svelte-french-toast';

	import type { ProfileErrors, ProfileValues } from '../+page.svelte';

	import Button from '~/lib/components/atoms/button.svelte';
	import Input from '~/lib/components/atoms/input.svelte';
	import EmailInput from '~/lib/components/molecules/email_input.svelte';

	export let values: ProfileValues;
	export let errors: ProfileErrors;
	export let action: string;
	export let success: boolean | undefined = undefined;
	export let error: string | undefined = undefined;

	if (success) {
		toast.success('Updated profile successfully');
	}

	if (error) {
		toast.error('Failed to update profile');
	}
</script>

<form {action} method="post">
	<div class="flex-1 p-6">
		<div class="mb-6 last:mb-0">
			<label for="" class="mb-2 block font-bold">Avatar</label>
			<div class="relative mr-6 h-24 w-24 md:h-36 md:w-36">
				<img
					src="https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&amp;options[accessoriesChance]=93"
					alt="John Doe"
					class="block h-auto w-full max-w-full rounded-full bg-gray-100 dark:bg-slate-800" />
				<div class="absolute right-0 bottom-0">
					<div class="relative flex items-stretch justify-start">
						<label class="inline-flex">
							<button
								class="inline-flex h-12 w-12 cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-blue-600 bg-blue-600 p-1 text-white ring-blue-300 transition-colors duration-150 hover:border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring dark:border-blue-500 dark:bg-blue-500 dark:ring-blue-700 hover:dark:border-blue-600 hover:dark:bg-blue-600"
								disabled={false}>
								<span class="inline-flex h-6 w-6 items-center justify-center">
									<svg viewBox="0 0 24 24" width="24" height="24" class="inline-block">
										<path
											fill="currentColor"
											d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
									</svg>
								</span>
							</button>
							<input
								type="file"
								class="-z-1 absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 outline-none" />
						</label>
					</div>
				</div>
			</div>

			<div class="">
				<div class="relative flex items-stretch justify-start">
					<label class="inline-flex">
						<button
							class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded border border-blue-600 bg-blue-600 py-2 px-3 text-white ring-blue-300 transition-colors duration-150 hover:border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring dark:border-blue-500 dark:bg-blue-500 dark:ring-blue-700 hover:dark:border-blue-600 hover:dark:bg-blue-600"
							disabled={false}>
							<span class="inline-flex h-6 w-6 items-center justify-center">
								<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
									<path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
								</svg>
							</span>
							<span class="px-2">Upload</span>
						</button>
						<input
							type="file"
							class="-z-1 absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 outline-none" />
					</label>
					<!---->
				</div>
			</div>
			<div class="mt-1 text-xs text-gray-500 dark:text-slate-400">Max 500kb</div>
		</div>

		<Input
			name="nickname"
			type="text"
			labelName="Nickname"
			note="Your nickname"
			placeholder="Your nickname"
			value={values.nickname}
			errors={errors.nickname}>
			<span
				class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-gray-500 dark:text-slate-400">
				<svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
					<path
						fill="currentColor"
						d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
				</svg>
			</span>
		</Input>

		<EmailInput value={values.email} errors={errors.email} />
		<div class="p-6">
			<div class="-mb-3 flex flex-wrap items-center justify-start">
				<Button type="submit">Update Profile</Button>
			</div>
		</div>
	</div>
</form>
