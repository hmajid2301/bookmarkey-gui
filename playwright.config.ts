import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	// globalSetup: "./global-setup",
	webServer: {
		command:
			"NODE_ENV=test DEBUG=pw:webserver npm run build && NODE_ENV=test npm run preview > svelte_playwright.log",
		port: 4173,
		timeout: 240000,
		reuseExistingServer: !process.env.CI
	},
	use: {
		trace: "retain-on-failure",
		video: "retain-on-failure"
		// headless: !process.env.CI
		// browserName: "firefox",
		// storageState: "storageState.json"
	},
	testDir: "./tests"
};

export default config;
