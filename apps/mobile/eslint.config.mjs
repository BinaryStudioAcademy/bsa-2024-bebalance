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
			"import/extensions": ["off"],
			"@typescript-eslint/no-unnecessary-type-parameters": ["off"]
		},
	},
];

export default [...baseConfig, mainConfig, ...overridesConfigs];
