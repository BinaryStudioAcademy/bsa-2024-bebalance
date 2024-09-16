const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("node:path");

const pathToShared = path.resolve(__dirname, "../../packages/shared");
const pathToWorkspaceNodeModules = path.resolve(
	__dirname,
	"../../node_modules",
);
const { assetExts, sourceExts } = getDefaultConfig(__dirname).resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	resolver: {
		assetExts: assetExts.filter((extension) => extension !== "svg"),
		sourceExts: [...sourceExts, "svg"],
	},
	transformer: {
		babelTransformerPath: require.resolve("react-native-svg-transformer"),
	},
	watchFolders: [pathToShared, pathToWorkspaceNodeModules],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
