/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	type PocketBase = import('pocketbase').default;
	interface Locals {
		user?: import('pocketbase').Record | import('pocketbase').Admin | null | undefined;
		pb?: PocketBase;
	}

	// interface Platform {}
}
