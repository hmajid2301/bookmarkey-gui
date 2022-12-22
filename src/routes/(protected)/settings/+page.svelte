<script lang="ts" context="module">
	export interface PasswordValues {
		currentPassword: string;
		password: string;
		passwordConfirm: string;
	}

	export interface PasswordErrors {
		currentPassword: string[] | undefined;
		password: string[] | undefined;
		passwordConfirm: string[] | undefined;
	}
</script>

<script lang="ts">
	import type { ActionData } from './$types';
	import UpdatePasswordForm from './_components/update_password.svelte';
	import UpdateProfileForm from './_components/update_profile.svelte';

	import Section from '~/lib/components/atoms/section.svelte';

	export let form: ActionData;

	let values: PasswordValues = {
		currentPassword: form?.data?.currentPassword,
		password: form?.data?.password,
		passwordConfirm: form?.data?.passwordConfirm
	};

	let errors: PasswordErrors = {
		currentPassword: form?.errors?.currentPassword,
		password: form?.errors?.password,
		passwordConfirm: form?.errors?.passwordConfirm
	};
</script>

<section class="mb-6 flex items-center justify-between pt-6">
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
		<UpdateProfileForm />
	</Section>

	<Section>
		<UpdatePasswordForm
			action="?/changePassword"
			{values}
			{errors}
			error={form?.changePasswordErr}
			success={form?.changePasswordSuccess} />
	</Section>
</div>
