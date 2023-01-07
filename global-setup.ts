import { type FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
	console.log("start global setup!");
	// const browser = await firefox.launch({ headless: false });
	// const page = await browser.newPage();

	// const loginURL = `http://localhost:${config.webServer?.port}/login`;
	// await page.goto(loginURL);

	// const email = "test@bookmarkey.app";
	// await page.locator('[name="email"]').type(email);

	// const password = "password@11";
	// await page.locator('[name="password"]').type(password);

	// await page.locator('button[type="submit"]').click();

	// await page.waitForTimeout(5000);

	// await page.context().storageState({ path: "storageState.json" });
	// await browser.close();
	console.log("end global setup!");
}

export default globalSetup;
