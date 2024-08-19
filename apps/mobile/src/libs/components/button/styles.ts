import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	btn: {
		alignItems: "center",
		padding: 10,
	},
	filledBtnLabel: {
		color: BaseColor.BG_WHITE,
	},
	label: {
		fontFamily: "Nunito",
		fontSize: 16,
		fontWeight: 700,
		textTransform: "uppercase",
	},
	outlined: {
		borderWidth: 1,
	},
	outlinedInner: {
		backgroundColor: BaseColor.BG_WHITE,
		height: "100%",
		width: "100%",
	},
	wrapper: {
		height: 42,
	},
});

export { styles };
