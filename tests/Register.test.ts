import { expect, test, type Page } from "@playwright/test";

import { getAdminLoginPB } from "./common.js";

test.describe("Register", () => {
	const email = "test+signup@bookmarkey.app";

	let page: Page;

	test.beforeEach(async ({ browser }) => {
		const loginContext = await browser.newContext({
			storageState: "tests/auth/not_logged_in.json"
		});
		page = await loginContext.newPage();
	});

	test("Successfully register an account", async ({ baseURL }) => {
		await page.goto("/register");

		await page.locator('[name="email"]').type(email);

		const password = "sec9rePa@sword@11789";
		await page.locator('[name="password"]').type(password);

		await page.locator('button[type="submit"]').click();
		await page.waitForURL(`${baseURL}/my/collections/0`);
	});

	test("Fail to register an account with an email that is already registerd", async ({
		baseURL
	}) => {
		await page.goto("/register");

		const email = "test@bookmarkey.app";
		await page.locator('[name="email"]').type(email);

		const password = "sec9rePa@sword@11789";
		await page.locator('[name="password"]').type(password);

		await page.locator('button[type="submit"]').click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Failed to create account.");
		await page.waitForURL(`${baseURL}/register`);
	});

	test("Fail to register an account with a compromised password", async ({ baseURL }) => {
		await page.goto("/register");

		const email = "test@bookmarkey.app";
		await page.locator('[name="email"]').type(email);

		const password = "password";
		await page.locator('[name="password"]').type(password);

		await page.locator('button[type="submit"]').click();

		// expect error message to be present and to be red
		const error = page.locator("p.text-red-500").first();
		expect(error).toHaveText("Password has been compromised, please try again");

		// expect 4 password strength blocks to be gray
		const span = page.locator("span.bg-gray-200");
		const passwordStrengthItems = await span.count();
		expect(passwordStrengthItems).toBe(4);

		await page.waitForURL(`${baseURL}/register`);
	});

	test.afterAll(async () => {
		try {
			const pb = await getAdminLoginPB();
			const record = await pb.collection("users").getFirstListItem(`email = "${email}"`);
			await pb.collection("users").delete(record.id);
		} catch (err) {
			console.log("failed to delete email");
		}
	});
});
