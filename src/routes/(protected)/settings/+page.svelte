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

	export interface ProfileValues {
		nickname: string;
		email: string;
	}

	export interface ProfileErrors {
		nickname: string[] | undefined;
		email: string[] | undefined;
	}
</script>

<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';

	import type { ActionData, PageData } from './$types';
	import UpdatePasswordForm from './components/update_password.svelte';
	import UpdateProfileForm from './components/update_profile.svelte';

	import Section from '~/lib/components/atoms/section.svelte';

	export let form: ActionData;
	export let data: PageData;

	let profileValues: ProfileValues = {
		nickname: form?.data?.nickname || data.user.nickname,
		email: form?.data?.email || data.user.email
	};

	let passwordValues: PasswordValues = {
		currentPassword: form?.data?.currentPassword,
		password: form?.data?.password,
		passwordConfirm: form?.data?.passwordConfirm
	};

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
		if ('nickname' in form.errors) {
			profileErrors = {
				nickname: form?.errors?.nickname,
				email: form?.errors?.email
			};
		} else if ('password' in form.errors) {
			passwordErrors = {
				currentPassword: form?.errors?.currentPassword,
				password: form?.errors?.password,
				passwordConfirm: form?.errors?.passwordConfirm
			};
		}
	}

	let loading = false;

	const submitUpdatePassword = () => {
		loading = true;
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'failure':
					toast.error('Invalid password data');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'failure':
					toast.error('Invalid profile data');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
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
			useEnhanceFunc={submitUpdateProfile}
			{loading}
			values={profileValues}
			errors={profileErrors}
			action="?/updateProfile"
			avatar={data.user.avatar ? data.user.avatar : '/user.png'} />
	</Section>

	<Section>
		<UpdatePasswordForm
			action="?/updatePassword"
			{loading}
			values={passwordValues}
			errors={passwordErrors}
			useEnhanceFunc={submitUpdatePassword} />
	</Section>
</div>
