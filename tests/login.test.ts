import { test } from '@playwright/test';

test('Try to login', async ({ page, baseURL }) => {
	await page.goto('/login');

	const email = 'test@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'password11';
	await page.locator('[name="password"]').type(password);

	await page.locator('button[type="submit"]').click();
	await page.waitForURL(`${baseURL}/dashboard`);
});
