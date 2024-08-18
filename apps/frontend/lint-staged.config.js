import { default as baseConfig } from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig,
	"**/*.{ts,tsx}": [
		() => "npm run lint:js -w frontend",
		() => "npm run lint:type -w frontend",
	],
	"**/*.css": [() => "npm run lint:css -w frontend"],
};

export default config;
