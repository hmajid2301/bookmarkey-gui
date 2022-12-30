import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import FormField from './FormField.svelte';

describe('Input', () => {
	test('Should update password input when user types', async () => {
		const user = userEvent.setup();
		const { getByLabelText, getByDisplayValue } = render(FormField, {
			props: {
				type: 'password',
				name: 'password',
				labelName: 'Password',
				value: 'MyPassword'
			}
		});
		const input = getByLabelText('Password');
		await user.type(input, 'MyNewPassword');
		const value = getByDisplayValue('MyPasswordMyNewPassword');
		expect(value).toBeTruthy();
	});

	test('Should render password input with errors', async () => {
		const { getByText } = render(FormField, {
			props: {
				type: 'password',
				name: 'password',
				labelName: 'Password',
				value: 'MyPassword',
				errors: ['Password needs to be atleast 8 characters long']
			}
		});
		const error = getByText('Password needs to be atleast 8 characters long');
		expect(error.className).toContain('text-red-500');
	});

	test('Should render text input with note', async () => {
		const { getByText } = render(FormField, {
			props: {
				type: 'text',
				name: 'name',
				labelName: 'Nickname',
				note: 'Required',
				value: 'MyName',
				errors: []
			}
		});
		const error = getByText('Required');
		expect(error.className).toContain('text-gray-500');
	});

	test('Should not be able to update disabled input when user types', async () => {
		const user = userEvent.setup();
		const { getByLabelText, getByDisplayValue } = render(FormField, {
			props: {
				type: 'password',
				name: 'password',
				labelName: 'Password',
				value: 'MyPassword',
				disabled: true
			}
		});
		const input = getByLabelText('Password');
		await user.type(input, 'MyNewPassword');
		const value = getByDisplayValue('MyPassword');
		expect(value).toBeTruthy();
	});
});
