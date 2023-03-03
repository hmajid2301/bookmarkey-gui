<script lang="ts">
	import { enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import { navigating } from "$app/stores";
	import type { ActionResult } from "@sveltejs/kit";
	import { tick } from "svelte";
	import FolderClosedSolid from "svelte-awesome-icons/FolderClosedSolid.svelte";
	import LinkSolid from "svelte-awesome-icons/LinkSolid.svelte";
	import toast from "svelte-french-toast";

	import type { PageData } from "./$types";
	import Button from "~/lib/components/atoms/Button.svelte";
	import FullWidthButton from "~/lib/components/atoms/FullWidthButton.svelte";
	import Modal from "~/lib/components/atoms/Modal.svelte";
	import FormField from "~/lib/components/molecules/FormField.svelte";
	import { selectedGroupStore } from "~/lib/stores/SelectedGroup";

	export let data: PageData;
	$: if ($navigating) {
		$selectedGroupStore.group.id = data.collection.group || "";
	}

	let loading = false;
	let ref: HTMLInputElement;
	let show = false;

	const submitAddBookmarkForm = () => {
		loading = true;
		return async ({
			result,
			update
		}: {
			result: ActionResult;
			update: () => Promise<void>;
		}) => {
			switch (result.type) {
				case "success":
					await update();
					toast.success("Added bookmark");
					await invalidateAll();
					break;
				case "error":
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
			show = false;
		};
	};
</script>

<svelte:head>
	<title>My Collection: {data.collection.name}</title>
</svelte:head>

<div class="my-2 flex space-x-5">
	<FolderClosedSolid />
	<p>{data.collection.name}</p>
</div>
<Button
	on:click={async () => {
		show = true;
		await tick();
		ref?.focus();
	}}>
	Add
</Button>

{#each data.collection.bookmarks as bookmark}
	<a
		href={bookmark.url}
		target="_blank"
		rel="noreferrer"
		class="mb-6 flex flex-col rounded-2xl bg-white transition-shadow duration-500 last:mb-0 hover:shadow-lg dark:bg-slate-900/70">
		<div class="flex-1 p-6">
			<div class="block items-center justify-between md:flex">
				<div class="mb-6 flex items-center justify-center md:mb-0">
					<div class="block items-center justify-start md:flex">
						<div class="mb-6 flex items-center justify-center md:mb-0">
							<div class="h-12 w-12 md:mr-6">
								<img
									src={bookmark.image}
									alt="Bookmark Image {bookmark.url}"
									class="block h-auto w-full max-w-full rounded-full bg-gray-100 dark:bg-slate-800" />
							</div>
						</div>
						<div class="flex items-center justify-center">
							<div class="text-center md:text-left">
								<h4 class="text-xl">{bookmark.title}</h4>
								<p>{bookmark.description}</p>
								<p class="text-gray-500">{bookmark.createdAt}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="flex items-center justify-center">
					<div class="block items-center justify-end md:flex">
						<div class="mb-6 flex items-center justify-center md:mb-0">
							<div class="-mb-3 flex flex-wrap items-center justify-start">
								<div
									class="mr-1.5 mb-3 inline-flex items-center rounded-full border border-emerald-500 bg-emerald-500 py-1 px-3 text-xs capitalize leading-none text-white last:mr-0">
									<!---->
									<span>Example tag</span>
								</div>
								<div
									class="mr-1.5 mb-3 inline-flex items-center rounded-full border border-blue-500 bg-blue-500 py-1 px-3 text-xs capitalize leading-none text-white last:mr-0">
									<!---->
									<span>Another Tag</span>
								</div>
								<div
									class="mr-1.5 mb-3 inline-flex items-center rounded-full border border-yellow-500 bg-yellow-500 py-1 px-3 text-xs capitalize leading-none text-white last:mr-0">
									<!---->
									<span>Final Tag</span>
								</div>
							</div>
						</div>
						<div class="flex items-center justify-center">
							<div data-headlessui-state="" class="relative inline-block text-left">
								<div>
									<button
										type="button"
										aria-haspopup="menu"
										aria-expanded="false"
										data-headlessui-state="">
										<button
											class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded border border-gray-100 bg-gray-100 p-1 text-black ring-gray-200 transition-colors duration-150 hover:bg-gray-200 focus:outline-none focus:ring dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:ring-gray-500 hover:dark:bg-slate-700"
											type="button">
											<span
												class="inline-flex h-6 w-6 items-center justify-center">
												<svg
													viewBox="0 0 24 24"
													width="16"
													height="16"
													class="inline-block">
													<path
														fill="currentColor"
														d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
												</svg>
											</span>
											<!---->
										</button>
									</button>
								</div>
								<!---->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!---->
	</a>
{/each}

<Modal title="Add a new bookmark" bind:show>
	<form
		class="h-min space-y-4 md:space-y-6"
		action={`/my/collections/${data.collection.id}?/addBookmark`}
		method="post"
		use:enhance={submitAddBookmarkForm}>
		<FormField
			bind:ref
			disabled={loading}
			type="text"
			labelName=""
			placeholder="Copy URL Here"
			name="url">
			<span
				class="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-12 w-10 items-center justify-center text-slate-500 dark:text-slate-400">
				<LinkSolid class="inline-block h-4 w-4" />
			</span>
		</FormField>
		<FullWidthButton>Add Bookmark</FullWidthButton>
	</form>
</Modal>
