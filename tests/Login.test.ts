import type { Page } from "@playwright/test";

import { expect, test } from "./baseFixtures.js";

test.describe("Login", () => {
	let page: Page;

	test.beforeEach(async ({ browser }) => {
		const loginContext = await browser.newContext({
			storageState: "tests/auth/not_logged_in.json"
		});
		page = await loginContext.newPage();
	});

	test("Successfully login to app", async ({ baseURL }) => {
		await page.goto("/login");

		const email = "test@bookmarkey.app";
		await page.locator('[name="email"]').type(email);

		const password = "password@11";
		await page.locator('[name="password"]').type(password);

		await page.locator('button[type="submit"]').click();
		await page.waitForURL(`${baseURL}/my/collections/0`);
	});

	test("Fail to login to app using incorrect credentials", async ({ baseURL }) => {
		await page.goto("/login");

		const email = "test@bookmarkey.app";
		await page.locator('[name="email"]').type(email);

		const password = "wrong_password";
		await page.locator('[name="password"]').type(password);

		await page.locator('button[type="submit"]').click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Wrong email and password combination.");
		await page.waitForURL(`${baseURL}/login`);
	});
});
