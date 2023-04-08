<script lang="ts">
	import Icon from "@iconify/svelte";

	import Avatar from "../atoms/Avatar.svelte";
	import Button from "../atoms/Button.svelte";
	import Note from "../atoms/Note.svelte";
	import CameraUploadButton from "../molecules/CameraUploadButton.svelte";
	import EmailInput from "../molecules/EmailInput.svelte";
	import FormField from "../molecules/FormField.svelte";

	export let values: ProfileValues;
	export let errors: ProfileErrors;
	export let avatar: string;

	interface ProfileValues {
		nickname: string;
		email: string;
	}

	interface ProfileErrors {
		nickname: string[] | undefined;
		email: string[] | undefined;
	}

	const showPreview = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (files && files[0]) {
			const reader = new FileReader();
			reader.addEventListener("load", function () {
				avatar = reader.result as string;
			});
			reader.readAsDataURL(files[0]);
		}
	};
</script>

<div class="flex-1 p-6">
	<div class="mb-6 last:mb-0">
		<label for="avatar" class="mb-2 block font-bold">Avatar</label>
		<div class="relative mr-6 h-24 w-24 md:h-36 md:w-36">
			{#key avatar}
				<Avatar {avatar} email={values.email} nickname={values.nickname} />
			{/key}
			<CameraUploadButton on:change={showPreview} />
		</div>
		<Note>Max 500KB</Note>
	</div>

	<FormField
		name="nickname"
		type="text"
		labelName="Nickname"
		note="Your nickname"
		placeholder="Your nickname"
		value={values.nickname}
		errors={errors.nickname}>
		<span
			class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-gray-500 dark:text-slate-400">
			<span class="inline-block h-4 w-4">
				<Icon icon="fa6-solid:signature" />
			</span>
		</span>
	</FormField>

	<EmailInput value={values.email} errors={errors.email} />
	<div class="pt-6">
		<div class="-mb-3 flex flex-wrap items-center justify-start">
			<Button type="submit">Update Profile</Button>
		</div>
	</div>
</div>
