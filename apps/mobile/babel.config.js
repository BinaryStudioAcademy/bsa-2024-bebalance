const path = require("path");

module.exports = {
	presets: ["module:@react-native/babel-preset"],
	plugins: [
		"react-native-reanimated/plugin",
		[
			"module-resolver",
			{
				root: path.resolve("./"),
				alias: {
					"^~(.+)": "./src/\\1",
				},
			},
		],
	],
};
