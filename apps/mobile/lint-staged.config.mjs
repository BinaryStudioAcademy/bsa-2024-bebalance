import { default as baseConfig } from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig,
	"**/*.ts": [
		() => "npm run lint:js -w mobile",
		() => "npm run lint:type -w mobile",
	],
};

export default config;
