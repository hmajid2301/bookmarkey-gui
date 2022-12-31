import type { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'NODE_ENV=test npm run build && npm run preview > svelte_playwright.log',
		port: 4173
	},
	use: {
		trace: 'retain-on-failure',
		video: 'retain-on-failure'
	},
	testDir: './tests'
};

export default config;
