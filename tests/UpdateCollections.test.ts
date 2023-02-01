import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";
import pocketbase from "pocketbase";

test.describe(() => {
	const email = "test@bookmarkey.app";
	const password = "password@11";

	const adminEmail = "admin@bookmarkey.app";
	const adminPassword = "password11";
	const date = new Date();

	test("Successfully add collection in app", async ({ page, baseURL }) => {
		await login(page, baseURL || "");
		await page.getByRole("link", { name: "folder open Collections" }).click();
		await page.getByRole("link", { name: "folder closed Collections" }).click();
		await page.getByRole("button", { name: "plus" }).click();
		await page.getByRole("button", { name: "Create Collection" }).click();
		await page.getByPlaceholder("Collection Name").fill("test collection");
		await page.getByPlaceholder("Collection Name").press("Enter");

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Created collection");
	});

	test("Successfully delete collection in app", async ({ page, baseURL }) => {
		await login(page, baseURL || "");
		await page.getByRole("button", { name: "plus" }).click();
		await page.getByRole("button", { name: "Create Collection" }).click();
		await page.getByPlaceholder("Collection Name").fill("abcd");
		await page.getByPlaceholder("Collection Name").press("Enter");
		await page.getByRole("link", { name: "folder closed abcd" }).click({
			button: "right"
		});
		await page.getByRole("button", { name: "Delete Collection" }).click();
	});

	// TODO: work out how to fix
	// test("Successfully move collection in app", async ({ page, baseURL }) => {
	// 	await login(page, baseURL || "");
	// 	await page.dragAndDrop("id=64453vih35psbtz", "id=401vo8ew48e7m6y");

	// 	const toastMessage = await page.locator(".message").innerText();
	// 	expect(toastMessage).toBe("Moved collection");
	// });

	test.afterEach(async () => {
		try {
			const pb = new pocketbase(process.env.VITE_TEST_POCKET_BASE_URL);
			await pb.admins.authWithPassword(adminEmail, adminPassword);

			const record = await pb.collection("users").authWithPassword(email, password);
			const collections = await pb.collection("collections").getList(1, 300, {
				user: record.record.id,
				filter: `created >= ${date.toISOString().replace("T", " ")}`
			});
			collections.items.forEach(async (elem) => {
				await pb.collection("collections").delete(elem.id);
			});
		} catch (err) {
			console.log("failed to delete collections", err);
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
