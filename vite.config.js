import sentryVitePlugin from "@sentry/vite-plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

/** @type {import('vite').UserConfig} */
const config = {
	build: {
		sourcemap: true
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: {
				short_name: "bookmarkey",
				name: "bookmarkey",
				description: "Bookmarking & RSS reader 2 in 1 app.",
				start_url: "/my/dashboard?source=pwa",
				scope: "/",
				display: "standalone",
				theme_color: "#006aa3",
				background_color: "#fff",
				icons: [
					{
						src: "/logo.png",
						sizes: "196x196",
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
			}
		}),
		sentryVitePlugin({
			org: "bookmarkey",
			project: "gui",
			include: "./dist",
			authToken: process.env.SENTRY_AUTH_TOKEN,
			dryRun: process.env.NODE_ENV === "production" ? false : true
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
};

export default config;
