import { render } from '@testing-library/svelte';
import type { ComponentProps } from 'svelte';
import { describe, expect, test } from 'vitest';

import Input from './Input.svelte';

describe('Input', () => {
	test('Should render input', async () => {
		const props: ComponentProps<Input> = {
			type: 'password',
			name: 'password',
			value: 'MyPassword',
			labelName: 'Password'
		};
		const { getByLabelText } = render(Input, props);
		const input = getByLabelText('Password') as HTMLInputElement;
		expect(input.value).toBe('MyPassword');
	});
});
