<script lang="ts">
	import { DarkMode } from "flowbite-svelte";
	import UserSolid from "svelte-awesome-icons/UserSolid.svelte";

	import Section from "~/lib/components/atoms/Section.svelte";
	import UpdatePasswordForm, {
		type PasswordErrors
	} from "~/lib/components/organisms/UpdatePasswordForm.svelte";
	import UpdateProfileForm, {
		type ProfileErrors
	} from "~/lib/components/organisms/UpdateProfileForm.svelte";
	import type { ActionData, PageData } from "./$types";

	export let form: ActionData;
	export let data: PageData;

	let profileErrors: ProfileErrors = {
		nickname: undefined,
		email: undefined
	};

	let passwordErrors: PasswordErrors = {
		currentPassword: undefined,
		password: undefined
	};

	if (form !== undefined && form?.errors !== undefined) {
		if ("nickname" in form.errors) {
			profileErrors = {
				nickname: form?.errors?.nickname,
				email: form?.errors?.email
			};
		} else if ("password" in form.errors) {
			passwordErrors = {
				currentPassword: form?.errors?.currentPassword,
				password: form?.errors?.password
			};
		}
	}
</script>

<svelte:head>
	<title>My Settings</title>
</svelte:head>

<section class="mb-6 flex items-center justify-between pt-6 font-semibold">
	<div class="flex items-center justify-start">
		<span class="mr-2 inline-flex h-6 w-6 items-center justify-center">
			<UserSolid />
		</span>
		<h1 class="text-2xl leading-tight">Manage profile</h1>
	</div>
	<div
		class="relative block cursor-pointer items-center py-2 px-3 text-black hover:text-slate-500 dark:text-white dark:hover:text-slate-400 lg:flex lg:w-16 lg:justify-center">
		<div class="flex items-center">
			<DarkMode btnClass="" />
		</div>
	</div>
</section>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
	<Section>
		<UpdateProfileForm
			values={{
				nickname: form?.data?.nickname ?? data.user.nickname,
				email: form?.data?.email ?? data.user.email
			}}
			errors={profileErrors}
			avatar={data.user.avatar} />
	</Section>

	<Section>
		<UpdatePasswordForm
			values={{
				currentPassword: form?.data?.currentPassword,
				password: form?.data?.password
			}}
			errors={passwordErrors} />
	</Section>
</div>
