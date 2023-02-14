import type { Page } from "@playwright/test";
import pocketbase from "pocketbase";

import { expect, test } from "./baseFixtures.js";

test.describe(() => {
	const email = "test+update_password@bookmarkey.app";
	const newPassword = "mY$$ecureP@ssword@112";
	const password = "password@11";
	const nickname = "haseeb";

	test("Successfully update password in app", async ({ page, baseURL }) => {
		await login(page, baseURL || "");
		await page.goto("/my/settings");

		await page.locator('[name="currentPassword"]').type(password);

		const newPassword = "mY$$ecureP@ssword@112";
		await page.locator('[name="password"]').type(newPassword);
		await page.locator('button[type="submit"]').last().click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Updated password");
	});

	test("Successfully update nickname in app", async ({ page, baseURL }) => {
		await login(page, baseURL || "");
		await page.goto("/my/settings");

		await page.locator('[name="nickname"]').fill("");
		await page.locator('[name="nickname"]').type(nickname);
		await page.getByRole("button", { name: "Update Profile" }).click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Updated profile");
	});

	test("Successfully update avatar in app", async ({ page, baseURL }) => {
		await login(page, baseURL || "");
		await page.goto("/my/settings");

		await page.locator('[name="avatar"]').setInputFiles("static/logo.png");
		await page.getByRole("button", { name: "Update Profile" }).click();

		const toastMessage = await page.locator(".message").innerText();
		expect(toastMessage).toBe("Updated profile");
	});

	test.afterEach(async () => {
		try {
			const pb = new pocketbase(process.env.VITE_TEST_POCKET_BASE_URL);
			const record = await pb.collection("users").authWithPassword(email, newPassword);

			await pb?.collection("users").update(record.record.id as string, {
				nickname: email,
				oldPassword: newPassword,
				password: password,
				passwordConfirm: password,
				avatar: ""
			});
		} catch (err) {
			console.log("failed to update profile", err);
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
