import type { Page } from "@playwright/test";
import pocketbase from "pocketbase";

import { expect, test } from "./baseFixtures.js";

test.describe(() => {
	const email = "test@bookmarkey.app";
	const password = "password@11";

	const adminEmail = "admin@bookmarkey.app";
	const adminPassword = "password11";
	const date = new Date();

	test("Successfully add bookmark to collection", async ({ page, baseURL }) => {
		await login(page, baseURL || "");
		await page.getByRole("link", { name: "folder closed test collection" }).click();
		await page.getByRole("button", { name: "Add", exact: true }).click();
		await page.getByPlaceholder("Copy URL Here").fill("https://playwright.dev/docs/codegen");
		await page.getByRole("button", { name: "Add Bookmark" }).click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Added bookmark");
	});

	test.afterEach(async () => {
		try {
			const pb = new pocketbase(process.env.VITE_TEST_POCKET_BASE_URL);
			await pb.admins.authWithPassword(adminEmail, adminPassword);

			const record = await pb.collection("users").authWithPassword(email, password);
			const collections = await pb.collection("bookmarks").getList(1, 300, {
				user: record.record.id,
				filter: `created >= ${date.toISOString().replace("T", " ")}`
			});
			collections.items.forEach(async (elem) => {
				await pb.collection("bookmarks").delete(elem.id);
			});
		} catch (err) {
			console.log("failed to delete bookmarks", err);
		}
	});

	async function login(page: Page, baseURL: string) {
		await page.goto("/login");
		await page.locator('[name="email"]').type(email);
		await page.locator('[name="password"]').type(password);
		await page.locator('button[type="submit"]').click();
		await page.waitForURL(`${baseURL}/my/dashboard`);
	}
});
