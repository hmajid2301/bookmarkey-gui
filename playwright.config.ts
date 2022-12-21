import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	retries: 1,
	use: {
		trace: 'on-first-retry',
		video: 'on-first-retry'
	},
	testDir: './tests'
};

export default config;
