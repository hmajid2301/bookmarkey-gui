import { render } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';

import Logo from './Logo.svelte';

describe('Logo', () => {
	test('Renders logo', async () => {
		const { getByText } = render(Logo, {});
		const text = getByText('Bookmarkey');
		expect(text).toBeTruthy();
	});
});
