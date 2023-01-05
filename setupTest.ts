import { beforeAll, expect, vi } from "vitest";
import * as matchers from "vitest-dom/matchers";

beforeAll(() => {
	vi.mock("$app/env", () => ({
		browser: "window" in globalThis
	}));
});

expect.extend(matchers);
