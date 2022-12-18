import { test } from '@playwright/test';

test('Try to login', async ({ page, baseURL }) => {
	await page.goto('/account/login');

	const email = 'test@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'password11';
	await page.locator('[name="password"]').type(password);

	await page.locator('role=button[name=Login]').click();
	await page.waitForURL(baseURL || '');
});
