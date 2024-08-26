import { type KnipConfig } from "knip";

const config: KnipConfig = {
	prettier: ["./prettier.config.ts"],
	stylelint: ["./stylelint.config.ts"],
	workspaces: {
		".": {
			entry: ["./dangerfile.ts"],
		},
		"apps/backend": {
			entry: ["src/index.ts", "src/db/migrations/*.ts", "knexfile.ts"],
			ignoreDependencies: ["pg"],
		},
		"apps/frontend": {
			entry: ["src/index.tsx"],
		},
		"apps/mobile": {
			entry: ["index.js", "metro.config.js"],
			ignore: ["react-native.config.js"],
			ignoreDependencies: [
				"react-native-codegen",
				"@babel/preset-env",
				"@babel/runtime",
				"metro-config",
			],
		},
		"packages/shared": {
			entry: ["src/index.ts"],
		},
	},
};

export default config;
