<script lang="ts">
	import type { ActionData, PageData } from "./$types";
	import OAuthLoginGroup from "~/lib/components/molecules/OAuthLoginButton.svelte";
	import RegisterForm from "~/lib/components/organisms/RegisterForm.svelte";

	export let form: ActionData;
	export let data: PageData;
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<RegisterForm register={form?.data} errors={form?.errors} />

	<div class="my-5 flex items-center justify-center space-x-2">
		<span class="h-px w-16 bg-gray-100" />
		<span class="font-normal text-gray-300">or</span>
		<span class="h-px w-16 bg-gray-100" />
	</div>
	<OAuthLoginGroup authProviders={data.authProviders} />

	<div class="mt-4 text-center text-sm text-gray-500">
		By signing up, you agree to the
		<a class="border-grey-dark text-grey-dark border-b no-underline" href="/terms-of-service">
			Terms of Service
		</a>
		and
		<a class="border-grey-dark text-grey-dark border-b no-underline" href="/privacy-policy">
			Privacy Policy
		</a>
	</div>
	<p class="text-sm font-light text-gray-500 dark:text-gray-400">
		Already have an account? <a
			href="/login"
			class="text-primary-600 dark:text-primary-500 font-medium hover:underline">
			Login here
		</a>
	</p>
</div>
