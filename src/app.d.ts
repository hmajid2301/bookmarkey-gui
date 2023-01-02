/// <reference types="@sveltejs/kit" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	type PocketBase = import("pocketbase").default;
	interface Locals {
		user?: import("pocketbase").Record | import("pocketbase").Admin | null | undefined;
		pb?: PocketBase;
	}

	// interface Platform {}
}

interface ImportMetaEnv {
	VITE_POCKET_BASE_URL: string;
	VITE_SENTRY_DSN: string;
}
