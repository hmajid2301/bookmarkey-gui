import { expect, test } from '@playwright/test';
import pocketbase from 'pocketbase';

test('Successfully signup to app', async ({ page, baseURL }) => {
	await page.goto('/signup');

	const email = 'test+signup@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'password@11';
	await page.locator('[name="password"]').type(password);
	await page.locator('[name="passwordConfirm"]').type(password);

	await page.locator('button[type="submit"]').click();
	await page.waitForURL(`${baseURL}/my/dashboard`);

	await deleteUserByEmail(email);
});

test('Fail to signup with an email that exists', async ({ page, baseURL }) => {
	await page.goto('/signup');

	const email = 'test@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'password@11';
	await page.locator('[name="password"]').type(password);
	await page.locator('[name="passwordConfirm"]').type(password);

	await page.locator('button[type="submit"]').click();
	const toastMessage = await page.locator('.message').innerText();
	expect(toastMessage).toBe('Failed to create account.');
	await page.waitForURL(`${baseURL}/signup`);
});

test('Fail to signup with passwords that do not match', async ({ page, baseURL }) => {
	await page.goto('/signup');

	const email = 'test+test2@bookmarkey.app';
	await page.locator('[name="email"]').type(email);

	const password = 'password@11';
	await page.locator('[name="password"]').type(password);
	const passwordConfirm = 'password';
	await page.locator('[name="passwordConfirm"]').type(passwordConfirm);

	await page.locator('button[type="submit"]').click();
	const toastMessage = await page.locator('.message').innerText();
	await page
		.locator(
			'text="Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character."'
		)
		.innerText();
	expect(toastMessage).toBe('Invalid data in form.');
	await page.waitForURL(`${baseURL}/signup`);
});

async function deleteUserByEmail(email: string) {
	const pb = new pocketbase(process.env.VITE_POCKET_BASE_URL);
	const adminEmail = 'admin@bookmarkey.app';
	const adminPassword = 'password11';
	await pb.admins.authWithPassword(adminEmail, adminPassword);
	const record = await pb.collection('users').getFirstListItem(`email = "${email}"`);
	await pb.collection('users').delete(record.id);
}
