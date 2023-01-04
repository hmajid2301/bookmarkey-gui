import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	webServer: {
		command:
			"NODE_ENV=test DEBUG=pw:webserver npm run build && npm run preview > svelte_playwright.log",
		port: 4173,
		timeout: 240000,
		reuseExistingServer: !process.env.CI
	},
	use: {
		trace: "retain-on-failure",
		video: "retain-on-failure"
	},
	testDir: "./tests"
};

export default config;
