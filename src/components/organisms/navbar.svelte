<script lang="ts">
	import LogoLink from '~/components/molecules/logo_link.svelte';
	import Theme from './theme.svelte';
</script>

<header>
	<nav
		class="border-b border-slate-200 bg-slate-100 px-4  py-2.5 dark:border-slate-700 dark:bg-slate-800">
		<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
			<LogoLink />
			<div class="flex items-center lg:order-2">
				<a
					href="/account/login"
					class="mr-2 rounded-lg px-4 py-2 text-sm   hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5">
					Log in
				</a>
				<form action="/account/logout" method="POST">
					<button
						type="submit"
						class="mb-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm  text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
						Log out
					</button>
				</form>
			</div>
			<div
				class="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
				id="mobile-menu-2">
				<ul class="mt-4 flex flex-col  lg:mt-0 lg:flex-row lg:space-x-8">
					<li>
						<a
							href="/"
							class="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 lg:bg-transparent lg:p-0"
							aria-current="page">
							Home
						</a>
					</li>
				</ul>
				<Theme />
			</div>
		</div>
	</nav>
</header>
