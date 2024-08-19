import { StyleSheet } from "react-native";

import { FontSize, LineHeight } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	default: {
		fontSize: FontSize.md,
		lineHeight: LineHeight.md,
	},
	heading: {
		fontSize: FontSize.xxl,
		lineHeight: LineHeight.xxl,
	},
	subheading: {
		fontSize: FontSize.lg,
		lineHeight: LineHeight.lg,
	},
});

export { styles };
