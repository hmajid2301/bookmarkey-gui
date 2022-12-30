import { expect, test, type Page } from '@playwright/test';
import pocketbase from 'pocketbase';

test('Successfully update password in app', async ({ page, baseURL }) => {
	const email = 'test+update_password@bookmarkey.app';
	const password = 'password@11';
	await login(page, baseURL || '', email, password);
	await page.goto('/my/settings');

	await page.locator('[name="currentPassword"]').type(password);

	const newPassword = 'password@112';
	await page.locator('[name="password"]').type(newPassword);
	await page.locator('[name="passwordConfirm"]').type(newPassword);
	await page.locator('button[type="submit"]').last().click();

	const toastMessage = await page.locator('.message').innerText();
	expect(toastMessage).toBe('Updated password');

	await updatePassword(email, newPassword, password);
});

async function login(page: Page, baseURL: string, email: string, password: string) {
	await page.goto('/login');
	await page.locator('[name="email"]').type(email);
	await page.locator('[name="password"]').type(password);
	await page.locator('button[type="submit"]').click();
	await page.waitForURL(`${baseURL}/my/dashboard`);
}

async function updatePassword(email: string, newPassword: string, password: string) {
	const pb = new pocketbase(process.env.VITE_POCKET_BASE_URL);
	const record = await pb.collection('users').authWithPassword(email, newPassword);

	await pb?.collection('users').update(record.record.id as string, {
		oldPassword: newPassword,
		password: password,
		passwordConfirm: password
	});
}
