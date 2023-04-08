module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
		extraFileExtensions: [".svelte"],
		sourceType: "module",
		ecmaVersion: 2020
	},
	extends: [
		"eslint:recommended",
		"plugin:svelte/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript"
	],
	plugins: ["@typescript-eslint"],
	ignorePatterns: [
		"*.cjs",
		"svelte-french-toast",
		"vite.config.js",
		"setupTest.ts",
		"svelte.config.js",
		"playwright.config.ts",
		"prompt-sw.ts"
	],
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser"
			}
		}
	],
	rules: {
		"@typescript-eslint/no-floating-promises": [
			"error",
			{
				ignoreIIFE: true
			}
		],
		"import/no-unresolved": "off",
		"import/order": [
			"warn",
			{
				groups: ["builtin", "external", ["sibling", "parent"], "index"],
				pathGroups: [
					{
						pattern: "$app/**",
						group: "external"
					},
					{
						pattern: "~/**",
						group: "sibling"
					}
				],
				alphabetize: {
					order: "asc",
					caseInsensitive: true
				},
				"newlines-between": "always"
			}
		]
	},
	settings: {
		"import/ignore": ["svelte-french-toast"],
		"svelte3/typescript": () => require("typescript")
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
