import { test } from "./baseFixtures.js";
import { getAdminLoginPB, getCurrentDate } from "./common.js";

test.describe(() => {
	const email = "test@bookmarkey.app";
	const password = "password@11";

	const date = getCurrentDate();

	test.beforeEach(async ({ page }) => {
		await page.goto("/my/collections/0");
	});

	// test("Successfully add group in app", async ({ page }) => {
	// 	await page.getByRole("button", { name: "add", exact: true }).click();
	// 	await page.getByRole("button", { name: "Create Group" }).click();
	// 	await page.getByPlaceholder("Group Name").fill("New Group");
	// 	await page.getByRole("button", { name: "Add Group" }).click();

	// 	const toastMessage = await page.locator(".message").innerText();
	// 	expect(toastMessage).toBe("Created group");
	// });

	// test("Successfully delete group in app", async ({ page }) => {
	// 	await page.getByRole("button", { name: "add" }).click();
	// 	await page.getByRole("button", { name: "Create Group" }).click();
	// 	await page.getByPlaceholder("Group Name").fill("Group to delete");
	// 	await page.getByRole("button", { name: "Add Group" }).click();

	// 	// Wait for `created group` message to disappear
	// 	// await expect(page.locator(".message")).toHaveCount(0);
	// 	await page.waitForTimeout(3000);
	// 	await page
	// 		.getByRole("button", { name: "Group to delete ellipsis" })
	// 		.first()
	// 		.getByRole("button", { name: "ellipsis" })
	// 		.click();
	// 	await page.getByRole("button", { name: "Delete Group", exact: true }).click();

	// 	const toastMessage = await page.locator(".message").innerText();
	// 	expect(toastMessage).toBe("Deleted group");
	// });

	// test("Successfully rename group in app", async ({ page }) => {
	// 	await page.getByRole("button", { name: "add" }).click();
	// 	await page.getByRole("button", { name: "Create Group" }).click();
	// 	await page.getByPlaceholder("Group Name").fill("Group to rename");
	// 	await page.getByRole("button", { name: "Add Group" }).click();

	// 	// Wait for `created group` message to disappear
	// 	// await expect(page.locator(".message")).toHaveCount(0);
	// 	await page.waitForTimeout(3000);
	// 	await page
	// 		.getByRole("button", { name: "Group to rename ellipsis" })
	// 		.first()
	// 		.getByRole("button", { name: "ellipsis" })
	// 		.click();
	// 	await page.getByRole("button", { name: "Rename Group", exact: true }).click();
	// 	await page.getByPlaceholder("New Group Name").fill("renamed group");
	// 	await page.getByPlaceholder("New Group Name").press("Enter");

	// 	const toastMessage = await page.locator(".message").innerText();
	// 	expect(toastMessage).toBe("Renamed group");
	// });

	// TODO: work out how to fix
	// test("Successfully swap two group in app", async ({ page, baseURL }) => {
	// 	await login(page, baseURL || "");
	// 	await page.dragAndDrop("id=64453vih35psbtz", "id=401vo8ew48e7m6y");

	// 	const toastMessage = await page.locator(".message").innerText();
	// 	expect(toastMessage).toBe("Moved group");
	// });

	test.afterEach(async () => {
		try {
			const pb = await getAdminLoginPB();
			const record = await pb.collection("users").authWithPassword(email, password);
			const collections = await pb.collection("groups").getList(1, 300, {
				user: record.record.id,
				filter: `created >= ${date}`
			});
			collections.items.forEach(async (elem) => {
				await pb.collection("groups").delete(elem.id);
			});
		} catch (err) {
			console.log("failed to delete group", err);
		}
	});
});
