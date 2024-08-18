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

/** @type {Config[]} */
const overridesConfigs = [
	{
		rules: {
			"@typescript-eslint/no-unnecessary-type-parameters": ["off"],
			"import/extensions": ["off"],
		},
	},
	{
		files: ["babel.config.js", "metro.config.js", "lint-staged.config.mjs"],
		rules: {
			"@typescript-eslint/no-require-imports": ["off"],
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
		},
	},
];

export default [...baseConfig, mainConfig, ...overridesConfigs];
