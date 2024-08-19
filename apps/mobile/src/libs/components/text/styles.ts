import { StyleSheet } from "react-native";

import { FontSize, LineHeight } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	default: {
		fontSize: FontSize.MD,
		lineHeight: LineHeight.MD,
	},
	heading: {
		fontSize: FontSize.XXL,
		lineHeight: LineHeight.XXL,
	},
	subheading: {
		fontSize: FontSize.LG,
		lineHeight: LineHeight.LG,
	},
});

export { styles };
