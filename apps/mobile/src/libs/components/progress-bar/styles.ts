import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	backgroundBarStyle: {
		backgroundColor: BaseColor.GRAY,
		height: 1,
	},
	backgroundDotStyle: {
		backgroundColor: BaseColor.GRAY,
		height: 12,
		width: 12,
	},
	bar: {
		height: 1,
		width: "100%",
	},
	dotBorder: {
		borderRadius: 12,
		height: 12,
		width: 12,
	},
	dotCenter: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 8,
		height: 8,
		width: 8,
	},
	dotContainer: {
		height: 12,
		width: 12,
	},
	filledBarStyle: {
		backgroundColor: "transparent",
	},
	filledDotStyle: {
		backgroundColor: BaseColor.GRAY,
	},
});

export { styles };
