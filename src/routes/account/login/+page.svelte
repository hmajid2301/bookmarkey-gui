<script>
	import Button from '~/components/atoms/button.svelte';
	import Inputs from '~/components/atoms/inputs.svelte';
	import SignInGroup from '~/components/molecules/sign_in_group.svelte';
</script>

<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
	<h1
		class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
	>
		Create an account
	</h1>
	<form class="space-y-4 md:space-y-6" action="#">
		<Inputs
			type="email"
			name="email"
			labelName="Email"
			required={true}
			placeholder="hello@haseebmajid.dev"
		/>
		<Inputs
			type="password"
			name="password"
			labelName="Password"
			required={true}
			placeholder="••••••••"
		/>
		<Button>Login</Button>
	</form>
	<div class="my-5 flex items-center justify-center space-x-2">
		<span class="h-px w-16 bg-gray-100" />
		<span class="font-normal text-gray-300">or</span>
		<span class="h-px w-16 bg-gray-100" />
	</div>

	<SignInGroup />
	<p class="text-sm font-light text-gray-500 dark:text-gray-400">
		Don't have an account? <a
			href="/register"
			class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
			>Create an account here</a
		>
	</p>
</div>
