import type { Page } from "@playwright/test";
import pocketbase from "pocketbase";

import { expect, test } from "./baseFixtures.js";

test.describe(() => {
	const email = "test@bookmarkey.app";
	const password = "password@11";

	const adminEmail = "admin@bookmarkey.app";
	const adminPassword = "password11";
	const date = new Date();

	test("Successfully add group in app", async ({ page, baseURL }) => {
		await login(page, baseURL || "");
		await page.getByRole("button", { name: "plus" }).click();
		await page.getByRole("button", { name: "Create Group" }).click();
		await page.getByPlaceholder("Group Name").fill("New Group");
		await page.getByRole("button", { name: "Add Group" }).click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Created group");
	});

	test("Successfully delete group in app", async ({ page, baseURL }) => {
		await login(page, baseURL || "");
		await page.getByRole("button", { name: "plus" }).click();
		await page.getByRole("button", { name: "Create Group" }).click();
		await page.getByPlaceholder("Group Name").fill("Group to delete");
		await page.getByRole("button", { name: "Add Group" }).click();

		// Wait for `created group` message to disappear
		// await expect(page.locator(".message")).toHaveCount(0);
		await page.waitForTimeout(3000);
		await page
			.getByRole("button", { name: "Group to delete ellipsis" })
			.first()
			.getByRole("button", { name: "ellipsis" })
			.click();
		await page.getByRole("button", { name: "Delete Group", exact: true }).click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Deleted group");
	});

	// TODO: work out how to fix
	// test("Successfully swap two group in app", async ({ page, baseURL }) => {
	// 	await login(page, baseURL || "");
	// 	await page.dragAndDrop("id=64453vih35psbtz", "id=401vo8ew48e7m6y");

	// 	const toastMessage = await page.locator(".message").innerText();
	// 	expect(toastMessage).toBe("Moved group");
	// });

	// TODO: generalise between this and update collection
	test.afterEach(async () => {
		try {
			const pb = new pocketbase(process.env.VITE_TEST_POCKET_BASE_URL);
			await pb.admins.authWithPassword(adminEmail, adminPassword);

			const record = await pb.collection("users").authWithPassword(email, password);
			const collections = await pb.collection("groups").getList(1, 300, {
				user: record.record.id,
				filter: `created >= ${date.toISOString().replace("T", " ")}`
			});
			collections.items.forEach(async (elem) => {
				await pb.collection("groups").delete(elem.id);
			});
		} catch (err) {
			console.log("failed to delete group", err);
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
