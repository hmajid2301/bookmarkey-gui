<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import Icon from "@iconify/svelte";
	import { DarkMode } from "flowbite-svelte";
	import toast from "svelte-french-toast";
	import { superForm } from "sveltekit-superforms/client";

	import Button from "~/lib/components/atoms/Button.svelte";
	import Section from "~/lib/components/atoms/Section.svelte";
	import Password from "~/lib/components/molecules/Password.svelte";
	import PasswordInput from "~/lib/components/molecules/PasswordInput.svelte";
	import UpdateProfileForm from "~/lib/components/organisms/UpdateProfileForm.svelte";
	import LoadingStore from "~/lib/stores/LoadingStore";

	export let data;

	const {
		form: profileForm,
		errors: ProfileErrors,
		enhance: profileEnhance
	} = superForm(data.profileForm, {
		onSubmit: async () => {
			LoadingStore.setLoading(true);
		},
		onResult: async ({ result }) => {
			LoadingStore.setLoading(false);
			if (result.type === "success") {
				toast.success("Updated profile");
				await invalidateAll();
			}
		},
		onError: async ({ result }) => {
			toast.error(result.error.message);
		}
	});

	const {
		form: passwordForm,
		errors: passwordErrors,
		enhance: passwordEnhance
	} = superForm(data.passwordForm, {
		onSubmit: async () => {
			LoadingStore.setLoading(true);
		},
		onResult: async ({ result }) => {
			LoadingStore.setLoading(false);
			if (result.type === "success") {
				toast.success("Updated password");
				await invalidateAll();
			} else if (result.type === "failure") {
				toast.success("Invalid password data");
			}
		},
		onError: async ({ result }) => {
			toast.error(result.error.message);
		}
	});
</script>

<svelte:head>
	<title>My Settings</title>
</svelte:head>

<section class="mb-6 flex items-center justify-between pt-6 font-semibold">
	<div class="flex items-center justify-start">
		<span class="mr-2 inline-flex h-6 w-6 items-center justify-center">
			<Icon icon="fa6-solid:user" />
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
		<form
			action="?/updateProfile"
			enctype="multipart/form-data"
			method="post"
			use:profileEnhance>
			<UpdateProfileForm
				values={{
					nickname: $profileForm.nickname ?? data.user.nickname,
					email: $profileForm.email ?? data.user.email
				}}
				errors={{
					nickname: $ProfileErrors.nickname,
					email: $ProfileErrors.email
				}}
				avatar={data.user.avatar} />
		</form>
	</Section>

	<Section>
		<form
			class="flex h-full flex-col"
			action="?/updatePassword"
			method="post"
			use:passwordEnhance>
			<div class="flex-1 p-6">
				<PasswordInput
					name="currentPassword"
					labelName="Current Password"
					bind:value={$passwordForm.currentPassword}
					errors={$passwordErrors.currentPassword} />
				<Password
					bind:value={$passwordForm.password}
					errors={$passwordErrors.password || []} />
			</div>

			<div class="p-6">
				<div class="-mb-3 flex flex-wrap items-center justify-start">
					<Button type="submit">Change Password</Button>
				</div>
			</div>
		</form>
	</Section>
</div>
