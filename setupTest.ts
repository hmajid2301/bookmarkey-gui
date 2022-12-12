import { beforeAll, vi } from 'vitest';

beforeAll(() => {
	vi.mock('$app/env', () => ({
		browser: 'window' in globalThis
	}));
});
