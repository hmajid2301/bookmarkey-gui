<script lang="ts">
	import type { ActionData, PageData } from "./$types";
	import UpdatePasswordForm from "./components/UpdatePassword.svelte";
	import UpdateProfileForm from "./components/UpdateProfile.svelte";
	import type { PasswordErrors, ProfileErrors } from "./types";

	import Section from "~/lib/components/atoms/Section.svelte";

	export let form: ActionData;
	export let data: PageData;

	let profileErrors: ProfileErrors = {
		nickname: undefined,
		email: undefined
	};

	let passwordErrors: PasswordErrors = {
		currentPassword: undefined,
		password: undefined,
		passwordConfirm: undefined
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
				password: form?.errors?.password,
				passwordConfirm: form?.errors?.passwordConfirm
			};
		}
	}
</script>

<section class="mb-6 flex items-center justify-between pt-6 font-semibold">
	<div class="flex items-center justify-start">
		<span class="mr-2 inline-flex h-6 w-6 items-center justify-center">
			<svg viewBox="0 0 24 24" width="20" height="20" class="inline-block">
				<path
					fill="currentColor"
					d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
			</svg>
		</span>
		<h1 class="text-2xl leading-tight">Manage profile</h1>
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
			action="?/updateProfile"
			avatar={data.user.avatar} />
	</Section>

	<Section>
		<UpdatePasswordForm
			action="?/updatePassword"
			values={{
				currentPassword: form?.data?.currentPassword,
				password: form?.data?.password,
				passwordConfirm: form?.data?.passwordConfirm
			}}
			errors={passwordErrors} />
	</Section>
</div>
