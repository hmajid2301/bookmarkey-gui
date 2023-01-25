import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";
import pocketbase from "pocketbase";

test.describe(() => {
	const email = "test+update_password@bookmarkey.app";
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

	// TODO: generalise between this and update collection
	test.afterEach(async () => {
		try {
			const pb = new pocketbase(process.env.VITE_POCKET_BASE_URL);
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
			console.log("failed to delete group");
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
