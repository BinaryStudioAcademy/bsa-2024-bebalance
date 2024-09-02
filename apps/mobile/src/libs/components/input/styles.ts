import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	input: {
		backgroundColor: BaseColor.BG_WHITE,
		height: 40,
		width: "100%",
	},
	rounded: {
		borderRadius: 4,
	},
	text: {
		color: BaseColor.BLACK,
		fontFamily: "Nunito-Regular",
		fontSize: 16,
	},
});

export { styles };
