import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	webServer: {
		command: "pnpm run build && pnpm run preview",
		port: 4173,
		timeout: 240000,
		reuseExistingServer: !process.env.CI
	},
	reporter: [["junit", { outputFile: "results.xml" }]],
	testDir: "tests",
	use: {
		trace: "retain-on-failure",
		video: "retain-on-failure"
	},
	projects: [
		{ name: "setup", testMatch: /.*\.setup\.ts/ },
		// {
		// 	name: "chromium",
		// 	use: {
		// 		...devices["Desktop Chrome"],
		//    storageState: "tests/auth/user.json"
		// 	},
		// 	dependencies: ["setup"]
		// },
		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
				storageState: "tests/auth/user.json"
			},
			dependencies: ["setup"]
		}
	]
});
