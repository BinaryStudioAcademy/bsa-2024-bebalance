import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.Config} */
let FlatConfig;

/** @type {FlatConfig} */
const ignoresConfig = {
	ignores: ["build"],
};

/** @type {FlatConfig[]} */
const config = [...baseConfig, ignoresConfig];

export default config;
