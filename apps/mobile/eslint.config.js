import baseConfig from "../../eslint.config";

/** @typedef {import("eslint").Linter.Config} */
let Config;

/** @type {Config[]} */
const overridesConfigs = [
	{
		rules: {
			"import/extensions": ["off"],
		},
	},
];

export default [...baseConfig, ...overridesConfigs];
