const path = require("path");

module.exports = {
	plugins: [
		"react-native-reanimated/plugin",
		[
			"module-resolver",
			{
				alias: {
					"^~(.+)": "./src/\\1",
				},
				root: path.resolve("./"),
			},
		],
	],
	presets: ["module:@react-native/babel-preset"],
};
