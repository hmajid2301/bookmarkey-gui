import type { ActionResult } from '@sveltejs/kit';
import { render } from '@testing-library/svelte';
import type { ComponentProps } from 'svelte';
import { describe, test } from 'vitest';

import UpdatePassword from './UpdatePassword.svelte';

const submitUpdatePassword = () => {
	return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
		console.log('Hello World!');
	};
};

const defaultProps: ComponentProps<UpdatePassword> = {
	values: {
		currentPassword: '',
		password: '',
		passwordConfirm: ''
	},
	errors: {
		currentPassword: [],
		password: [],
		passwordConfirm: []
	},
	loading: false,
	action: '?/updatePassword',
	useEnhanceFunc: submitUpdatePassword
};

describe('UpdatePassword', () => {
	test.each([['Current Password'], ['Password'], ['Confirm Password']])(
		'Renders all password fields',
		async (field) => {
			const { getByLabelText } = render(UpdatePassword, defaultProps);
			getByLabelText(field, { selector: 'input' });
		}
	);
});
