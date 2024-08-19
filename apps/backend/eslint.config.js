import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.Config} */
let Config;

/** @type {Config} */
const ignoresConfig = {
	ignores: ["build"],
};

/** @type {Config[]} */
const overridesConfigs = [
	{
		files: ["knexfile.ts"],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
	{
		files: ["src/db/migrations/**/*.ts"],
		rules: {
			"unicorn/filename-case": [
				"error",
				{
					case: "snakeCase",
				},
			],
		},
	},
	{
		files: ["src/libs/modules/controller/base-controller.module.ts"],
		rules: {
			"@typescript-eslint/no-magic-numbers": ["off"],
		},
	},
];

/** @type {Config[]} */
const config = [...baseConfig, ignoresConfig, ...overridesConfigs];

export default config;
