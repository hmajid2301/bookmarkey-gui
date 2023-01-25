import type { Page } from "@playwright/test";
import { test } from "@playwright/test";

test.describe(() => {
	const email = "test+no_group@bookmarkey.app";
	const password = "password@11";

	test("Successfully load collections in side bar", async ({ page, baseURL }) => {
		await login(page, baseURL || "");
		await page.getByRole("link", { name: "folder closed test" }).click();
		await page.waitForURL(`${baseURL}/my/collections/s4fy5ezzbeoyzoy`);
	});

	// TODO: generalise
	async function login(page: Page, baseURL: string) {
		await page.goto("/login");
		await page.locator('[name="email"]').type(email);
		await page.locator('[name="password"]').type(password);
		await page.locator('button[type="submit"]').click();
		await page.waitForURL(`${baseURL}/my/dashboard`);
	}
});
