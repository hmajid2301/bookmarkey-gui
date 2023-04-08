import { test } from "./baseFixtures.js";

test.describe("SideBar", () => {
	test("Successfully load collections in side bar", async ({ page, baseURL }) => {
		await page.goto("/my/collections/0");
		await page.getByRole("link", { name: "test collection" }).click();
		await page.waitForURL(`${baseURL}/my/collections/pbk4nx8q136i695`);
	});
});
