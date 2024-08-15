import { default as baseConfig } from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig,
	"**/*.ts": [() => "npm run lint:js", () => "npm run lint:type"],
};

export default config;
