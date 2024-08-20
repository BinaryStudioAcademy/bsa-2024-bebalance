import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	bgWhite: {
		backgroundColor: BaseColor.BG_WHITE,
	},
	colorBlack: {
		color: BaseColor.BLACK,
	},
	colorWhite: {
		color: BaseColor.BG_WHITE,
	},
	p1: {
		padding: 1,
	},
	rounded: {
		borderRadius: 35,
	},
	text: {
		fontFamily: "Nunito",
		fontSize: 16,
		fontWeight: 700,
		textTransform: "uppercase",
	},
	wrapper: {
		height: 42,
	},
});

export { styles };
