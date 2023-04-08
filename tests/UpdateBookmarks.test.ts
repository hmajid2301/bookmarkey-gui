import { expect, test } from "./baseFixtures.js";
import { getAdminLoginPB, getCurrentDate } from "./common.js";

test.describe("Update Bookmarks", () => {
	const date = getCurrentDate();

	test.beforeEach(async ({ page }) => {
		await page.goto("/my/collections/0");
	});

	test("Successfully add bookmark to collection", async ({ page }) => {
		await page.getByRole("link", { name: "test" }).click();
		await page.getByRole("button", { name: "Add", exact: true }).click();
		await page.getByPlaceholder("Copy URL Here").fill("https://playwright.dev/docs/codegen");
		await page.getByRole("button", { name: "Add Bookmark" }).click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Added bookmark");
	});

	test.afterEach(async () => {
		try {
			const pb = await getAdminLoginPB();
			const collections = await pb.collection("bookmarks").getFullList({
				filter: `created > "${date}"`
			});
			collections.forEach(async (elem) => {
				await pb.collection("bookmarks").delete(elem.id);
			});

			const coll = await pb.collection("bookmarks_metadata").getFullList({
				filter: `created > "${date}"`
			});
			coll.forEach(async (elem) => {
				await pb.collection("bookmarks_metadata").delete(elem.id);
			});
		} catch (err) {
			console.log("failed to delete bookmarks", err);
		}
	});
});
