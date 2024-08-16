const path = require("path");

module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		"@babel/plugin-proposal-export-namespace-from",
		"react-native-reanimated/plugin",
		[
			"module-resolver",
			{
				root: path.resolve("./"),
				alias: {
					"^shared/build(.+)": path.resolve(
						__dirname,
						"../../packages/shared/build/\\1"
					),
					"^#(.+)": "./src/\\1",
				},
			},
		],
	],
};
