import { test as setup } from "./baseFixtures.js";

const authFile = "tests/auth/user.json";

setup("authenticate", async ({ page, baseURL }) => {
	console.log("start global setup!");

	const loginURL = `${baseURL}/login`;
	await page.goto(loginURL);

	const email = "test@bookmarkey.app";
	await page.locator('[name="email"]').type(email);
	const password = "password@11";
	await page.locator('[name="password"]').type(password);
	await page.locator('button[type="submit"]').click();

	await page.waitForURL(`${baseURL}/my/collections/0`);

	await page.context().storageState({ path: authFile });
	console.log("end global setup!");
});
