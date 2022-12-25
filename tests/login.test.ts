import { expect, test } from '@playwright/test';

test('Successfully login to app', async ({ page, baseURL }) => {
	await page.goto('/login');

	const email = 'test@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'password@11';
	await page.locator('[name="password"]').type(password);

	await page.locator('button[type="submit"]').click();
	await page.waitForURL(`${baseURL}/dashboard`);
});

test('Fail to login to app using in correct credentials', async ({ page, baseURL }) => {
	await page.goto('/login');

	const email = 'test@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'wrong_password';
	await page.locator('[name="password"]').type(password);

	await page.locator('button[type="submit"]').click();

	const toastMessage = await page.locator('.message').innerText();
	expect(toastMessage).toBe('Wrong email and password combination.');
	await page.waitForURL(`${baseURL}/login`);
});
