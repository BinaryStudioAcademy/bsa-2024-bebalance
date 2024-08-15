import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.FlatConfig} */
let FlatConfig;

/** @type {FlatConfig} */
const ignoresConfig = {
	ignores: ["build"],
};

/** @type {FlatConfig} */
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

/** @type {FlatConfig} */
const reactConfig = {
	files: ["**/*.tsx"],
	plugins: {
		react,
	},
	rules: {
		...react.configs["jsx-runtime"].rules,
		...react.configs["recommended"].rules,
		"react/jsx-no-bind": ["error", { ignoreRefs: true }],
		"react/react-in-jsx-scope": ["off"],
	},
};

/** @type {FlatConfig} */
const reactHooksConfig = {
	files: ["**/*.tsx"],
	plugins: {
		"react-hooks": reactHooks,
	},
	rules: reactHooks.configs.recommended.rules,
};

/** @type {FlatConfig} */
const jsxA11yConfig = {
	files: ["**/*.tsx"],
	plugins: {
		"jsx-a11y": jsxA11y,
	},
	rules: jsxA11y.configs.recommended.rules,
};

/** @type {FlatConfig[]} */
const overridesConfigs = [
	{
		files: ["vite.config.ts"],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
	{
		files: ["src/vite-env.d.ts"],
		rules: {
			"unicorn/prevent-abbreviations": ["off"],
		},
	},
];

/** @type {FlatConfig[]} */
const config = [
	...baseConfig,
	ignoresConfig,
	mainConfig,
	reactConfig,
	reactHooksConfig,
	jsxA11yConfig,
	...overridesConfigs,
];

export default config;
