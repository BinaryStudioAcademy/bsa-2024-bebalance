import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.Config} */
let Config;

/** @type {Config} */
const mainConfig = {
	languageOptions: {
		globals: {
			...globals.node,
			...globals.browser,
			JSX: true,
			React: true,
		},
	},
};

/** @type {Config} */
const reactConfig = {
	files: ["**/*.tsx"],
	plugins: {
		react,
	},
	rules: {
		...react.configs["jsx-runtime"].rules,
		...react.configs["recommended"].rules,
		"react/jsx-boolean-value": ["error"],
		"react/jsx-curly-brace-presence": ["error"],
		"react/jsx-no-bind": ["error", { ignoreRefs: true }],
		"react/self-closing-comp": ["error"],
	},
};

/** @type {Config} */
const reactHooksConfig = {
	files: ["**/*.tsx"],
	plugins: {
		"react-hooks": reactHooks,
	},
	rules: reactHooks.configs.recommended.rules,
};

/** @type {Config} */
const explicitGenericsConfig = {
	rules: {
		"require-explicit-generics/require-explicit-generics": [
			"error",
			["useState"],
		],
	},
};

/** @type {Config[]} */
const overridesConfigs = [
	{
		rules: {
			"@typescript-eslint/no-require-imports": ["off"],
			"@typescript-eslint/no-unnecessary-type-parameters": ["off"],
			"import/extensions": ["off"],
			"unicorn/prefer-module": ["off"],
		},
	},
	{
		files: ["eslint.config.mjs", "lint-staged.config.mjs"],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
	{
		files: ["babel.config.js"],
		rules: {
			"unicorn/prefer-node-protocol": ["off"],
			"unicorn/prefer-string-raw": ["off"],
		},
	},
];

export default [
	...baseConfig,
	mainConfig,
	reactConfig,
	reactHooksConfig,
	explicitGenericsConfig,
	...overridesConfigs,
];
