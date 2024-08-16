const globals = require("globals");
const eslintJs = require("@eslint/js");
const { FlatCompat } = require("@eslint/eslintrc");
const tsParser = require("@typescript-eslint/parser");
const eslintConfigPrettier = require("eslint-config-prettier");
const reactRecommended = require("eslint-plugin-react/configs/recommended");

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const tsFiles = ["**/*.ts", "**/*.tsx"];
module.exports = [
	eslintJs.configs.recommended,
	...compat.plugins(
		"@typescript-eslint",
		"react-native",
		"import",
		"@stylistic",
	),
	...compat
		.extends(
			"plugin:@typescript-eslint/recommended-type-checked",
			"plugin:react-hooks/recommended",
			"plugin:react-native/all",
		)
		.map((config) => ({ ...config, files: tsFiles })),
	{
		files: tsFiles,
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: true,
				tsconfigRootDir: __dirname,
			},
		},
		...reactRecommended,
		rules: {
			"@typescript-eslint/no-var-requires": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-non-null-assertion": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ fixStyle: "inline-type-imports" },
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@stylistic/eol-last": ["error", "always"],

			"import/no-duplicates": ["error", { "prefer-inline": true }],
			"import/no-default-export": "error",

			"react/jsx-boolean-value": ["error", "always"],
			"react-native/sort-styles": "off",

			"new-cap": "error",
			"no-multi-assign": "error",
			"no-console": ["error", { allow: ["warn", "error"] }],
			eqeqeq: "error",

			"padding-line-between-statements": [
				"error",
				{ blankLine: "always", prev: "*", next: "return" },
				{
					blankLine: "always",
					prev: ["block-like", "throw", "switch", "iife", "function"],
					next: "*",
				},
				{ blankLine: "always", prev: "import", next: "*" },
				{ blankLine: "any", prev: "import", next: "import" },
				{ blankLine: "always", prev: "*", next: "export" },
				{ blankLine: "any", prev: "export", next: "export" },
			],
		},
	},
	{
		files: ["*.config.js"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	eslintConfigPrettier,
	{
		ignores: [".expo", "node_modules"],
	},
];
