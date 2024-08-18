import { StyleSheet } from "react-native";

import { fontSize, lineHeight } from "~/libs/enums/fonts/font-size.enum";

const styles = StyleSheet.create({
	default: {
		fontSize: fontSize.md,
		lineHeight: lineHeight.md,
	},
	heading: {
		fontSize: fontSize.xxl,
		lineHeight: lineHeight.xxl,
	},
	subheading: {
		fontSize: fontSize.lg,
		lineHeight: lineHeight.lg,
	},
});

export { styles };
