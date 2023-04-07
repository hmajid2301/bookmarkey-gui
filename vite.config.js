import { sentryVitePlugin } from "@sentry/vite-plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import istanbul from "vite-plugin-istanbul";
import { defineConfig } from "vitest/config";

export default defineConfig({
	define: {
		"process.env.NODE_ENV": process.env.NODE_ENV === "production" ? '"production"' : '"development"'
	},
	build: {
		sourcemap: true
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: "./src",
			mode: process.env.NODE_ENV,
			strategies: "injectManifest",
			filename: "prompt-sw.ts",
			registerType: "autoUpdate",
			injectRegister: "auto",
			scope: "/",
			base: "/",
			manifest: {
				short_name: "Bookmarkey",
				name: "Bookmarkey",
				share_target: {
					action: "/my/bookmarks",
					method: "GET",
					params: {
						title: "title",
						text: "text",
						url: "url"
					}
				},
				description: "Bookmarking & RSS reader 2 in 1 app.",
				start_url: "/my/collections/0?source=pwa",
				scope: "/",
				display: "standalone",
				theme_color: "#0f172a",
				background_color: "#fff",
				orientation: "portrait",
				display_override: [
					"standalone",
					"fullscreen",
					"minimal-ui",
					"browser",
					"window-controls-overlay"
				],
				categories: ["productivity"],
				shortcuts: [
					{
						name: "Settings",
						url: "/my/settings",
						description: "Go to your settings page"
					}
				],
				icons: [
					{
						src: "/logo.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any"
					},
					{
						src: "/maskable_icon.png",
						sizes: "196x196",
						type: "image/png",
						purpose: "maskable"
					}
				]
			},
			injectManifest: {
				globPatterns: ["client/**/*.{js,css,ico,png,svg,webp,woff,woff2}"]
			},
			workbox: {
				globPatterns: ["client/**/*.{js,css,ico,png,svg,webp,woff,woff2}"]
			},
			devOptions: {
				enabled: true,
				type: "module",
				navigateFallback: "/"
			}
		}),
		sentryVitePlugin({
			org: "bookmarkey",
			project: "gui",
			include: "./dist",
			authToken: process.env.SENTRY_AUTH_TOKEN,
			dryRun: !(process.env.NODE_ENV === "production")
		}),
		istanbul({
			include: "src/*",
			exclude: ["node_modules", "test", "coverage"],
			extension: [".ts", ".svelte"],
			requireEnv: !(process.env.NODE_ENV === "test"),
			forceBuildInstrument: process.env.NODE_ENV === "test"
		})
	],
	test: {
		globals: true,
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{js,ts}"],
		outputFile: "test-results/junit.xml",
		setupFiles: ["./setupTest.ts"],
		reporters: ["default", "junit"],
		coverage: {
			all: true,
			include: "src/**",
			reporter: ["text", "cobertura"]
		}
	}
});
