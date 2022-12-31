import { expect, test } from '@playwright/test';
import pocketbase from 'pocketbase';

test('Successfully register an account', async ({ page, baseURL }) => {
	await page.goto('/register');

	const email = 'test+signup@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'sec9rePa@sword@11789';
	await page.locator('[name="password"]').type(password);

	await page.locator('button[type="submit"]').click();
	await page.waitForURL(`${baseURL}/my/dashboard`);

	await deleteUserByEmail(email);
});

test('Fail to register an account with an email that exists', async ({ page, baseURL }) => {
	await page.goto('/register');

	const email = 'test@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'sec9rePa@sword@11789';
	await page.locator('[name="password"]').type(password);

	await page.locator('button[type="submit"]').click();

	const toastMessage = await page.locator('.message').innerText();
	expect(toastMessage).toBe('Failed to create account.');
	await page.waitForURL(`${baseURL}/register`);
});

test('Fail to register an account with a compromised password', async ({ page, baseURL }) => {
	await page.goto('/register');

	const email = 'test@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'password';
	await page.locator('[name="password"]').type(password);

	await page.locator('button[type="submit"]').click();

	// expect error message to be present and to be red
	const error = page.locator('p.text-red-500').first();
	expect(error).toHaveText('Password has been compromised, please try again');

	// expect 4 password strength blocks to be gray
	const span = page.locator('span.bg-gray-200');
	const passwordStrengthItems = await span.count();
	expect(passwordStrengthItems).toBe(4);

	await page.waitForURL(`${baseURL}/register`);
});

async function deleteUserByEmail(email: string) {
	const pb = new pocketbase(process.env.VITE_POCKET_BASE_URL);
	const adminEmail = 'admin@bookmarkey.app';
	const adminPassword = 'password11';
	await pb.admins.authWithPassword(adminEmail, adminPassword);
	const record = await pb.collection('users').getFirstListItem(`email = "${email}"`);
	await pb.collection('users').delete(record.id);
}
