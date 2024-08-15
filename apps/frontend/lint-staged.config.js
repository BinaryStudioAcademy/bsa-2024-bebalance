import { default as baseConfig } from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig,
	"**/*.{ts,tsx}": [() => "npm run lint:js", () => "npm run lint:type"],
	"**/*.css": [() => "npm run lint:css"],
};

export default config;
