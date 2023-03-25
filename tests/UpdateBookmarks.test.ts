import { expect, test } from "./baseFixtures.js";
import { getAdminLoginPB, getCurrentDate } from "./common.js";

test.describe("Update Bookmarks", () => {
	const email = "test@bookmarkey.app";
	const password = "password@11";

	const date = getCurrentDate();

	test.beforeEach(async ({ page }) => {
		await page.goto("/my/collections/0");
	});

	test("Successfully add bookmark to collection", async ({ page }) => {
		await page.getByRole("link", { name: "folder closed test" }).click();
		await page.getByRole("button", { name: "Add", exact: true }).click();
		await page.getByPlaceholder("Copy URL Here").fill("https://playwright.dev/docs/codegen");
		await page.getByRole("button", { name: "Add Bookmark" }).click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Added bookmark");
	});

	test.afterEach(async () => {
		try {
			const pb = await getAdminLoginPB();
			const record = await pb.collection("users").authWithPassword(email, password);
			const collections = await pb.collection("bookmarks").getList(1, 300, {
				user: record.record.id,
				filter: `created > ${date}`
			});
			collections.items.forEach(async (elem) => {
				await pb.collection("bookmarks").delete(elem.id);
			});
		} catch (err) {
			console.log("failed to delete bookmarks", err);
		}
	});
});
