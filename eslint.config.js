import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { resolve as tsResolver } from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import perfectionist from "eslint-plugin-perfectionist";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

const JS_MAX_PARAMS_ALLOWED = 3;

/** @typedef {import("eslint").Linter.Config} */
let Config;
/** @typedef {import("eslint").Linter.ParserModule} */
let ParserModule;

/** @type {Config} */
const filesConfig = {
	files: ["**/*.{js,ts,tsx}"],
};

/** @type {Config} */
const ignoresConfig = {
	ignores: ["apps", "packages", "dangerfile.ts"],
};

/** @type {Config} */
const jsConfig = {
	languageOptions: {
		globals: globals.node,
		parserOptions: {
			ecmaVersion: 14,
			sourceType: "module",
		},
	},
	rules: {
		...js.configs.recommended.rules,
		"arrow-parens": ["error", "always"],
		curly: ["error", "all"],
		"max-params": ["error", JS_MAX_PARAMS_ALLOWED],
		"no-console": ["error"],
		"no-multiple-empty-lines": [
			"error",
			{
				max: 1,
			},
		],
		"no-restricted-syntax": [
			"error",
			{
				message: "Export/Import all (*) is forbidden.",
				selector: "ExportAllDeclaration,ImportAllDeclaration",
			},
			{
				message: "Exports should be at the end of the file.",
				selector: "ExportNamedDeclaration[declaration!=null]",
			},
			{
				message: "TS features are forbidden",
				selector: "TSEnumDeclaration,ClassDeclaration[abstract=true]",
			},
		],
		quotes: ["error", "double"],
	},
};

/** @type {Config} */
const importConfig = {
	plugins: {
		import: importPlugin,
	},
	rules: {
		...importPlugin.configs.recommended.rules,
		"import/exports-last": ["error"],
		"import/extensions": [
			"error",
			{
				js: "always",
			},
		],
		"import/newline-after-import": ["error"],
		"import/no-default-export": ["error"],
		"import/no-duplicates": ["error"],
	},
	settings: {
		"import/parsers": {
			espree: [".js", ".cjs"],
		},
		"import/resolver": {
			typescript: tsResolver,
		},
	},
};

/** @type {Config} */
const sonarConfig = {
	plugins: {
		sonarjs,
	},
	rules: {
		...sonarjs.configs.recommended.rules,
		"sonarjs/no-duplicate-string": ["off"],
	},
};

/** @type {Config} */
const unicornConfig = {
	plugins: {
		unicorn,
	},
	rules: {
		...unicorn.configs.recommended.rules,
		"unicorn/no-null": ["off"],
	},
};

/** @type {Config} */
const perfectionistConfig = {
	plugins: {
		perfectionist,
	},
	rules: perfectionist.configs["recommended-natural"].rules,
};

/** @type {Config} */
const typescriptConfig = {
	ignores: ["eslint.config.js", "lint-staged.config.js", "stylelint.config.js"],
	languageOptions: {
		parser: /** @type {ParserModule} */ (tsParser),
		parserOptions: {
			project: "./tsconfig.json",
		},
	},
	plugins: {
		"@typescript-eslint": ts,
	},
	rules: {
		...ts.configs["strict-type-checked"].rules,
		"@typescript-eslint/no-magic-numbers": [
			"error",
			{
				ignoreEnums: true,
				ignoreReadonlyClassProperties: true,
			},
		],
		"@typescript-eslint/return-await": ["error", "always"],
	},
};

/** @type {Config} */
const jsdocConfig = {
	files: ["eslint.config.js", "lint-staged.config.js"],
	plugins: {
		jsdoc,
	},
	rules: {
		...jsdoc.configs["recommended-typescript-flavor-error"].rules,
		"jsdoc/no-undefined-types": ["error"],
	},
};

/** @type {Config[]} */
const overridesConfigs = [
	{
		files: [
			"commitlint.config.ts",
			"prettier.config.ts",
			"stylelint.config.ts",
			"knip.config.ts",
			"packages.d.ts",
			"lint-staged.config.js",
			"eslint.config.js",
		],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
];

/** @type {Config[]} */
const config = [
	filesConfig,
	ignoresConfig,
	jsConfig,
	importConfig,
	sonarConfig,
	unicornConfig,
	perfectionistConfig,
	typescriptConfig,
	jsdocConfig,
	...overridesConfigs,
];

export default config;
